import { useState, useCallback } from "react";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";

const API_URL = "https://financeaiapi.runasp.net/api/Stock/predict";


export function useStockPrediction() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [predictionData, setPredictionData] = useState(null);
  const [uploadedChartData, setUploadedChartData] = useState([]);

  const getCellValue = (row, candidates = []) => {
    const key = Object.keys(row).find((currentKey) =>
      candidates.some((candidate) => currentKey.trim().toLowerCase() === candidate)
    );

    return key ? row[key] : undefined;
  };

  const formatExcelDate = (val) => {
    if (!val && val !== 0) return undefined;
    if (val instanceof Date && !isNaN(val)) {
      return val.toISOString().split("T")[0];
    }
    if (typeof val === "number") {
      try {
        const parsed = XLSX.SSF.parse_date_code(val);
        if (parsed && parsed.y) {
          const mm = String(parsed.m).padStart(2, "0");
          const dd = String(parsed.d).padStart(2, "0");
          return `${parsed.y}-${mm}-${dd}`;
        }
      } catch (e) {
        // ignore and fallback
      }
    }
    try {
      const d = new Date(String(val));
      if (!isNaN(d)) return d.toISOString().split("T")[0];
    } catch (e) {
      // ignore
    }
    return String(val);
  };

  const normalizeExcelRows = (rows) => {
    return rows
      .map((row, index) => {
        const rawDate = getCellValue(row, ["date", "dates", "time", "period"]);
        const dateValue = formatExcelDate(rawDate);
        const closeValue = getCellValue(row, ["close", "closing", "price", "value", "predicted"]);

        const numericClose = Number(closeValue);
        if (!Number.isFinite(numericClose)) return null;

        return {
          date: dateValue ? String(dateValue) : `Day ${index + 1}`,
          close: numericClose,
        };
      })
      .filter(Boolean);
  };

  const sortRowsByDate = (rows) => {
    // Sort rows ascending by date when possible. Non-parseable dates are pushed to the end.
    return [...rows].sort((a, b) => {
      const ta = Date.parse(a.date);
      const tb = Date.parse(b.date);
      const aValid = !Number.isNaN(ta);
      const bValid = !Number.isNaN(tb);
      if (aValid && bValid) return ta - tb;
      if (aValid) return -1;
      if (bValid) return 1;
      return 0;
    });
  };

  const parseExcelFile = useCallback(async (selectedFile) => {
    const buffer = await selectedFile.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: "array", cellDates: true });
    const firstSheetName = workbook.SheetNames[0];

    if (!firstSheetName) {
      return [];
    }

    const sheet = workbook.Sheets[firstSheetName];
    const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

    return normalizeExcelRows(rows);
  }, []);

  const buildForecast = (payload, historicalData = []) => {
    const forecastValue = Number(
      payload?.predicted_price ??
        payload?.predictedPrice ??
        payload?.forecast?.nextDayPrice ??
        payload?.forecast?.predicted_price ??
        payload?.nextDayPrice ??
        payload?.price ??
        0
    );

    const lastKnownPrice = historicalData.at(-1)?.close ?? forecastValue;
    const previousPrice = historicalData.at(-2)?.close ?? lastKnownPrice;
    const percentChangeValue =
      payload?.percentChange ??
      payload?.forecast?.percentChange ??
      payload?.changePercent ??
      (previousPrice ? (((forecastValue - previousPrice) / previousPrice) * 100).toFixed(1) : 0);

    return {
      nextDayPrice: forecastValue,
      percentChange: Number(percentChangeValue),
    };
  };


  const handleFileSelect = useCallback(async (selectedFile) => {
    if (!selectedFile) return;

    const ext = selectedFile.name.split(".").pop().toLowerCase();
    if (ext !== "xls" && ext !== "xlsx") {
      toast.error("Please upload a valid Excel file (.xls or .xlsx)");
      return;
    }

    try {
      const chartRows = await parseExcelFile(selectedFile);

      if (!chartRows.length) {
        throw new Error("No numeric stock data was found in the uploaded file.");
      }

      const sorted = sortRowsByDate(chartRows);
      setFile(selectedFile);
      setUploadedChartData(sorted);
      setError(null);
      setPredictionData(null);
    } catch (err) {
      console.error("Excel parse error:", err);
      setFile(selectedFile);
      setUploadedChartData([]);
      setError(err.message);
      toast.error(err.message || "Failed to read the Excel file.");
    }
  }, [parseExcelFile]);

  const clearFile = useCallback(() => {
    setFile(null);
    setError(null);
    setPredictionData(null);
  }, []);

  const predict = useCallback(async () => {
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("File", file);

      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        let message = `Server error: ${response.status}`;
        try {
          const errorText = await response.text();
          if (errorText) {
            message = errorText;
          }
        } catch {
          // ignore body read errors and keep the status-based message
        }
        throw new Error(message);
      }

      const text = await response.text();

      if (!text || text.trim().length === 0) {
        throw new Error("The server returned an empty response.");
      }

      const data = JSON.parse(text);
      // ensure forecast is built against the latest (sorted) historical data
      const forecast = buildForecast(data, uploadedChartData);
      const forecastRow = {
        date: "Forecast",
        close: forecast.nextDayPrice,
        isForecast: true,
      };

      setPredictionData({
        chartData: [...uploadedChartData, forecastRow],
        forecast,
        isMock: false,
      });
    } catch (err) {
      console.error("Prediction error:", err);
      setError(err.message);

      toast.error(err.message || "Prediction failed.");
    } finally {
      setLoading(false);
    }
  }, [file, uploadedChartData]);

  return {
    file,
    loading,
    error,
    predictionData,
    handleFileSelect,
    predict,
    clearFile,
    uploadedChartData,
  };
}

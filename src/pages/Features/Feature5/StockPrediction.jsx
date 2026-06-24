import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { cn } from "../../../lib/utils";
import { TableProperties, Sparkles, BarChart3 } from "lucide-react";
import { useStockPrediction } from "./useStockPrediction";


const CloudUploadIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 16V8m0 0l-3 3m3-3l3 3" />
    <path d="M20.42 13.64A6 6 0 0014 6h-.87A8 8 0 104.57 17.5" />
  </svg>
);

const FileIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

const CheckCircle = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm-1 15l-4-4 1.4-1.4L11 14.2l5.6-5.6L18 10l-7 7z" />
  </svg>
);

const TrendingUpIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const DownloadIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const ShareIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const ArrowLeftIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const ChartColumnIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 3v18h18" />
    <rect x="7" y="10" width="3" height="8" rx="1" />
    <rect x="14" y="5" width="3" height="13" rx="1" />
  </svg>
);


const CircuitArt = () => (
  <svg className="absolute bottom-0 left-0 w-[200px] h-[200px] pointer-events-none opacity-35" viewBox="0 0 200 200" fill="none">
    <circle cx="20" cy="180" r="4" fill="#4f46e5" />
    <circle cx="50" cy="150" r="3" fill="#4f46e5" />
    <circle cx="80" cy="170" r="4" fill="#4f46e5" />
    <circle cx="30" cy="130" r="3" fill="#4f46e5" />
    <circle cx="60" cy="110" r="4" fill="#4f46e5" />
    <circle cx="100" cy="140" r="3" fill="#4f46e5" />
    <circle cx="120" cy="160" r="4" fill="#4f46e5" />
    <circle cx="140" cy="180" r="3" fill="#4f46e5" />
    <line x1="20" y1="180" x2="50" y2="150" stroke="#4f46e5" strokeWidth="1.2" />
    <line x1="50" y1="150" x2="80" y2="170" stroke="#4f46e5" strokeWidth="1.2" />
    <line x1="30" y1="130" x2="60" y2="110" stroke="#4f46e5" strokeWidth="1.2" />
    <line x1="60" y1="110" x2="100" y2="140" stroke="#4f46e5" strokeWidth="1.2" />
    <line x1="100" y1="140" x2="120" y2="160" stroke="#4f46e5" strokeWidth="1.2" />
    <line x1="120" y1="160" x2="140" y2="180" stroke="#4f46e5" strokeWidth="1.2" />
    <line x1="80" y1="170" x2="120" y2="160" stroke="#4f46e5" strokeWidth="1.2" />
    <path d="M10 190 Q 60 140 110 190" stroke="#4f46e5" strokeWidth="1" fill="none" />
    <path d="M30 195 Q 70 155 130 195" stroke="#6366f1" strokeWidth="0.8" fill="none" />
  </svg>
);


const Spinner = () => (
  <span className="inline-block w-[18px] h-[18px] border-[2.5px] border-white/30 border-t-white rounded-full animate-spin mr-2 align-middle" />
);


export default function StockPrediction() {
  const { file, loading, predictionData, handleFileSelect, predict, clearFile } =
    useStockPrediction();

  const fileInputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  /* step derived from predictionData */
  const step = predictionData ? "results" : "upload";

  /* drag helpers */
  const onDragOver = useCallback((e) => {
    e.preventDefault();
    setDragOver(true);
  }, []);
  const onDragLeave = useCallback(() => setDragOver(false), []);
  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      const droppedFile = e.dataTransfer.files?.[0];
      if (droppedFile) handleFileSelect(droppedFile);
    },
    [handleFileSelect]
  );

  const onBrowse = () => fileInputRef.current?.click();
  const onFileChange = (e) => {
    if (e.target.files?.[0]) handleFileSelect(e.target.files[0]);
  };

  /* download CSV helper */
  const downloadCSV = () => {
    if (!predictionData) return;

    const rows = predictionData.chartData?.length
      ? ["Date,Close", ...predictionData.chartData.map((r) => `${r.date},${r.close}`)]
      : ["Metric,Value", `Predicted Price,${predictionData.forecast?.nextDayPrice ?? ""}`, `Percent Change,${predictionData.forecast?.percentChange ?? ""}`];

    const blob = new Blob([rows.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "forecast_report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };


  return (
    <div className="min-h-screen bg-white font-[Inter,Segoe_UI,system-ui,sans-serif] text-gray-800">
      <Toaster position="top-center" />

      <AnimatePresence mode="wait">
        {step === "upload" ? (
          <motion.div
            key="upload"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
          >
            <UploadScreen
              file={file}
              loading={loading}
              dragOver={dragOver}
              fileInputRef={fileInputRef}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={onDrop}
              onBrowse={onBrowse}
              onFileChange={onFileChange}
              onPredict={predict}
              onClearFile={clearFile}
            />
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
          >
            <ResultsDashboard
              data={predictionData}
              onBack={clearFile}
              onDownload={downloadCSV}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}



function UploadScreen({
  file,
  loading,
  dragOver,
  fileInputRef,
  onDragOver,
  onDragLeave,
  onDrop,
  onBrowse,
  onFileChange,
  onPredict,
  onClearFile,
}) {
  return (
    <div className="max-w-[780px] mx-auto px-6 pt-14 pb-16">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-[28px] font-bold text-gray-900 mb-2">Upload Your Excel File</h1>
        <p className="text-[15px] text-gray-500">
          Upload an Excel (.xls or .xlsx) file that contains the stock price numbers.
        </p>
      </div>

      {/* Drop Zone */}
      <div
        className={cn(
          "border-[2.5px] border-dashed border-indigo-400 rounded-2xl bg-indigo-50/30 py-12 px-8 text-center cursor-pointer transition-colors relative",
          dragOver && "bg-indigo-100 border-indigo-500"
        )}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={onBrowse}
        role="button"
        tabIndex={0}
        aria-label="File upload dropzone"
      >
        <CloudUploadIcon className="w-14 h-14 mx-auto mb-3 text-indigo-500" />
        <p className="text-base font-medium text-gray-700 mb-1">Drag and drop your file</p>
        <p className="text-sm text-gray-400 mb-4">or</p>
        <Button
          size="lg"
          className="px-14 rounded-xl text-[15px] font-semibold"
          onClick={(e) => {
            e.stopPropagation();
            onBrowse();
          }}
        >
          Browse Files
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept=".xls,.xlsx"
          className="hidden"
          onChange={onFileChange}
        />

        {file && (
          <div
            className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-lg px-4 py-2 mt-4 text-[13px] text-indigo-600 font-medium"
            onClick={(e) => e.stopPropagation()}
          >
            <FileIcon className="w-4 h-4" />
            {file.name}
            <button onClick={onClearFile} className="text-red-500 ml-1 text-base leading-none hover:text-red-600" title="Remove file">
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Format row */}
      <div className="flex items-center justify-center gap-6 mt-4 text-[13px] text-gray-500 flex-wrap">
        <span className="inline-flex items-center gap-1.5">
          <FileIcon className="w-4 h-4 text-gray-400" />
          Supported format: .xls, .xlsx
        </span>
        <span className="inline-flex items-center gap-1.5">
          <CheckCircle className="w-[18px] h-[18px] text-green-500" />
          File should contain numeric columns (e.g., Close, Price)
        </span>
      </div>

      {/* Predict button */}
      <Button
        size="lg"
        disabled={!file || loading}
        onClick={onPredict}
        className="w-full max-w-[480px] mx-auto mt-8 block h-[52px] rounded-xl text-base font-bold"
      >
        {loading && <Spinner />}
        {loading ? "Predicting…" : "Predict Stock Prices"}
      </Button>

      {/* Info cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-14">
        {/* Card 1 – Example File Format */}
        <Card className="bg-white text-gray-900 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[15px]">
              <TableProperties className="w-5 h-5 text-indigo-600" />
              Example File Format
            </CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full border-collapse text-[13px] mb-3">
              <thead>
                <tr>
                  <th className="bg-indigo-50 text-indigo-600 font-semibold px-3 py-1.5 text-left">Date</th>
                  <th className="bg-indigo-50 text-indigo-600 font-semibold px-3 py-1.5 text-left">CLOSE</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="px-3 py-1.5 border-b border-gray-100 text-gray-700">2020-01-01</td><td className="px-3 py-1.5 border-b border-gray-100 text-gray-700">132.5</td></tr>
                <tr><td className="px-3 py-1.5 border-b border-gray-100 text-gray-700">2020-01-02</td><td className="px-3 py-1.5 border-b border-gray-100 text-gray-700">133.2</td></tr>
                <tr><td className="px-3 py-1.5 border-b border-gray-100 text-gray-700">2020-01-03</td><td className="px-3 py-1.5 border-b border-gray-100 text-gray-700">131.8</td></tr>
              </tbody>
            </table>
            <Button variant="secondary" size="sm" className="bg-gray-900 text-white hover:bg-gray-800 text-xs font-semibold">
              Download Sample
            </Button>
          </CardContent>
        </Card>

        {/* Card 2 – What Happens Next? */}
        <Card className="bg-white text-gray-900 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[15px]">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              What Happens Next?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-sm text-gray-700">
                <CheckCircle className="w-[18px] h-[18px] text-green-500 shrink-0" />
                Model reads the numbers
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-700">
                <CheckCircle className="w-[18px] h-[18px] text-green-500 shrink-0" />
                Predicts future prices
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-700">
                <CheckCircle className="w-[18px] h-[18px] text-green-500 shrink-0" />
                Shows graph &amp; results
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Card 3 – Output */}
        <Card className="bg-white text-gray-900 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[15px]">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              Output
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-sm text-gray-700">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 shrink-0" />
                Predicted Prices (Table)
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-700">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shrink-0" />
                Graph Visualization
              </li>
              <li className="flex items-center gap-2.5 text-sm text-gray-700">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 shrink-0" />
                Download Results (Excel/CSV)
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}



function ResultsDashboard({ data, onBack, onDownload }) {
  const navigate = useNavigate();
  const { chartData = [], forecast } = data;
  const hasChartData = chartData.length > 0;

  return (
    <div className="max-w-[1100px] mx-auto px-6 pt-8 pb-16 relative">
      {/* Back to Features */}
      <Button
        variant="ghost"
        onClick={() => navigate("/features")}
        className="mb-5 gap-1.5 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeftIcon className="w-4 h-4" /> Back to Features
      </Button>

      {/* Top bar */}
      <Card className="bg-white text-gray-900 flex-row flex-wrap items-center justify-center gap-4 p-3 px-6 mb-7">
        <span className="flex items-center gap-1.5 text-sm font-semibold text-indigo-600">
          <TrendingUpIcon className="w-[18px] h-[18px]" /> Actions &amp; Insights
        </span>
        <Button size="sm" onClick={onDownload} className="gap-2 rounded-lg text-[13px] font-semibold">
          <DownloadIcon className="w-4 h-4" /> Download Forecast Report (Excel/CSV)
        </Button>
        <Button variant="ghost" size="sm" className="gap-2 border border-gray-200 rounded-lg text-[13px] font-semibold text-gray-700 hover:bg-gray-100">
          <ShareIcon className="w-4 h-4" /> Share Insights
        </Button>
      </Card>

      {/* Dashboard grid */}
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6 items-start">
        {/* Left – overview */}
        <Card className="bg-white text-gray-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[15px]">
              <ChartColumnIcon className="w-5 h-5 text-indigo-600" /> Prediction Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
              <p className="text-[13px] text-gray-500 mb-2">Price forecasted:</p>
              <p className="text-[32px] font-extrabold text-gray-900 leading-none">
                ${forecast.nextDayPrice.toFixed(2)}
                
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Right – chart */}
        <Card className="bg-white text-gray-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUpIcon className="w-5 h-5 text-indigo-600" /> Uploaded Data + Forecast
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={360}>
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  tickLine={false}
                  domain={["auto", "auto"]}
                />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: 10,
                    fontSize: 13,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 13 }} />
                <Line
                  type="monotone"
                  dataKey="close"
                  name="Uploaded Excel Data + Predicted Price"
                  stroke="#4f46e5"
                  strokeWidth={2.2}
                  dot={{ r: 3, fill: "#4f46e5" }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <p className="mt-3 text-xs text-gray-500">
              The last point in the line is the backend prediction added to the uploaded Excel values.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Decorative circuit corner */}
      <CircuitArt />
    </div>
  );
}

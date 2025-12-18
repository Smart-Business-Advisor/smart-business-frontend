import React, { useRef } from "react";
// مكونات افتراضية
import { Card } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

// 🚨 مكتبات Charting
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";
import jsPDF from "jspdf";
import domtoimage from 'dom-to-image-more';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// =========================================================================
// 💡 البيانات الثابتة والمدخلات المُختارة
// =========================================================================
const fixedAssumptions = {
  growthRate: 0.10,
  discountRate: 0.12,
  maxBudget: 20000,
  projectionYears: 3,
};

// =========================================================================
// 🧮 وظيفة الحسابات المالية
// =========================================================================
const calculateFeasibility = (idea, assumptions) => {
  const { cost, profitRate } = idea;
  const { growthRate, discountRate, maxBudget, projectionYears } = assumptions;

  const annualReturnYear1 = cost * profitRate;

  const cashFlows = [-cost];
  const cumulativeCF = [-cost];
  let pvCumulative = -cost;

  for (let t = 1; t <= projectionYears; t++) {
    const currentCF = annualReturnYear1 * Math.pow((1 + growthRate), (t - 1));
    const pv = currentCF / Math.pow((1 + discountRate), t);
    cumulativeCF.push(cumulativeCF[t - 1] + currentCF);
    pvCumulative += pv;
    cashFlows.push(currentCF);
  }

  const paybackPeriod = cost / annualReturnYear1;
  const contingency = maxBudget - cost;

  return {
    annualReturnYear1: annualReturnYear1.toFixed(0),
    npv: pvCumulative.toFixed(0),
    paybackPeriod: paybackPeriod.toFixed(1),
    contingency: contingency.toLocaleString(),
    cashFlows: cashFlows.map(cf => Number(cf.toFixed(0))),
    cumulativeCF: cumulativeCF.map(cf => Number(cf.toFixed(0))),
    pvCumulativeFinal: pvCumulative,
  };
};

// =========================================================================
// 📊 مكون الرسم البياني للتدفق النقدي السنوي
// =========================================================================
const CashFlowChart = ({ cashFlowData }) => {
  const chartData = {
    labels: ['Year 1', 'Year 2', 'Year 3'],
    datasets: [
      {
        label: 'Annual Cash Flow (USD)',
        data: cashFlowData.slice(1),
        backgroundColor: 'rgba(52, 211, 153, 0.7)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Annual Net Cash Flow Trend' },
    },
  };

  return <Bar data={chartData} options={options} />;
};

// =========================================================================
// 🧱 المكون النهائي لصفحة التحليل
// =========================================================================
export default function FeasibilityAnalysisPage() {
  const selectedIdeaFromState = {
    title: "Smart Home Automation",
    cost: "$8000",
    risk: "Medium"
  };

  const ideaForCalculation = {
    title: selectedIdeaFromState.title,
    cost: Number(selectedIdeaFromState.cost.replace('$', '').replace(',', '')),
    profitRate: 0.175,
    risk: selectedIdeaFromState.risk,
  };

  const results = calculateFeasibility(ideaForCalculation, fixedAssumptions);

  const metricExplanations = {
    'Initial Investment': 'The estimated capital needed to start the project.',
    'Expected ROI': 'Expected annual return on your investment in the first year.',
    'Payback Period': 'The estimated time needed to recover your initial investment.',
    'Contingency Budget': 'The remaining budget available for operations or expansion.',
    'Risk Level': 'Indicates the stability and predictability of the income stream.',
    'NPV': "The project's worth today after accounting for the 12% annual cost of capital.",
  };

  const npvColor = results.pvCumulativeFinal >= 0
    ? 'bg-[#d1fae5] border-[#10b981] text-[#065f46]'
    : 'bg-[#fee2e2] border-[#ef4444] text-[#991b1b]';
  const npvSign = results.pvCumulativeFinal >= 0 ? '' : '-';

  const reportRef = useRef();

  const handleDownload = async () => {
    const element = reportRef.current;
    if (!element) return;

    try {
      const dataUrl = await domtoimage.toPng(element, {
        cacheBust: true,
        bgcolor: '#ffffff'
      });

      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        const imgWidth = pdfWidth;
        const imgHeight = (img.height * pdfWidth) / img.width;
        pdf.addImage(dataUrl, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("Report.pdf");
      };
    } catch (err) {
      console.error("Error generating PDF:", err);
    }
  };

  return (
    <div ref={reportRef} className="w-full min-h-screen p-10 bg-gray-50 overflow-auto">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">

        {/* Header */}
        <div className="text-center bg-white p-6 rounded-xl shadow-xl border-b-4 border-blue-500">
          <h1 className="text-3xl font-bold text-gray-800">Financial Feasibility Analysis</h1>
          <h2 className="text-xl text-blue-600 mt-2">{ideaForCalculation.title}</h2>
          <p className="text-sm text-gray-500 mt-1">
            Investment: ${ideaForCalculation.cost.toLocaleString()} | Total Budget: ${fixedAssumptions.maxBudget.toLocaleString()}
          </p>
        </div>

        {/* Key Metrics */}
        <h3 className="text-2xl font-bold text-gray-800 border-b pb-2">Key Financial Indicators</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: 'Initial Investment', value: `$${ideaForCalculation.cost.toLocaleString()}` },
            { label: 'Expected ROI', value: `${(ideaForCalculation.profitRate * 100).toFixed(1)}%` },
            { label: 'Payback Period', value: `${results.paybackPeriod} Years` },
            { label: 'Contingency Budget', value: `$${results.contingency}` },
            { label: 'Risk Level', value: ideaForCalculation.risk, color: ideaForCalculation.risk === 'Medium' ? 'text-yellow-600' : 'text-green-600' },
          ].map((metric) => (
            <Card key={metric.label} className="p-4 flex flex-col justify-center items-center text-center shadow-md">
              <span className={`text-2xl font-extrabold ${metric.color || 'text-blue-600'}`}>{metric.value}</span>
              <p className="text-sm font-semibold text-gray-700 mt-1">{metric.label}</p>
              <p className="text-xs text-gray-500 mt-1">{metricExplanations[metric.label]}</p>
            </Card>
          ))}
        </div>

        {/* Cash Flow Chart */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Cash Flow Visualization</h3>
          <CashFlowChart cashFlowData={results.cashFlows} />
        </div>

        {/* Cash Flow Table */}
       {/* Cash Flow Table */}
<div className="bg-white p-6 rounded-xl shadow-lg">
  <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Detailed Cash Flow Projections</h3>
  
  {/* Responsive wrapper */}
  <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
          {[0, 1, 2, 3].map(year => (
            <th key={year} className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Year {year === 0 ? '0 (Start)' : year}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {/* Row 1: Annual Cash Flow */}
        <tr>
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Annual Cash Flow (CFt)</td>
          {results.cashFlows.map((cf, index) => (
            <td key={index} className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-700">
              {index === 0 ? `-$${Math.abs(cf).toLocaleString()}` : `$${cf.toLocaleString()}`}
            </td>
          ))}
        </tr>

        {/* Row 2: Cumulative Cash Flow */}
        <tr className="bg-gray-100/70">
          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Cumulative Cash Flow</td>
          {results.cumulativeCF.map((cf, index) => (
            <td key={index} className={`px-6 py-4 whitespace-nowrap text-right text-sm font-semibold ${cf < 0 ? 'text-red-600' : 'text-green-600'}`}>
              {cf < 0 ? `-$${Math.abs(cf).toLocaleString()}` : `$${cf.toLocaleString()}`}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  </div>

  <p className="text-xs text-gray-500 mt-4">
    *Assumptions: 10% Annual Growth Rate, 12% Discount Rate.
  </p>
</div>


        {/* NPV Result */}
        <div className={`p-6 rounded-xl shadow-xl text-center border-l-4 ${npvColor}`}>
          <h3 className="text-xl font-bold mb-2">Net Present Value (NPV) Summary</h3>
          <p className="text-4xl font-extrabold mb-3">
            NPV: {npvSign}${(Math.abs(results.npv)).toLocaleString()}
          </p>
          <p className="text-sm font-medium mb-4">{metricExplanations.NPV}</p>

          {/* Download Button */}
          <Button
            onClick={handleDownload}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors shadow-lg"
          >
            Download Full Report 📄
          </Button>
        </div>

      </div>
    </div>
  );
}

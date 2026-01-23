import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { formulas } from './formulas';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, 
  PieChart, Pie, Cell, Legend, LineChart, Line 
} from 'recharts';
import { Calculator, PieChart as PieIcon, BarChart as BarIcon, Activity } from 'lucide-react';

const FinancialCalculator = () => {
  const { toolId } = useParams();
  const activeTool = formulas.find((f) => f.id === toolId);
  
  const [formValues, setFormValues] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  // State to toggle chart types if needed, defaults to 'bar'
  const [chartType, setChartType] = useState('bar'); 

  // Colors for Pie Chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  useEffect(() => {
    setFormValues({});
    setResult(null);
    setError("");
    setChartType('bar');
  }, [toolId]);

  if (!activeTool) return <div className="p-8">Tool not found</div>;

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
    setError(""); 
  };

  const handleCalculate = () => {
    const allFilled = activeTool.inputs.every(input => formValues[input.name]);
    
    if (!allFilled) {
        setError("Please fill in all fields correctly.");
        return;
    }

    try {
        const calcResult = activeTool.calculate(formValues);
        if (calcResult.error) {
            setError(calcResult.error);
            setResult(null);
        } else {
            setResult(calcResult);
            setError("");
        }
    } catch (err) {
        setError("An error occurred. Check inputs.");
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      
      {/* --- Input Section --- */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden h-fit">
        <div className="p-6 border-b bg-gray-50/50">
          <h3 className="text-2xl font-semibold text-gray-900">{activeTool.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{activeTool.description}</p>
        </div>
        
        <div className="p-6 space-y-4">
          {activeTool.inputs.map((input) => (
            <div key={input.name} className="space-y-2">
              <label htmlFor={input.name} className="text-sm font-medium">
                {input.label}
              </label>
              <input
                id={input.name}
                name={input.name}
                type={input.type || "text"}
                placeholder={input.placeholder}
                value={formValues[input.name] || ''}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
            </div>
          ))}

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
          
          <button 
            onClick={handleCalculate}
            className="w-full inline-flex items-center justify-center rounded-md bg-black text-white h-10 px-4 py-2 text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Calculate Results
          </button>
        </div>
      </div>

      {/* --- Results Section --- */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden flex flex-col min-h-[500px]">
        <div className="p-6 border-b bg-gray-50/50 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Analysis Dashboard</h3>
            {/* View Toggles (Optional UI Candy) */}
            {result && (
              <div className="flex bg-gray-100 rounded-lg p-1">
                 <button onClick={() => setChartType('bar')} className={`p-1.5 rounded-md ${chartType === 'bar' ? 'bg-white shadow-sm' : 'text-gray-500'}`} title="Bar Chart">
                   <BarIcon size={16} />
                 </button>
                 <button onClick={() => setChartType('line')} className={`p-1.5 rounded-md ${chartType === 'line' ? 'bg-white shadow-sm' : 'text-gray-500'}`} title="Line Chart">
                   <Activity size={16} />
                 </button>
                 {result.pieData && (
                   <button onClick={() => setChartType('pie')} className={`p-1.5 rounded-md ${chartType === 'pie' ? 'bg-white shadow-sm' : 'text-gray-500'}`} title="Pie Chart">
                     <PieIcon size={16} />
                   </button>
                 )}
              </div>
            )}
        </div>
        
        <div className="p-6 flex-1 flex flex-col w-full">
          {result ? (
            <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              
              {/* Key Metric Card */}
              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 text-center">
                <h2 className="text-4xl font-extrabold text-blue-900">
                  {result.mainValue} <small className="text-lg font-normal text-blue-600">{result.unit}</small>
                </h2>
                <p className="text-blue-700 mt-2 font-medium">{result.details}</p>
              </div>

              {/* Visualization Container */}
              <div className="grid gap-6 md:grid-cols-1">
                
                {/* 1. Main Chart Area (Dynamic based on selection) */}
                <div className="h-[300px] w-full border rounded-lg p-4 bg-white relative">
                   <p className="absolute top-2 left-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                     {chartType === 'pie' ? 'Distribution' : chartType === 'line' ? 'Trend Analysis' : 'Comparison'}
                   </p>
                   
                   <ResponsiveContainer width="100%" height="100%">
                     {chartType === 'line' ? (
                       // LINE CHART
                       <LineChart data={result.chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                         <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                         <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                         <YAxis fontSize={12} tickLine={false} axisLine={false} />
                         <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                         <Legend />
                         <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                       </LineChart>
                     ) : chartType === 'pie' && result.pieData ? (
                       // PIE CHART
                       <PieChart>
                         <Pie
                           data={result.pieData}
                           cx="50%"
                           cy="50%"
                           innerRadius={60}
                           outerRadius={80}
                           fill="#8884d8"
                           paddingAngle={5}
                           dataKey="value"
                         >
                           {result.pieData.map((entry, index) => (
                             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                           ))}
                         </Pie>
                         <Tooltip />
                         <Legend verticalAlign="bottom" height={36}/>
                       </PieChart>
                     ) : (
                       // BAR CHART (Default)
                       <BarChart data={result.chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                         <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                         <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                         <YAxis fontSize={12} tickLine={false} axisLine={false} />
                         <Tooltip 
                            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            cursor={{fill: '#f3f4f6'}} 
                         />
                         <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={50} />
                       </BarChart>
                     )}
                   </ResponsiveContainer>
                </div>

                {/* 2. Secondary Chart (Always show Pie underneath if available and not selected above) */}
                {result.pieData && chartType !== 'pie' && (
                  <div className="h-[200px] w-full border rounded-lg p-4 bg-white flex items-center justify-between">
                     <div className="w-1/3">
                        <h4 className="text-sm font-semibold text-gray-700 mb-1">Breakdown</h4>
                        <p className="text-xs text-gray-500">Visualizing the composition of the metrics.</p>
                     </div>
                     <div className="w-2/3 h-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={result.pieData}
                              cx="50%"
                              cy="50%"
                              innerRadius={40}
                              outerRadius={60}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              {result.pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                     </div>
                  </div>
                )}

              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-20">
               <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                 <Calculator className="h-8 w-8 opacity-50" />
               </div>
               <p>Enter parameters to view enhanced analytics.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialCalculator;

import { Link } from 'react-router-dom';
import { formulas } from './formulas';
import { ArrowRight } from "lucide-react";

const DashboardHome = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Financial Overview</h1>
        <p className="text-gray-500 mt-2">Select a tool to analyze your project's feasibility.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {formulas.map((tool) => (
          <div key={tool.id} className="group bg-white rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col">
            <div className="p-6 flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{tool.description}</p>
            </div>
            
            <div className="p-6 pt-0 mt-auto">
              <Link to={`/dashboard/analysis/${tool.id}`}>
                <button className="w-full inline-flex items-center justify-center rounded-lg bg-gray-100 text-gray-900 px-4 py-2 text-sm font-medium hover:bg-gray-200 transition-colors group-hover:bg-black group-hover:text-white">
                  Use Tool <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardHome;
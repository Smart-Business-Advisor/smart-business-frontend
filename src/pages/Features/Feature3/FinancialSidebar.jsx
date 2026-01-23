
import { NavLink } from 'react-router-dom';
import { formulas } from './formulas'; 
import { Calculator, LayoutDashboard } from 'lucide-react'; 
import { cn } from "../../../lib/utils"; // Shadcn utility function (لو موجودة) او شيليها واستخدمي string عادي

const FinancialSidebar = () => {
  return (
    <aside className="w-64 border-r bg-gray-50/40 hidden md:block min-h-screen">
      <div className="flex h-full max-h-screen flex-col gap-2">
        
        {/* Header simple */}
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <span className="font-semibold text-lg">Tools Menu</span>
        </div>

        {/* Navigation Links */}
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4 space-y-2 mt-4">
          
          {/* Link to Overview (Main Dashboard) */}
          <NavLink
            to="/dashboard"
            end 
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                isActive ? "bg-muted text-primary font-bold" : "text-muted-foreground"
              }`
            }
          >
            <LayoutDashboard className="h-4 w-4" />
            Overview
          </NavLink>

          <div className="my-2 border-t" /> {/* Divider */}

          {/* Dynamic Links from Formulas File */}
          {formulas.map((tool) => (
            <NavLink
              key={tool.id}
              to={`/dashboard/analysis/${tool.id}`}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                  isActive ? "bg-muted text-primary font-bold" : "text-muted-foreground"
                }`
              }
            >
              <Calculator className="h-4 w-4" />
              {tool.title}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default FinancialSidebar;

import { Outlet } from 'react-router-dom';
import { HeroHeader } from "./header";
import FooterSection from './FooterSection'; 
import FinancialSidebar from '../pages/Features/Feature3/FinancialSidebar';

const DashboardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Navbar (Fixed at top or static) */}
      {/* <HeroHeader /> */}

      {/* 2. Main Content Area (Sidebar + Dynamic Page) */}
      <div className="flex flex-1">
        
        {/* Sidebar (Left) */}
        <FinancialSidebar />

        {/* Main Page Content (Right) */}
        <main className="flex-1 bg-background p-4 lg:p-8">
          {/* Outlet is where "DashboardHome" or "FinancialCalculator" will render */}
          <Outlet />
        </main>

      </div>

      {/* 3. Footer */}
      <FooterSection />
    </div>
  );
};

export default DashboardLayout;
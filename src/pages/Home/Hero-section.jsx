import { Button } from "../../components/ui/button";
import { HeroHeader } from "../../Layout/header";
import { InfiniteSlider } from "../../components/ui/infinite-slider";
import { ProgressiveBlur } from "../../components/ui/progressive-blur";
import bg from "../../assets/bg.png";
import FooterSection from "../../Layout/FooterSection";
import { Lightbulb, Wallet, TrendingUp, ShieldAlert, Share2 } from 'lucide-react';

export default function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-x-hidden bg-zinc-50">
        <section>
          <div className="pb-6 pt-6 md:pb-16 lg:pb-24 lg:pt-24">
            <div className="relative mx-auto flex max-w-6xl flex-col px-6 lg:flex-row lg:items-center lg:justify-between">
  {/* النص */}
  <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left">
    <h1 className="mt-16 max-w-2xl text-balance text-5xl font-medium md:text-5xl lg:mt-16 xl:text-5xl">
      Welcome to Stratify
    </h1>
    <p className="mt-8 max-w-2xl text-pretty text-[20px] text-gray-600 ">
      Turn your business idea into a real success. Evaluate,
      forecast, and manage your project with smart,
      data-driven insights.
    </p>

    <div className="mt-12 flex flex-col items-center justify-center gap-2 sm:flex-row lg:justify-start">
      <Button size="lg" className="px-5 text-base">
        <a href="#link" className="text-nowrap">
          Start Now
        </a>
      </Button>
    </div>
  </div>

  {/* الصورة */}
  <img
    className="ml-auto pt-8 mx-auto rounded-2xl my-8 h-auto w-88 object-cover sm:h-80 lg:w-132 lg:h-auto"
    src={bg}
    alt="Business background"
  />
</div>

          </div>
        </section>

       <section className="bg-background pb-16 md:pb-16">
    <div className="group relative m-auto max-w-6xl px-6">
        <div className="flex flex-col items-center md:flex-row">
          
            <div className="md:max-w-44 md:border-r md:pr-6">
                <p className="text-end text-Lg">
                    Strategic Insight, Driven by AI.
                </p>
            </div>
            
            {/*  (Infinite Slider) */}
            <div className="relative py-6 md:w-[calc(100%-11rem)]">
                <InfiniteSlider speedOnHover={20} speed={40} gap={112}>

                    {/* (Idea Evaluation) */}
                    <div className="flex items-center justify-center min-w-[200px] h-10 text-center font-semibold text-lg text-gray-700 dark:text-gray-300">
                        <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" /> 
                        <span>Idea Evaluation</span>
                    </div>

                    {/* (Financial Feasibility) */}
                    <div className="flex items-center justify-center min-w-[200px] h-10 text-center font-semibold text-lg text-gray-700 dark:text-gray-300">
                        <Wallet className="w-5 h-5 mr-2 text-green-600" /> 
                        <span>Financial Feasibility</span>
                    </div>

                    {/* (Demand Forecasting) */}
                    <div className="flex items-center justify-center min-w-[200px] h-10 text-center font-semibold text-lg text-gray-700 dark:text-gray-300">
                        <TrendingUp className="w-5 h-5 mr-2 text-blue-500" /> 
                        <span>Demand Forecasting</span>
                    </div>

                    {/* (Risk Monitoring) */}
                    <div className="flex items-center justify-center min-w-[200px] h-10 text-center font-semibold text-lg text-gray-700 dark:text-gray-300">
                        <ShieldAlert className="w-5 h-5 mr-2 text-red-600" /> 
                        <span>Risk Monitoring</span>
                    </div>

                    

                </InfiniteSlider>

                {/* بقية عناصر التصميم (التدرج والضبابية) */}
                <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
                <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>

                {/* (ProgressiveBlur components here) */}

            </div>
        </div>
    </div>
</section>

      </main>

      <FooterSection/>
    </>
  );
}

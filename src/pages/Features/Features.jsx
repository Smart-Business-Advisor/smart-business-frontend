import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Lightbulb, Sparkles, DollarSign } from "lucide-react"; 
import { HeroHeader } from "../../Layout/header";
import FooterSection from "../../Layout/FooterSection";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';

export default function Features() {
  return (
    <>
      <HeroHeader />
      <section className="bg-zinc-50 py-16 md:py-32 dark:bg-transparent">
        <div className="@container mx-auto max-w-5xl px-6 ">
          <div className="text-center">
            <motion.h2
              className="text-balance text-4xl font-semibold lg:text-5xl text-center pt-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              Grow smarter with{" "}
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Stratify
              </span>
            </motion.h2>
            <p className="mt-4 text-gray-600">
              Empowering you to make better decisions
            </p>
          </div>

          <Card className="@min-4xl:max-w-full @min-4xl:grid-cols-3 @min-4xl:divide-x @min-4xl:divide-y-0 mx-auto mt-8 grid max-w-sm divide-y overflow-hidden shadow-zinc-950/5 *:text-center md:mt-16">
            {/* --- Feature 1 --- */}
            <Link to="/IdeaEvaluationForm" className="group shadow-zinc-950/5">
              <CardHeader className="pb-3">
                <CardDecorator>
                  <Lightbulb className="size-6" aria-hidden />
                </CardDecorator>
                <h3 className="mt-6 font-medium">Business Idea Evaluation</h3>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-gray-600 mb-2 pb-2">
                  Classify and assess potential business ideas based on location
                  and data trends to predict success rates.
                </p>
              </CardContent>
            </Link>

            {/* --- Feature 2 --- */}
            <Link to="/IdeaSuggestionsForm" className="group shadow-zinc-950/5">
              <CardHeader className="pb-3">
                <CardDecorator>
                  <Sparkles className="size-6" aria-hidden />
                </CardDecorator>
                <h3 className="mt-6 font-medium">
                  Business Idea Suggestions
                </h3>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-gray-600 mb-2 pb-2">
                  Enter your budget, field, and location — our AI instantly
                  suggests profitable business ideas tailored to your inputs.
                </p>
              </CardContent>
            </Link>

            {/* --- Feature 3 --- */}
            <div className="group shadow-zinc-950/5">
              <CardHeader className="pb-3">
                <CardDecorator>
                  <DollarSign className="size-6" aria-hidden />
                </CardDecorator>
                <h3 className="mt-6 font-medium">
                  Financial Mini-Feasibility Study
                </h3>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-gray-600">
                  Analyze your budget against estimated costs and receive an
                  instant AI-driven feasibility report.
                </p>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      <FooterSection />
    </>
  );
}

const CardDecorator = ({ children }) => (
  <div className="mask-radial-from-40% mask-radial-to-60% relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px] dark:opacity-50"
    />

    <div className="bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t">
      {children}
    </div>
  </div>
);

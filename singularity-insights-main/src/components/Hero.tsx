import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import BiomechanicalModel from "./BiomechanicalModel";

interface HeroProps {
  onNavigate: (id: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-card to-background" />
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute bottom-0 left-0 w-[200%] h-64 opacity-20 animate-wave"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="hsl(190 100% 50%)"
            d="M0,160L48,170.7C96,181,192,203,288,186.7C384,171,480,117,576,117.3C672,117,768,171,864,186.7C960,203,1056,181,1152,165.3C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
        <svg
          className="absolute bottom-0 left-0 w-[200%] h-48 opacity-10 animate-wave"
          style={{ animationDuration: "12s" }}
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="hsl(263 84% 58%)"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,218.7C672,235,768,245,864,234.7C960,224,1056,192,1152,181.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[120px] animate-pulse-glow" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text content */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
              <span className="text-gradient">Singularity:</span>
              <br />
              <span className="text-foreground">Bio-Mechanical Orthokinetic</span>
              <br />
              <span className="text-foreground">Measuring Belt</span>
            </h1>

            <p className="text-muted-foreground text-lg sm:text-xl max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              Bridging the biomechanical tracking gap with metal-free CNT/graphite sensors. 
              Real-time joint deformation monitoring with 200ms response time and 140° dynamic range.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={() => onNavigate("dashboard")}
                className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity glow-primary"
              >
                View Dashboard
              </button>
              <button
                onClick={() => onNavigate("live-demo")}
                className="px-8 py-3 rounded-lg glass font-semibold text-sm text-foreground hover:bg-muted/60 transition-colors"
              >
                Live Demo
              </button>
            </div>
          </motion.div>

          {/* Biomechanical Model */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-primary/5 blur-[80px] rounded-full" />
              <BiomechanicalModel size="lg" showLabels={true} showValues={true} showECG={true} showFloatingGraphs={true} />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <ArrowDown className="w-5 h-5 text-muted-foreground animate-bounce" />
      </motion.div>
    </section>
  );
}

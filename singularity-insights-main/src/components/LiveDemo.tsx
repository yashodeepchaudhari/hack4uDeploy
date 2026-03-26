import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, ChevronRight, ChevronLeft, Wifi, Activity, Cpu, TrendingDown, Zap, BarChart3 } from "lucide-react";

interface LiveDemoProps {
  open: boolean;
  onClose: () => void;
}

const slides = [
  {
    id: "intro",
    icon: Wifi,
    title: "Welcome to Hacker Logs",
    subtitle: "Wearable Biomechanical Monitoring System",
    description: "A low-cost, real-time system that captures subtle joint movements using graphene-coated flex sensors. Let's walk through how it works.",
    visual: "intro",
  },
  {
    id: "sensor",
    icon: Activity,
    title: "1D Sensor Nodes",
    subtitle: "Independent Joint Monitoring",
    description: "Each joint (Knee, Elbow, Wrist) has an independent flex sensor. When you bend a joint, the sensor deforms and its electrical resistance changes — more bending means lower resistance.",
    visual: "sensor",
  },
  {
    id: "signal",
    icon: TrendingDown,
    title: "Signal Processing",
    subtitle: "Analog to Digital Conversion",
    description: "The ESP32 microcontroller reads analog resistance values through its 12-bit ADC at high frequency. The signal shows real-time fluctuations with slight noise and hysteresis — just like a real sensor.",
    visual: "signal",
  },
  {
    id: "dashboard",
    icon: BarChart3,
    title: "Live Dashboard",
    subtitle: "Real-Time Data Visualization",
    description: "Sensor data streams to the web dashboard via WiFi. You see resistance graphs, strain levels, fatigue indicators, rep counters, and activity detection — all updating every 1.5 seconds.",
    visual: "dashboard",
  },
  {
    id: "analytics",
    icon: Zap,
    title: "Biomechanical Analytics",
    subtitle: "Insights & Injury Prevention",
    description: "The system analyzes movement patterns to detect muscle strain (Low/Medium/High), track fatigue levels, count exercise repetitions, and classify activity types — helping prevent injuries before they happen.",
    visual: "analytics",
  },
  {
    id: "architecture",
    icon: Cpu,
    title: "System Architecture",
    subtitle: "End-to-End Pipeline",
    description: "Physical Motion → Sensor Deformation → Resistance Change → ESP32 ADC Sampling → Digital Dashboard. The entire pipeline runs in real-time with minimal latency.",
    visual: "architecture",
  },
];

function AnimatedVisual({ type }: { type: string }) {
  const [values, setValues] = useState({ knee: 320, elbow: 410, wrist: 290 });

  useEffect(() => {
    const interval = setInterval(() => {
      setValues({
        knee: 250 + Math.round(Math.random() * 150),
        elbow: 320 + Math.round(Math.random() * 130),
        wrist: 220 + Math.round(Math.random() * 120),
      });
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  if (type === "intro") {
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <motion.div
          className="w-32 h-32 rounded-full border-2 border-primary/30 flex items-center justify-center"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Play className="w-8 h-8 text-primary" />
          </motion.div>
        </motion.div>
        <motion.div
          className="absolute inset-0 rounded-xl border border-primary/10"
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
    );
  }

  if (type === "sensor") {
    return (
      <div className="w-full h-full flex items-center justify-center gap-6">
        {(["Knee", "Elbow", "Wrist"] as const).map((joint, i) => {
          const val = joint === "Knee" ? values.knee : joint === "Elbow" ? values.elbow : values.wrist;
          const pct = ((val - 200) / 300) * 100;
          return (
            <motion.div
              key={joint}
              className="flex flex-col items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <div className="w-16 h-24 rounded-lg bg-muted/30 border border-border/50 relative overflow-hidden">
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary to-secondary"
                  animate={{ height: `${pct}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
              <span className="text-xs text-muted-foreground">{joint}</span>
              <motion.span
                key={val}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm font-bold text-foreground"
              >
                {val}Ω
              </motion.span>
            </motion.div>
          );
        })}
      </div>
    );
  }

  if (type === "signal") {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <svg viewBox="0 0 300 120" className="w-full h-full max-h-32">
          <motion.path
            d="M0,60 Q30,20 60,55 T120,50 T180,65 T240,45 T300,60"
            fill="none"
            stroke="hsl(190 100% 50%)"
            strokeWidth="2.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
          />
          <motion.path
            d="M0,70 Q30,40 60,65 T120,60 T180,75 T240,55 T300,70"
            fill="none"
            stroke="hsl(263 84% 58%)"
            strokeWidth="1.5"
            strokeOpacity={0.5}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 0.3 }}
          />
        </svg>
      </div>
    );
  }

  if (type === "dashboard") {
    return (
      <div className="w-full h-full grid grid-cols-3 gap-2 p-2">
        {[
          { label: "Strain", value: "Medium", color: "text-warning" },
          { label: "Fatigue", value: "42%", color: "text-primary" },
          { label: "Reps", value: "18", color: "text-success" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            className="glass rounded-lg p-3 flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.15 }}
          >
            <span className="text-[10px] text-muted-foreground">{item.label}</span>
            <span className={`text-lg font-bold ${item.color}`}>{item.value}</span>
          </motion.div>
        ))}
      </div>
    );
  }

  if (type === "analytics") {
    return (
      <div className="w-full h-full flex items-end justify-center gap-3 pb-4">
        {[65, 85, 45, 70, 55].map((h, i) => (
          <motion.div
            key={i}
            className="w-8 rounded-t-md bg-gradient-to-t from-primary to-secondary"
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ delay: i * 0.12, duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </div>
    );
  }

  // architecture
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex items-center gap-2">
        {["Motion", "Sensor", "ADC", "WiFi", "UI"].map((step, i) => (
          <motion.div key={step} className="flex items-center gap-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.25 }}
          >
            <div className="px-2 py-1 rounded bg-primary/10 border border-primary/20 text-[10px] text-primary font-medium">
              {step}
            </div>
            {i < 4 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.25 + 0.15 }}
              >
                <ChevronRight className="w-3 h-3 text-primary/40" />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function LiveDemo({ open, onClose }: LiveDemoProps) {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!open) {
      setCurrent(0);
      setAutoPlay(true);
      return;
    }
    if (!autoPlay) return;
    const timer = setTimeout(() => {
      if (current < slides.length - 1) {
        setCurrent((c) => c + 1);
      } else {
        setAutoPlay(false);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [current, open, autoPlay]);

  const next = useCallback(() => {
    setAutoPlay(false);
    setCurrent((c) => Math.min(c + 1, slides.length - 1));
  }, []);

  const prev = useCallback(() => {
    setAutoPlay(false);
    setCurrent((c) => Math.max(c - 1, 0));
  }, []);

  const slide = slides[current];
  const Icon = slide.icon;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={onClose} />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-3xl mx-4 glass-strong rounded-2xl overflow-hidden"
            initial={{ scale: 0.9, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/30">
              <div className="flex items-center gap-2">
                <Play className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-foreground">Live Demo Walkthrough</span>
                {autoPlay && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                    Auto-playing
                  </span>
                )}
              </div>
              <button onClick={onClose} className="p-1 rounded-md hover:bg-muted/50 transition-colors">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.35 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {/* Text */}
                  <div className="flex flex-col justify-center">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-1">{slide.title}</h3>
                    <p className="text-sm text-primary font-medium mb-3">{slide.subtitle}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{slide.description}</p>
                  </div>

                  {/* Visual */}
                  <div className="h-48 rounded-xl bg-muted/20 border border-border/30 overflow-hidden">
                    <AnimatedVisual type={slide.visual} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-4 border-t border-border/30">
              {/* Dots */}
              <div className="flex items-center gap-1.5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => { setAutoPlay(false); setCurrent(i); }}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === current ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>

              {/* Nav */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  disabled={current === 0}
                  className="p-2 rounded-lg glass hover:bg-muted/50 disabled:opacity-30 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-foreground" />
                </button>
                <span className="text-xs text-muted-foreground w-12 text-center">
                  {current + 1} / {slides.length}
                </span>
                <button
                  onClick={next}
                  disabled={current === slides.length - 1}
                  className="p-2 rounded-lg glass hover:bg-muted/50 disabled:opacity-30 transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-foreground" />
                </button>
              </div>
            </div>

            {/* Auto-play progress bar */}
            {autoPlay && (
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "linear" }}
                key={current}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

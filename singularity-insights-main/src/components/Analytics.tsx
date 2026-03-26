import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, LineChart, Line,
} from "recharts";
import { Activity, TrendingUp, Zap } from "lucide-react";
import type { SensorReading, GraphPoint } from "@/hooks/useSensorData";

interface AnalyticsProps {
  data: SensorReading;
  graphData: GraphPoint[];
  strainLevel: "Low" | "Medium" | "High";
  fatiguePercent: number;
}

const strainColors = { Low: "bg-success", Medium: "bg-warning", High: "bg-destructive" };
const strainText = { Low: "text-success", Medium: "text-warning", High: "text-destructive" };

const card = "glass rounded-xl p-5";

export default function Analytics({ data, graphData, strainLevel, fatiguePercent }: AnalyticsProps) {
  const jointData = [
    { joint: "Knee", value: data.knee, color: "hsl(142 71% 45%)" },
    { joint: "Elbow", value: data.elbow, color: "hsl(48 96% 53%)" },
    { joint: "Wrist", value: data.wrist, color: "hsl(25 95% 53%)" },
  ];

  const intensityData = [
    { level: "Low", value: Math.max(2, Math.round((500 - data.wrist) / 50)) },
    { level: "Moderate", value: Math.max(3, Math.round((500 - data.elbow) / 40)) },
    { level: "High", value: Math.max(1, Math.round((500 - data.knee) / 35)) },
  ];

  const tooltipStyle = {
    backgroundColor: "hsl(222 40% 8%)",
    border: "1px solid hsl(222 30% 18%)",
    borderRadius: "8px",
    color: "hsl(210 40% 92%)",
    fontSize: 12,
  };

  return (
    <section id="analytics" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-2 text-foreground">Real-Time Biomechanical Analytics</h2>
        <p className="text-muted-foreground mb-8">Comprehensive sensor analysis and trends</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main resistance chart */}
        <motion.div
          className={`${card} lg:col-span-2`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-primary" />
            Resistance (Ω) vs. Time (s)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={graphData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" />
                <XAxis dataKey="time" stroke="hsl(215 20% 40%)" tick={{ fontSize: 11 }} />
                <YAxis stroke="hsl(215 20% 40%)" tick={{ fontSize: 11 }} domain={[200, 500]} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="resistance"
                  stroke="hsl(190 100% 50%)"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Side metrics */}
        <div className="space-y-5">
          <motion.div className={card} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <h3 className="text-sm text-muted-foreground mb-2">Muscle Strain Level</h3>
            <div className={`inline-block px-4 py-1.5 rounded-md text-sm font-bold ${strainColors[strainLevel]} ${strainLevel === "High" ? "text-foreground" : "text-primary-foreground"}`}>
              {strainLevel}
            </div>
          </motion.div>

          <motion.div className={card} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <h3 className="text-sm text-muted-foreground mb-2">Fatigue Level</h3>
            <div className="flex gap-1">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-4 h-7 rounded-sm transition-colors duration-300 ${
                    i < Math.round(fatiguePercent / 12.5)
                      ? i < 3 ? "bg-success" : i < 6 ? "bg-warning" : "bg-destructive"
                      : "bg-muted/40"
                  }`}
                />
              ))}
            </div>
          </motion.div>

          <motion.div className={card} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <h3 className="text-sm text-muted-foreground mb-1">Activity Type</h3>
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              <span className="text-lg font-bold text-foreground capitalize">{data.activity}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-5">
        <motion.div
          className={`${card} lg:col-span-1`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
            <Zap className="w-4 h-4 text-secondary" />
            Joint Strain Levels
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={jointData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" />
                <XAxis dataKey="joint" stroke="hsl(215 20% 40%)" tick={{ fontSize: 12 }} />
                <YAxis stroke="hsl(215 20% 40%)" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {jointData.map((entry, idx) => (
                    <motion.rect key={idx} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          className={`${card} flex flex-col items-center justify-center`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <span className="text-sm text-muted-foreground mb-2">Reps Counter</span>
          <motion.span
            key={data.reps}
            initial={{ scale: 1.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-6xl font-black text-foreground"
          >
            {data.reps}
          </motion.span>
        </motion.div>

        <motion.div
          className={card}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            Movement Intensity
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={intensityData}>
                <defs>
                  <linearGradient id="analyticsIntensity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(263 84% 58%)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="hsl(190 100% 50%)" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" />
                <XAxis dataKey="level" stroke="hsl(215 20% 40%)" tick={{ fontSize: 12 }} />
                <YAxis stroke="hsl(215 20% 40%)" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="value" stroke="hsl(263 84% 58%)" strokeWidth={2} fill="url(#analyticsIntensity)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

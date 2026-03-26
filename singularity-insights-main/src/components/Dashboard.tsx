import { motion } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, AreaChart, Area,
} from "recharts";
import { Activity, Zap, Hash, Dumbbell } from "lucide-react";
import type { SensorReading, GraphPoint } from "@/hooks/useSensorData";

interface DashboardProps {
  data: SensorReading;
  graphData: GraphPoint[];
  strainLevel: "Low" | "Medium" | "High";
  fatiguePercent: number;
}

const strainColors = { Low: "text-success", Medium: "text-warning", High: "text-destructive" };
const strainBg = { Low: "bg-success", Medium: "bg-warning", High: "bg-destructive" };
const strainWidth = { Low: "33%", Medium: "66%", High: "100%" };

const activityIcons = {
  walking: Activity,
  running: Zap,
  exercise: Dumbbell,
};

const card = "glass rounded-xl p-5";

function FatigueBattery({ percent }: { percent: number }) {
  const color =
    percent < 30 ? "from-success to-success" :
    percent < 60 ? "from-success via-warning to-warning" :
    "from-warning via-orange to-destructive";
  return (
    <div className="flex items-center gap-2">
      <div className="relative w-full h-7 rounded-md bg-muted/50 overflow-hidden border border-border/50">
        <motion.div
          className={`absolute inset-y-0 left-0 rounded-md bg-gradient-to-r ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-foreground">
          {percent}%
        </div>
      </div>
      <div className="w-2.5 h-4 rounded-r-sm bg-muted-foreground/30" />
    </div>
  );
}

export default function Dashboard({ data, graphData, strainLevel, fatiguePercent }: DashboardProps) {
  const ActivityIcon = activityIcons[data.activity];

  const jointData = [
    { joint: "Knee", value: data.knee },
    { joint: "Elbow", value: data.elbow },
    { joint: "Wrist", value: data.wrist },
  ];

  // Movement intensity data derived from sensor data
  const intensityData = [
    { level: "Low", value: Math.max(2, Math.round((500 - data.wrist) / 50)) },
    { level: "Moderate", value: Math.max(3, Math.round((500 - data.elbow) / 40)) },
    { level: "High", value: Math.max(1, Math.round((500 - data.knee) / 35)) },
  ];

  return (
    <section id="dashboard" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-2 text-foreground">Live Dashboard</h2>
        <p className="text-muted-foreground mb-8">Real-time biomechanical sensor data</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main Chart - spans 2 cols */}
        <motion.div
          className={`${card} lg:col-span-2`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            Resistance (Ω) vs. Time (s)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={graphData}>
                <defs>
                  <linearGradient id="resistanceGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(190 100% 50%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(190 100% 50%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="strokeGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="hsl(190 100% 50%)" />
                    <stop offset="100%" stopColor="hsl(263 84% 58%)" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" />
                <XAxis dataKey="time" stroke="hsl(215 20% 40%)" tick={{ fontSize: 11 }} />
                <YAxis stroke="hsl(215 20% 40%)" tick={{ fontSize: 11 }} domain={[200, 500]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(222 40% 8%)",
                    border: "1px solid hsl(222 30% 18%)",
                    borderRadius: "8px",
                    color: "hsl(210 40% 92%)",
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="resistance"
                  stroke="url(#strokeGrad)"
                  strokeWidth={2.5}
                  fill="url(#resistanceGrad)"
                  dot={false}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Side panels */}
        <div className="space-y-5">
          {/* Strain */}
          <motion.div
            className={card}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Muscle Strain Level</h3>
            <span className={`text-2xl font-bold ${strainColors[strainLevel]}`}>{strainLevel}</span>
            <div className="mt-3 h-2.5 rounded-full bg-muted/50 overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${strainBg[strainLevel]}`}
                animate={{ width: strainWidth[strainLevel] }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </motion.div>

          {/* Fatigue */}
          <motion.div
            className={card}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <h3 className="text-sm font-semibold text-muted-foreground mb-3">Fatigue Level</h3>
            <FatigueBattery percent={fatiguePercent} />
          </motion.div>

          {/* Activity */}
          <motion.div
            className={card}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
          >
            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Activity Type</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <ActivityIcon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-xl font-bold text-foreground capitalize">{data.activity}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
        {/* Rep counter */}
        <motion.div
          className={`${card} flex flex-col items-center justify-center`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Hash className="w-5 h-5 text-primary mb-2" />
          <span className="text-sm text-muted-foreground">Reps Counter</span>
          <motion.span
            key={data.reps}
            initial={{ scale: 1.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-5xl font-black text-foreground mt-1"
          >
            {data.reps}
          </motion.span>
        </motion.div>

        {/* Joint cards */}
        {jointData.map((j, i) => (
          <motion.div
            key={j.joint}
            className={card}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
          >
            <span className="text-sm text-muted-foreground">{j.joint}</span>
            <div className="flex items-baseline gap-1 mt-1">
              <motion.span
                key={j.value}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-3xl font-bold text-foreground"
              >
                {j.value}
              </motion.span>
              <span className="text-sm text-muted-foreground">Ω</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-muted/50 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                animate={{ width: `${((j.value - 200) / 300) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
        {/* Joint Strain Levels */}
        <motion.div
          className={card}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-secondary" />
            Joint Strain Levels
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={jointData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" />
                <XAxis dataKey="joint" stroke="hsl(215 20% 40%)" tick={{ fontSize: 12 }} />
                <YAxis stroke="hsl(215 20% 40%)" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(222 40% 8%)",
                    border: "1px solid hsl(222 30% 18%)",
                    borderRadius: "8px",
                    color: "hsl(210 40% 92%)",
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {jointData.map((_, index) => (
                    <motion.rect
                      key={index}
                      fill={["hsl(142 71% 45%)", "hsl(48 96% 53%)", "hsl(25 95% 53%)"][index]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Movement Intensity */}
        <motion.div
          className={card}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            Movement Intensity
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={intensityData}>
                <defs>
                  <linearGradient id="intensityGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(263 84% 58%)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="hsl(263 84% 58%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" />
                <XAxis dataKey="level" stroke="hsl(215 20% 40%)" tick={{ fontSize: 12 }} />
                <YAxis stroke="hsl(215 20% 40%)" tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(222 40% 8%)",
                    border: "1px solid hsl(222 30% 18%)",
                    borderRadius: "8px",
                    color: "hsl(210 40% 92%)",
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(263 84% 58%)"
                  strokeWidth={2}
                  fill="url(#intensityGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

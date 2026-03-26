import { motion } from "framer-motion";
import { 
  Move, Waves, TrendingDown, Cpu, Monitor, 
  ArrowRight, Activity 
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import type { SensorReading, GraphPoint } from "@/hooks/useSensorData";
import BiomechanicalModel from "./BiomechanicalModel";

interface SensorModelProps {
  data: SensorReading;
  graphData: GraphPoint[];
}

const steps = [
  { icon: Move, label: "Joint Motion", desc: "Physical bending activates point sensors on joints" },
  { icon: Waves, label: "Sensor Bend", desc: "Graphene sensor deforms under mechanical strain" },
  { icon: TrendingDown, label: "Resistance Change", desc: "Bending decreases resistance — inverse correlation" },
  { icon: Cpu, label: "ESP32 ADC", desc: "12-bit ADC samples analog signal at 100+ Hz" },
  { icon: Monitor, label: "Digital Dashboard", desc: "Real-time data streamed to web interface" },
];

const card = "glass rounded-xl p-5";

export default function SensorModel({ data, graphData }: SensorModelProps) {
  return (
    <section id="sensor-model" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-2 text-foreground">1D Sensor Model</h2>
        <p className="text-muted-foreground mb-10">
          Each joint is an independent 1D sensor node — scalar resistance values mapped in real-time
        </p>
      </motion.div>

      {/* Flow pipeline */}
      <motion.div
        className={`${card} mb-8`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-2">
          {steps.map((step, i) => (
            <div key={step.label} className="flex items-center gap-2 lg:gap-3">
              <motion.div
                className="flex flex-col items-center text-center min-w-[100px]"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 * i, duration: 0.4 }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-2 glow-primary">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xs font-semibold text-foreground">{step.label}</span>
                <span className="text-[10px] text-muted-foreground mt-0.5 max-w-[120px] leading-tight">
                  {step.desc}
                </span>
              </motion.div>
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 * i + 0.1 }}
                >
                  <ArrowRight className="w-5 h-5 text-primary/60 hidden lg:block" />
                  <ArrowRight className="w-5 h-5 text-primary/60 rotate-90 lg:hidden" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Biomechanical Model + Explanation side by side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        {/* Biomechanical Model */}
        <motion.div
          className={`${card} flex flex-col items-center justify-center`}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <span className="text-[10px] uppercase tracking-widest text-primary/60 mb-2 font-semibold">
            Joint Resistance Tracking
          </span>
          <BiomechanicalModel data={data} size="md" showLabels={true} showValues={true} showECG={false} showFloatingGraphs={false} />
        </motion.div>

        {/* Explanation */}
        <motion.div
          className={`${card} lg:col-span-2 flex flex-col justify-center`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-lg font-bold text-foreground mb-3">How It Works</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            As a joint bends, the graphene-coated flex sensor deforms. This deformation
            changes the sensor's electrical resistance — <span className="text-primary font-medium">more bending = lower resistance</span>.
            The ESP32 microcontroller reads this analog signal through its ADC (Analog-to-Digital Converter),
            converts it to a digital value, and streams it to the dashboard via WiFi in real-time.
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Knee", value: data.knee, color: "text-success" },
              { label: "Elbow", value: data.elbow, color: "text-warning" },
              { label: "Wrist", value: data.wrist, color: "text-orange" },
            ].map((joint) => (
              <div key={joint.label} className="rounded-lg bg-muted/30 p-3 text-center">
                <span className="text-xs text-muted-foreground block">{joint.label}</span>
                <motion.span
                  key={joint.value}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-xl font-bold ${joint.color} block`}
                >
                  {joint.value}<span className="text-xs text-muted-foreground">Ω</span>
                </motion.span>
                <div className="mt-1 h-1 rounded-full bg-muted/50 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                    animate={{ width: `${((joint.value - 200) / 300) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Live signal + metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Live resistance signal */}
        <motion.div
          className={`${card} lg:col-span-2`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-primary" />
            Live Resistance Signal
          </h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={graphData}>
                <defs>
                  <linearGradient id="sensorLineGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="hsl(190 100% 50%)" />
                    <stop offset="100%" stopColor="hsl(263 84% 58%)" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 30% 18%)" />
                <XAxis
                  dataKey="time"
                  stroke="hsl(215 20% 40%)"
                  tick={{ fontSize: 11 }}
                  label={{ value: "Time (s)", position: "insideBottom", offset: -2, style: { fill: "hsl(215 20% 55%)", fontSize: 10 } }}
                />
                <YAxis
                  stroke="hsl(215 20% 40%)"
                  tick={{ fontSize: 11 }}
                  domain={[200, 500]}
                  label={{ value: "Resistance (Ω)", angle: -90, position: "insideLeft", style: { fill: "hsl(215 20% 55%)", fontSize: 10 } }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(222 40% 8%)",
                    border: "1px solid hsl(222 30% 18%)",
                    borderRadius: "8px",
                    color: "hsl(210 40% 92%)",
                    fontSize: 12,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="resistance"
                  stroke="url(#sensorLineGrad)"
                  strokeWidth={2.5}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Side metrics */}
        <div className="space-y-5">
          <motion.div
            className={card}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Avg. Resistance</span>
              <motion.span
                key={Math.round((data.knee + data.elbow + data.wrist) / 3)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-3xl font-black text-foreground"
              >
                {Math.round((data.knee + data.elbow + data.wrist) / 3)}
              </motion.span>
            </div>
            <span className="text-xs text-muted-foreground">Ω (Ohms)</span>
          </motion.div>

          <motion.div
            className={`${card} text-center`}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Repetitions</span>
            <motion.div
              key={data.reps}
              initial={{ scale: 1.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-5xl font-black text-primary mt-1"
            >
              {data.reps}
            </motion.div>
          </motion.div>

          <motion.div
            className={card}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Sensor Status</span>
            <div className="mt-2 space-y-1.5">
              {["Knee", "Elbow", "Wrist"].map((j) => (
                <div key={j} className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{j}</span>
                  <span className="flex items-center gap-1.5 text-success font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                    Active
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

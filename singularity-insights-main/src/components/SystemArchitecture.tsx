import { motion } from "framer-motion";
import {
  Move, Radio, TrendingDown, Cpu, Monitor, Wifi, PlugZap, BarChart3,
  ArrowRight,
} from "lucide-react";
import BiomechanicalModel from "./BiomechanicalModel";
import type { SensorReading } from "@/hooks/useSensorData";

interface SystemArchitectureProps {
  data?: SensorReading;
}

const steps = [
  { icon: Move, label: "Physical Motion", desc: "Joint bending detected" },
  { icon: Radio, label: "Sensor Deformation", desc: "Flex sensor responds" },
  { icon: TrendingDown, label: "Resistance Change", desc: "Ohmic value shifts" },
  { icon: Cpu, label: "ESP32 Module", desc: "ADC sampling at 10-bit" },
  { icon: Monitor, label: "Digital Dashboard", desc: "Real-time visualization" },
];

export default function SystemArchitecture({ data }: SystemArchitectureProps) {
  return (
    <section id="system" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-2 text-foreground">System Architecture</h2>
        <p className="text-muted-foreground mb-12">End-to-end data flow from sensor to dashboard</p>
      </motion.div>

      {/* Flow diagram */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-2 mb-16">
        {steps.map((step, i) => (
          <motion.div
            key={step.label}
            className="flex items-center gap-2 lg:gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.12 }}
          >
            <div className="glass rounded-xl p-5 flex flex-col items-center text-center min-w-[140px] glow-primary hover:scale-105 transition-transform">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                <step.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm font-semibold text-foreground">{step.label}</span>
              <span className="text-xs text-muted-foreground mt-1">{step.desc}</span>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className="w-5 h-5 text-primary hidden lg:block flex-shrink-0" />
            )}
          </motion.div>
        ))}
      </div>

      {/* Model + Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Biomechanical Model */}
        <motion.div
          className="glass rounded-xl p-6 flex flex-col items-center justify-center"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[10px] uppercase tracking-widest text-primary/60 mb-3 font-semibold">
            Live Signal Model
          </span>
          <BiomechanicalModel data={data} size="sm" showLabels={false} showValues={true} showECG={false} showFloatingGraphs={false} />
        </motion.div>

        {/* Tech details */}
        <motion.div
          className="glass rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="text-sm font-semibold text-muted-foreground mb-4">Sensor Pipeline</h3>
          <div className="space-y-3">
            {[
              { label: "Sensor Type", value: "Graphene Flex", color: "text-primary" },
              { label: "Resolution", value: "12-bit ADC", color: "text-primary" },
              { label: "Protocol", value: "WiFi / Serial", color: "text-primary" },
              { label: "Sample Rate", value: "100 Hz", color: "text-primary" },
              { label: "Joints Tracked", value: "3 (1D Nodes)", color: "text-primary" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between p-2 rounded-lg bg-muted/20">
                <span className="text-xs text-muted-foreground">{item.label}</span>
                <span className={`text-xs font-semibold ${item.color}`}>{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* System status */}
        <motion.div
          className="glass rounded-xl p-6"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-sm font-semibold text-muted-foreground mb-4">System Status</h3>
          <div className="space-y-3">
            {[
              { icon: Wifi, label: "WiFi Connection", status: "Connected", color: "text-success" },
              { icon: PlugZap, label: "Serial Connection", status: "Active (COM3)", color: "text-primary" },
              { icon: BarChart3, label: "Data Rate", status: "115200 bps", color: "text-primary" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <s.icon className={`w-4 h-4 ${s.color}`} />
                <div className="flex-1">
                  <span className="text-xs text-muted-foreground block">{s.label}</span>
                  <span className={`text-sm font-semibold ${s.color}`}>{s.status}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground text-center">
              Team: Hacker Logs • Umed, Ridhlesh, Lokesh, Yashodeep, Mayur
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

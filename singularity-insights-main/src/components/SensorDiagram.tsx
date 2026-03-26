import { motion } from "framer-motion";
import type { SensorReading } from "@/hooks/useSensorData";

interface SensorDiagramProps {
  data?: SensorReading;
  size?: "sm" | "md" | "lg";
  showLabels?: boolean;
  showValues?: boolean;
  className?: string;
}

/**
 * 1D Sensor Node Diagram — a schematic stick-figure showing 3 sensor
 * placement points (wrist, elbow, knee) with animated glow and live values.
 * NOT a realistic human model — just a clean node diagram.
 */
export default function SensorDiagram({
  data,
  size = "md",
  showLabels = true,
  showValues = true,
  className = "",
}: SensorDiagramProps) {
  const dims = size === "sm" ? { w: 160, h: 280 } : size === "lg" ? { w: 280, h: 480 } : { w: 220, h: 380 };
  const nodeR = size === "sm" ? 6 : size === "lg" ? 10 : 8;
  const strokeW = size === "sm" ? 2 : size === "lg" ? 3 : 2.5;
  const fontSize = size === "sm" ? 8 : size === "lg" ? 12 : 10;
  const valueFontSize = size === "sm" ? 7 : size === "lg" ? 11 : 9;

  const cx = dims.w / 2;

  // Node positions (relative to SVG viewBox)
  const head = { x: cx, y: 30 };
  const shoulder = { x: cx, y: 70 };
  const hip = { x: cx, y: 180 };

  // Arms
  const elbowL = { x: cx - 55, y: 120 };
  const elbowR = { x: cx + 55, y: 120 };
  const wristL = { x: cx - 75, y: 170 };
  const wristR = { x: cx + 75, y: 170 };

  // Legs
  const kneeL = { x: cx - 30, y: 260 };
  const kneeR = { x: cx + 30, y: 260 };
  const footL = { x: cx - 40, y: 340 };
  const footR = { x: cx + 40, y: 340 };

  // Sensor points with data
  const sensorNodes = [
    { pos: elbowR, label: "Elbow", value: data?.elbow ?? 410, color: "hsl(48, 96%, 53%)" },
    { pos: wristR, label: "Wrist", value: data?.wrist ?? 290, color: "hsl(25, 95%, 53%)" },
    { pos: kneeR, label: "Knee", value: data?.knee ?? 320, color: "hsl(142, 71%, 45%)" },
  ];

  // Calculate intensity for glow (lower resistance = more glow)
  const getGlowRadius = (val: number) => {
    const intensity = Math.max(0, (500 - val) / 300);
    return 8 + intensity * 12;
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        viewBox={`0 0 ${dims.w} ${dims.h}`}
        width={dims.w}
        height={dims.h}
        className="drop-shadow-lg"
      >
        <defs>
          <filter id="sensorGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(190, 100%, 50%)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(263, 84%, 58%)" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Body skeleton lines */}
        <g stroke="url(#bodyGrad)" strokeWidth={strokeW} fill="none" strokeLinecap="round" strokeLinejoin="round" opacity={0.7}>
          {/* Spine */}
          <line x1={head.x} y1={head.y + 15} x2={shoulder.x} y2={shoulder.y} />
          <line x1={shoulder.x} y1={shoulder.y} x2={hip.x} y2={hip.y} />

          {/* Left arm */}
          <line x1={shoulder.x} y1={shoulder.y} x2={elbowL.x} y2={elbowL.y} />
          <line x1={elbowL.x} y1={elbowL.y} x2={wristL.x} y2={wristL.y} />

          {/* Right arm */}
          <line x1={shoulder.x} y1={shoulder.y} x2={elbowR.x} y2={elbowR.y} />
          <line x1={elbowR.x} y1={elbowR.y} x2={wristR.x} y2={wristR.y} />

          {/* Left leg */}
          <line x1={hip.x} y1={hip.y} x2={kneeL.x} y2={kneeL.y} />
          <line x1={kneeL.x} y1={kneeL.y} x2={footL.x} y2={footL.y} />

          {/* Right leg */}
          <line x1={hip.x} y1={hip.y} x2={kneeR.x} y2={kneeR.y} />
          <line x1={kneeR.x} y1={kneeR.y} x2={footR.x} y2={footR.y} />
        </g>

        {/* Head */}
        <circle cx={head.x} cy={head.y} r={12} fill="none" stroke="url(#bodyGrad)" strokeWidth={strokeW} opacity={0.7} />

        {/* Passive joint dots */}
        {[shoulder, hip, elbowL, wristL, kneeL, footL, footR].map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={3} fill="hsl(215, 20%, 40%)" opacity={0.5} />
        ))}

        {/* Sensor nodes with animated glow */}
        {sensorNodes.map((node, i) => (
          <g key={node.label}>
            {/* Glow ring */}
            <motion.circle
              cx={node.pos.x}
              cy={node.pos.y}
              r={getGlowRadius(node.value)}
              fill={node.color}
              opacity={0.15}
              animate={{
                r: [getGlowRadius(node.value), getGlowRadius(node.value) + 4, getGlowRadius(node.value)],
                opacity: [0.1, 0.25, 0.1],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
            />

            {/* Sensor dot */}
            <motion.circle
              cx={node.pos.x}
              cy={node.pos.y}
              r={nodeR}
              fill={node.color}
              filter="url(#sensorGlow)"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
              style={{ transformOrigin: `${node.pos.x}px ${node.pos.y}px` }}
            />

            {/* Inner bright dot */}
            <circle cx={node.pos.x} cy={node.pos.y} r={nodeR * 0.4} fill="white" opacity={0.8} />

            {/* Label + Value */}
            {showLabels && (
              <text
                x={node.pos.x + nodeR + 10}
                y={node.pos.y - 4}
                fill={node.color}
                fontSize={fontSize}
                fontWeight="600"
                fontFamily="Inter, sans-serif"
              >
                {node.label}
              </text>
            )}
            {showValues && (
              <text
                x={node.pos.x + nodeR + 10}
                y={node.pos.y + (showLabels ? 10 : 4)}
                fill="hsl(215, 20%, 55%)"
                fontSize={valueFontSize}
                fontFamily="Inter, sans-serif"
              >
                {node.value}Ω
              </text>
            )}
          </g>
        ))}

        {/* Dashed connection lines from sensor to label area */}
        {sensorNodes.map((node) => (
          <line
            key={`line-${node.label}`}
            x1={node.pos.x + nodeR}
            y1={node.pos.y}
            x2={node.pos.x + nodeR + 8}
            y2={node.pos.y}
            stroke={node.color}
            strokeWidth={1}
            strokeDasharray="2 2"
            opacity={0.5}
          />
        ))}
      </svg>
    </div>
  );
}

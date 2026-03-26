import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import type { SensorReading } from "@/hooks/useSensorData";

interface BiomechanicalModelProps {
  data?: SensorReading;
  size?: "sm" | "md" | "lg";
  showLabels?: boolean;
  showValues?: boolean;
  showECG?: boolean;
  showFloatingGraphs?: boolean;
  className?: string;
}

// Realistic human silhouette path (athletic, slightly 3/4 view)
const SILHOUETTE_PATH = `
M 150,28 
C 150,12 162,2 175,2 C 188,2 200,12 200,28 C 200,44 188,56 175,56 C 162,56 150,44 150,28 Z
M 175,56 
L 175,68
C 155,72 138,82 130,95
L 118,130 L 105,165
C 148,78 148,78 148,78
M 175,68
C 195,72 212,82 220,95
L 232,130 L 245,165
M 175,68
L 178,95 L 182,130 L 185,165
C 188,175 190,185 192,200
L 195,230
C 193,235 188,235 185,230
L 180,200
C 178,195 175,195 172,200
L 165,230
C 162,235 157,235 155,230
L 158,200
C 160,185 162,175 165,165
L 168,130 L 172,95
Z
`;

// Joint positions in the SVG coordinate space (350x350 viewBox)
const JOINTS = {
  shoulderL: { x: 130, y: 78, label: "L.Shoulder" },
  shoulderR: { x: 220, y: 78, label: "R.Shoulder" },
  elbowL: { x: 112, y: 120, label: "L.Elbow" },
  elbowR: { x: 238, y: 120, label: "R.Elbow" },
  wristL: { x: 98, y: 162, label: "L.Wrist" },
  wristR: { x: 252, y: 162, label: "R.Wrist" },
  hipL: { x: 155, y: 195, label: "L.Hip" },
  hipR: { x: 195, y: 195, label: "R.Hip" },
  kneeL: { x: 148, y: 255, label: "L.Knee" },
  kneeR: { x: 202, y: 255, label: "R.Knee" },
  ankleL: { x: 142, y: 315, label: "L.Ankle" },
  ankleR: { x: 208, y: 315, label: "R.Ankle" },
};

// Skeletal connections between joints
const BONES: [keyof typeof JOINTS, keyof typeof JOINTS][] = [
  ["shoulderL", "shoulderR"],
  ["shoulderL", "elbowL"],
  ["elbowL", "wristL"],
  ["shoulderR", "elbowR"],
  ["elbowR", "wristR"],
  ["shoulderL", "hipL"],
  ["shoulderR", "hipR"],
  ["hipL", "hipR"],
  ["hipL", "kneeL"],
  ["kneeL", "ankleL"],
  ["hipR", "kneeR"],
  ["kneeR", "ankleR"],
];

// Sensor data joints with resistance values
const SENSOR_JOINTS = [
  { key: "elbowR" as keyof typeof JOINTS, dataKey: "elbow" as keyof SensorReading, color: "hsl(48, 96%, 53%)" },
  { key: "wristR" as keyof typeof JOINTS, dataKey: "wrist" as keyof SensorReading, color: "hsl(25, 95%, 53%)" },
  { key: "kneeR" as keyof typeof JOINTS, dataKey: "knee" as keyof SensorReading, color: "hsl(142, 71%, 45%)" },
];

// Generate ECG-style waveform
function generateECGPath(startX: number, startY: number, width: number, height: number, phase: number): string {
  const points: string[] = [];
  const steps = 60;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = startX + t * width;
    let y = startY;
    const p = (t * 4 + phase) % 1;
    if (p > 0.35 && p < 0.4) y = startY - height * 0.3;
    else if (p > 0.4 && p < 0.42) y = startY - height * 1.0;
    else if (p > 0.42 && p < 0.45) y = startY + height * 0.4;
    else if (p > 0.45 && p < 0.48) y = startY - height * 0.15;
    else y = startY + Math.sin(t * 20 + phase * 10) * height * 0.05;
    points.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return points.join(" ");
}

// Mini floating graph
function generateMiniGraph(phase: number): number[] {
  const pts: number[] = [];
  for (let i = 0; i < 12; i++) {
    pts.push(Math.sin(i * 0.8 + phase) * 0.4 + 0.5 + Math.sin(i * 1.7 + phase * 2) * 0.15);
  }
  return pts;
}

export default function BiomechanicalModel({
  data,
  size = "md",
  showLabels = true,
  showValues = true,
  showECG = true,
  showFloatingGraphs = true,
  className = "",
}: BiomechanicalModelProps) {
  const [breathPhase, setBreathPhase] = useState(0);
  const [signalPhase, setSignalPhase] = useState(0);
  const [pulseNodes, setPulseNodes] = useState<number[]>([]);

  // Breathing + signal animation
  useEffect(() => {
    let frame = 0;
    const id = setInterval(() => {
      frame++;
      setBreathPhase(Math.sin(frame * 0.03) * 0.015);
      setSignalPhase(frame * 0.02);
      // Random pulse through joints
      if (frame % 8 === 0) {
        setPulseNodes([Math.floor(Math.random() * Object.keys(JOINTS).length)]);
      }
    }, 50);
    return () => clearInterval(id);
  }, []);

  const dims = size === "sm" ? { w: 200, h: 340 } : size === "lg" ? { w: 380, h: 420 } : { w: 300, h: 380 };

  const sensorValues = useMemo(() => ({
    elbow: data?.elbow ?? 410,
    wrist: data?.wrist ?? 290,
    knee: data?.knee ?? 320,
  }), [data?.elbow, data?.wrist, data?.knee]);

  const getStrainPercent = (val: number) => Math.round(((500 - val) / 300) * 100);
  const getFatigueLevel = (val: number) => val < 300 ? "High" : val < 380 ? "Med" : "Low";

  const ecgPath = useMemo(() => generateECGPath(60, 340, 230, 18, signalPhase), [signalPhase]);
  const miniGraphData = useMemo(() => generateMiniGraph(signalPhase), [signalPhase]);

  const jointEntries = Object.entries(JOINTS);

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 350 380"
        width={dims.w}
        height={dims.h}
        className="drop-shadow-2xl"
        style={{ filter: "drop-shadow(0 0 30px hsla(190, 100%, 50%, 0.15))" }}
      >
        <defs>
          {/* Body silhouette gradient */}
          <linearGradient id="bodyFill" x1="0" y1="0" x2="0.3" y2="1">
            <stop offset="0%" stopColor="hsl(210, 60%, 25%)" stopOpacity="0.9" />
            <stop offset="50%" stopColor="hsl(220, 50%, 18%)" stopOpacity="0.85" />
            <stop offset="100%" stopColor="hsl(230, 40%, 12%)" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="bodyStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="hsl(190, 100%, 50%)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(263, 84%, 58%)" stopOpacity="0.4" />
          </linearGradient>
          {/* Joint glow filter */}
          <filter id="jointGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Signal flow gradient */}
          <linearGradient id="signalGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(190, 100%, 50%)" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(190, 100%, 60%)" stopOpacity="1" />
            <stop offset="100%" stopColor="hsl(263, 84%, 58%)" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="ecgGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="hsl(190, 100%, 50%)" stopOpacity="0.3" />
            <stop offset="50%" stopColor="hsl(142, 71%, 45%)" stopOpacity="0.8" />
            <stop offset="100%" stopColor="hsl(190, 100%, 50%)" stopOpacity="0.3" />
          </linearGradient>
          {/* Muscle definition pattern */}
          <radialGradient id="muscleHighlight" cx="0.5" cy="0.3" r="0.7">
            <stop offset="0%" stopColor="hsl(210, 50%, 35%)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(220, 50%, 15%)" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Human silhouette - head */}
        <g style={{ transform: `translateY(${breathPhase * 100}px)` }}>
          {/* Head */}
          <ellipse cx="175" cy="30" rx="22" ry="26"
            fill="url(#bodyFill)" stroke="url(#bodyStroke)" strokeWidth="1.5" />
          {/* Face detail - subtle */}
          <ellipse cx="175" cy="28" rx="14" ry="16"
            fill="url(#muscleHighlight)" opacity="0.4" />

          {/* Neck */}
          <rect x="168" y="54" width="14" height="14" rx="4"
            fill="url(#bodyFill)" />

          {/* Torso */}
          <path d={`
            M 140,68 
            C 135,72 128,82 126,95
            L 124,120 L 126,155 L 132,180 L 142,195
            L 155,200 L 175,204 L 195,200 L 208,195
            L 218,180 L 224,155 L 226,120 L 224,95
            C 222,82 215,72 210,68
            L 195,64 L 175,62 L 155,64 Z
          `}
            fill="url(#bodyFill)" stroke="url(#bodyStroke)" strokeWidth="1.2" />
          {/* Chest muscle definition */}
          <path d="M 155,80 Q 165,90 175,85 Q 185,90 195,80"
            fill="none" stroke="hsl(210, 40%, 30%)" strokeWidth="0.8" opacity="0.5" />
          <path d="M 150,95 Q 162,105 175,100 Q 188,105 200,95"
            fill="none" stroke="hsl(210, 40%, 30%)" strokeWidth="0.6" opacity="0.3" />
          {/* Abs definition */}
          <line x1="175" y1="110" x2="175" y2="175" stroke="hsl(210, 40%, 28%)" strokeWidth="0.6" opacity="0.3" />
          <line x1="160" y1="120" x2="190" y2="120" stroke="hsl(210, 40%, 28%)" strokeWidth="0.4" opacity="0.2" />
          <line x1="162" y1="135" x2="188" y2="135" stroke="hsl(210, 40%, 28%)" strokeWidth="0.4" opacity="0.2" />
          <line x1="163" y1="150" x2="187" y2="150" stroke="hsl(210, 40%, 28%)" strokeWidth="0.4" opacity="0.2" />

          {/* Left arm */}
          <path d={`
            M 140,68 C 128,72 118,82 112,100
            L 105,125 C 103,132 100,140 96,155
            L 92,170 C 90,175 92,178 95,176
            L 100,165 L 108,140 L 115,118
            C 120,105 128,92 135,85 Z
          `}
            fill="url(#bodyFill)" stroke="url(#bodyStroke)" strokeWidth="1" />

          {/* Right arm */}
          <path d={`
            M 210,68 C 222,72 232,82 238,100
            L 245,125 C 247,132 250,140 254,155
            L 258,170 C 260,175 258,178 255,176
            L 250,165 L 242,140 L 235,118
            C 230,105 222,92 215,85 Z
          `}
            fill="url(#bodyFill)" stroke="url(#bodyStroke)" strokeWidth="1" />

          {/* Left leg */}
          <path d={`
            M 155,198 L 148,230 L 145,255 L 142,285
            L 140,310 L 138,330 C 137,336 140,340 146,338
            L 152,335 L 150,315 L 152,285 L 155,255
            L 158,230 L 162,200 Z
          `}
            fill="url(#bodyFill)" stroke="url(#bodyStroke)" strokeWidth="1" />

          {/* Right leg */}
          <path d={`
            M 195,198 L 202,230 L 205,255 L 208,285
            L 210,310 L 212,330 C 213,336 210,340 204,338
            L 198,335 L 200,315 L 198,285 L 195,255
            L 192,230 L 188,200 Z
          `}
            fill="url(#bodyFill)" stroke="url(#bodyStroke)" strokeWidth="1" />
        </g>

        {/* Neural network bone connections */}
        {BONES.map(([a, b], i) => {
          const ja = JOINTS[a];
          const jb = JOINTS[b];
          return (
            <g key={`bone-${i}`}>
              <motion.line
                x1={ja.x} y1={ja.y} x2={jb.x} y2={jb.y}
                stroke="hsl(190, 80%, 45%)"
                strokeWidth="1.2"
                strokeDasharray="4 3"
                opacity={0.35}
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.15 }}
              />
              {/* Signal pulse traveling along bone */}
              <motion.circle
                r="2"
                fill="hsl(190, 100%, 60%)"
                filter="url(#softGlow)"
                animate={{
                  cx: [ja.x, jb.x],
                  cy: [ja.y, jb.y],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.25,
                  ease: "easeInOut",
                }}
              />
            </g>
          );
        })}

        {/* Joint nodes */}
        {jointEntries.map(([key, joint], i) => {
          const sensorInfo = SENSOR_JOINTS.find(s => s.key === key);
          const isPulsing = pulseNodes.includes(i);
          const nodeColor = sensorInfo?.color ?? "hsl(190, 100%, 50%)";
          const nodeSize = sensorInfo ? 6 : 4;

          return (
            <g key={key}>
              {/* Outer glow ring */}
              <motion.circle
                cx={joint.x} cy={joint.y} r={nodeSize + 8}
                fill={nodeColor}
                opacity={0.08}
                animate={{
                  r: [nodeSize + 6, nodeSize + 14, nodeSize + 6],
                  opacity: [0.05, 0.15, 0.05],
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }}
              />
              {/* Main joint node */}
              <motion.circle
                cx={joint.x} cy={joint.y} r={nodeSize}
                fill={nodeColor}
                filter="url(#jointGlow)"
                animate={{
                  scale: isPulsing ? [1, 1.5, 1] : [1, 1.1, 1],
                }}
                transition={{ duration: isPulsing ? 0.5 : 2, repeat: Infinity, delay: i * 0.15 }}
                style={{ transformOrigin: `${joint.x}px ${joint.y}px` }}
              />
              {/* Inner bright core */}
              <circle cx={joint.x} cy={joint.y} r={nodeSize * 0.35} fill="white" opacity={0.9} />
            </g>
          );
        })}

        {/* Sensor data labels */}
        {showValues && SENSOR_JOINTS.map((sensor) => {
          const joint = JOINTS[sensor.key];
          const value = sensorValues[sensor.dataKey as keyof typeof sensorValues] as number;
          const strain = getStrainPercent(value);
          const fatigue = getFatigueLevel(value);
          const isRight = joint.x > 175;
          const labelX = isRight ? joint.x + 22 : joint.x - 22;

          return (
            <g key={sensor.key}>
              {/* Connector line */}
              <line
                x1={joint.x + (isRight ? 8 : -8)} y1={joint.y}
                x2={labelX} y2={joint.y}
                stroke={sensor.color} strokeWidth="0.8" strokeDasharray="2 2" opacity="0.5"
              />
              {/* Data card background */}
              <rect
                x={isRight ? labelX : labelX - 62}
                y={joint.y - 20}
                width="62" height={showLabels ? 40 : 24}
                rx="4"
                fill="hsl(222, 40%, 8%)"
                fillOpacity="0.85"
                stroke={sensor.color}
                strokeWidth="0.5"
                strokeOpacity="0.3"
              />
              {/* Label */}
              {showLabels && (
                <text
                  x={isRight ? labelX + 4 : labelX - 58}
                  y={joint.y - 8}
                  fill={sensor.color}
                  fontSize="7"
                  fontWeight="700"
                  fontFamily="Inter, system-ui, sans-serif"
                >
                  {JOINTS[sensor.key].label.replace("R.", "")}
                </text>
              )}
              {/* Value */}
              <text
                x={isRight ? labelX + 4 : labelX - 58}
                y={joint.y + (showLabels ? 4 : 0)}
                fill="hsl(210, 40%, 88%)"
                fontSize="9"
                fontWeight="800"
                fontFamily="Inter, system-ui, sans-serif"
              >
                {value}Ω
              </text>
              {/* Strain & Fatigue */}
              {showLabels && (
                <text
                  x={isRight ? labelX + 4 : labelX - 58}
                  y={joint.y + 15}
                  fill="hsl(215, 20%, 55%)"
                  fontSize="6"
                  fontFamily="Inter, system-ui, sans-serif"
                >
                  S:{strain}% • F:{fatigue}
                </text>
              )}
            </g>
          );
        })}

        {/* Floating mini-graph near body */}
        {showFloatingGraphs && size !== "sm" && (
          <g opacity="0.6">
            {/* Mini graph card */}
            <rect x="18" y="90" width="60" height="35" rx="4"
              fill="hsl(222, 40%, 8%)" fillOpacity="0.7"
              stroke="hsl(190, 80%, 45%)" strokeWidth="0.5" strokeOpacity="0.3" />
            <text x="22" y="100" fill="hsl(215, 20%, 55%)" fontSize="5" fontFamily="Inter, system-ui, sans-serif">
              Signal Intensity
            </text>
            {/* Mini bar graph */}
            {miniGraphData.map((v, i) => (
              <rect key={i}
                x={22 + i * 4.5} y={105 + (1 - v) * 16}
                width="3" height={v * 16}
                rx="1"
                fill={v > 0.7 ? "hsl(142, 71%, 45%)" : v > 0.4 ? "hsl(190, 100%, 50%)" : "hsl(263, 84%, 58%)"}
                opacity="0.8"
              />
            ))}
          </g>
        )}

        {/* ECG waveform at bottom */}
        {showECG && size !== "sm" && (
          <g>
            <motion.path
              d={ecgPath}
              fill="none"
              stroke="url(#ecgGrad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              filter="url(#softGlow)"
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <text x="65" y="355" fill="hsl(215, 20%, 45%)" fontSize="6" fontFamily="Inter, system-ui, sans-serif">
              ECG Signal • Live
            </text>
            <motion.circle cx="290" cy="340" r="3" fill="hsl(142, 71%, 45%)"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </g>
        )}

        {/* Title label */}
        {showLabels && size !== "sm" && (
          <g>
            <text x="175" y="372" textAnchor="middle"
              fill="hsl(190, 80%, 55%)" fontSize="7" fontWeight="600"
              fontFamily="Inter, system-ui, sans-serif" letterSpacing="2" opacity="0.6">
              LIVE 1D SIGNAL MODEL
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}

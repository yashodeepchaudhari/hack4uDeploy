import { useState, useEffect, useCallback, useRef } from "react";

export interface SensorReading {
  knee: number;
  elbow: number;
  wrist: number;
  reps: number;
  activity: "walking" | "running" | "exercise";
  timestamp: number;
}

export interface GraphPoint {
  time: number;
  resistance: number;
}

const activities: SensorReading["activity"][] = ["walking", "running", "exercise"];

const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

const noise = (amplitude: number) => (Math.random() - 0.5) * amplitude;

export function useSensorData() {
  const [data, setData] = useState<SensorReading>({
    knee: 320,
    elbow: 410,
    wrist: 290,
    reps: 15,
    activity: "running",
    timestamp: Date.now(),
  });

  const [graphData, setGraphData] = useState<GraphPoint[]>(() => {
    const pts: GraphPoint[] = [];
    for (let i = 0; i < 50; i++) {
      pts.push({
        time: i * 2,
        resistance: 300 + Math.sin(i * 0.3) * 50 + noise(15),
      });
    }
    return pts;
  });

  const timeRef = useRef(100);
  const repRef = useRef(15);

  const updateData = useCallback(() => {
    timeRef.current += 2;
    const t = timeRef.current;

    // Simulate bending cycles
    const bendCycle = Math.sin(t * 0.05) * 0.5 + 0.5;
    const kneeBase = 250 + bendCycle * 120;
    const elbowBase = 350 + Math.sin(t * 0.07) * 80;
    const wristBase = 240 + Math.sin(t * 0.09) * 60;

    // Occasionally increment reps
    if (Math.random() < 0.15) repRef.current++;

    const newReading: SensorReading = {
      knee: Math.round(clamp(kneeBase + noise(20), 200, 500)),
      elbow: Math.round(clamp(elbowBase + noise(15), 300, 550)),
      wrist: Math.round(clamp(wristBase + noise(10), 200, 400)),
      reps: repRef.current,
      activity: activities[Math.floor(t / 30) % 3],
      timestamp: Date.now(),
    };

    setData(newReading);

    const newResistance = (newReading.knee + newReading.elbow + newReading.wrist) / 3;
    setGraphData((prev) => {
      const next = [...prev.slice(-59), { time: t, resistance: Math.round(newResistance) }];
      return next;
    });
  }, []);

  useEffect(() => {
    const id = setInterval(updateData, 1500);
    return () => clearInterval(id);
  }, [updateData]);

  // Derived metrics
  const avgResistance = (data.knee + data.elbow + data.wrist) / 3;
  const strainLevel: "Low" | "Medium" | "High" =
    avgResistance < 300 ? "High" : avgResistance < 380 ? "Medium" : "Low";
  const fatiguePercent = clamp(Math.round(((data.reps - 10) / 30) * 100), 5, 95);

  return { data, graphData, strainLevel, fatiguePercent };
}

import { useCallback, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Research from "@/components/Research";
import Prototypes from "@/components/Prototypes";
import Dashboard from "@/components/Dashboard";
import SensorModel from "@/components/SensorModel";
import Analytics from "@/components/Analytics";
import SystemArchitecture from "@/components/SystemArchitecture";
import LiveDemo from "@/components/LiveDemo";
import Footer from "@/components/Footer";
import { useSensorData } from "@/hooks/useSensorData";

export default function Index() {
  const { data, graphData, strainLevel, fatiguePercent } = useSensorData();
  const [activeSection, setActiveSection] = useState("home");
  const [demoOpen, setDemoOpen] = useState(false);

  const handleNavigate = useCallback((id: string) => {
    if (id === "live-demo") {
      setDemoOpen(true);
      return;
    }
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />
      <Hero onNavigate={handleNavigate} />
      <Research onNavigate={handleNavigate} />
      <Prototypes onNavigate={handleNavigate} />
      <SensorModel data={data} graphData={graphData} />
      <Dashboard
        data={data}
        graphData={graphData}
        strainLevel={strainLevel}
        fatiguePercent={fatiguePercent}
      />
      <Analytics
        data={data}
        graphData={graphData}
        strainLevel={strainLevel}
        fatiguePercent={fatiguePercent}
      />
      <SystemArchitecture data={data} />
      <Footer />
      <LiveDemo open={demoOpen} onClose={() => setDemoOpen(false)} />
    </div>
  );
}

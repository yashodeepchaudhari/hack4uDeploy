import { motion } from "framer-motion";
import { Zap, Activity, Cpu, Gauge, ExternalLink, FileText, RotateCw } from "lucide-react";

interface ResearchProps {
  onNavigate: (id: string) => void;
}

export default function Research({ onNavigate }: ResearchProps) {
  return (
    <section id="research" className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Research Paper & Technical Foundation
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Bridging the Biomechanical Tracking Gap through Soft-Material Innovation
          </p>
        </motion.div>

        {/* The "News" Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="glass rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-primary">The Problem</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-warning" />
                  Traditional Motion Analysis
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Systems are prohibitively expensive, computationally complex, and restricted to controlled laboratory environments.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-warning" />
                  Standard Wearables
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Mass-market devices monitor cardiovascular metrics (e.g., heart rate) but lack the capability to capture mechanical joint behavior or muscle strain.
                </p>
              </div>
            </div>
            <div className="mt-8 p-6 bg-primary/10 rounded-xl border-l-4 border-primary">
              <p className="text-lg font-medium">
                <strong>Consequence:</strong> Because clinical-grade tracking is "lab-bound," fatigue and abnormal movement patterns are typically identified only after a physical injury has occurred.
              </p>
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-6 text-primary">The Technical Gap</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Current wearable sensing technology is hindered by two primary barriers:
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-destructive/5 rounded-xl border-l-4 border-destructive">
                  <h4 className="text-lg font-semibold mb-3 text-destructive flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Material Rigidity
                  </h4>
                  <p className="text-muted-foreground">
                    Traditional sensors often utilize metal electrodes which cause signal artifacts (noise), corrosion, and physical discomfort during movement.
                  </p>
                </div>
                <div className="p-6 bg-warning/5 rounded-xl border-l-4 border-warning">
                  <h4 className="text-lg font-semibold mb-3 text-warning flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Environmental Sensitivity
                  </h4>
                  <p className="text-muted-foreground">
                    Many conductive polymer sensors are affected by humidity, whereas ideal wearable sensors must remain stable across 40% to 90% relative humidity for direct skin contact.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Core Technology Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <div className="glass rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-primary">Core Technology & Working Mechanism</h2>
            
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <Cpu className="w-6 h-6 text-success" />
                Material Architecture
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                The system utilizes a <span className="text-primary font-semibold">metal-free, all-carbon sensing approach</span> to eliminate signal noise and corrosion common in traditional sensors. The architecture consists of a high-aspect-ratio conductive network (graphite or <span className="text-primary font-semibold">0.016 wt% single-walled CNTs</span>) embedded within a biocompatible PDMS elastomeric matrix. This provides a mechanically robust platform capable of handling up to <span className="text-primary font-semibold">25% strain and 140° bending</span>.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">Bimodal Electromechanical Response</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl">
                  <h4 className="font-semibold mb-3 text-blue-700 dark:text-blue-300">Compressive Stress</h4>
                  <p className="text-sm text-muted-foreground">
                    As the joint bends, the positive Poisson's ratio of the PDMS creates transverse compressive stress within the sensor.
                  </p>
                </div>
                <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl">
                  <h4 className="font-semibold mb-3 text-green-700 dark:text-green-300">Network Reconfiguration</h4>
                  <p className="text-sm text-muted-foreground">
                    This internal stress causes the 3D-networked conductive particles to reorient and reconfigure, leading to measurable changes in electrical resistance.
                  </p>
                </div>
                <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl">
                  <h4 className="font-semibold mb-3 text-purple-700 dark:text-purple-300">The "Reverse Effect"</h4>
                  <p className="text-sm text-muted-foreground">
                    While the system shows a "Slight Forward Relation" (resistance increase) for subtle bends, major joint angles trigger the Reverse Effect. Conductive granules interlock more tightly, creating a stronger path for current and reducing overall resistance.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20">
              <div className="flex items-center gap-3 mb-3">
                <Gauge className="w-6 h-6 text-primary" />
                <h4 className="text-lg font-bold text-primary">Zero-Lag Performance</h4>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                This mechanism supports a rapid response time—approximately <span className="text-primary font-semibold">300-550 ms</span> for human joint movement—which is critical for real-time monitoring and injury prevention.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Performance Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="glass rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-primary">Performance Metrics</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                  <Gauge className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Response Time</h3>
                <p className="text-3xl font-bold text-primary mb-2">200-550ms</p>
                <p className="text-sm text-muted-foreground">Rapid, instantaneous detection for real-time monitoring (200ms for robotic motion; 300-550ms for human joint tracking)</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Environmental Stability</h3>
                <p className="text-3xl font-bold text-primary mb-2">40-90% RH</p>
                <p className="text-sm text-muted-foreground">Performance is invariant to humidity, ensuring signal integrity during direct skin contact and sweat</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Dynamic Range</h3>
                <p className="text-3xl font-bold text-primary mb-2">25% Strain</p>
                <p className="text-sm text-muted-foreground">High flexibility allows for precise measurement of extreme joint angles (fingers, wrist, and knees)</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-400 to-violet-500 rounded-full flex items-center justify-center">
                  <RotateCw className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Mechanical Durability</h3>
                <p className="text-3xl font-bold text-primary mb-2">&gt;100 Cycles</p>
                <p className="text-sm text-muted-foreground">Demonstrates low hysteresis and high repeatability over extended use without mechanical fatigue</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Research Papers Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <div className="glass rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-primary">Research Papers</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Explore our detailed research findings and technical documentation:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <a
                href="https://drive.google.com/file/d/1sfMerAsdTOqqFgHJoYLWCBNQXmMKWO4G/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-300 group-hover:text-blue-800 dark:group-hover:text-blue-200">
                      Research Paper 1
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Comprehensive technical foundation and core technology analysis of the Singularity biomechanical tracking system.
                    </p>
                    <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm font-medium">
                      <span>View Paper</span>
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </a>

              <a
                href="https://drive.google.com/file/d/1mKLngIFQ3u6k1EPSwhH-zLkWvbFlsY6y/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border border-green-200 dark:border-green-800 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 text-green-700 dark:text-green-300 group-hover:text-green-800 dark:group-hover:text-green-200">
                      Research Paper 2
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Detailed prototype evolution and performance analysis of the BOMB sensor development phases.
                    </p>
                    <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-sm font-medium">
                      <span>View Paper</span>
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  </div>
                </div>
              </a>
            </div>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground text-center">
                <strong>Note:</strong> These links will open in a new tab to view the research papers directly from Google Drive.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Zap, Activity, Cpu, Gauge, ExternalLink, FileText } from "lucide-react";

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
            Bridging the Biomechanical Tracking Gap with cutting-edge sensor technology
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
                  Lab-bound and expensive systems that require specialized equipment and controlled environments. 
                  Not suitable for real-world applications or continuous monitoring.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-warning" />
                  Standard Wearables
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Only track cardiovascular metrics and basic movement. Cannot monitor joint deformation 
                  and muscle strain in real-time without rigid, metal-based sensors.
                </p>
              </div>
            </div>
            <div className="mt-8 p-6 bg-primary/10 rounded-xl border-l-4 border-primary">
              <p className="text-lg font-medium">
                <strong>Our Gap:</strong> The inability to monitor joint deformation and muscle strain in real-time 
                without rigid, metal-based sensors that cause signal noise and discomfort.
              </p>
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
                The system utilizes an <span className="text-primary font-semibold">all-carbon, metal-free sensing approach</span>. 
                Research foundations show that embedding carbon nanotubes (CNTs) or graphite into a PDMS 
                (poly-dimethylsiloxane) elastomeric matrix creates a biocompatible and mechanically robust platform.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4">Bimodal Electromechanical Response</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl">
                  <h4 className="font-semibold mb-3 text-blue-700 dark:text-blue-300">Compressive Stress</h4>
                  <p className="text-sm text-muted-foreground">
                    As the joint bends, the elastomeric matrix creates transverse compressive stress.
                  </p>
                </div>
                <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl">
                  <h4 className="font-semibold mb-3 text-green-700 dark:text-green-300">Network Reconfiguration</h4>
                  <p className="text-sm text-muted-foreground">
                    This stress causes the conductive graphite/CNT particles to reorient, changing electrical resistance.
                  </p>
                </div>
                <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl">
                  <h4 className="font-semibold mb-3 text-purple-700 dark:text-purple-300">The "Reverse Effect"</h4>
                  <p className="text-sm text-muted-foreground">
                    At high angles, resistance decreases as particles interlock more tightly, creating a stronger path for current.
                  </p>
                </div>
              </div>
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
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                  <Gauge className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Response Time</h3>
                <p className="text-3xl font-bold text-primary mb-2">200-550ms</p>
                <p className="text-sm text-muted-foreground">Rapid detection for real-time monitoring</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Environmental Stability</h3>
                <p className="text-3xl font-bold text-primary mb-2">40-90% RH</p>
                <p className="text-sm text-muted-foreground">Invariant to humidity, ideal for skin contact</p>
              </div>
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Dynamic Range</h3>
                <p className="text-3xl font-bold text-primary mb-2">25% Strain</p>
                <p className="text-sm text-muted-foreground">Up to 140° bending capability</p>
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

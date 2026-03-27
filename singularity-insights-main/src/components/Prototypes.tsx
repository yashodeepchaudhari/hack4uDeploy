import { motion } from "framer-motion";
import { AlertTriangle, TrendingUp, Award, ArrowRight } from "lucide-react";

interface PrototypesProps {
  onNavigate: (id: string) => void;
}

export default function Prototypes({ onNavigate }: PrototypesProps) {
  return (
    <section id="prototypes" className="min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            The Evolutionary Story of BOMB
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Three distinct phases solving the trade-off between flexibility and signal stability
          </p>
        </motion.div>

        {/* Evolution Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-secondary to-primary/30"></div>

          {/* Mark 1 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mb-16"
          >
            <div className="flex items-center">
              <div className="w-1/2 pr-8 text-right">
                <div className="glass rounded-2xl p-8 inline-block text-left max-w-md">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">M1</span>
                    </div>
                    <h2 className="text-2xl font-bold">Mark 1: Initial Proof of Concept</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-orange-500" />
                        The Design
                      </h3>
                      <p className="text-muted-foreground">
                        A mechanically rough, thick deformable conductive medium that validated the core concept.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-blue-500" />
                        The Data
                      </h3>
                      <p className="text-muted-foreground">
                        Validated that bending could be measured. However, it showed significant hysteresis 
                        (the signal did not return to the original baseline), making it poor for repetition counting.
                      </p>
                    </div>

                    <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-l-4 border-orange-500">
                      <p className="text-sm font-medium text-orange-700 dark:text-orange-300">
                        <strong>Key Finding:</strong> Sharp increases upon touch (Forward Relationship) 
                        followed by a deep drop (Reverse Effect) as graphite granules interlocked.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-12 h-12 bg-background border-4 border-primary rounded-full absolute left-1/2 transform -translate-x-1/2 z-10"></div>
              <div className="w-1/2 pl-8"></div>
            </div>
          </motion.div>

          {/* Mark 2 */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative mb-16"
          >
            <div className="flex items-center">
              <div className="w-1/2 pr-8"></div>
              <div className="w-12 h-12 bg-background border-4 border-secondary rounded-full absolute left-1/2 transform -translate-x-1/2 z-10"></div>
              <div className="w-1/2 pl-8">
                <div className="glass rounded-2xl p-8 inline-block max-w-md">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">M2</span>
                    </div>
                    <h2 className="text-2xl font-bold">Mark 2: The Flexibility Trade-Off</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-blue-500" />
                        The Design
                      </h3>
                      <p className="text-muted-foreground">
                        Focused on "wearability" by significantly reducing sensor thickness and refining the structure.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-yellow-500" />
                        The Result
                      </h3>
                      <p className="text-muted-foreground">
                        While much more comfortable and flexible, the thinner sensors produced unstable signal readings, 
                        proving that mechanical flexibility must be balanced with electrical consistency.
                      </p>
                    </div>

                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border-l-4 border-yellow-500">
                      <p className="text-sm font-medium text-yellow-700 dark:text-yellow-300">
                        <strong>Key Insight:</strong> Flexibility alone isn't enough - signal stability is crucial for reliable monitoring.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mark 3 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative mb-16"
          >
            <div className="flex items-center">
              <div className="w-1/2 pr-8 text-right">
                <div className="glass rounded-2xl p-8 inline-block text-left max-w-md">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">M3</span>
                    </div>
                    <h2 className="text-2xl font-bold">Mark 3: The Breakthrough Success</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                        <Award className="w-5 h-5 text-green-500" />
                        The Design
                      </h3>
                      <p className="text-muted-foreground">
                        A high-performance iteration achieving a critical balance between material distribution 
                        and mechanical stability.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-green-500" />
                        The Data (Mark 3 Results)
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <p className="text-sm text-muted-foreground">
                            <strong>Minimal Hysteresis:</strong> Resistance reliably returns to baseline after bending and relaxation
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <p className="text-sm text-muted-foreground">
                            <strong>Slight Forward Relation:</strong> At low angles, detects subtle bends (resistance increase)
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <p className="text-sm text-muted-foreground">
                            <strong>Stable Reverse Effect:</strong> At major angles, consistent signal for high-intensity movement
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                      <p className="text-sm font-medium text-green-700 dark:text-green-300">
                        <strong>Success:</strong> Achieved the perfect balance of flexibility, stability, and accuracy!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-12 h-12 bg-background border-4 border-success rounded-full absolute left-1/2 transform -translate-x-1/2 z-10">
                <Award className="w-6 h-6 text-success absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="w-1/2 pl-8"></div>
            </div>
          </motion.div>
        </div>

        {/* Summary Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16"
        >
          <div className="glass rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-6">The Evolution Complete</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              Through iterative development, we transformed a rough concept into a sophisticated biomechanical 
              tracking system that balances comfort, accuracy, and reliability.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => onNavigate("research")}
                className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                View Technical Details
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate("dashboard")}
                className="px-6 py-3 rounded-lg glass font-semibold text-foreground hover:bg-muted/60 transition-colors flex items-center gap-2"
              >
                See Live Dashboard
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Code2, Server, Zap, Layers, Shield, CheckCircle2 } from "lucide-react";
import { RequestFlowStep } from "./request-flow-step";
import { fadeInUp, staggerContainer } from "./animations";

export function RequestFlowSection() {
  return (
    <section className="unified-section py-24 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
      <div
        className="absolute bottom-1/4 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse-glow"
        style={{ animationDelay: "1s" } as any}
      />
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold md:text-4xl">
              How XyPriss Handles Requests
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Lightning-fast request processing powered by Rust with intelligent
              load management
            </p>
          </motion.div>

          <div className="mx-auto max-w-5xl">
            <div className="relative">
              {/* Connection Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent hidden md:block" />

              {/* Steps */}
              <div className="space-y-12">
                <RequestFlowStep
                  step={1}
                  title="Developer writes business logic"
                  description="Build your backend application using TypeScript with XyPriss's intuitive API"
                  icon={<Code2 />}
                  color="primary"
                  code={`app.get("/api/users", async (req, res) => {
  const users = await db.users.findMany();
  res.xJson({ users });
});`}
                  delay={0}
                />

                <RequestFlowStep
                  step={2}
                  title="XyPriss receives incoming requests"
                  description="Client requests arrive at your XyPriss server endpoint"
                  icon={<Server />}
                  color="secondary"
                  highlight="HTTP/HTTPS requests handled by the Rust-powered gateway"
                  delay={0.1}
                  isRight
                />

                <RequestFlowStep
                  step={3}
                  title="XHSC Core processes the request"
                  description="Ultra-fast Rust engine handles routing, parsing, and initial processing"
                  icon={<Zap />}
                  color="accent"
                  highlight="Microsecond-level radix routing with zero overhead"
                  delay={0.2}
                />

                <RequestFlowStep
                  step={4}
                  title="Cluster mode check"
                  description="Smart load balancing across multiple workers if cluster mode is enabled"
                  icon={<Layers />}
                  color="primary"
                  highlight="Prevents saturation • Optimal resource utilization • Auto-scaling"
                  delay={0.3}
                  isRight
                />

                <RequestFlowStep
                  step={5}
                  title="Security validation"
                  description="12+ middleware modules verify request integrity and security"
                  icon={<Shield />}
                  color="secondary"
                  highlight="CSRF protection • XSS prevention • Rate limiting • Body validation"
                  delay={0.4}
                />

                <RequestFlowStep
                  step={6}
                  title="Response delivered"
                  description="Optimized response sent back to client with minimal latency"
                  icon={<CheckCircle2 />}
                  color="accent"
                  highlight="Average response time: <10ms for simple routes"
                  delay={0.5}
                  isRight
                  isLast
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

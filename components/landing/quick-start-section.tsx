"use client";

import { motion } from "framer-motion";
import { Code2, BookOpen } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { CodeBlock } from "@/components/ui/code-block";
import { fadeInUp, staggerContainer } from "./animations";

export function QuickStartSection() {
  return (
    <section
      className="unified-section py-24 relative overflow-hidden"
      id="quickstart"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold md:text-4xl">Quick Start</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Get up and running in minutes with XyPriss CLI or manual setup
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="h-full hover:shadow-xl transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code2 className="h-5 w-5 text-primary" />
                    Using CLI (Recommended)
                  </CardTitle>
                  <CardDescription>
                    The fastest way to get started with XyPriss
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="mb-2 text-sm font-medium">
                      1. Install the CLI
                    </p>
                    <CodeBlock code="npm install -g xypriss-cli" />
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium">
                      2. Create a new project
                    </p>
                    <CodeBlock code="xfpm init --name my-app --port 4567 --author Nehonix-Team --desc 'A starter XyPriss server for building secure web applications'" />
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium">
                      3. Start development server
                    </p>
                    <CodeBlock code="cd my-app && xfpm dev" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="h-full hover:shadow-xl transition-all">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-secondary" />
                    Manual Setup
                  </CardTitle>
                  <CardDescription>Set up XyPriss with xfpm</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="mb-2 text-sm font-medium">Install XyPriss</p>
                    <CodeBlock code="xfpm install xypriss" />
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-medium">
                      Create your server
                    </p>
                    <CodeBlock
                      language="typescript"
                      code={`import { createServer } from "xypriss";

const app = createServer({
  server: { port: 3000 },
  security: { enabled: true },
});

app.get("/", (req, res) => {
  res.xJson({ message: "Hello from XyPriss" });
});

app.start();`}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

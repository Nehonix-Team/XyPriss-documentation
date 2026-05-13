import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Steps, Step } from "@/components/ui/Steps";
import { Link2, ShieldCheck, Zap, Lock, Cpu, Database, Activity, Terminal } from "lucide-react";

export default function XEMSUsagePage() {
  return (
    <div className="prose prose-invert max-w-none">
      <SectionHeading level={1}>XEMS Usage Guide</SectionHeading>
      
      <p>XEMS provides two primary abstraction layers: high-level session management via the <code>xLink</code> API and low-level storage via the fluent <code>xems</code> storage API.</p>

      <SectionHeading level={2}>High-Level Session Management</SectionHeading>
      <p>The <code>xLink</code> API is the recommended way to manage user authentication. It handles token generation, secure cookie injection, and automatic rotation.</p>

      <Steps>
        <Step title="Linking a Session">
          Use <code>res.xLink()</code> during login to securely associate data with a client.
          <CodeBlock language="typescript" code={`app.post("/login", async (req, res) => {
    // Link session data to the client
    await res.xLink({ userId: "123", role: "admin" });
    res.json({ success: true });
});`} />
        </Step>
        <Step title="Retrieving Session Data">
          Access the decrypted session via <code>req.session</code> in protected routes.
          <CodeBlock language="typescript" code={`app.get("/profile", (req, res) => {
    if (!req.session) return res.status(401).send("Unauthorized");
    
    const { userId, role } = req.session;
    res.json({ userId, role });
});`} />
        </Step>
        <Step title="Unlinking (Logout)">
          Terminate the session and clear the secure cookie.
          <CodeBlock language="typescript" code={`app.post("/logout", async (req, res) => {
    await res.xUnlink();
    res.json({ success: true });
});`} />
        </Step>
      </Steps>

      <SectionHeading level={2}>Low-Level Storage (Fluent API)</SectionHeading>
      <p>The <code>xems</code> API provides direct access to the encrypted storage engine, allowing you to store temporary data in specific sandboxes.</p>
      
      <CodeBlock language="typescript" title="Direct Storage Access" code={`import { xems } from "xypriss";

const xdb = await xems.from("cache");

// Set a value with 10-minute TTL
await xdb.set("query_result", { data: [...] }, "10m");

// Get and auto-decrypt
const result = await xdb.get("query_result");

// Delete
await xdb.del("query_result");`} />

      <SectionHeading level={2}>Multi-Server Context</SectionHeading>
      <p>Inside a route handler, always use the <code>app</code> instance from the request to ensure you are interacting with the correct XEMS connection.</p>
      <CodeBlock language="typescript" code={`app.get("/data", async (req, res) => {
    const runner = xems.forApp(req.app);
    const result = await runner.from("system").get("metadata");
});`} />

      <Callout type="info" title="Frontend Credentials">
        Since XEMS sessions use <code>HttpOnly</code> cookies for security, your frontend must use <code>withCredentials: true</code> (or <code>credentials: "include"</code> in Fetch) to send the session token.
      </Callout>

      <DocsFooter 
        title="Implementation Tutorial"
        description="A step-by-step tutorial on building a secure auth system with XEMS."
        buttonText="Next: Tutorial"
        href="/docs/security/xems/tutorial"
        iconName="Zap"
      />
    </div>
  );
}

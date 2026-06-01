import React from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { DocsFooter } from "@/components/ui/DocsFooter";
import { Callout } from "@/components/ui/Callout";
import { Steps, Step } from "@/components/ui/Steps";
import { Rocket, ShieldCheck, Code2, Layers } from "lucide-react";

export default function SendPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center gap-2 text-primary font-semibold tracking-wider uppercase text-xs">
          <Layers size={14} />
          HTTP Server
        </div>
        <SectionHeading level={1}>
          Send: Structured HTTP Response Utility
        </SectionHeading>
        <p className="text-xl text-muted-foreground leading-relaxed">
          A strongly-typed, opinionated API for standardising every JSON response
          sent from XyPriss — success or error.
        </p>
        <p>
          <code>Send</code> centralises status code resolution, response body
          construction, and output flushing into a single interface. Every method
          produces a JSON object conforming to the <code>IResTemplate</code>{" "}
          contract, guaranteeing predictability for API consumers.
        </p>
      </div>

      <Callout type="info" title="Why Send?">
        Without a unified response layer, large applications drift into ad-hoc
        patterns (inconsistent shapes, missing fields, duplicated logic). Send
        eliminates this by enforcing a single contract across every handler.
      </Callout>

      <SectionHeading level={2} id="contract">Response Body Contract</SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        Every response produced by <code>Send</code> conforms to{" "}
        <code>IResTemplate</code>:
      </p>
      <CodeBlock
        language="typescript"
        code={`{
  success: boolean;
  message: string;
  serverName?: string;
  data?: unknown;
  details: {
    error: string;
    errorCode: string;
    statusCode: number;
  };
}`}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
          <h4 className="font-bold text-white text-xs mb-2 flex items-center gap-2">
            <ShieldCheck size={14} className="text-green-400" /> 200 OK Success
          </h4>
          <CodeBlock
            language="json"
            code={`{
  "success": true,
  "message": "User fetched successfully.",
  "serverName": "my-api",
  "data": { "id": 1, "name": "Alice" },
  "details": { "error": "OK", "errorCode": "SOK", "statusCode": 200 }
}`}
          />
        </div>
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
          <h4 className="font-bold text-white text-xs mb-2 flex items-center gap-2">
            <Code2 size={14} className="text-orange-400" /> 404 Not Found
          </h4>
          <CodeBlock
            language="json"
            code={`{
  "success": false,
  "message": "No user found with id '42'.",
  "serverName": "my-api",
  "details": { "error": "Not Found", "errorCode": "ENOT", "statusCode": 404 }
}`}
          />
        </div>
      </div>

      <SectionHeading level={2} id="constructor">Constructor</SectionHeading>
      <CodeBlock
        language="typescript"
        code={`new Send(res: XyPrisResponse, configs?: Partial<{
  statusCode: Partial<ISeConfigs>;
  includeServerName: boolean;
}>)`}
      />
      <p className="text-xs text-muted-foreground mt-2 mb-6">
        The server name is read from <code>__sys__.vars.__name__</code> at
        construction time and remains constant for the lifetime of the instance.
      </p>

      <SectionHeading level={2} id="api-reference">API Reference</SectionHeading>

      <SectionHeading level={3}>2xx — Success</SectionHeading>
      <div className="space-y-4 my-4">
        {[
          { method: "send.ok(message?, data?)", desc: "200 OK — successful GET, PUT, PATCH, DELETE with body.", code: 'send.ok("User fetched.", { id: 1 });' },
          { method: "send.created(message?, data?)", desc: "201 Created — after persisting a new resource.", code: 'send.created("User created.", { id: 42 });' },
          { method: "send.accepted(message?, data?)", desc: "202 Accepted — request received, processing async.", code: 'send.accepted("Export started.", { jobId: "abc" });' },
          { method: "send.noContent()", desc: "204 No Content — no body. Complies with RFC 7231.", code: "send.noContent();" },
        ].map((item, i) => (
          <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
            <h4 className="font-bold text-primary font-mono text-xs mb-1">{item.method}</h4>
            <p className="text-xs text-muted-foreground mb-2">{item.desc}</p>
            <CodeBlock language="typescript" code={item.code} />
          </div>
        ))}
      </div>

      <SectionHeading level={3}>3xx — Redirection</SectionHeading>
      <div className="space-y-4 my-4">
        {[
          { method: "send.movedPermanently(message?, data?)", desc: "301 — clients should update references.", code: 'send.movedPermanently("Moved.", { location: "/v2/users" });' },
          { method: "send.found(message?, data?)", desc: "302 — temporary redirect.", code: 'send.found("Redirecting.", { location: "/login" });' },
          { method: "send.notModified()", desc: "304 — no body. Use with conditional requests.", code: "send.notModified();" },
        ].map((item, i) => (
          <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
            <h4 className="font-bold text-primary font-mono text-xs mb-1">{item.method}</h4>
            <p className="text-xs text-muted-foreground mb-2">{item.desc}</p>
            <CodeBlock language="typescript" code={item.code} />
          </div>
        ))}
      </div>

      <SectionHeading level={3}>4xx — Client Errors</SectionHeading>
      <div className="space-y-4 my-4">
        {[
          { method: "send.badRequest(message?, data?)", desc: "400 — malformed requests, validation failures.", code: 'send.badRequest("The email field is required.");' },
          { method: "send.unauthorized(message?, data?)", desc: "401 — missing or expired auth credentials.", code: 'send.unauthorized("Token expired.");' },
          { method: "send.forbidden(message?, data?)", desc: "403 — authenticated but lacks permissions.", code: 'send.forbidden("Admin role required.", { requiredRole: "admin" });' },
          { method: "send.notFound(message?, data?)", desc: "404 — resource does not exist.", code: 'send.notFound("Invoice #INV-1042 does not exist.");' },
          { method: "send.methodNotAllowed(message?, data?)", desc: "405 — HTTP method not supported.", code: 'send.methodNotAllowed("Only GET allowed.", { allowedMethods: ["GET"] });' },
          { method: "send.conflict(message?, data?)", desc: "409 — request conflicts with current state.", code: 'send.conflict("Email already registered.");' },
          { method: "send.unprocessableEntity(message?, data?)", desc: "422 — valid syntax but semantic errors.", code: 'send.unprocessableEntity("Birth date must be in the past.");' },
          { method: "send.tooManyRequest(message?, data?)", desc: "429 — rate limit exceeded.", code: 'send.tooManyRequest("Rate limit.", { retryAfter: 30 });' },
        ].map((item, i) => (
          <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
            <h4 className="font-bold text-primary font-mono text-xs mb-1">{item.method}</h4>
            <p className="text-xs text-muted-foreground mb-2">{item.desc}</p>
            <CodeBlock language="typescript" code={item.code} />
          </div>
        ))}
      </div>

      <SectionHeading level={3}>5xx — Server Errors</SectionHeading>
      <div className="space-y-4 my-4">
        {[
          { method: "send.internalError(message?, data?)", desc: "500 — unexpected server failure. Never expose stack traces.", code: 'send.internalError("An unexpected error occurred.");' },
          { method: "send.notImplemented(message?, data?)", desc: "501 — functionality not yet supported.", code: 'send.notImplemented("PATCH is not supported.");' },
          { method: "send.badGateway(message?, data?)", desc: "502 — invalid response from upstream.", code: 'send.badGateway("Provider returned unexpected response.");' },
          { method: "send.serviceUnavailable(message?, data?)", desc: "503 — temporary overload or maintenance.", code: 'send.serviceUnavailable("Maintenance until 06:00 UTC.", { retryAfter: "2026-06-01T06:00:00Z" });' },
          { method: "send.gatewayTimeout(message?, data?)", desc: "504 — upstream did not respond in time.", code: 'send.gatewayTimeout("Database timed out.", { service: "payments-api", timeoutMs: 5000 });' },
        ].map((item, i) => (
          <div key={i} className="p-4 rounded-xl border border-white/5 bg-white/[0.02]">
            <h4 className="font-bold text-primary font-mono text-xs mb-1">{item.method}</h4>
            <p className="text-xs text-muted-foreground mb-2">{item.desc}</p>
            <CodeBlock language="typescript" code={item.code} />
          </div>
        ))}
      </div>

      <SectionHeading level={2} id="usage-examples">Usage Examples</SectionHeading>
      <Steps>
        <Step title="Basic Setup">
          <p>Instantiate Send at the beginning of a route handler:</p>
          <CodeBlock
            language="typescript"
            code={`import { Send } from "../utils/Send";

app.get("/users/:id", (req, res) => {
  const send = new Send(res);

  const user = db.users.findById(req.params.id);
  if (!user) {
    return send.notFound(\`No user found with id '\${req.params.id}'.\`);
  }

  send.ok("User fetched successfully.", user);
});`}
          />
        </Step>
        <Step title="Success, Client Error, and Server Error Patterns">
          <CodeBlock
            language="typescript"
            code={`const send = new Send(res);

// Success
send.ok("Product retrieved.", product);
send.created("Order placed.", { orderId: "ORD-9821" });
send.accepted("Report started.", { jobId: "JOB-4412" });
send.noContent();

// Client errors
send.badRequest("Quantity must be positive.");
send.unauthorized("Session expired.");
send.conflict("Email already registered.");
send.tooManyRequest("Limit reached.", { retryAfter: 30 });

// Server errors
try {
  await processPayment(order);
  send.ok("Payment processed.", { transactionId: "TXN-7731" });
} catch (err) {
  logger.error(err);
  send.internalError("Payment processing failed.");
}`}
          />
        </Step>
        <Step title="Custom Configuration">
          <p>Override status codes or hide the server name:</p>
          <CodeBlock
            language="typescript"
            code={`const send = new Send(res, {
  statusCode: { NOT_FOUND: 404, TOO_MANY_REQUEST: 429 },
  includeServerName: false
});

send.ok("Fetched.", payload);
// Response body will not contain \`serverName\``}
          />
        </Step>
      </Steps>

      <SectionHeading level={2} id="design">Design Principles</SectionHeading>
      <ul className="list-disc pl-6 space-y-2 text-sm text-muted-foreground">
        <li>
          <strong>Single source of truth for response shape.</strong> The{" "}
          <code>IResTemplate</code> contract is enforced uniformly across all
          endpoints.
        </li>
        <li>
          <strong>Explicit over implicit.</strong> Each HTTP status has its own
          named method. No generic <code>send.status(code, ...)</code> escape
          hatch.
        </li>
        <li>
          <strong>No body on no-body statuses.</strong>{" "}
          <code>noContent()</code> and <code>notModified()</code> call{" "}
          <code>res.end()</code> directly, complying with RFC 7231.
        </li>
        <li>
          <strong>Short, stable error codes.</strong> The{" "}
          <code>errorCode</code> field provides a compact identifier for
          monitoring dashboards and log parsers.
        </li>
        <li>
          <strong>Defence in depth on 5xx messages.</strong> The documentation
          explicitly reminds developers never to expose raw stack traces in the{" "}
          <code>message</code> argument.
        </li>
      </ul>

      <SectionHeading level={2} id="integration">Integration with XyPriss</SectionHeading>
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
        <code>Send</code> is a first-party utility. It depends on{" "}
        <code>XyPrisResponse</code> and the global <code>__sys__</code> object.
        It does not introduce any external dependencies and is intended to be
        instantiated per-request inside route handlers.
      </p>
      <CodeBlock
        language="typescript"
        code={`import { Send } from "../utils/Send";
import type { XyPrisRequest, XyPrisResponse } from "../server/routing";

export async function getUserById(req: XyPrisRequest, res: XyPrisResponse) {
  const send = new Send(res);
  // ... handler logic
}`}
      />

      <DocsFooter
        title="Response Control"
        description="Customise unhandled route behaviour with custom status codes and handlers."
        buttonText="Response Control"
        href="/docs/server/response-control"
        iconName="Rocket"
      />
    </div>
  );
}

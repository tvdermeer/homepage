# Phoenix Tracing Diagnostic Report

**Date:** 2026-05-12  
**Investigator:** Sisyphus (tvdermeer)  
**Phoenix Instance:** `https://phoenix.tvdermeer.nl` (v15.6.0)  
**Plugin:** `@devtheops/opencode-plugin-otel` v0.9.0

---

## Problem Statement

The OpenCode agent (`@devtheops/opencode-plugin-otel`) is running, processing telemetry events, and reporting a reachable OTLP endpoint. However, **zero traces, spans, sessions, or datasets** appear in the Phoenix project. All `traceCount`, `recordCount`, and `tokenCountTotal` values remain at 0.

---

## Environment Configuration

### Phoenix CLI Access
- **Host:** `https://phoenix.tvdermeer.nl`
- **Project:** `default` (ID: `UHJvamVjdDox`)
- **Auth:** API Key `ApiKey:2` (JWT Bearer token)
- **CLI:** `px` v1.4.3 via `@arizeai/phoenix-cli`

### OpenCode Agent Configuration
```
OPENCODE=1
OPENCODE_ENABLE_TELEMETRY=true
OPENCODE_OTLP_ENDPOINT=https://phoenix.tvdermeer.nl
OPENCODE_OTLP_PROTOCOL=http/protobuf
OPENCODE_RESOURCE_ATTRIBUTES=service.name=homepage,service.namespace=tvdermeer
OTEL_EXPORTER_OTLP_HEADERS=Authorization=Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJBcGlLZXk6MiJ9._LYhXMj5D-aUFbJr13SiI4aMutN_pGUWM1V5M9cPM_A
```

### Active Plugins
```json
{
  "plugin": [
    "oh-my-openagent@latest",
    "@devtheops/opencode-plugin-otel"
  ]
}
```

---

## Diagnostic Commands Executed

### 1. Phoenix Instance Health
```bash
px project list
# Result: 1 project found — "default" (ID: UHJvamVjdDox)

px trace list --limit 20
# Result: "No traces found"

px span list --limit 20
# Result: "No spans found"

px session list --limit 20
# Result: "No sessions found"

px dataset list --limit 20
# Result: "No datasets found"
```

### 2. Phoenix GraphQL API Queries
```graphql
{ projects { edges { node { name traceCount recordCount tokenCountTotal } } } }
# Result: { "name": "default", "traceCount": 0, "recordCount": 0, "tokenCountTotal": 0 }

{ projects { edges { node { name hasTraces spans(first: 1) { edges { node { spanId name } } } } } } }
# Result: { "name": "default", "hasTraces": false, "spans": { "edges": [] } }
```

### 3. Plugin Initialization Logs
```
INFO  service=opencode-plugin-otel version=0.9.0 endpoint=https://phoenix.tvdermeer.nl protocol=http/protobuf metricsInterval=60000 logsInterval=5000 metricPrefix=opencode. headersHelperSet=false starting up
INFO  service=opencode-plugin-otel endpoint=https://phoenix.tvdermeer.nl ms=82 OTLP endpoint reachable
INFO  service=opencode-plugin-otel OTel SDK initialized
```

### 4. Event Processing Activity
```bash
grep "service=opencode-plugin-otel" log/2026-05-12T204211.log | wc -l
# Result: 194 plugin log lines

grep "service=opencode-plugin-otel" log/2026-05-12T204211.log | grep -oP "otel: \w+" | sort | uniq -c
# Result:
#   78 otel: api_request
#    6 otel: api_error
#    7 otel: session
#   98 otel: tool_result
#    5 otel: session.error
```

### 5. Session Lifecycle Events
```
INFO  service=opencode-plugin-otel sessionID=ses_1e210d1aaffetsErzmGmI7KDIr createdAt=1778618674774 isSubagent=false otel: session.created
ERROR service=opencode-plugin-otel sessionID=ses_1e210d1aaffetsErzmGmI7KDIr error=MessageAbortedError: Aborted otel: session.error
# (repeated 6x across the session)
```

**Note:** `session.idle` events are published by the bus but no corresponding plugin `otel: session.idle` log entries appear. This is because the plugin logs `session.idle` at `debug` level, and the default min log level is `info`.

### 6. Manual OTLP Endpoint Test
```bash
curl -X POST https://phoenix.tvdermeer.nl/v1/traces \
  -H "Content-Type: application/x-protobuf" \
  -H "Authorization: Bearer <token>" \
  -d ""
# Result: 200 OK (endpoint accepts POST)
```

---

## Key Observations

| Observation | Detail | Implication |
|-------------|--------|-------------|
| Plugin initialized successfully | OTel SDK up, endpoint reachable | Not a config/load issue |
| Events are being processed | 194 log lines, all event types handled | Plugin is not stalled |
| `session.created` fires | Span started, stored in `sessionSpans` map | Session trace creation works |
| `session.error` fires 6x | `handleSessionError` called, spans ended with ERROR status | Spans are being ended |
| `api_request` fires 78x | `handleMessageUpdated` creates LLM spans | LLM spans are created |
| `tool_result` fires 98x | Tool spans created and ended | Tool spans are created |
| **No `session.idle` plugin logs** | Logged at `debug` level, filtered | Cannot confirm if `handleSessionIdle` runs |
| **All session ends are errors** | 6x `session.error`, 0x confirmed `session.idle` | All spans end via error path, not idle |
| **Phoenix shows 0 traces** | GraphQL confirms `traceCount: 0` | Spans never reach Phoenix |
| Only 1 project exists | `default` project, created 2026-05-12 | No project mismatch |
| Auth works | API key accepted for GraphQL queries | Not an auth issue |

---

## Hypotheses

### H1: OTLP Export Failure (Most Likely)
The `BatchSpanProcessor` may be failing to export spans silently. OpenTelemetry's batch processor does not log export failures by default. The spans are buffered, the export request fails (network, auth, format, or server-side rejection), and the spans are dropped without notice.

**Supporting evidence:**
- All span lifecycle events fire correctly (creation → ending)
- Phoenix receives nothing
- No export error logs visible

**Counter-evidence:**
- OTLP endpoint returns 200 OK to manual curl
- Plugin reports endpoint as "reachable" (82ms)

### H2: Phoenix Ingestion Bug/Issue
Phoenix 15.6.0 may have a bug or configuration issue where OTLP spans are accepted but not stored/indexed.

**Supporting evidence:**
- `recordCount: 0` despite spans potentially being sent
- Phoenix is newly created (2026-05-12)

**Counter-evidence:**
- No server-side error logs available to check
- The project exists and is queryable

### H3: Session Errors Preventing Idle Export
All session ends in this diagnostic session were via `session.error` (aborted messages), not `session.idle`. While `handleSessionError` DOES end spans, there might be a race condition or incomplete cleanup when sessions abort.

**Supporting evidence:**
- 6x `session.error`, 0x confirmed `session.idle`
- `MessageAbortedError` might cause abrupt termination

**Counter-evidence:**
- `handleSessionError` explicitly ends spans with `sessionSpan.end()`
- LLM and tool spans are also created/ended independently

### H4: Batch Buffer Not Flushed
The `BatchSpanProcessor` has a default max queue size of 2048 and export timeout of 30s. With only ~100 spans in this session, the buffer may not have flushed yet.

**Supporting evidence:**
- Default `scheduledDelayMillis` is 5000ms (5s)
- Small number of spans may not trigger immediate flush
- Session is still active at time of investigation

**Counter-evidence:**
- Spans should flush on `forceFlush()` during SDK shutdown
- `session.error` should trigger span ending, which queues export

---

## Next Steps / Action Items

### Immediate Checks
1. **Enable OTel Debug Logging**
   ```bash
   export OTEL_LOG_LEVEL=debug
   # Restart OpenCode and observe console output for export errors
   ```

2. **Force a Longer Session with Clean Idle**
   Run a multi-turn conversation that completes naturally (not aborted), then wait 30+ seconds for batch flush. Query Phoenix again.

3. **Check Plugin's Debug Logs**
   The plugin's internal `minLevel` might need to be lowered:
   ```bash
   export OPENCODE_OTEL_LOG_LEVEL=debug
   ```

### Server-Side Investigation
4. **Check Phoenix Server Logs**
   SSH into the Phoenix host and check container logs for OTLP ingestion errors:
   ```bash
   docker logs phoenix 2>&1 | grep -i "otlp\|trace\|span\|error"
   ```

5. **Verify Phoenix OTLP Ingestion**
   Test with a minimal valid OTLP protobuf payload:
   ```bash
   # Generate a small protobuf trace and POST to /v1/traces
   # Verify Phoenix stores it
   ```

### Code-Level Debugging
6. **Add Export Callback Logging**
   Modify the plugin locally to log export success/failure:
   ```typescript
   // In otel.ts, add to BatchSpanProcessor:
   const spanProcessor = new BatchSpanProcessor(exporter, {
     onExport: (spans) => console.log(`Exporting ${spans.length} spans`),
   });
   ```
   (Note: `onExport` is not a real option — use a custom SpanProcessor wrapper.)

7. **Verify OTLP Headers are Passed**
   The plugin uses `OTEL_EXPORTER_OTLP_HEADERS` env var. Confirm Phoenix is receiving the `Authorization` header by checking server access logs.

### Alternative: Test with Different Collector
8. **Point to Local Collector**
   Temporarily redirect OTLP to a local collector (e.g., `otelcol`) to verify spans are actually being emitted:
   ```bash
   export OPENCODE_OTLP_ENDPOINT=http://localhost:4318
   ```

---

## Files Referenced

| File | Purpose |
|------|---------|
| `/home/node/.config/opencode/opencode.json` | Plugin configuration |
| `/workspaces/homepage/.devcontainer/config/opencode/opencode.json` | Workspace plugin config |
| `/home/node/.local/share/opencode/log/2026-05-12T204211.log` | OpenCode runtime logs |
| `/usr/local/share/npm-global/lib/node_modules/@devtheops/opencode-plugin-otel/dist/index.js` | Compiled plugin |

---

## Related Resources

- Plugin source: https://github.com/DEVtheOPS/opencode-plugin-otel
- Phoenix CLI docs: https://arizeai-433a7140.mintlify.app/llms.txt
- OpenTelemetry BatchSpanProcessor: https://opentelemetry.io/docs/specs/otel/trace/sdk/#batching-processor
- Phoenix version: 15.6.0 (from `window.Config.platformVersion`)

---

*Report generated by Sisyphus. Re-run `px trace list --limit 10` after attempting next steps to verify improvement.*

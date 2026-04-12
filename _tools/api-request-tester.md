---
title: API Request Tester
description: "Test API endpoints in your browser by sending HTTP requests, customizing headers and bodies, and inspecting status codes, timing, and responses."
categories:
  - API
  - Networking
tool_explanation: |-
  This tool lets you build and send HTTP requests to any API endpoint and inspect the full response, including status code, headers, body, and timing. It supports all common methods, custom headers, request bodies with multiple content types, and query parameters. Everything runs in your browser using the Fetch API. No data passes through an intermediary server.
how_to_use:
  - Select an HTTP method and enter the request URL.
  - Add query parameters, headers, or a request body as needed using the tabs.
  - Click Send to execute the request.
  - Review the response status, timing, headers, and body in the output panel.
  - Click on the response body to copy it to your clipboard.
tool_article: |-
  Testing APIs is a routine part of web development, but switching to a dedicated desktop application every time you need to fire off a quick request breaks your workflow. A browser-based request tester fills that gap by letting you build, send, and inspect HTTP requests without leaving the browser. It is not a replacement for full-featured API clients, but it handles the majority of quick checks, debugging sessions, and integration tests that come up during development.

  The most common use case is verifying that an endpoint returns what you expect. You set the method, paste the URL, add any required headers like an authorization token, and send the request. The response panel shows you the status code, response headers, and the body. For JSON APIs, the body is automatically formatted so you can read nested structures without pasting into a separate formatter. That immediate feedback loop is what makes a lightweight tester useful during active development.

  HTTP methods define the intent of each request. GET retrieves data. POST creates a resource or submits data. PUT replaces a resource entirely. PATCH applies partial updates. DELETE removes a resource. HEAD works like GET but returns only headers, which is useful for checking existence or cache headers without downloading the full body. OPTIONS is used in CORS preflight checks and for discovering which methods an endpoint supports. Having all of these available in one tool means you can test the full lifecycle of a REST API without writing curl commands or switching tools.

  Headers are key-value pairs sent with the request. Common examples include Authorization for bearer tokens or API keys, Content-Type to specify the format of the request body, and Accept to indicate what response format the client prefers. Custom headers are also common in internal APIs for things like request tracing, tenant identification, or feature flags. A good request tester makes it easy to add, edit, and remove headers without reformatting a raw text block.

  The request body is relevant for POST, PUT, and PATCH requests. JSON is the most common format for modern APIs, but form-encoded data is still used in many authentication flows and legacy systems. Raw text mode covers everything else, including XML, GraphQL queries, or any custom format. Setting the correct Content-Type header to match the body format is important because many servers reject requests where the two do not agree.

  Query parameters are another common source of confusion during debugging. Manually editing a URL string to add or change parameters is error-prone, especially when values need encoding. A dedicated parameter editor that builds the final URL for you reduces those mistakes and makes it obvious what is being sent. It also makes it easier to toggle individual parameters on and off without deleting them.

  Response timing matters more than many developers realize. A request that takes three seconds in testing will feel slow in production and may trigger timeouts in chained services. Seeing the elapsed time on every request builds awareness of latency and often surfaces performance issues before they reach users. It is not a substitute for proper performance testing, but it provides a useful baseline signal during development.

  CORS restrictions are worth understanding when using a browser-based tool. Browsers enforce the same-origin policy, which means requests to a different domain may be blocked unless the server includes the correct CORS headers. This is a browser security feature, not a limitation of the tool. If a request works in curl but fails in the browser, the cause is almost always missing or misconfigured CORS headers on the server side. The error message in the tool will indicate when this happens.

  For everyday API work, a browser-based tester covers the common cases quickly: checking response formats, verifying authentication, testing error handling, and confirming that parameters are being interpreted correctly. When you need advanced features like environment variables, automated test suites, or request chaining, a dedicated client is the right choice. But for the ad-hoc requests that make up most of daily development, having a fast tool that requires no setup and no context switch is genuinely useful.
faqs:
  - question: Why does my request fail with a CORS error?
    answer: |-
      Browsers enforce the same-origin policy. If the server does not include the appropriate Access-Control-Allow-Origin headers, the browser blocks the response. This is a server configuration issue, not a tool limitation. The same request would succeed from curl or a server-side script.
  - question: Can I send requests to localhost?
    answer: |-
      Yes, as long as your local server is running and accepts requests from the browser origin. CORS headers may still be required depending on the port and protocol.
  - question: Is my data sent through a third-party server?
    answer: |-
      No. Requests go directly from your browser to the target URL using the Fetch API. Nothing is proxied or logged.
  - question: What content types are supported for the request body?
    answer: |-
      The tool supports JSON, form-encoded, and raw text bodies. Select the appropriate tab and format, and the Content-Type header is set automatically.
  - question: Can I send file uploads?
    answer: |-
      This tool does not currently support multipart file uploads. It handles text-based request bodies only.
---

<div class="api-tool">
  <div class="api-method-url">
    <select id="api-method">
      <option value="GET">GET</option>
      <option value="POST">POST</option>
      <option value="PUT">PUT</option>
      <option value="PATCH">PATCH</option>
      <option value="DELETE">DELETE</option>
      <option value="HEAD">HEAD</option>
      <option value="OPTIONS">OPTIONS</option>
    </select>
    <input type="text" id="api-url" placeholder="https://api.example.com/endpoint" autocomplete="off" spellcheck="false">
    <button type="button" id="api-send" onclick="apiSend()">Send</button>
  </div>

  <div class="api-tabs" id="api-req-tabs">
    <div class="api-tab active" data-tab="params" onclick="apiReqTab(this)">Params</div>
    <div class="api-tab" data-tab="headers" onclick="apiReqTab(this)">Headers</div>
    <div class="api-tab" data-tab="body" onclick="apiReqTab(this)">Body</div>
  </div>

  <!-- Params panel -->
  <div class="api-panel" id="api-panel-params">
    <div class="api-kv-list" id="api-params-list"></div>
    <button type="button" class="api-add-row" onclick="apiAddParam()">+ Add parameter</button>
  </div>

  <!-- Headers panel -->
  <div class="api-panel" id="api-panel-headers" style="display:none">
    <div class="api-kv-list" id="api-headers-list"></div>
    <button type="button" class="api-add-row" onclick="apiAddHeader()">+ Add header</button>
  </div>

  <!-- Body panel -->
  <div class="api-panel" id="api-panel-body" style="display:none">
    <div class="api-body-types">
      <label class="api-body-radio"><input type="radio" name="api-body-type" value="none" checked onchange="apiBodyType(this)"> None</label>
      <label class="api-body-radio"><input type="radio" name="api-body-type" value="json" onchange="apiBodyType(this)"> JSON</label>
      <label class="api-body-radio"><input type="radio" name="api-body-type" value="form" onchange="apiBodyType(this)"> Form</label>
      <label class="api-body-radio"><input type="radio" name="api-body-type" value="raw" onchange="apiBodyType(this)"> Raw</label>
    </div>
    <textarea id="api-body-editor" rows="6" placeholder="Request body…" style="display:none" spellcheck="false"></textarea>
  </div>

  <!-- Response -->
  <div class="api-response" id="api-response" style="display:none">
    <div class="api-resp-bar">
      <span class="api-resp-status" id="api-resp-status"></span>
      <span class="api-resp-time" id="api-resp-time"></span>
      <span class="api-resp-size" id="api-resp-size"></span>
    </div>

    <div class="api-tabs" id="api-resp-tabs">
      <div class="api-tab active" data-tab="resp-body" onclick="apiRespTab(this)">Body</div>
      <div class="api-tab" data-tab="resp-headers" onclick="apiRespTab(this)">Headers</div>
    </div>

    <div class="api-panel" id="api-panel-resp-body">
      <div class="api-resp-body-bar">
        <button type="button" class="api-small-btn" id="api-resp-raw-btn" onclick="apiToggleRaw()">Raw</button>
        <button type="button" class="api-small-btn" onclick="apiCopyResp()">Copy</button>
      </div>
      <pre class="api-resp-output" id="api-resp-body"></pre>
    </div>

    <div class="api-panel" id="api-panel-resp-headers" style="display:none">
      <pre class="api-resp-output api-resp-hdr" id="api-resp-headers"></pre>
    </div>
  </div>

  <div class="api-error" id="api-error" style="display:none"></div>
  <div class="api-loading" id="api-loading" style="display:none">
    <span class="api-spinner"></span> Sending request…
  </div>
</div>

<style>
.api-tool{display:flex;flex-direction:column;gap:1rem}

/* Method + URL + Send */
.api-method-url{display:flex;gap:0;align-items:stretch}
.api-method-url select{width:auto;padding:0.6rem 0.5rem;background:var(--surface,#1a1c25);color:var(--accent,#6366f1);border:1px solid var(--border,#2a2d3a);border-radius:var(--radius-sm,8px) 0 0 var(--radius-sm,8px);font-size:0.9rem;font-weight:700;cursor:pointer;border-right:none;min-width:6rem;margin-bottom:0}
.api-method-url input{flex:1;width:auto;border-radius:0;border-left:none;border-right:none;margin-bottom:0;padding:0.6rem 0.75rem;font-size:0.9rem}
.api-method-url button{padding:0.6rem 1.4rem;background:var(--accent,#6366f1);color:#fff;border:1px solid var(--accent,#6366f1);border-radius:0 var(--radius-sm,8px) var(--radius-sm,8px) 0;font-size:0.9rem;font-weight:700;cursor:pointer;white-space:nowrap;transition:opacity .15s}
.api-method-url button:hover{opacity:0.85}
.api-method-url button:disabled{opacity:0.5;cursor:not-allowed}

/* Tabs */
.api-tabs{display:flex;gap:0;border-bottom:1px solid var(--border,#2a2d3a);margin-bottom:0}
.api-tab{padding:0.5rem 1rem;cursor:pointer;font-size:0.85rem;font-weight:600;color:#555;border-bottom:2px solid transparent;transition:color .15s,border-color .15s,background .15s;user-select:none;border-radius:var(--radius-sm,8px) var(--radius-sm,8px) 0 0}
.api-tab:hover{color:var(--text,#e4e4e7);background:var(--surface-hover,#22242e)}
.api-tab.active{color:var(--accent,#6366f1);border-bottom-color:var(--accent,#6366f1);background:rgba(99,102,241,0.08)}

/* Panels */
.api-panel{padding:0.75rem 0}

/* Key-value rows */
.api-kv-list{display:flex;flex-direction:column;gap:0.4rem}
.api-kv-row{display:flex;gap:0.4rem;align-items:center}
.api-kv-row input{flex:1;margin-bottom:0;font-size:0.85rem;padding:0.45rem 0.6rem}
.api-kv-row .api-kv-del{background:none;border:none;color:var(--text-muted,#9ca3af);cursor:pointer;font-size:1.1rem;padding:0 0.35rem;line-height:1;transition:color .15s;flex-shrink:0}
.api-kv-row .api-kv-del:hover{color:#ef4444}
.api-add-row{background:none;border:1px dashed var(--border,#2a2d3a);color:var(--text-muted,#9ca3af);padding:0.4rem 0.8rem;border-radius:var(--radius-sm,8px);font-size:0.82rem;cursor:pointer;margin-top:0.4rem;transition:color .15s,border-color .15s}
.api-add-row:hover{color:var(--accent,#6366f1);border-color:var(--accent,#6366f1)}

/* Body type radios */
.api-body-types{display:flex;gap:0.5rem;margin-bottom:0.75rem}
.api-body-radio{font-size:0.85rem;display:flex;align-items:center;gap:0.35rem;cursor:pointer;color:#555;padding:0.35rem 0.7rem;border:1px solid var(--border,#2a2d3a);border-radius:var(--radius-sm,8px);transition:color .15s,border-color .15s,background .15s}
.api-body-radio:hover{color:var(--text,#e4e4e7);border-color:var(--text-muted,#9ca3af)}
.api-body-radio:has(input:checked){color:var(--accent,#6366f1);border-color:var(--accent,#6366f1);background:rgba(99,102,241,0.1)}
.api-body-radio input{accent-color:var(--accent,#6366f1);cursor:pointer}
#api-body-editor{font-family:'SF Mono',SFMono-Regular,Menlo,Consolas,monospace;font-size:0.85rem;resize:vertical;width:100%;box-sizing:border-box}

/* Response bar */
.api-response{border-top:1px solid var(--border,#2a2d3a);padding-top:0.75rem}
.api-resp-bar{display:flex;gap:1rem;align-items:center;margin-bottom:0.5rem;flex-wrap:wrap}
.api-resp-status{font-weight:700;font-size:0.95rem;padding:0.2rem 0.6rem;border-radius:4px;font-family:'SF Mono',SFMono-Regular,Menlo,Consolas,monospace}
.api-resp-status.s-2xx{background:rgba(34,197,94,0.15);color:#22c55e}
.api-resp-status.s-3xx{background:rgba(59,130,246,0.15);color:#3b82f6}
.api-resp-status.s-4xx{background:rgba(245,158,11,0.15);color:#f59e0b}
.api-resp-status.s-5xx{background:rgba(239,68,68,0.15);color:#ef4444}
.api-resp-time,.api-resp-size{font-size:0.82rem;color:var(--text-muted,#9ca3af)}

/* Response body/headers */
.api-resp-body-bar{display:flex;gap:0.5rem;justify-content:flex-end;margin-bottom:0.4rem}
.api-small-btn{background:var(--surface,#1a1c25);border:1px solid var(--border,#2a2d3a);color:var(--text-muted,#9ca3af);padding:0.25rem 0.65rem;border-radius:4px;font-size:0.78rem;cursor:pointer;transition:color .15s,background .15s}
.api-small-btn:hover{color:var(--text,#e4e4e7);background:var(--surface-hover,#22242e)}
.api-small-btn.active{color:var(--accent,#6366f1);border-color:var(--accent,#6366f1)}
.api-resp-output{background:var(--bg,#0f1117);border:1px solid var(--border,#2a2d3a);border-radius:var(--radius-sm,8px);padding:0.85rem;font-family:'SF Mono',SFMono-Regular,Menlo,Consolas,monospace;font-size:0.82rem;line-height:1.6;overflow-x:auto;white-space:pre-wrap;word-break:break-word;color:var(--text,#e4e4e7);max-height:24rem;overflow-y:auto;margin:0}
.api-resp-hdr{font-size:0.8rem;color:var(--text-muted,#9ca3af)}

/* Error / loading */
.api-error{color:#ef4444;font-size:0.85rem;padding:0.6rem 0.85rem;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.25);border-radius:var(--radius-sm,8px)}
.api-loading{display:flex;align-items:center;gap:0.6rem;color:var(--text-muted,#9ca3af);font-size:0.85rem;padding:0.5rem 0}
.api-spinner{width:16px;height:16px;border:2px solid var(--border,#2a2d3a);border-top-color:var(--accent,#6366f1);border-radius:50%;animation:api-spin .6s linear infinite;flex-shrink:0}
@keyframes api-spin{to{transform:rotate(360deg)}}

/* Toast */
.api-toast{position:fixed;bottom:1.5rem;left:50%;transform:translateX(-50%);background:var(--accent,#6366f1);color:#fff;padding:0.45rem 1.1rem;border-radius:var(--radius-sm,8px);font-size:0.85rem;font-weight:600;opacity:0;transition:opacity .25s;pointer-events:none;z-index:999}
.api-toast.show{opacity:1}
</style>

<script>
(function(){
  /* ---- State ---- */
  var rawBody="";
  var formattedBody="";
  var showRaw=false;
  var currentBodyType="none";

  /* ---- Toast ---- */
  var toast=document.createElement("div");
  toast.className="api-toast";toast.textContent="Copied";
  document.body.appendChild(toast);
  var toastTimer;
  function showToast(msg){
    toast.textContent=msg||"Copied";
    clearTimeout(toastTimer);
    toast.classList.add("show");
    toastTimer=setTimeout(function(){toast.classList.remove("show")},1200);
  }

  /* ---- Request tabs ---- */
  window.apiReqTab=function(el){
    var tabs=document.querySelectorAll("#api-req-tabs .api-tab");
    tabs.forEach(function(t){t.classList.remove("active")});
    el.classList.add("active");
    document.getElementById("api-panel-params").style.display="none";
    document.getElementById("api-panel-headers").style.display="none";
    document.getElementById("api-panel-body").style.display="none";
    document.getElementById("api-panel-"+el.dataset.tab).style.display="block";
  };

  /* ---- Response tabs ---- */
  window.apiRespTab=function(el){
    var tabs=document.querySelectorAll("#api-resp-tabs .api-tab");
    tabs.forEach(function(t){t.classList.remove("active")});
    el.classList.add("active");
    document.getElementById("api-panel-resp-body").style.display="none";
    document.getElementById("api-panel-resp-headers").style.display="none";
    document.getElementById("api-panel-"+el.dataset.tab).style.display="block";
  };

  /* ---- Key-value rows ---- */
  function makeKVRow(container){
    var row=document.createElement("div");
    row.className="api-kv-row";
    var k=document.createElement("input");
    k.type="text";k.placeholder="Key";k.className="api-kv-key";
    var v=document.createElement("input");
    v.type="text";v.placeholder="Value";v.className="api-kv-val";
    var del=document.createElement("button");
    del.type="button";del.className="api-kv-del";del.textContent="✕";del.title="Remove";
    del.onclick=function(){row.remove()};
    row.appendChild(k);row.appendChild(v);row.appendChild(del);
    container.appendChild(row);
    k.focus();
    return row;
  }

  window.apiAddParam=function(){makeKVRow(document.getElementById("api-params-list"))};
  window.apiAddHeader=function(){makeKVRow(document.getElementById("api-headers-list"))};

  function collectKV(listId){
    var pairs=[];
    var rows=document.querySelectorAll("#"+listId+" .api-kv-row");
    rows.forEach(function(r){
      var k=r.querySelector(".api-kv-key").value.trim();
      var v=r.querySelector(".api-kv-val").value;
      if(k) pairs.push([k,v]);
    });
    return pairs;
  }

  /* Seed one empty row each */
  makeKVRow(document.getElementById("api-params-list"));
  makeKVRow(document.getElementById("api-headers-list"));

  /* ---- Body type toggle ---- */
  window.apiBodyType=function(radio){
    currentBodyType=radio.value;
    var editor=document.getElementById("api-body-editor");
    editor.style.display=(radio.value==="none")?"none":"block";
    if(radio.value==="json") editor.placeholder='{\n  "key": "value"\n}';
    else if(radio.value==="form") editor.placeholder="key=value&other=data";
    else if(radio.value==="raw") editor.placeholder="Raw request body…";
  };

  /* ---- Build URL with query params ---- */
  function buildURL(base){
    var params=collectKV("api-params-list");
    if(!params.length) return base;
    var url;
    try{url=new URL(base)}catch(e){return base}
    params.forEach(function(p){url.searchParams.append(p[0],p[1])});
    return url.toString();
  }

  /* ---- Format bytes ---- */
  function fmtBytes(n){
    if(n<1024) return n+" B";
    if(n<1048576) return(n/1024).toFixed(1)+" KB";
    return(n/1048576).toFixed(1)+" MB";
  }

  /* ---- Status class ---- */
  function statusClass(code){
    if(code>=200&&code<300) return "s-2xx";
    if(code>=300&&code<400) return "s-3xx";
    if(code>=400&&code<500) return "s-4xx";
    return "s-5xx";
  }

  /* ---- Try format JSON ---- */
  function tryFormatJSON(text){
    try{return JSON.stringify(JSON.parse(text),null,2)}catch(e){return null}
  }

  /* ---- Toggle raw ---- */
  window.apiToggleRaw=function(){
    showRaw=!showRaw;
    var btn=document.getElementById("api-resp-raw-btn");
    btn.classList.toggle("active",showRaw);
    document.getElementById("api-resp-body").textContent=showRaw?rawBody:(formattedBody||rawBody);
  };

  /* ---- Copy response ---- */
  window.apiCopyResp=function(){
    var text=document.getElementById("api-resp-body").textContent;
    if(!text) return;
    navigator.clipboard.writeText(text).then(function(){showToast("Copied")});
  };

  /* ---- Send request ---- */
  window.apiSend=function(){
    var method=document.getElementById("api-method").value;
    var urlRaw=document.getElementById("api-url").value.trim();
    if(!urlRaw){document.getElementById("api-url").focus();return}

    /* Add protocol if missing */
    if(!/^https?:\/\//i.test(urlRaw)) urlRaw="https://"+urlRaw;

    var url=buildURL(urlRaw);

    /* Validate URL */
    try{new URL(url)}catch(e){
      showError("Invalid URL. Please enter a valid HTTP or HTTPS address.");return;
    }

    /* Collect headers */
    var headerPairs=collectKV("api-headers-list");
    var headers=new Headers();
    headerPairs.forEach(function(p){headers.append(p[0],p[1])});

    /* Build body */
    var body=undefined;
    if(method!=="GET"&&method!=="HEAD"){
      if(currentBodyType==="json"){
        body=document.getElementById("api-body-editor").value;
        if(!headers.has("Content-Type")) headers.set("Content-Type","application/json");
      } else if(currentBodyType==="form"){
        body=document.getElementById("api-body-editor").value;
        if(!headers.has("Content-Type")) headers.set("Content-Type","application/x-www-form-urlencoded");
      } else if(currentBodyType==="raw"){
        body=document.getElementById("api-body-editor").value;
        if(!headers.has("Content-Type")) headers.set("Content-Type","text/plain");
      }
    }

    /* UI state */
    hideError();
    document.getElementById("api-response").style.display="none";
    document.getElementById("api-loading").style.display="flex";
    document.getElementById("api-send").disabled=true;

    var t0=performance.now();

    fetch(url,{method:method,headers:headers,body:body}).then(function(resp){
      var elapsed=performance.now()-t0;
      document.getElementById("api-loading").style.display="none";
      document.getElementById("api-send").disabled=false;
      document.getElementById("api-response").style.display="block";

      /* Status */
      var statusEl=document.getElementById("api-resp-status");
      statusEl.textContent=resp.status+" "+resp.statusText;
      statusEl.className="api-resp-status "+statusClass(resp.status);

      /* Time */
      document.getElementById("api-resp-time").textContent=Math.round(elapsed)+" ms";

      /* Response headers */
      var hdrText="";
      resp.headers.forEach(function(v,k){hdrText+=k+": "+v+"\n"});
      document.getElementById("api-resp-headers").textContent=hdrText.trim();

      /* Body */
      return resp.text().then(function(text){
        rawBody=text;
        formattedBody=tryFormatJSON(text);
        showRaw=false;
        document.getElementById("api-resp-raw-btn").classList.remove("active");
        document.getElementById("api-resp-body").textContent=formattedBody||rawBody;
        document.getElementById("api-resp-size").textContent=fmtBytes(new Blob([text]).size);
      });
    }).catch(function(err){
      document.getElementById("api-loading").style.display="none";
      document.getElementById("api-send").disabled=false;
      showError(err.message||"Request failed. This may be caused by CORS restrictions, a network error, or an invalid URL.");
    });
  };

  function showError(msg){
    var el=document.getElementById("api-error");
    el.textContent=msg;el.style.display="block";
  }
  function hideError(){document.getElementById("api-error").style.display="none"}

  /* ---- Enter key sends ---- */
  document.getElementById("api-url").addEventListener("keydown",function(e){
    if(e.key==="Enter"){e.preventDefault();apiSend()}
  });
})();
</script>

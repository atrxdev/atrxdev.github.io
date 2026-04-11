---
title: JSON Formatter / Minifier
description: "Format, validate, and minify JSON instantly in your browser to clean API payloads, debug responses, and improve readability."
tool_explanation: |-
  This tool formats messy JSON into readable, indented output or minifies structured JSON into a compact single line. It validates syntax as you work and highlights errors with line numbers, making it useful for debugging API responses, configuration files, and data payloads without leaving your browser.
how_to_use:
  - Paste or type JSON into the input area.
  - Select Format to pretty-print the JSON with indentation, or Minify to compress it into a single line.
  - If the JSON has syntax errors, the tool will show the error message and position.
  - Copy the result using the copy button or adjust the indentation size to match your project style.
tool_article: |-
  JSON has become the default data format for web APIs, configuration files, logging systems, and data exchange between services. Its simplicity is a strength, but that simplicity also means there is no built-in way to enforce readability. A response from an API typically arrives as a dense, unformatted string. A configuration file written by a generator may have no line breaks at all. A log entry might contain deeply nested objects compressed into a single line. In all of these cases, a formatter turns opaque data into something a human can actually read and reason about.

  Formatting JSON means adding consistent indentation, line breaks, and spacing so the structure of the data becomes visually apparent. Keys and values align in a way that makes it easy to see nesting levels, spot missing commas or brackets, and understand the shape of the data at a glance. Two spaces and four spaces are the most common indentation choices. Two spaces keep the output compact, which matters for deeply nested structures. Four spaces provide more visual separation, which can be easier to scan for simpler payloads. The right choice depends on context and team convention.

  Minification is the opposite operation. It removes all unnecessary whitespace, line breaks, and indentation to produce the smallest possible valid JSON string. This is useful when you need to embed JSON in a URL parameter, a single-line configuration field, a log entry, or any context where compact size matters. Minified JSON is harder to read, which is the point. It is optimized for machines, not humans. A good workflow often involves formatting for inspection and editing, then minifying for storage or transmission.

  Validation is the most immediately practical feature. JSON syntax is strict. A missing comma, an extra trailing comma, a single quote instead of a double quote, or an unescaped character inside a string will make the entire payload invalid. Many systems fail silently or return confusing errors when they receive malformed JSON. A validator catches these issues instantly and tells you where the problem is, which saves time compared to hunting through a long string by eye or waiting for a downstream system to reject it.

  Common JSON mistakes include trailing commas after the last item in an array or object, using single quotes instead of double quotes for strings, including comments which are not part of the JSON specification, and forgetting to escape special characters inside strings. These errors are easy to make, especially when editing JSON by hand or converting from another format. A formatter that validates as it formats catches these problems at the point of editing rather than at the point of failure.

  For developers, a browser-based JSON tool is useful during API development and debugging. You can paste a response body, format it to inspect the structure, make edits, validate the result, and minify it again to send back in a request. That round trip happens frequently during integration work, testing, and troubleshooting. Having it available without installing anything or switching to a terminal keeps the workflow fast and focused.

  Non-developers also work with JSON more often than they might expect. Marketing platforms, analytics tools, webhook configurations, and CMS integrations frequently expose or accept JSON. Being able to format and validate a payload without asking for engineering help removes a bottleneck. The tool does not require any knowledge of programming. If you can paste text and press a button, you can inspect and clean up JSON.

  A good JSON formatter handles edge cases gracefully. Very large payloads should still format without freezing the page. Deeply nested structures should remain readable. Unicode content, empty objects, and arrays of mixed types should all produce correct output. Error messages should point to the location of the problem rather than just saying the input is invalid. These details are what separate a useful tool from a frustrating one.

  The combination of formatting, minification, and validation covers the three most common JSON tasks in a single interface. Format when you need to read. Minify when you need to ship. Validate when something is not working. That covers most of what people actually need from a JSON utility in day-to-day work.
faqs:
  - question: Does this tool send my JSON to a server?
    answer: |-
      No. All formatting, minification, and validation happen locally in your browser. Your data is not transmitted anywhere.
  - question: Why does my JSON fail validation?
    answer: |-
      Common causes include trailing commas, single quotes instead of double quotes, missing commas between items, unescaped special characters, and comments. The error message will show the position of the first problem found.
  - question: What indentation options are available?
    answer: |-
      You can choose between two-space and four-space indentation, or tab indentation. The default is two spaces.
  - question: Can I format JSON with comments?
    answer: |-
      The JSON specification does not allow comments. If your input contains comments, they must be removed before the JSON can be parsed and formatted.
  - question: Is there a size limit?
    answer: |-
      There is no fixed limit, but very large payloads may be slow to format depending on your browser and device memory.
---

<div class="jf-tool">
  <div class="jf-toolbar">
    <div class="jf-toolbar-left">
      <button type="button" class="jf-btn jf-btn-primary" onclick="formatJSON()">Format</button>
      <button type="button" class="jf-btn" onclick="minifyJSON()">Minify</button>
    </div>
    <div class="jf-toolbar-right">
      <label class="jf-indent-label" for="jf-indent">Indent:</label>
      <select id="jf-indent">
        <option value="2" selected>2 spaces</option>
        <option value="4">4 spaces</option>
        <option value="tab">Tab</option>
      </select>
      <button type="button" class="jf-btn jf-copy" id="jf-copy" onclick="copyJF()" title="Copy output">
        <svg class="jf-copy-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        <svg class="jf-check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><polyline points="20 6 9 17 4 12"/></svg>
      </button>
      <button type="button" class="jf-btn jf-clear" onclick="clearJF()" title="Clear">Clear</button>
    </div>
  </div>

  <div class="jf-editor-wrap">
    <div class="jf-line-numbers" id="jf-lines"></div>
    <textarea id="jf-input" spellcheck="false" placeholder='Paste JSON here…&#10;&#10;Example:&#10;{"name":"Alice","age":30,"tags":["dev","design"]}'></textarea>
  </div>

  <div class="jf-status" id="jf-status"></div>
</div>

<style>
.jf-tool{display:flex;flex-direction:column;gap:0}
.jf-toolbar{display:flex;justify-content:space-between;align-items:center;gap:0.75rem;flex-wrap:wrap;padding-bottom:0.75rem}
.jf-toolbar-left,.jf-toolbar-right{display:flex;align-items:center;gap:0.5rem}
.jf-btn{padding:0.45rem 1rem;border-radius:var(--radius-sm,8px);border:1px solid var(--border,#2a2d3a);background:var(--surface,#1a1c25);color:var(--text,#e4e4e7);font-size:0.85rem;font-weight:600;cursor:pointer;transition:background .2s,color .2s;white-space:nowrap}
.jf-btn:hover{background:var(--surface-hover,#22242e)}
.jf-btn-primary{background:var(--accent,#6366f1);color:#fff;border-color:var(--accent,#6366f1)}
.jf-btn-primary:hover{background:var(--accent-hover,#818cf8);border-color:var(--accent-hover,#818cf8)}
.jf-indent-label{font-size:0.82rem;color:var(--text-muted,#9ca3af);white-space:nowrap;line-height:1;margin:0;padding:0;display:flex;align-items:center}
#jf-indent{padding:0.4rem 0.5rem;background:var(--bg,#0f1117);color:var(--text,#e4e4e7);border:1px solid var(--border,#2a2d3a);border-radius:var(--radius-sm,8px);font-size:0.82rem;margin:0}
.jf-copy,.jf-clear{padding:0.45rem 0.65rem;display:flex;align-items:center;gap:0.3rem}
.jf-copy.copied{color:var(--success,#22c55e);border-color:var(--success,#22c55e)}
.jf-editor-wrap{position:relative;display:flex;border:1px solid var(--border,#2a2d3a);border-radius:var(--radius-sm,8px);overflow:hidden;background:var(--bg,#0f1117)}
.jf-line-numbers{width:3.5rem;padding:0.75rem 0.5rem;text-align:right;font-family:'SF Mono',SFMono-Regular,Menlo,Consolas,monospace;font-size:0.82rem;line-height:1.55;color:var(--text-muted,#9ca3af);opacity:0.5;background:var(--surface,#1a1c25);border-right:1px solid var(--border,#2a2d3a);user-select:none;overflow:hidden;flex-shrink:0}
#jf-input{flex:1;min-height:320px;padding:0.75rem;font-family:'SF Mono',SFMono-Regular,Menlo,Consolas,monospace;font-size:0.85rem;line-height:1.55;background:transparent;color:var(--text,#e4e4e7);border:none;outline:none;resize:vertical;tab-size:2;white-space:pre;overflow-wrap:normal;overflow-x:auto}
.jf-status{min-height:1.6rem;padding:0.5rem 0.25rem;font-size:0.85rem;line-height:1.4}
.jf-status.valid{color:var(--success,#22c55e)}
.jf-status.error{color:#ef4444}
.jf-status.info{color:var(--text-muted,#9ca3af)}
</style>

<script>
(function(){
  var input=document.getElementById("jf-input");
  var linesEl=document.getElementById("jf-lines");
  var statusEl=document.getElementById("jf-status");
  var indentSel=document.getElementById("jf-indent");

  function updateLines(){
    var count=input.value.split("\n").length;
    var nums=[];
    for(var i=1;i<=count;i++)nums.push(i);
    linesEl.textContent=nums.join("\n");
  }

  function syncScroll(){
    linesEl.scrollTop=input.scrollTop;
  }

  input.addEventListener("input",updateLines);
  input.addEventListener("scroll",syncScroll);
  updateLines();

  function getIndent(){
    var v=indentSel.value;
    if(v==="tab")return "\t";
    return parseInt(v)||2;
  }

  function setStatus(msg,cls){
    statusEl.textContent=msg;
    statusEl.className="jf-status "+(cls||"");
  }

  window.formatJSON=function(){
    var raw=input.value.trim();
    if(!raw){setStatus("Paste some JSON first.","info");return}
    try{
      var obj=JSON.parse(raw);
      var indent=getIndent();
      input.value=JSON.stringify(obj,null,indent);
      updateLines();
      setStatus("✓ Valid JSON — formatted","valid");
    }catch(e){
      setStatus("✗ "+e.message,"error");
    }
  };

  window.minifyJSON=function(){
    var raw=input.value.trim();
    if(!raw){setStatus("Paste some JSON first.","info");return}
    try{
      var obj=JSON.parse(raw);
      input.value=JSON.stringify(obj);
      updateLines();
      setStatus("✓ Valid JSON — minified","valid");
    }catch(e){
      setStatus("✗ "+e.message,"error");
    }
  };

  window.copyJF=function(){
    if(!input.value)return;
    navigator.clipboard.writeText(input.value);
    var btn=document.getElementById("jf-copy");
    var ci=btn.querySelector(".jf-copy-icon");
    var ch=btn.querySelector(".jf-check-icon");
    btn.classList.add("copied");
    ci.style.display="none";ch.style.display="";
    setTimeout(function(){
      btn.classList.remove("copied");
      ci.style.display="";ch.style.display="none";
    },1500);
  };

  window.clearJF=function(){
    input.value="";
    updateLines();
    setStatus("","");
  };

  /* live validation on input */
  var valTimer=null;
  input.addEventListener("input",function(){
    clearTimeout(valTimer);
    valTimer=setTimeout(function(){
      var raw=input.value.trim();
      if(!raw){setStatus("","");return}
      try{
        JSON.parse(raw);
        setStatus("✓ Valid JSON","valid");
      }catch(e){
        setStatus("✗ "+e.message,"error");
      }
    },300);
  });

  /* tab key inserts indent instead of moving focus */
  input.addEventListener("keydown",function(e){
    if(e.key==="Tab"){
      e.preventDefault();
      var start=input.selectionStart;
      var end=input.selectionEnd;
      var indent=getIndent();
      var tab=typeof indent==="string"?indent:" ".repeat(indent);
      input.value=input.value.substring(0,start)+tab+input.value.substring(end);
      input.selectionStart=input.selectionEnd=start+tab.length;
      updateLines();
    }
  });
})();
</script>

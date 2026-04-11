---
title: JSON to YAML Converter
description: "Convert JSON to YAML instantly in your browser for configuration files, APIs, automation scripts, and developer workflows."
tool_explanation: |-
  This tool parses JSON input and converts it to clean, readable YAML output. It validates the JSON syntax as you work, highlights errors with descriptive messages, and lets you choose the indentation level for the resulting YAML. Everything runs locally in your browser with no data sent to any server.
how_to_use:
  - Paste or type JSON into the input area on the left.
  - The tool automatically converts the JSON to YAML and displays the result on the right.
  - If the JSON has syntax errors, an error message will appear below the input.
  - Adjust the indentation level using the dropdown, then copy the YAML output with the copy button.
tool_article: |-
  JSON and YAML serve overlapping purposes but with different strengths. JSON is strict, widely supported, and the default for web APIs and JavaScript-heavy environments. YAML is more human-readable, supports comments, and uses indentation rather than brackets to represent structure, making it the preferred format for configuration files in tools like Kubernetes, Docker Compose, Ansible, GitHub Actions, and many CI/CD systems.

  Converting JSON to YAML is a common task when migrating configuration between systems, when you want to make a JSON payload more readable, or when a tool or platform expects YAML input but your data source produces JSON. API responses, exported settings, and generated configurations often arrive as JSON and need to be converted to YAML for use in infrastructure files, documentation, or human review.

  The conversion is straightforward for basic data types. JSON objects become YAML mappings, arrays become YAML sequences, strings remain strings, and numbers and booleans carry over directly. Null values in JSON become null or a tilde in YAML. The main visible change is the removal of braces, brackets, and quotation marks in favor of indentation and dashes, which makes the output significantly easier to scan.

  Some JSON structures produce verbose YAML. Deeply nested objects with many levels of indentation can become harder to follow in YAML than in JSON, because you lose the visual anchoring of closing braces. Arrays of simple values are sometimes more compact in JSON's bracket notation than in YAML's dash-per-line format. In these cases, having both formats side by side helps you decide which representation is more appropriate for your use case.

  Strings that contain special characters, colons, or leading indicators like asterisks may be quoted in the YAML output to avoid ambiguity. This is correct behavior. YAML has complex rules about when quoting is required, and a good converter handles these edge cases automatically so the output is always valid.

  A browser-based converter is useful for quick transformations during development, debugging, and documentation work. You can paste a JSON response, see the YAML equivalent immediately, copy it, and move on. No installation, no terminal, no dependencies. For ad-hoc conversions during a work session, this is faster than writing a script or finding a command-line tool.
faqs:
  - question: Does this tool send my data to a server?
    answer: |-
      No. All parsing and conversion happen locally in your browser. Your data never leaves your device.
  - question: Does the YAML output include comments?
    answer: |-
      No. JSON does not support comments, so there is no comment information to carry over. The output is plain YAML without comments.
  - question: Why are some strings quoted in the YAML output?
    answer: |-
      YAML requires quoting for strings that contain special characters, leading indicators, or values that could be misinterpreted as other types. The converter adds quotes where necessary to produce valid YAML.
  - question: Can I convert YAML back to JSON?
    answer: |-
      Yes. Use the YAML to JSON Converter tool available on this site.
  - question: Is there a size limit?
    answer: |-
      There is no fixed limit, but very large inputs may be slow depending on your browser and device.
---

<div class="j2y-tool">
  <div class="j2y-toolbar">
    <div class="j2y-toolbar-left">
      <span class="j2y-label">JSON</span>
      <svg class="j2y-arrow" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      <span class="j2y-label">YAML</span>
    </div>
    <div class="j2y-toolbar-right">
      <label class="j2y-indent-label" for="j2y-indent">Indent:</label>
      <select id="j2y-indent">
        <option value="2" selected>2 spaces</option>
        <option value="4">4 spaces</option>
      </select>
      <button type="button" class="j2y-btn j2y-copy" id="j2y-copy" onclick="copyJ2Y()" title="Copy YAML output">
        <svg class="j2y-copy-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        <svg class="j2y-check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><polyline points="20 6 9 17 4 12"/></svg>
      </button>
      <button type="button" class="j2y-btn j2y-clear" onclick="clearJ2Y()" title="Clear">Clear</button>
    </div>
  </div>

  <div class="j2y-panels">
    <div class="j2y-panel">
      <div class="j2y-editor-wrap">
        <div class="j2y-line-numbers" id="j2y-lines-in"></div>
        <textarea id="j2y-input" spellcheck="false" placeholder='Paste JSON here…&#10;&#10;Example:&#10;{&#10;  "name": "Alice",&#10;  "age": 30,&#10;  "tags": ["dev", "design"]&#10;}'></textarea>
      </div>
    </div>
    <div class="j2y-panel">
      <div class="j2y-editor-wrap">
        <div class="j2y-line-numbers" id="j2y-lines-out"></div>
        <textarea id="j2y-output" spellcheck="false" readonly placeholder="YAML output will appear here…"></textarea>
      </div>
    </div>
  </div>

  <div class="j2y-status" id="j2y-status"></div>
</div>

<style>
.j2y-tool{display:flex;flex-direction:column;gap:0}
.j2y-toolbar{display:flex;justify-content:space-between;align-items:center;gap:0.75rem;flex-wrap:wrap;padding-bottom:0.75rem}
.j2y-toolbar-left,.j2y-toolbar-right{display:flex;align-items:center;gap:0.5rem}
.j2y-label{font-size:0.85rem;font-weight:600;color:var(--text,#e4e4e7)}
.j2y-arrow{color:var(--text-muted,#9ca3af)}
.j2y-btn{padding:0.45rem 1rem;border-radius:var(--radius-sm,8px);border:1px solid var(--border,#2a2d3a);background:var(--surface,#1a1c25);color:var(--text,#e4e4e7);font-size:0.85rem;font-weight:600;cursor:pointer;transition:background .2s,color .2s;white-space:nowrap}
.j2y-btn:hover{background:var(--surface-hover,#22242e)}
.j2y-indent-label{font-size:0.82rem;color:var(--text-muted,#9ca3af);white-space:nowrap;line-height:1;margin:0;padding:0;display:flex;align-items:center}
#j2y-indent{padding:0.4rem 0.5rem;background:var(--bg,#0f1117);color:var(--text,#e4e4e7);border:1px solid var(--border,#2a2d3a);border-radius:var(--radius-sm,8px);font-size:0.82rem;margin:0}
.j2y-copy,.j2y-clear{padding:0.45rem 0.65rem;display:flex;align-items:center;gap:0.3rem}
.j2y-copy.copied{color:var(--success,#22c55e);border-color:var(--success,#22c55e)}
.j2y-panels{display:grid;grid-template-columns:1fr 1fr;gap:0.75rem}
@media(max-width:700px){.j2y-panels{grid-template-columns:1fr}}
.j2y-panel{display:flex;flex-direction:column}
.j2y-editor-wrap{position:relative;display:flex;border:1px solid var(--border,#2a2d3a);border-radius:var(--radius-sm,8px);overflow:hidden;background:var(--bg,#0f1117);height:100%}
.j2y-line-numbers{width:3rem;padding:0.75rem 0.4rem;text-align:right;font-family:'SF Mono',SFMono-Regular,Menlo,Consolas,monospace;font-size:0.82rem;line-height:1.55;color:var(--text-muted,#9ca3af);opacity:0.5;background:var(--surface,#1a1c25);border-right:1px solid var(--border,#2a2d3a);user-select:none;overflow:hidden;flex-shrink:0}
#j2y-input,#j2y-output{flex:1;min-height:280px;padding:0.75rem;font-family:'SF Mono',SFMono-Regular,Menlo,Consolas,monospace;font-size:0.85rem;line-height:1.55;background:transparent;color:var(--text,#e4e4e7);border:none;outline:none;resize:vertical;tab-size:2;white-space:pre;overflow-wrap:normal;overflow-x:auto}
#j2y-output{color:var(--text-muted,#b0b0b8);cursor:default}
.j2y-status{min-height:1.6rem;padding:0.5rem 0.25rem;font-size:0.85rem;line-height:1.4}
.j2y-status.valid{color:var(--success,#22c55e)}
.j2y-status.error{color:#ef4444}
.j2y-status.info{color:var(--text-muted,#9ca3af)}
</style>

<script src="https://cdn.jsdelivr.net/npm/js-yaml@4/dist/js-yaml.min.js"></script>
<script>
(function(){
  var input=document.getElementById("j2y-input");
  var output=document.getElementById("j2y-output");
  var linesIn=document.getElementById("j2y-lines-in");
  var linesOut=document.getElementById("j2y-lines-out");
  var statusEl=document.getElementById("j2y-status");
  var indentSel=document.getElementById("j2y-indent");

  function updateLines(el,textarea){
    var count=textarea.value.split("\n").length;
    var nums=[];
    for(var i=1;i<=count;i++) nums.push(i);
    el.textContent=nums.join("\n");
  }

  function syncScroll(linesEl,textarea){
    linesEl.scrollTop=textarea.scrollTop;
  }

  input.addEventListener("scroll",function(){syncScroll(linesIn,input)});
  output.addEventListener("scroll",function(){syncScroll(linesOut,output)});

  function getIndent(){
    return parseInt(indentSel.value)||2;
  }

  function setStatus(msg,cls){
    statusEl.textContent=msg;
    statusEl.className="j2y-status "+(cls||"");
  }

  function convert(){
    var raw=input.value;
    updateLines(linesIn,input);
    if(!raw.trim()){
      output.value="";
      updateLines(linesOut,output);
      setStatus("","");
      return;
    }
    try{
      var obj=JSON.parse(raw);
      var indent=getIndent();
      output.value=jsyaml.dump(obj,{indent:indent,lineWidth:-1,noRefs:true,sortKeys:false});
      updateLines(linesOut,output);
      setStatus("✓ Valid JSON — converted to YAML","valid");
    }catch(e){
      output.value="";
      updateLines(linesOut,output);
      setStatus("✗ "+e.message,"error");
    }
  }

  var timer=null;
  input.addEventListener("input",function(){
    clearTimeout(timer);
    timer=setTimeout(convert,200);
  });

  indentSel.addEventListener("change",convert);

  window.copyJ2Y=function(){
    if(!output.value) return;
    navigator.clipboard.writeText(output.value);
    var btn=document.getElementById("j2y-copy");
    var ci=btn.querySelector(".j2y-copy-icon");
    var ch=btn.querySelector(".j2y-check-icon");
    btn.classList.add("copied");
    ci.style.display="none";ch.style.display="";
    setTimeout(function(){
      btn.classList.remove("copied");
      ci.style.display="";ch.style.display="none";
    },1500);
  };

  window.clearJ2Y=function(){
    input.value="";
    output.value="";
    updateLines(linesIn,input);
    updateLines(linesOut,output);
    setStatus("","");
  };

  input.addEventListener("keydown",function(e){
    if(e.key==="Tab"){
      e.preventDefault();
      var start=input.selectionStart;
      var end=input.selectionEnd;
      var tab="  ";
      input.value=input.value.substring(0,start)+tab+input.value.substring(end);
      input.selectionStart=input.selectionEnd=start+tab.length;
      updateLines(linesIn,input);
    }
  });

  updateLines(linesIn,input);
  updateLines(linesOut,output);
})();
</script>

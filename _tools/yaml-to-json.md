---
title: YAML to JSON Converter
description: "Convert YAML to JSON instantly in your browser for configs, APIs, developer tooling, and quick data transformation tasks."
tool_explanation: |-
  This tool parses YAML input and converts it to well-formatted JSON output. It validates the YAML syntax as you work, highlights errors with descriptive messages, and lets you choose the indentation style for the resulting JSON. Everything runs locally in your browser with no data sent to any server.
how_to_use:
  - Paste or type YAML into the input area on the left.
  - The tool automatically converts the YAML to JSON and displays the result on the right.
  - If the YAML has syntax errors, an error message will appear below the input.
  - Adjust the indentation level using the dropdown, then copy the JSON output with the copy button.
tool_article: |-
  YAML and JSON are two of the most widely used data serialization formats, and converting between them is a routine task for developers, DevOps engineers, and anyone working with configuration files or APIs. YAML is popular for configuration because it is human-readable, supports comments, and uses indentation to represent structure. JSON is the standard for web APIs, JavaScript environments, and many data interchange scenarios because it is strict, unambiguous, and universally supported by parsers.

  The need to convert YAML to JSON arises frequently. Kubernetes manifests, Ansible playbooks, Docker Compose files, and CI/CD pipeline configurations are typically written in YAML, but tooling, APIs, or downstream systems may require JSON. A developer might write a configuration in YAML for readability, then need to submit it as JSON to an API endpoint. A DevOps engineer might need to extract a section from a YAML file and embed it in a JSON-based system.

  YAML supports features that JSON does not, including comments, anchors and aliases for reuse, multi-line strings with various block styles, and complex key types. When converting to JSON, comments are discarded because JSON has no comment syntax. Anchors and aliases are resolved into their expanded values. Multi-line strings are joined according to their block scalar style. The result is a complete, standalone JSON document that captures all the data from the YAML source, even though some YAML-specific metadata is lost.

  Common conversion issues include incorrect indentation in the YAML source, which changes the structure of the data. A key that was intended to be nested might end up at the top level if its indentation is wrong. Tabs mixed with spaces cause parsing failures in most YAML parsers. Unquoted strings that look like numbers, booleans, or null values may be interpreted as those types rather than as text. For example, the unquoted value `yes` in YAML becomes the boolean `true` in JSON, and `3.0` becomes the number `3` rather than the string `"3.0"`. Being aware of these behaviors helps you verify that the conversion output matches your intent.

  A browser-based converter is convenient because it requires no installation, works on any device, and processes data locally. You can paste a snippet, check the result, and copy the JSON without switching to a terminal or installing a library. For quick checks during development, debugging, or documentation work, it saves time compared to writing a script or finding a command-line tool.
faqs:
  - question: Does this tool send my data to a server?
    answer: |-
      No. All parsing and conversion happen locally in your browser. Your data never leaves your device.
  - question: What happens to YAML comments during conversion?
    answer: |-
      Comments are discarded. JSON does not support comments, so they cannot be preserved in the output.
  - question: Why does my value change type after conversion?
    answer: |-
      YAML automatically interprets unquoted values like yes, no, true, false, null, and numbers. To keep a value as a string, wrap it in quotes in your YAML source.
  - question: Does this support multiple YAML documents in one input?
    answer: |-
      Only the first document is converted. If your input contains multiple documents separated by ---, only the first one will appear in the JSON output.
  - question: Is there a size limit?
    answer: |-
      There is no fixed limit, but very large inputs may be slow depending on your browser and device.
---

<div class="y2j-tool">
  <div class="y2j-toolbar">
    <div class="y2j-toolbar-left">
      <span class="y2j-label">YAML</span>
      <svg class="y2j-arrow" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      <span class="y2j-label">JSON</span>
    </div>
    <div class="y2j-toolbar-right">
      <label class="y2j-indent-label" for="y2j-indent">Indent:</label>
      <select id="y2j-indent">
        <option value="2" selected>2 spaces</option>
        <option value="4">4 spaces</option>
        <option value="tab">Tab</option>
      </select>
      <button type="button" class="y2j-btn y2j-copy" id="y2j-copy" onclick="copyY2J()" title="Copy JSON output">
        <svg class="y2j-copy-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        <svg class="y2j-check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><polyline points="20 6 9 17 4 12"/></svg>
      </button>
      <button type="button" class="y2j-btn y2j-clear" onclick="clearY2J()" title="Clear">Clear</button>
    </div>
  </div>

  <div class="y2j-panels">
    <div class="y2j-panel">
      <div class="y2j-editor-wrap">
        <div class="y2j-line-numbers" id="y2j-lines-in"></div>
        <textarea id="y2j-input" spellcheck="false" placeholder="Paste YAML here…&#10;&#10;Example:&#10;name: Alice&#10;age: 30&#10;tags:&#10;  - dev&#10;  - design"></textarea>
      </div>
    </div>
    <div class="y2j-panel">
      <div class="y2j-editor-wrap">
        <div class="y2j-line-numbers" id="y2j-lines-out"></div>
        <textarea id="y2j-output" spellcheck="false" readonly placeholder="JSON output will appear here…"></textarea>
      </div>
    </div>
  </div>

  <div class="y2j-status" id="y2j-status"></div>
</div>

<style>
.y2j-tool{display:flex;flex-direction:column;gap:0}
.y2j-toolbar{display:flex;justify-content:space-between;align-items:center;gap:0.75rem;flex-wrap:wrap;padding-bottom:0.75rem}
.y2j-toolbar-left,.y2j-toolbar-right{display:flex;align-items:center;gap:0.5rem}
.y2j-label{font-size:0.85rem;font-weight:600;color:var(--text,#e4e4e7)}
.y2j-arrow{color:var(--text-muted,#9ca3af)}
.y2j-btn{padding:0.45rem 1rem;border-radius:var(--radius-sm,8px);border:1px solid var(--border,#2a2d3a);background:var(--surface,#1a1c25);color:var(--text,#e4e4e7);font-size:0.85rem;font-weight:600;cursor:pointer;transition:background .2s,color .2s;white-space:nowrap}
.y2j-btn:hover{background:var(--surface-hover,#22242e)}
.y2j-indent-label{font-size:0.82rem;color:var(--text-muted,#9ca3af);white-space:nowrap;line-height:1;margin:0;padding:0;display:flex;align-items:center}
#y2j-indent{padding:0.4rem 0.5rem;background:var(--bg,#0f1117);color:var(--text,#e4e4e7);border:1px solid var(--border,#2a2d3a);border-radius:var(--radius-sm,8px);font-size:0.82rem;margin:0}
.y2j-copy,.y2j-clear{padding:0.45rem 0.65rem;display:flex;align-items:center;gap:0.3rem}
.y2j-copy.copied{color:var(--success,#22c55e);border-color:var(--success,#22c55e)}
.y2j-panels{display:grid;grid-template-columns:1fr 1fr;gap:0.75rem}
@media(max-width:700px){.y2j-panels{grid-template-columns:1fr}}
.y2j-panel{display:flex;flex-direction:column}
.y2j-editor-wrap{position:relative;display:flex;border:1px solid var(--border,#2a2d3a);border-radius:var(--radius-sm,8px);overflow:hidden;background:var(--bg,#0f1117);height:100%}
.y2j-line-numbers{width:3rem;padding:0.75rem 0.4rem;text-align:right;font-family:'SF Mono',SFMono-Regular,Menlo,Consolas,monospace;font-size:0.82rem;line-height:1.55;color:var(--text-muted,#9ca3af);opacity:0.5;background:var(--surface,#1a1c25);border-right:1px solid var(--border,#2a2d3a);user-select:none;overflow:hidden;flex-shrink:0}
#y2j-input,#y2j-output{flex:1;min-height:280px;padding:0.75rem;font-family:'SF Mono',SFMono-Regular,Menlo,Consolas,monospace;font-size:0.85rem;line-height:1.55;background:transparent;color:var(--text,#e4e4e7);border:none;outline:none;resize:vertical;tab-size:2;white-space:pre;overflow-wrap:normal;overflow-x:auto}
#y2j-output{color:var(--text-muted,#b0b0b8);cursor:default}
.y2j-status{min-height:1.6rem;padding:0.5rem 0.25rem;font-size:0.85rem;line-height:1.4}
.y2j-status.valid{color:var(--success,#22c55e)}
.y2j-status.error{color:#ef4444}
.y2j-status.info{color:var(--text-muted,#9ca3af)}
</style>

<script src="https://cdn.jsdelivr.net/npm/js-yaml@4/dist/js-yaml.min.js"></script>
<script>
(function(){
  var input=document.getElementById("y2j-input");
  var output=document.getElementById("y2j-output");
  var linesIn=document.getElementById("y2j-lines-in");
  var linesOut=document.getElementById("y2j-lines-out");
  var statusEl=document.getElementById("y2j-status");
  var indentSel=document.getElementById("y2j-indent");

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
    var v=indentSel.value;
    if(v==="tab") return "\t";
    return parseInt(v)||2;
  }

  function setStatus(msg,cls){
    statusEl.textContent=msg;
    statusEl.className="y2j-status "+(cls||"");
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
      var obj=jsyaml.load(raw);
      var indent=getIndent();
      output.value=JSON.stringify(obj,null,indent);
      updateLines(linesOut,output);
      setStatus("✓ Valid YAML — converted to JSON","valid");
    }catch(e){
      output.value="";
      updateLines(linesOut,output);
      var msg=e.message||String(e);
      if(e.mark) msg="Line "+(e.mark.line+1)+": "+msg;
      setStatus("✗ "+msg,"error");
    }
  }

  var timer=null;
  input.addEventListener("input",function(){
    clearTimeout(timer);
    timer=setTimeout(convert,200);
  });

  indentSel.addEventListener("change",convert);

  window.copyY2J=function(){
    if(!output.value) return;
    navigator.clipboard.writeText(output.value);
    var btn=document.getElementById("y2j-copy");
    var ci=btn.querySelector(".y2j-copy-icon");
    var ch=btn.querySelector(".y2j-check-icon");
    btn.classList.add("copied");
    ci.style.display="none";ch.style.display="";
    setTimeout(function(){
      btn.classList.remove("copied");
      ci.style.display="";ch.style.display="none";
    },1500);
  };

  window.clearY2J=function(){
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

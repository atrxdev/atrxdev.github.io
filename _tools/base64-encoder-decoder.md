---
title: Base64 Encode / Decode
description: Encode text to Base64 or decode Base64 back to text
---

<div class="b64-mode">
  <div class="b64-tab active" id="tab-encode" onclick="setMode('encode')">Encode</div>
  <div class="b64-tab" id="tab-decode" onclick="setMode('decode')">Decode</div>
</div>

<label id="input-label">Text to encode</label>
<textarea id="b64-input" rows="6" placeholder="Paste your text here…"></textarea>

<button onclick="convert()">Convert</button>

<label>Result</label>
<div class="b64-output-row">
  <textarea id="b64-output" rows="6" readonly placeholder="Result will appear here"></textarea>
  <button type="button" class="b64-copy" id="b64-copy" onclick="copyResult()" title="Copy result">
    <svg id="b64-copy-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
    <svg id="b64-check-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><polyline points="20 6 9 17 4 12"/></svg>
  </button>
</div>

<p class="b64-error" id="b64-error"></p>

<style>
  .b64-mode{display:flex;gap:0;margin-bottom:1.25rem;border-bottom:1px solid var(--border,#2a2d3a)}
  .b64-tab{flex:1;padding:0.6rem 1rem;border:none;border-bottom:2px solid transparent;background:transparent;color:var(--text-muted,#9ca3af);cursor:pointer;font-size:0.95rem;font-weight:500;transition:color .2s,border-color .2s}
  .b64-tab:hover{color:var(--text,#e4e4e7)}
  .b64-tab.active{color:var(--text,#e4e4e7);border-bottom-color:var(--accent,#6366f1)}
  .b64-output-row{display:flex;gap:0;align-items:stretch}
  .b64-output-row textarea{flex:1;border-top-right-radius:0;border-bottom-right-radius:0;margin-bottom:0}
  .b64-copy{background:var(--bg,#0f1117);border:1px solid var(--border,#2a2d3a);border-left:none;border-radius:0 var(--radius-sm,8px) var(--radius-sm,8px) 0;padding:0 0.75rem;cursor:pointer;color:var(--text-muted,#9ca3af);display:flex;align-items:center;justify-content:center;transition:color .2s,background .2s}
  .b64-copy:hover{color:var(--text,#e4e4e7);background:var(--surface-hover,#22242e)}
  .b64-copy:active{transform:scale(0.93)}
  .b64-copy.copied{color:var(--success,#22c55e)}
  .b64-error{color:#ef4444;font-size:0.9rem;min-height:1.4em;margin-top:0.5rem}
</style>

<script>
var b64Mode="encode";

function setMode(mode){
  b64Mode=mode;
  document.getElementById("tab-encode").classList.toggle("active",mode==="encode");
  document.getElementById("tab-decode").classList.toggle("active",mode==="decode");
  document.getElementById("input-label").textContent=mode==="encode"?"Text to encode":"Base64 to decode";
  document.getElementById("b64-input").placeholder=mode==="encode"?"Paste your text here…":"Paste Base64 string here…";
  document.getElementById("b64-error").textContent="";
}

function convert(){
  var input=document.getElementById("b64-input").value;
  var output=document.getElementById("b64-output");
  var error=document.getElementById("b64-error");
  error.textContent="";
  if(!input.trim()){error.textContent="Please enter some text.";output.value="";return}
  try{
    if(b64Mode==="encode"){
      output.value=btoa(unescape(encodeURIComponent(input)));
    }else{
      output.value=decodeURIComponent(escape(atob(input.trim())));
    }
  }catch(e){
    output.value="";
    error.textContent=b64Mode==="decode"?"Invalid Base64 string.":"Encoding failed.";
  }
}

function copyResult(){
  var text=document.getElementById("b64-output").value;
  if(!text)return;
  navigator.clipboard.writeText(text);
  var btn=document.getElementById("b64-copy");
  var copyIcon=document.getElementById("b64-copy-icon");
  var checkIcon=document.getElementById("b64-check-icon");
  btn.classList.add("copied");
  copyIcon.style.display="none";
  checkIcon.style.display="block";
  setTimeout(function(){btn.classList.remove("copied");copyIcon.style.display="block";checkIcon.style.display="none"},1500);
}
</script>

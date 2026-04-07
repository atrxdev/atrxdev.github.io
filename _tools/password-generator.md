---
title: Password Generator
description: Generate strong, random passwords with custom options
---

<div class="pg-output-row">
  <input id="password" readonly placeholder="Click Generate">
  <button type="button" class="pg-copy" id="pg-copy" onclick="copyPassword()" title="Copy password">
    <svg id="pg-copy-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
    <svg id="pg-check-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><polyline points="20 6 9 17 4 12"/></svg>
  </button>
</div>

<div class="pg-strength" id="pg-strength"></div>

<label>Length: <span id="len-val">16</span></label>
<input type="range" id="length" min="4" max="128" value="16">

<div class="pg-options">
  <label class="pg-check"><input type="checkbox" id="upper" checked> Uppercase (A–Z)</label>
  <label class="pg-check"><input type="checkbox" id="lower" checked> Lowercase (a–z)</label>
  <label class="pg-check"><input type="checkbox" id="digits" checked> Digits (0–9)</label>
  <label class="pg-check"><input type="checkbox" id="symbols" checked> Symbols (!@#$…)</label>
</div>

<button onclick="generate()">Generate Password</button>

<style>
  .pg-output-row{display:flex;gap:0;align-items:stretch;margin-bottom:0.25rem}
  .pg-output-row input{flex:1;font-family:'JetBrains Mono',ui-monospace,monospace;font-size:1.05rem;letter-spacing:0.03em;border-top-right-radius:0;border-bottom-right-radius:0;margin-bottom:0}
  .pg-copy{background:var(--bg,#0f1117);border:1px solid var(--border,#2a2d3a);border-left:none;border-radius:0 var(--radius-sm,8px) var(--radius-sm,8px) 0;padding:0 0.75rem;cursor:pointer;color:var(--text-muted,#9ca3af);display:flex;align-items:center;justify-content:center;transition:color .2s,background .2s}
  .pg-copy:hover{color:var(--text,#e4e4e7);background:var(--surface-hover,#22242e)}
  .pg-copy:active{transform:scale(0.93)}
  .pg-copy.copied{color:var(--success,#22c55e)}
  .pg-strength{height:6px;border-radius:3px;margin-bottom:1rem;transition:background .3s}
  .pg-strength.s-weak{background:#ef4444}
  .pg-strength.s-fair{background:#f59e0b}
  .pg-strength.s-good{background:#22c55e}
  .pg-strength.s-strong{background:#6366f1}
  #length{width:100%;margin-bottom:1rem}
  .pg-options{display:grid;grid-template-columns:1fr 1fr;gap:0.5rem 1.5rem;margin-bottom:1.25rem}
  .pg-check{display:flex;align-items:center;gap:0.5rem;font-size:0.95rem;cursor:pointer;line-height:1}
  .pg-check input[type="checkbox"]{width:18px;height:18px;accent-color:var(--accent,#6366f1);cursor:pointer;flex-shrink:0;margin:0}
</style>

<script>
var lengthSlider=document.getElementById("length");
var lenVal=document.getElementById("len-val");
lengthSlider.addEventListener("input",function(){lenVal.textContent=this.value});

function getCharset(){
  var chars="";
  if(document.getElementById("upper").checked) chars+="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if(document.getElementById("lower").checked) chars+="abcdefghijklmnopqrstuvwxyz";
  if(document.getElementById("digits").checked) chars+="0123456789";
  if(document.getElementById("symbols").checked) chars+="!@#$%^&*()_+-=[]{}|;:,.<>?";
  return chars;
}

function generate(){
  var len=parseInt(lengthSlider.value);
  var chars=getCharset();
  if(!chars){document.getElementById("password").value="Select at least one option";return}
  var arr=new Uint32Array(len);
  crypto.getRandomValues(arr);
  var pw="";
  for(var i=0;i<len;i++) pw+=chars[arr[i]%chars.length];
  document.getElementById("password").value=pw;
  updateStrength(pw);
}

function updateStrength(pw){
  var el=document.getElementById("pg-strength");
  el.className="pg-strength";
  var score=0;
  if(pw.length>=8) score++;
  if(pw.length>=16) score++;
  if(/[a-z]/.test(pw)&&/[A-Z]/.test(pw)) score++;
  if(/\d/.test(pw)) score++;
  if(/[^a-zA-Z0-9]/.test(pw)) score++;
  if(score<=1) el.classList.add("s-weak");
  else if(score<=2) el.classList.add("s-fair");
  else if(score<=3) el.classList.add("s-good");
  else el.classList.add("s-strong");
}

function copyPassword(){
  var pw=document.getElementById("password").value;
  if(!pw) return;
  var btn=document.getElementById("pg-copy");
  navigator.clipboard.writeText(pw).then(function(){
    document.getElementById("pg-copy-icon").style.display="none";
    document.getElementById("pg-check-icon").style.display="inline";
    btn.classList.add("copied");
    setTimeout(function(){
      document.getElementById("pg-copy-icon").style.display="inline";
      document.getElementById("pg-check-icon").style.display="none";
      btn.classList.remove("copied");
    },1500);
  });
}

generate();
</script>

---
title: Text Case Converter
description: Convert text between uppercase, lowercase, title case, and more
---

<div class="tcc-input">
  <textarea id="tcc-in" rows="6" placeholder="Paste or type your text here..."></textarea>
  <div class="tcc-stats" id="tcc-stats"></div>
</div>

<div class="tcc-buttons">
  <button onclick="convert('upper')">UPPERCASE</button>
  <button onclick="convert('lower')">lowercase</button>
  <button onclick="convert('title')">Title Case</button>
  <button onclick="convert('sentence')">Sentence case</button>
  <button onclick="convert('camel')">camelCase</button>
  <button onclick="convert('pascal')">PascalCase</button>
  <button onclick="convert('snake')">snake_case</button>
  <button onclick="convert('kebab')">kebab-case</button>
  <button onclick="convert('constant')">CONSTANT_CASE</button>
  <button onclick="convert('dot')">dot.case</button>
  <button onclick="convert('path')">path/case</button>
  <button onclick="convert('toggle')">tOGGLE cASE</button>
  <button onclick="convert('alternating')">aLtErNaTiNg</button>
</div>

<div class="tcc-output-row">
  <textarea id="tcc-out" rows="6" readonly placeholder="Converted text appears here..."></textarea>
  <button type="button" class="tcc-copy" id="tcc-copy" onclick="copyResult()" title="Copy result">
    <svg id="tcc-copy-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
    <svg id="tcc-check-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><polyline points="20 6 9 17 4 12"/></svg>
  </button>
</div>

<style>
  .tcc-input{margin-bottom:1rem}
  .tcc-input textarea{width:100%;font-size:1rem;resize:vertical}
  .tcc-stats{font-size:0.85rem;color:var(--text-muted,#9ca3af);margin-top:0.35rem;min-height:1.2em}
  .tcc-buttons{display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:1rem}
  .tcc-buttons button{font-size:0.85rem;padding:0.45rem 0.85rem;white-space:nowrap}
  .tcc-output-row{display:flex;gap:0;align-items:stretch}
  .tcc-output-row textarea{flex:1;font-size:1rem;resize:vertical;border-top-right-radius:0;border-bottom-right-radius:0;margin-bottom:0}
  .tcc-copy{background:var(--bg,#0f1117);border:1px solid var(--border,#2a2d3a);border-left:none;border-radius:0 var(--radius-sm,8px) var(--radius-sm,8px) 0;padding:0 0.75rem;cursor:pointer;color:var(--text-muted,#9ca3af);display:flex;align-items:center;justify-content:center;transition:color .2s,background .2s}
  .tcc-copy:hover{color:var(--text,#e4e4e7);background:var(--surface-hover,#22242e)}
  .tcc-copy:active{transform:scale(0.93)}
  .tcc-copy.copied{color:var(--success,#22c55e)}
</style>

<script>
var tccIn=document.getElementById("tcc-in");
var tccOut=document.getElementById("tcc-out");

tccIn.addEventListener("input",updateStats);

function updateStats(){
  var text=tccIn.value;
  var chars=text.length;
  var words=text.trim()?text.trim().split(/\s+/).length:0;
  document.getElementById("tcc-stats").textContent=chars+" characters · "+words+" words";
}

function getWords(text){
  return text.match(/[a-zA-Z0-9]+/g)||[];
}

function toTitleCase(text){
  var small=new Set(["a","an","and","as","at","but","by","for","if","in","nor","of","on","or","so","the","to","up","yet"]);
  return text.replace(/\S+/g,function(word,index){
    if(index===0||!small.has(word.toLowerCase())) return word.charAt(0).toUpperCase()+word.slice(1).toLowerCase();
    return word.toLowerCase();
  });
}

function toSentenceCase(text){
  return text.toLowerCase().replace(/(^\s*|[.!?]\s+)([a-z])/g,function(m,sep,ch){
    return sep+ch.toUpperCase();
  });
}

function joinWords(text,sep){
  return getWords(text).map(function(w){return w.toLowerCase()}).join(sep);
}

function convert(mode){
  var text=tccIn.value;
  if(!text){tccOut.value="";return}
  var result="";
  switch(mode){
    case "upper":
      result=text.toUpperCase();break;
    case "lower":
      result=text.toLowerCase();break;
    case "title":
      result=toTitleCase(text);break;
    case "sentence":
      result=toSentenceCase(text);break;
    case "camel":
      var words=getWords(text);
      result=words.map(function(w,i){
        w=w.toLowerCase();
        return i===0?w:w.charAt(0).toUpperCase()+w.slice(1);
      }).join("");
      break;
    case "pascal":
      result=getWords(text).map(function(w){
        return w.charAt(0).toUpperCase()+w.slice(1).toLowerCase();
      }).join("");
      break;
    case "snake":
      result=joinWords(text,"_");break;
    case "kebab":
      result=joinWords(text,"-");break;
    case "constant":
      result=joinWords(text,"_").toUpperCase();break;
    case "dot":
      result=joinWords(text,".");break;
    case "path":
      result=joinWords(text,"/");break;
    case "toggle":
      result=text.split("").map(function(c){
        return c===c.toUpperCase()?c.toLowerCase():c.toUpperCase();
      }).join("");
      break;
    case "alternating":
      var idx=0;
      result=text.split("").map(function(c){
        if(/[a-zA-Z]/.test(c)){
          var out=idx%2===0?c.toLowerCase():c.toUpperCase();
          idx++;
          return out;
        }
        return c;
      }).join("");
      break;
  }
  tccOut.value=result;
}

function copyResult(){
  var text=tccOut.value;
  if(!text) return;
  var btn=document.getElementById("tcc-copy");
  navigator.clipboard.writeText(text).then(function(){
    document.getElementById("tcc-copy-icon").style.display="none";
    document.getElementById("tcc-check-icon").style.display="inline";
    btn.classList.add("copied");
    setTimeout(function(){
      document.getElementById("tcc-copy-icon").style.display="inline";
      document.getElementById("tcc-check-icon").style.display="none";
      btn.classList.remove("copied");
    },1500);
  });
}
</script>

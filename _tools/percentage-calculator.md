---
title: Percentage Calculator
description: Calculate percentages, percentage change, and more
---

<div class="pc-tabs">
  <div class="pc-tab active" onclick="setTab('basic')">Basic</div>
  <div class="pc-tab" onclick="setTab('change')">% Change</div>
  <div class="pc-tab" onclick="setTab('of')">What %</div>
</div>

<div id="tab-basic" class="pc-panel">
  <label>What is <input id="b-pct" type="number" placeholder="0" class="pc-inline"> % of <input id="b-val" type="number" placeholder="0" class="pc-inline"> ?</label>
  <button onclick="calcBasic()">Calculate</button>
  <p class="pc-result" id="r-basic"></p>
</div>

<div id="tab-change" class="pc-panel" style="display:none">
  <label>From <input id="c-from" type="number" placeholder="0" class="pc-inline"> to <input id="c-to" type="number" placeholder="0" class="pc-inline"></label>
  <button onclick="calcChange()">Calculate</button>
  <p class="pc-result" id="r-change"></p>
</div>

<div id="tab-of" class="pc-panel" style="display:none">
  <label><input id="o-part" type="number" placeholder="0" class="pc-inline"> is what % of <input id="o-whole" type="number" placeholder="0" class="pc-inline"> ?</label>
  <button onclick="calcOf()">Calculate</button>
  <p class="pc-result" id="r-of"></p>
</div>

<style>
  .pc-tabs{display:flex;gap:0;margin-bottom:1.25rem;border-bottom:1px solid var(--border,#2a2d3a);overflow-x:auto}
  .pc-tab{padding:0.6rem 1rem;border-bottom:2px solid transparent;color:var(--text-muted,#9ca3af);cursor:pointer;font-size:0.95rem;font-weight:500;transition:color .2s,border-color .2s;white-space:nowrap;text-align:center;flex:1}
  .pc-tab:hover{color:var(--text,#e4e4e7)}
  .pc-tab.active{color:var(--text,#e4e4e7);border-bottom-color:var(--accent,#6366f1)}
  .pc-panel label{display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;font-size:1rem;margin-bottom:1rem;color:var(--text,#e4e4e7)}
  .pc-inline{width:100px;font-size:1rem;text-align:center}
  .pc-result{font-size:1.25rem;font-weight:600;color:var(--accent,#6366f1);min-height:1.5em}
  .pc-result:empty{display:none}
</style>

<script>
var tabs=["basic","change","of"];

function setTab(name){
  tabs.forEach(function(t){
    document.getElementById("tab-"+t).style.display=t===name?"block":"none";
  });
  document.querySelectorAll(".pc-tab").forEach(function(el,i){
    el.classList.toggle("active",tabs[i]===name);
  });
}

function calcBasic(){
  var pct=parseFloat(document.getElementById("b-pct").value);
  var val=parseFloat(document.getElementById("b-val").value);
  if(isNaN(pct)||isNaN(val)){document.getElementById("r-basic").textContent="Enter valid numbers";return}
  var result=(pct/100)*val;
  document.getElementById("r-basic").textContent=pct+"% of "+val+" = "+parseFloat(result.toFixed(10));
}

function calcChange(){
  var from=parseFloat(document.getElementById("c-from").value);
  var to=parseFloat(document.getElementById("c-to").value);
  if(isNaN(from)||isNaN(to)||from===0){document.getElementById("r-change").textContent="Enter valid numbers (from ≠ 0)";return}
  var change=((to-from)/Math.abs(from))*100;
  var sign=change>=0?"+":"";
  document.getElementById("r-change").textContent=sign+parseFloat(change.toFixed(10))+"%";
}

function calcOf(){
  var part=parseFloat(document.getElementById("o-part").value);
  var whole=parseFloat(document.getElementById("o-whole").value);
  if(isNaN(part)||isNaN(whole)||whole===0){document.getElementById("r-of").textContent="Enter valid numbers (whole ≠ 0)";return}
  var pct=(part/whole)*100;
  document.getElementById("r-of").textContent=part+" is "+parseFloat(pct.toFixed(10))+"% of "+whole;
}
</script>

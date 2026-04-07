---
title: Unit Converter
description: Convert between common units of length, weight, temperature, and more
---

<div class="uc-category">
  <div class="uc-cat active" id="cat-length" onclick="setCat('length')">Length</div>
  <div class="uc-cat" id="cat-weight" onclick="setCat('weight')">Weight</div>
  <div class="uc-cat" id="cat-temp" onclick="setCat('temperature')">Temp</div>
  <div class="uc-cat" id="cat-volume" onclick="setCat('volume')">Volume</div>
  <div class="uc-cat" id="cat-speed" onclick="setCat('speed')">Speed</div>
</div>

<div class="uc-row">
  <div class="uc-field">
    <input id="uc-from" type="number" placeholder="0" oninput="doConvert()">
    <select id="uc-from-unit" onchange="doConvert()"></select>
  </div>
  <div class="uc-swap" onclick="swapUnits()" title="Swap units">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/></svg>
  </div>
  <div class="uc-field">
    <input id="uc-to" type="number" readonly placeholder="0">
    <select id="uc-to-unit" onchange="doConvert()"></select>
  </div>
</div>

<style>
  .uc-category{display:flex;gap:0;margin-bottom:1.25rem;border-bottom:1px solid var(--border,#2a2d3a);overflow-x:auto}
  .uc-cat{padding:0.6rem 1rem;border-bottom:2px solid transparent;color:var(--text-muted,#9ca3af);cursor:pointer;font-size:0.95rem;font-weight:500;transition:color .2s,border-color .2s;white-space:nowrap;text-align:center;flex:1}
  .uc-cat:hover{color:var(--text,#e4e4e7)}
  .uc-cat.active{color:var(--text,#e4e4e7);border-bottom-color:var(--accent,#6366f1)}
  .uc-row{display:flex;align-items:center;gap:0.75rem}
  .uc-field{flex:1;display:flex;flex-direction:column;gap:0.5rem}
  .uc-field input{width:100%;font-size:1.1rem}
  .uc-field select{width:100%}
  .uc-swap{cursor:pointer;color:var(--text-muted,#9ca3af);transition:color .2s,transform .2s;flex-shrink:0;padding-top:0.25rem}
  .uc-swap:hover{color:var(--text,#e4e4e7);transform:rotate(180deg)}
  @media(max-width:480px){.uc-row{flex-direction:column}.uc-swap{transform:rotate(90deg)}.uc-swap:hover{transform:rotate(270deg)}}
</style>

<script>
var units={
  length:{
    m:{name:"Meters",toBase:1},
    km:{name:"Kilometers",toBase:1000},
    cm:{name:"Centimeters",toBase:0.01},
    mm:{name:"Millimeters",toBase:0.001},
    mi:{name:"Miles",toBase:1609.344},
    yd:{name:"Yards",toBase:0.9144},
    ft:{name:"Feet",toBase:0.3048},
    in:{name:"Inches",toBase:0.0254}
  },
  weight:{
    kg:{name:"Kilograms",toBase:1},
    g:{name:"Grams",toBase:0.001},
    mg:{name:"Milligrams",toBase:0.000001},
    lb:{name:"Pounds",toBase:0.453592},
    oz:{name:"Ounces",toBase:0.0283495},
    t:{name:"Metric Tons",toBase:1000}
  },
  temperature:{
    c:{name:"Celsius"},
    f:{name:"Fahrenheit"},
    k:{name:"Kelvin"}
  },
  volume:{
    l:{name:"Liters",toBase:1},
    ml:{name:"Milliliters",toBase:0.001},
    gal:{name:"Gallons (US)",toBase:3.78541},
    qt:{name:"Quarts (US)",toBase:0.946353},
    cup:{name:"Cups (US)",toBase:0.236588},
    floz:{name:"Fl Oz (US)",toBase:0.0295735},
    m3:{name:"Cubic Meters",toBase:1000}
  },
  speed:{
    ms:{name:"m/s",toBase:1},
    kmh:{name:"km/h",toBase:0.277778},
    mph:{name:"mph",toBase:0.44704},
    kn:{name:"Knots",toBase:0.514444},
    fts:{name:"ft/s",toBase:0.3048}
  }
};

var curCat="length";
var fromSel=document.getElementById("uc-from-unit");
var toSel=document.getElementById("uc-to-unit");
var fromIn=document.getElementById("uc-from");
var toIn=document.getElementById("uc-to");

function setCat(cat){
  curCat=cat;
  var cats=document.querySelectorAll(".uc-cat");
  for(var i=0;i<cats.length;i++) cats[i].classList.remove("active");
  document.getElementById("cat-"+cat.replace("temperature","temp")).classList.add("active");
  populateSelects();
  doConvert();
}

function populateSelects(){
  var u=units[curCat];
  var keys=Object.keys(u);
  fromSel.innerHTML="";
  toSel.innerHTML="";
  for(var i=0;i<keys.length;i++){
    var o1=document.createElement("option");
    o1.value=keys[i];o1.textContent=u[keys[i]].name;
    fromSel.appendChild(o1);
    var o2=document.createElement("option");
    o2.value=keys[i];o2.textContent=u[keys[i]].name;
    toSel.appendChild(o2);
  }
  if(keys.length>1) toSel.selectedIndex=1;
}

function convertTemp(val,from,to){
  if(from===to) return val;
  var c;
  if(from==="c") c=val;
  else if(from==="f") c=(val-32)*5/9;
  else c=val-273.15;
  if(to==="c") return c;
  if(to==="f") return c*9/5+32;
  return c+273.15;
}

function doConvert(){
  var val=parseFloat(fromIn.value);
  if(isNaN(val)){toIn.value="";return}
  var from=fromSel.value;
  var to=toSel.value;
  var result;
  if(curCat==="temperature"){
    result=convertTemp(val,from,to);
  }else{
    var u=units[curCat];
    var baseVal=val*u[from].toBase;
    result=baseVal/u[to].toBase;
  }
  toIn.value=parseFloat(result.toPrecision(10));
}

function swapUnits(){
  var fi=fromSel.selectedIndex;
  var ti=toSel.selectedIndex;
  fromSel.selectedIndex=ti;
  toSel.selectedIndex=fi;
  doConvert();
}

populateSelects();
</script>

---
title: Unit Converter
description: "Convert units for length, weight, temperature, and more with a fast browser-based unit converter for everyday calculations."
categories:
  - Calculators
tool_explanation: |-
  This unit converter translates values across common measurement categories including length, weight, temperature, volume, and speed. It is useful for travel, education, engineering, shopping, fitness, and everyday comparison work where numbers are only meaningful if the unit conversion is accurate.
how_to_use:
  - Choose the category that matches the measurement you want to convert.
  - Enter the source value in the left input.
  - Select the source and target units from the dropdowns.
  - Review the converted result instantly, or use the swap control to reverse the direction.
tool_article: |-
  Unit conversion is one of those tasks that seems obvious until you are switching between systems often enough for mistakes to become expensive. A distance in miles needs to become kilometers, a recipe in cups needs to become liters, a shipping weight in pounds needs to become kilograms, or a weather reading in Fahrenheit needs to be understood in Celsius. None of these conversions is conceptually difficult, but the risk comes from interruption and context switching. A unit converter helps by making the translation immediate, dependable, and consistent across categories.

  Measurements only make sense when the unit is clear. The number 100 is meaningless on its own. It could represent meters, feet, pounds, degrees, or liters, and each interpretation leads to a completely different real-world decision. That is why unit discipline matters in technical work and daily life alike. When people work across international teams, travel between regions, or move between scientific and consumer contexts, conversion becomes less of a math exercise and more of a communication requirement. Getting the unit wrong can derail planning even when the arithmetic itself is easy.

  Most categories in a converter rely on a straightforward idea: convert the input into a base unit, then convert from that base unit into the target unit. Length, weight, volume, and speed usually follow that pattern cleanly because each unit has a stable factor relative to the base. If you know how many meters are in a mile or how many liters are in a gallon, the rest is direct multiplication and division. That structure is one reason digital converters are so convenient. They turn a table of factors into an interface that answers the question instantly.

  Temperature is the important exception. Celsius, Fahrenheit, and Kelvin are not converted with a simple multiplier alone because they are built on different zero points as well as different scales. That means an accurate converter has to handle offsets properly, not just scale changes. Many people remember this in theory but still hesitate when converting quickly in practice. Having temperature alongside the simpler categories is useful because it covers one of the most common areas where intuition alone is least reliable.

  The use cases are broader than they first appear. Students need conversions for homework and lab work. Engineers and technicians need them when reading manuals or cross-checking specifications. Travelers use them for road speed, luggage weight, temperature, and fuel references. Home cooks and shoppers need them for recipes and packaging. Fitness users translate kilograms to pounds or kilometers to miles depending on the platform they use. In each case, the conversion itself is small, but it enables a larger decision that depends on understanding the quantity correctly.

  Precision matters here because rounded numbers can accumulate into larger problems. In casual use, a slightly rounded result is usually fine. In shipping, construction, science, and industrial work, it may not be. That is why it helps when a converter preserves sensible precision while still presenting a clean result. The goal is not to overwhelm the user with digits. It is to avoid unnecessary distortion while keeping the answer easy to read. Reliable conversion tools strike that balance well enough for everyday work without pretending to replace domain-specific engineering systems.

  There is also a speed advantage. If you have to stop and search for a formula or remember a factor every time, the interruption adds up. Worse, it creates openings for inconsistent methods. One time you may round early. Another time you may convert through a different intermediate value. A single converter centralizes the process and reduces those variations. That is especially useful when you need to compare several values in sequence, such as checking multiple package weights, travel distances, or recipe quantities for scaling.

  Good conversion habits include more than typing numbers. You still need to confirm the original unit, choose the correct category, and apply judgment to the result. If something looks wildly wrong, that usually means the source unit was misunderstood rather than the converter failing. A tool can guarantee arithmetic, but it cannot guarantee that the question was framed correctly. That is why the combination of clear unit labels and quick reversibility matters. Being able to swap units and sense-check the result helps catch interpretation mistakes early.

  In practical terms, a browser-based unit converter is valuable because it removes setup from a task that should stay lightweight. You can open it, convert a number, verify the meaning, and move on without reaching for a spreadsheet or a calculator app with memory of old formulas. When measurements span countries, industries, and personal habits, a dependable conversion utility becomes part of basic digital infrastructure. It keeps numbers understandable, and that makes the decisions built on those numbers more trustworthy.

  That reliability is what people are really looking for. They do not want to remember every factor or re-derive every formula. They want confidence that the value in front of them means the same thing in the next system, country, or document. A good converter provides that confidence quickly enough to become part of routine work.
faqs:
  - question: Why is temperature conversion different from other categories?
    answer: |-
      Temperature scales use different zero points as well as different size intervals, so they require formulas with offsets instead of simple multiplication alone.
  - question: Which unit should I treat as the source value?
    answer: |-
      Use the unit that matches the original measurement exactly. If the source unit is wrong, the converted result will be wrong even if the arithmetic is perfect.
  - question: Can I reverse the conversion quickly?
    answer: |-
      Yes. Use the swap control to flip the source and target units without reselecting both fields manually.
  - question: Is this tool suitable for engineering-grade work?
    answer: |-
      It is helpful for fast checks and everyday conversions, but highly regulated or safety-critical work should still follow the precision and validation standards of the relevant domain.
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

---
title: Percentage Calculator
description: Calculate percentages, percentage change, and more
tool_explanation: |-
  This percentage calculator handles the most common percentage tasks: finding a percentage of a number, measuring percentage change, and working out what percentage one value is of another. It is designed to make everyday calculations faster and less error-prone whether you are working on finance, pricing, schoolwork, analytics, or planning.
how_to_use:
  - Choose the calculation tab that matches your question.
  - Enter the values shown in the prompt fields.
  - Select Calculate to see the result immediately.
  - Switch tabs to answer related questions, such as moving from a percentage value to a percentage change comparison.
tool_article: |-
  Percentages show up so often that people stop noticing how much decision-making depends on them. Discounts, salary changes, exam scores, conversion rates, budget variance, tax, interest, and growth metrics all rely on the same underlying idea: a part compared with a whole. Because the idea is simple, it is also easy to rush. Small wording differences like "what is 15 percent of 240" versus "240 is what percent of 800" lead to different formulas, and that is where mistakes creep in. A percentage calculator is useful because it removes that translation step when time or clarity matters.

  At the core, a percentage is just a ratio out of one hundred. That sounds elementary, but it matters because it keeps every calculation grounded. If you know how much of a whole you are measuring, you can express the comparison in a way that is easy to read and compare. That is why percentages are so popular in reports and dashboards. They compress meaning. A growth rate of 12 percent immediately tells you more about proportional change than a raw increase might, especially when the underlying totals differ from one case to another.

  The first common task is finding a percentage of a number. This is the version people use when they want to know the size of a discount, commission, tax amount, or allocation. What is 20 percent of 75? What is 7.5 percent of a bill? The formula is straightforward once you remember it, but in real work people often care more about getting the answer quickly than performing the arithmetic by hand. The calculator helps by letting you focus on the business question rather than the intermediate steps.

  The second common task is percentage change, which is where interpretation starts to matter more. Percentage change compares a new value against a starting value, showing how much something increased or decreased relative to where it began. This is a powerful metric because it makes change comparable across different scales, but it is also easy to misuse. A jump from 10 to 20 is a 100 percent increase, while a drop from 20 back to 10 is a 50 percent decrease. The absolute movement is the same, yet the percentage framing differs because the baseline changed.

  The third common task asks what percentage one number is of another. This is often the most useful form for analytics, progress tracking, and operational reporting. If a team completed 84 tasks out of 120, what percentage is that? If a sales target is 300 and actual output is 255, what share of the goal was achieved? The value of this calculation is not only in the answer itself. It is also in how easily it supports comparison across teams, time periods, campaigns, or budgets where raw totals alone would be harder to interpret.

  Good percentage work depends on using the right denominator. That is the single detail most likely to distort the result. If you choose the wrong baseline, the number may still look mathematically polished while telling the wrong story. This comes up often in business reporting, where percentages can unintentionally exaggerate or soften results. A conversion rate, for example, depends entirely on which visitors are included in the denominator. The calculator cannot choose that for you, but it can make the arithmetic consistent once the question itself is framed correctly.

  Rounding also deserves attention. Many everyday cases only need a clean answer to one or two decimal places, but some contexts require more precision. Finance, pricing, experimentation, and scientific work can become misleading if intermediate rounding changes the interpretation. That is one reason tools that keep more precision internally are helpful. You can still present a simplified answer while preserving the confidence that the displayed result came from a more accurate calculation. For quick work, that balance between speed and precision is practical.

  Another reason percentage calculators stay useful is cognitive load. When people are busy, they are more likely to make simple arithmetic mistakes, especially when context switching between many tasks. A fast calculator reduces the chance of a sign error, a misplaced decimal, or a denominator mistake surviving into a report or message. That matters more than it sounds. Small percentage errors can affect invoices, forecasts, campaign summaries, or stakeholder expectations, and once the wrong number spreads, it tends to get repeated.

  In practical terms, a percentage calculator is not just a convenience for school math. It is a tool for cleaner communication. It helps translate raw figures into proportional meaning, and it helps you do that consistently across routine tasks. Whether you are checking a price reduction, validating a dashboard number, or explaining performance to someone who needs the story fast, the real benefit is clarity. The arithmetic is simple. The judgment comes from asking the right question and using the resulting percentage in the right context.
faqs:
  - question: When should I use percentage change instead of "what percent"?
    answer: |-
      Use percentage change when you are comparing how a value moved from a starting point to a new value. Use "what percent" when you are asking what share one value represents of a total or target.
  - question: Why does percentage change depend on the starting value?
    answer: |-
      Because percentage change measures movement relative to the original baseline. The same raw change can produce different percentages if the starting values are different.
  - question: Can percentages be more than 100?
    answer: |-
      Yes. If the part is larger than the comparison whole, or if growth more than doubles a starting value, the resulting percentage can exceed 100.
  - question: Does this calculator round the result?
    answer: |-
      The calculator formats the output for readability while keeping enough precision for typical everyday use. For highly regulated or scientific work, you should still confirm the exact rounding standard you need.
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

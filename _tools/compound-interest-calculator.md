---
title: Compound Interest Calculator
description: "Calculate compound interest growth for savings and investments with contributions, compounding frequency, and year-by-year projections."
tool_explanation: |-
  This calculator shows how an initial investment grows over time when interest compounds at regular intervals. Enter your principal, interest rate, compounding frequency, and time period to see the final balance, total interest earned, and a year-by-year breakdown. It is useful for comparing savings accounts, investment options, and understanding the long-term effect of compounding.
how_to_use:
  - Enter the initial principal amount you are starting with.
  - Set the annual interest rate as a percentage.
  - Choose how often interest compounds, such as monthly, quarterly, or annually.
  - Enter the number of years you plan to invest or save.
  - Optionally add a recurring monthly contribution.
  - Review the results including the final balance, total interest, and the year-by-year growth table.
tool_article: |-
  Compound interest is often described as one of the most powerful forces in personal finance, and for good reason. Unlike simple interest, which is calculated only on the original principal, compound interest earns returns on both the principal and on previously accumulated interest. Over time, this creates an accelerating growth curve that can turn modest, consistent savings into substantial wealth. Understanding how compounding works is essential for making informed decisions about savings accounts, retirement plans, loans, and investments.

  The core formula for compound interest is straightforward. The future value equals the principal multiplied by one plus the rate divided by the number of compounding periods, raised to the power of the number of periods times the number of years. In mathematical terms, A = P(1 + r/n)^(nt), where P is the principal, r is the annual interest rate, n is the number of times interest compounds per year, and t is the number of years. This formula produces the total amount including the original principal, so the interest earned is the difference between the final value and the starting amount.

  Compounding frequency matters more than most people expect. Monthly compounding produces a higher return than annual compounding at the same nominal rate, because interest begins earning its own interest sooner. Daily compounding pushes the effect further, though the marginal difference between daily and monthly is small compared to the jump from annual to monthly. For most savings and investment decisions, understanding the difference between annual and monthly compounding is enough to make a well-informed choice.

  Time is the most powerful variable in the compound interest equation. Doubling the time horizon does not merely double the interest earned. It can triple or quadruple it because the compounding effect accelerates as the balance grows. This is why financial advisors consistently emphasize starting early. An investor who begins at twenty-five and contributes for ten years may end up with more than someone who starts at thirty-five and contributes for twenty years, even though the late starter invested twice as much cash. The early years of compounding set the foundation for exponential growth later.

  Regular contributions amplify the effect dramatically. A one-time investment of ten thousand dollars will grow well enough on its own, but adding even a small monthly contribution creates a much larger final balance. Each contribution begins compounding from the moment it is added, and the cumulative effect of many small additions compounding over years can dwarf the growth of the original principal alone. This is the mechanism behind retirement accounts and systematic investment plans.

  The interest rate is obviously important, but its impact is often underestimated over long periods. A difference of one or two percentage points may seem minor in a single year, but over twenty or thirty years it can mean tens of thousands of dollars in additional returns. This is why fee-conscious investing matters. A fund with lower fees that delivers a slightly higher net return compounds that advantage every year, and the gap widens steadily over time.

  Compound interest also works against you when it applies to debt. Credit card balances, personal loans, and mortgages all use compounding, which means unpaid interest gets added to the balance and begins generating its own interest charges. The same exponential growth that builds wealth in a savings account can accelerate debt if balances are not managed. Understanding this dual nature of compounding helps people make better decisions about both saving and borrowing.

  A calculator makes compounding tangible. Seeing the year-by-year breakdown shows how growth starts slowly and then curves upward as the balance increases. That visual progression often has more impact than the formula itself because it makes the abstract concept concrete. You can experiment with different rates, time periods, and contribution amounts to see exactly how each variable affects the outcome. That kind of interactive exploration is one of the best ways to build genuine financial intuition.

  Inflation is worth keeping in mind when interpreting results. A calculator shows nominal growth, but the purchasing power of the final amount depends on what happens to prices over the same period. An investment that doubles in twenty years looks impressive, but if prices also doubled, the real gain is much smaller. For rough planning, subtracting an estimated inflation rate from the interest rate gives you an approximation of real returns. It is not perfect, but it keeps expectations grounded.

  The main takeaway from any compound interest calculation is that consistency and time matter more than finding the perfect rate or the perfect moment to start. Small, regular contributions to a reasonably performing account will outperform sporadic large investments in most realistic scenarios. The calculator helps you see that clearly, which makes it easier to commit to a plan and stick with it.
faqs:
  - question: What is the difference between compound and simple interest?
    answer: |-
      Simple interest is calculated only on the original principal. Compound interest is calculated on the principal plus any previously earned interest, so the balance grows faster over time.
  - question: How does compounding frequency affect my returns?
    answer: |-
      More frequent compounding means interest starts earning its own interest sooner. Monthly compounding produces slightly more than annual compounding at the same rate, though the difference narrows as frequency increases beyond monthly.
  - question: Does this calculator account for taxes or inflation?
    answer: |-
      No. The results show nominal growth before taxes and inflation. For a rough real-return estimate, subtract the expected inflation rate from the interest rate.
  - question: Can I use this for loan calculations?
    answer: |-
      This calculator is designed for savings and investment growth. Loan amortization involves different payment structures, though the underlying compounding principle is the same.
  - question: What does the monthly contribution do?
    answer: |-
      Each monthly contribution is added to the balance and begins compounding from that point forward. Even small regular contributions can significantly increase the final balance over long periods.
---

<div class="ci-tool">
  <div class="ci-inputs">
    <div class="ci-field">
      <label for="ci-principal">Initial Principal</label>
      <div class="ci-input-prefix">
        <span class="ci-prefix">$</span>
        <input type="number" id="ci-principal" value="10000" min="0" step="100">
      </div>
    </div>
    <div class="ci-field">
      <label for="ci-rate">Annual Interest Rate</label>
      <div class="ci-input-suffix">
        <input type="number" id="ci-rate" value="7" min="0" max="100" step="0.1">
        <span class="ci-suffix">%</span>
      </div>
    </div>
    <div class="ci-field">
      <label for="ci-years">Time Period</label>
      <div class="ci-input-suffix">
        <input type="number" id="ci-years" value="10" min="1" max="100" step="1">
        <span class="ci-suffix">years</span>
      </div>
    </div>
    <div class="ci-field">
      <label for="ci-compound">Compounding Frequency</label>
      <select id="ci-compound">
        <option value="1">Annually</option>
        <option value="4">Quarterly</option>
        <option value="12" selected>Monthly</option>
        <option value="365">Daily</option>
      </select>
    </div>
    <div class="ci-field">
      <label for="ci-contribution">Monthly Contribution</label>
      <div class="ci-input-prefix">
        <span class="ci-prefix">$</span>
        <input type="number" id="ci-contribution" value="200" min="0" step="50">
      </div>
    </div>
    <button type="button" id="ci-calculate" onclick="calculateCI()">Calculate</button>
  </div>

  <div class="ci-results" id="ci-results" style="display:none">
    <div class="ci-summary">
      <div class="ci-card">
        <span class="ci-card-label">Final Balance</span>
        <span class="ci-card-value" id="ci-final">—</span>
      </div>
      <div class="ci-card">
        <span class="ci-card-label">Total Contributions</span>
        <span class="ci-card-value" id="ci-total-contributions">—</span>
      </div>
      <div class="ci-card">
        <span class="ci-card-label">Total Interest Earned</span>
        <span class="ci-card-value" id="ci-interest">—</span>
      </div>
    </div>

    <div class="ci-chart-wrap">
      <canvas id="ci-chart" height="260"></canvas>
    </div>

    <details class="ci-table-details">
      <summary>Year-by-year breakdown</summary>
      <div class="ci-table-wrap">
        <table class="ci-table" id="ci-table">
          <thead>
            <tr><th>Year</th><th>Contributions</th><th>Interest</th><th>Balance</th></tr>
          </thead>
          <tbody id="ci-tbody"></tbody>
        </table>
      </div>
    </details>
  </div>
</div>

<style>
.ci-tool{display:flex;flex-direction:column;gap:1.5rem}
.ci-inputs{display:flex;flex-direction:column;gap:1rem}
.ci-field{display:flex;flex-direction:column;gap:0.3rem}
.ci-field label{font-size:0.85rem;color:var(--text-muted,#9ca3af)}
.ci-field select{width:100%;padding:0.6rem 0.75rem;background:var(--bg,#0f1117);color:var(--text,#e4e4e7);border:1px solid var(--border,#2a2d3a);border-radius:var(--radius-sm,8px);font-size:0.95rem}
.ci-input-prefix,.ci-input-suffix{display:flex;align-items:stretch}
.ci-input-prefix input{flex:1;border-top-left-radius:0;border-bottom-left-radius:0;margin-bottom:0}
.ci-input-suffix input{flex:1;border-top-right-radius:0;border-bottom-right-radius:0;margin-bottom:0}
.ci-prefix,.ci-suffix{display:flex;align-items:center;padding:0 0.75rem;background:var(--surface,#1a1c25);border:1px solid var(--border,#2a2d3a);color:var(--text-muted,#9ca3af);font-size:0.9rem;white-space:nowrap}
.ci-prefix{border-right:none;border-radius:var(--radius-sm,8px) 0 0 var(--radius-sm,8px)}
.ci-suffix{border-left:none;border-radius:0 var(--radius-sm,8px) var(--radius-sm,8px) 0}
#ci-calculate{margin-top:0.5rem;width:100%}
.ci-summary{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:0.75rem}
.ci-card{background:var(--surface,#1a1c25);border:1px solid var(--border,#2a2d3a);border-radius:var(--radius-sm,8px);padding:1rem;display:flex;flex-direction:column;gap:0.25rem}
.ci-card-label{font-size:0.78rem;text-transform:uppercase;letter-spacing:0.04em;color:var(--text-muted,#9ca3af)}
.ci-card-value{font-size:1.25rem;font-weight:700}
.ci-chart-wrap{background:var(--surface,#1a1c25);border:1px solid var(--border,#2a2d3a);border-radius:var(--radius-sm,8px);padding:1rem;overflow:hidden}
#ci-chart{width:100%;display:block}
.ci-table-details{background:var(--surface,#1a1c25);border:1px solid var(--border,#2a2d3a);border-radius:var(--radius-sm,8px);overflow:hidden}
.ci-table-details summary{padding:0.85rem 1rem;cursor:pointer;font-weight:600;font-size:0.9rem;color:var(--text-muted,#9ca3af);user-select:none}
.ci-table-details summary:hover{color:var(--text,#e4e4e7)}
.ci-table-wrap{overflow-x:auto}
.ci-table{width:100%;border-collapse:collapse;font-size:0.88rem}
.ci-table th{text-align:left;padding:0.6rem 1rem;border-bottom:1px solid var(--border,#2a2d3a);color:var(--text-muted,#9ca3af);font-size:0.78rem;text-transform:uppercase;letter-spacing:0.04em}
.ci-table td{padding:0.55rem 1rem;border-bottom:1px solid var(--border,#2a2d3a)}
.ci-table tbody tr:last-child td{border-bottom:none}
.ci-table tbody tr:hover{background:var(--surface-hover,#22242e)}
</style>

<script>
(function(){
  function fmt(n){return n.toLocaleString("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2})}

  window.calculateCI=function(){
    var P=parseFloat(document.getElementById("ci-principal").value)||0;
    var r=(parseFloat(document.getElementById("ci-rate").value)||0)/100;
    var t=parseInt(document.getElementById("ci-years").value)||1;
    var n=parseInt(document.getElementById("ci-compound").value)||12;
    var mc=parseFloat(document.getElementById("ci-contribution").value)||0;

    var years=[];
    var balance=P;
    var totalContributions=P;
    var totalInterest=0;
    var rn=r/n;

    for(var y=1;y<=t;y++){
      var yearStart=balance;
      var yearContrib=0;
      for(var p=0;p<n;p++){
        var interest=balance*rn;
        balance+=interest;
        totalInterest+=interest;
        /* distribute monthly contributions across compounding periods */
        if(n>=12){
          balance+=mc;
          yearContrib+=mc;
          totalContributions+=mc;
        }else{
          var monthsPerPeriod=12/n;
          balance+=mc*monthsPerPeriod;
          yearContrib+=mc*monthsPerPeriod;
          totalContributions+=mc*monthsPerPeriod;
        }
      }
      years.push({year:y,contributions:totalContributions,interest:totalInterest,balance:balance});
    }

    document.getElementById("ci-final").textContent=fmt(balance);
    document.getElementById("ci-total-contributions").textContent=fmt(totalContributions);
    document.getElementById("ci-interest").textContent=fmt(totalInterest);

    var tbody=document.getElementById("ci-tbody");
    tbody.innerHTML="";
    for(var i=0;i<years.length;i++){
      var row=years[i];
      var tr=document.createElement("tr");
      tr.innerHTML="<td>"+row.year+"</td><td>"+fmt(row.contributions)+"</td><td>"+fmt(row.interest)+"</td><td>"+fmt(row.balance)+"</td>";
      tbody.appendChild(tr);
    }

    drawChart(years);
    document.getElementById("ci-results").style.display="";
  };

  function drawChart(years){
    var canvas=document.getElementById("ci-chart");
    var ctx=canvas.getContext("2d");
    var dpr=window.devicePixelRatio||1;
    var rect=canvas.getBoundingClientRect();
    canvas.width=rect.width*dpr;
    canvas.height=260*dpr;
    ctx.scale(dpr,dpr);
    var W=rect.width,H=260;

    ctx.clearRect(0,0,W,H);
    var pad={top:20,right:20,bottom:35,left:70};
    var cw=W-pad.left-pad.right;
    var ch=H-pad.top-pad.bottom;

    var maxVal=0;
    for(var i=0;i<years.length;i++){
      if(years[i].balance>maxVal)maxVal=years[i].balance;
    }
    maxVal=maxVal*1.1||1;

    var barW=Math.max(4,Math.min(40,(cw/years.length)*0.6));
    var gap=(cw-barW*years.length)/(years.length+1);

    /* grid lines */
    ctx.strokeStyle="rgba(255,255,255,0.06)";
    ctx.lineWidth=1;
    var gridLines=5;
    ctx.font="11px -apple-system,BlinkMacSystemFont,sans-serif";
    ctx.fillStyle="#9ca3af";
    ctx.textAlign="right";
    for(var g=0;g<=gridLines;g++){
      var gy=pad.top+ch-(ch*g/gridLines);
      ctx.beginPath();ctx.moveTo(pad.left,gy);ctx.lineTo(W-pad.right,gy);ctx.stroke();
      var label=(maxVal*g/gridLines);
      var labelText=label>=1000000?(label/1000000).toFixed(1)+"M":label>=1000?(label/1000).toFixed(0)+"k":label.toFixed(0);
      ctx.fillText("$"+labelText,pad.left-8,gy+4);
    }

    /* bars */
    var contribColor="#6366f1";
    var interestColor="#22c55e";
    for(var i=0;i<years.length;i++){
      var x=pad.left+gap+(barW+gap)*i;
      var contribH=(years[i].contributions/maxVal)*ch;
      var totalH=(years[i].balance/maxVal)*ch;

      ctx.fillStyle=interestColor;
      ctx.beginPath();
      roundRect(ctx,x,pad.top+ch-totalH,barW,totalH,3);
      ctx.fill();

      ctx.fillStyle=contribColor;
      ctx.beginPath();
      roundRect(ctx,x,pad.top+ch-contribH,barW,contribH,3);
      ctx.fill();

      /* x-axis labels */
      if(years.length<=20||years[i].year%Math.ceil(years.length/20)===0){
        ctx.fillStyle="#9ca3af";
        ctx.textAlign="center";
        ctx.fillText(years[i].year,x+barW/2,H-pad.bottom+16);
      }
    }

    /* legend */
    var lx=pad.left;
    var ly=H-8;
    ctx.font="11px -apple-system,BlinkMacSystemFont,sans-serif";
    ctx.fillStyle=contribColor;
    ctx.fillRect(lx,ly-8,10,10);
    ctx.fillStyle="#9ca3af";ctx.textAlign="left";
    ctx.fillText("Contributions",lx+14,ly);
    ctx.fillStyle=interestColor;
    ctx.fillRect(lx+110,ly-8,10,10);
    ctx.fillStyle="#9ca3af";
    ctx.fillText("Interest",lx+124,ly);
  }

  function roundRect(ctx,x,y,w,h,r){
    if(h<r*2)r=h/2;
    if(w<r*2)r=w/2;
    ctx.moveTo(x+r,y);
    ctx.lineTo(x+w-r,y);
    ctx.quadraticCurveTo(x+w,y,x+w,y+r);
    ctx.lineTo(x+w,y+h);
    ctx.lineTo(x,y+h);
    ctx.lineTo(x,y+r);
    ctx.quadraticCurveTo(x,y,x+r,y);
    ctx.closePath();
  }

  /* auto-calculate on load */
  calculateCI();
})();
</script>

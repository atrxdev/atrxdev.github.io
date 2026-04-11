---
title: Password Strength Checker
description: "Check password strength instantly and get practical suggestions to improve weak passwords before you use them online."
tool_explanation: |-
  This tool analyzes a password in your browser and rates its strength based on length, character variety, common patterns, and known weaknesses. It helps you understand whether a password is likely to resist guessing and brute-force attacks before you commit to using it.
how_to_use:
  - Type or paste a password into the input field.
  - Review the strength rating, score bar, and estimated crack time.
  - Read the suggestions to understand what makes the password weaker or stronger.
  - Adjust the password until the rating meets your security needs, or use a password generator to create a strong one automatically.
tool_article: |-
  Choosing a password feels simple, but most people consistently underestimate how easy their choices are to crack. The problem is not a lack of effort. It is that human intuition about randomness is unreliable. A password that looks complex to the person who created it may follow patterns that attackers already know how to exploit. A strength checker closes that gap by applying objective analysis to a password before it is used in the real world.

  The most important factor in password strength is length. Every additional character multiplies the number of possible combinations an attacker would need to try. A twelve-character password has a vastly larger search space than an eight-character one, even if both use the same character types. Many people focus on adding a symbol or a capital letter to a short password, but that approach provides far less protection than simply making the password longer. Length is the foundation, and everything else builds on top of it.

  Character variety matters too, but in a different way than most people expect. Using uppercase letters, lowercase letters, numbers, and symbols increases the size of the character set, which makes brute-force attacks slower. However, the benefit only works when the characters are placed unpredictably. Capitalizing the first letter and adding a number at the end is so common that attackers check those patterns first. True variety means spreading different character types throughout the password in positions that do not follow obvious conventions.

  Common patterns are the biggest weakness in passwords that look strong on the surface. Dictionary words, names, dates, keyboard walks like "qwerty" or "zxcvbn", and popular substitutions like replacing "a" with "@" or "e" with "3" are all well known to cracking tools. These tools do not just try every possible combination in order. They start with the most likely guesses based on how real people actually create passwords. That means a password like "P@ssw0rd!" is far weaker than its mix of character types suggests, because it follows one of the most predictable patterns in existence.

  Repetition and sequences also reduce strength significantly. Repeating characters like "aaa" or sequential runs like "abc" or "123" compress the effective complexity of the password. An attacker does not need to guess each character independently when the pattern makes the next character predictable. A good strength checker identifies these patterns and penalizes them appropriately, giving you a more honest assessment than simple rules like "must contain a symbol" can provide.

  Estimated crack time is a useful but imperfect metric. It gives you a rough sense of how long a brute-force or pattern-based attack might take under certain assumptions about the attacker's speed and approach. The real value is not the exact number but the relative comparison. If one password shows an estimated crack time of seconds and another shows years, the difference is meaningful even if the precise estimates depend on hardware and method. Use it as a guide, not a guarantee.

  A strength checker is not a replacement for good password habits. It cannot tell you whether you are reusing a password across sites, whether the password has already appeared in a data breach, or whether you are storing it safely. What it can do is catch the most common mistakes at the moment of creation: passwords that are too short, too predictable, or built on patterns that attackers already exploit. That immediate feedback is valuable because it happens at the exact point where better choices are still easy to make.

  For best results, combine a strength checker with a password generator and a password manager. Use the generator to create long, random passwords that score well. Use the manager to store them so you do not need to remember each one. Use the checker when you want to evaluate a password you created manually or verify that a generated password meets the requirements of a particular site. Together, these tools turn password security from an abstract recommendation into a practical, repeatable workflow.

  The goal is not perfection. It is avoiding the mistakes that account for the vast majority of real-world breaches. Most compromised passwords are short, reused, or built on common words and patterns. A strength checker helps you stay clearly above that threshold, which is where the biggest security gains happen with the least effort.
faqs:
  - question: Does this tool send my password anywhere?
    answer: |-
      No. The analysis runs entirely in your browser. Your password is not transmitted to any server.
  - question: What does the estimated crack time mean?
    answer: |-
      It is a rough estimate of how long a brute-force or pattern-based attack might take to guess the password. The actual time depends on the attacker's hardware and method, so treat it as a relative comparison rather than an exact figure.
  - question: My password has symbols and numbers but still scores low. Why?
    answer: |-
      Character variety alone does not make a password strong if it follows common patterns. Substitutions like @ for a, short base words, and predictable placement of numbers or symbols are patterns attackers already check first.
  - question: What is a good minimum password length?
    answer: |-
      Twelve characters is a reasonable minimum for important accounts. Sixteen or more is better when the site allows it, especially combined with mixed character types.
  - question: Should I use this instead of a password manager?
    answer: |-
      No. A strength checker and a password manager serve different purposes. The checker evaluates a single password. The manager stores unique passwords for every account so you do not need to remember them all.
---

<div class="psc-tool">
  <div class="psc-input-row">
    <input type="password" id="psc-password" placeholder="Enter a password to check" autocomplete="off" spellcheck="false">
    <button type="button" class="psc-toggle" id="psc-toggle" onclick="toggleVisibility()" title="Show / hide password">
      <svg id="psc-eye" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
      <svg id="psc-eye-off" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
    </button>
  </div>

  <div class="psc-meter">
    <div class="psc-meter-fill" id="psc-meter-fill"></div>
  </div>
  <div class="psc-rating" id="psc-rating">Enter a password above</div>

  <div class="psc-details" id="psc-details" style="display:none">
    <div class="psc-stats">
      <div class="psc-stat">
        <span class="psc-stat-label">Length</span>
        <span class="psc-stat-value" id="psc-length">0</span>
      </div>
      <div class="psc-stat">
        <span class="psc-stat-label">Character types</span>
        <span class="psc-stat-value" id="psc-types">0 / 4</span>
      </div>
      <div class="psc-stat">
        <span class="psc-stat-label">Estimated crack time</span>
        <span class="psc-stat-value" id="psc-crack-time">—</span>
      </div>
    </div>

    <div class="psc-checks" id="psc-checks"></div>

    <div class="psc-suggestions-box" id="psc-suggestions-box" style="display:none">
      <p class="psc-suggestions-title">Suggestions</p>
      <ul class="psc-suggestions" id="psc-suggestions"></ul>
    </div>
  </div>
</div>

<style>
.psc-tool{display:flex;flex-direction:column;gap:1rem}
.psc-input-row{display:flex;gap:0;align-items:stretch}
.psc-input-row input{flex:1;border-top-right-radius:0;border-bottom-right-radius:0;margin-bottom:0;font-size:1.05rem;letter-spacing:0.03em}
.psc-toggle{background:var(--bg,#0f1117);border:1px solid var(--border,#2a2d3a);border-left:none;border-radius:0 var(--radius-sm,8px) var(--radius-sm,8px) 0;padding:0 0.85rem;cursor:pointer;color:var(--text-muted,#9ca3af);display:flex;align-items:center;transition:color .2s,background .2s}
.psc-toggle:hover{color:var(--text,#e4e4e7);background:var(--surface-hover,#22242e)}
.psc-meter{height:8px;background:var(--surface,#1a1c25);border-radius:4px;overflow:hidden;border:1px solid var(--border,#2a2d3a)}
.psc-meter-fill{height:100%;width:0;border-radius:4px;transition:width .3s,background .3s}
.psc-rating{font-weight:600;font-size:0.95rem;color:var(--text-muted,#9ca3af)}
.psc-details{display:flex;flex-direction:column;gap:1rem}
.psc-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:0.75rem}
.psc-stat{background:var(--surface,#1a1c25);border:1px solid var(--border,#2a2d3a);border-radius:var(--radius-sm,8px);padding:0.75rem 1rem;display:flex;flex-direction:column;gap:0.2rem}
.psc-stat-label{font-size:0.78rem;color:var(--text-muted,#9ca3af);text-transform:uppercase;letter-spacing:0.04em}
.psc-stat-value{font-size:1.1rem;font-weight:600}
.psc-checks{display:flex;flex-direction:column;gap:0.4rem}
.psc-check{display:flex;align-items:center;gap:0.5rem;font-size:0.9rem}
.psc-check .icon{width:18px;text-align:center;flex-shrink:0}
.psc-check.pass .icon{color:var(--success,#22c55e)}
.psc-check.fail .icon{color:#ef4444}
.psc-suggestions-box{background:var(--surface,#1a1c25);border:1px solid var(--border,#2a2d3a);border-radius:var(--radius-sm,8px);padding:1rem}
.psc-suggestions-title{font-weight:600;font-size:0.85rem;text-transform:uppercase;letter-spacing:0.04em;color:var(--text-muted,#9ca3af);margin-bottom:0.5rem}
.psc-suggestions{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0.35rem}
.psc-suggestions li{font-size:0.9rem;padding-left:1.2rem;position:relative}
.psc-suggestions li::before{content:"→";position:absolute;left:0;color:var(--accent,#6366f1)}
</style>

<script>
(function(){
  var input=document.getElementById("psc-password");
  var meterFill=document.getElementById("psc-meter-fill");
  var ratingEl=document.getElementById("psc-rating");
  var details=document.getElementById("psc-details");
  var lengthEl=document.getElementById("psc-length");
  var typesEl=document.getElementById("psc-types");
  var crackTimeEl=document.getElementById("psc-crack-time");
  var checksEl=document.getElementById("psc-checks");
  var suggestionsBox=document.getElementById("psc-suggestions-box");
  var suggestionsList=document.getElementById("psc-suggestions");

  var commonPasswords=["password","123456","12345678","qwerty","abc123","monkey","1234567","letmein",
    "trustno1","dragon","baseball","iloveyou","master","sunshine","ashley","bailey","shadow",
    "123123","654321","superman","qazwsx","michael","football","password1","password123",
    "welcome","hello","charlie","donald","admin","login","starwars","solo","princess",
    "whatever","qwerty123","passw0rd","zxcvbn","121212","flower","hottie","loveme","zaq1zaq1",
    "!@#$%^&*","aa123456","access","666666","biteme","1234","1q2w3e4r","test","love"];

  var keyboardRows=["qwertyuiop","asdfghjkl","zxcvbnm","1234567890"];

  function hasKeyboardWalk(pw,minLen){
    minLen=minLen||4;
    var lower=pw.toLowerCase();
    for(var r=0;r<keyboardRows.length;r++){
      var row=keyboardRows[r];
      for(var i=0;i<=row.length-minLen;i++){
        if(lower.indexOf(row.substring(i,i+minLen))!==-1)return true;
        var rev=row.substring(i,i+minLen).split("").reverse().join("");
        if(lower.indexOf(rev)!==-1)return true;
      }
    }
    return false;
  }

  function hasRepeatingChars(pw,minLen){
    minLen=minLen||3;
    for(var i=0;i<=pw.length-minLen;i++){
      var ch=pw[i];
      var all=true;
      for(var j=1;j<minLen;j++){if(pw[i+j]!==ch){all=false;break}}
      if(all)return true;
    }
    return false;
  }

  function hasSequentialChars(pw,minLen){
    minLen=minLen||3;
    for(var i=0;i<=pw.length-minLen;i++){
      var asc=true,desc=true;
      for(var j=1;j<minLen;j++){
        if(pw.charCodeAt(i+j)!==pw.charCodeAt(i)+j)asc=false;
        if(pw.charCodeAt(i+j)!==pw.charCodeAt(i)-j)desc=false;
      }
      if(asc||desc)return true;
    }
    return false;
  }

  function estimateCrackTime(pw){
    var poolSize=0;
    if(/[a-z]/.test(pw))poolSize+=26;
    if(/[A-Z]/.test(pw))poolSize+=26;
    if(/[0-9]/.test(pw))poolSize+=10;
    if(/[^a-zA-Z0-9]/.test(pw))poolSize+=33;
    if(poolSize===0)return"—";
    var combinations=Math.pow(poolSize,pw.length);
    var guessesPerSecond=1e10;
    var seconds=combinations/guessesPerSecond/2;
    if(seconds<1)return"Instant";
    if(seconds<60)return Math.round(seconds)+" seconds";
    if(seconds<3600)return Math.round(seconds/60)+" minutes";
    if(seconds<86400)return Math.round(seconds/3600)+" hours";
    if(seconds<31536000)return Math.round(seconds/86400)+" days";
    if(seconds<31536000*1000)return Math.round(seconds/31536000)+" years";
    if(seconds<31536000*1e6)return Math.round(seconds/31536000/1000)+"k years";
    if(seconds<31536000*1e9)return Math.round(seconds/31536000/1e6)+"M years";
    return"Billions of years";
  }

  function analyze(pw){
    if(!pw){
      meterFill.style.width="0";
      meterFill.style.background="#444";
      ratingEl.textContent="Enter a password above";
      ratingEl.style.color="var(--text-muted,#9ca3af)";
      details.style.display="none";
      return;
    }
    details.style.display="";

    var len=pw.length;
    var hasLower=/[a-z]/.test(pw);
    var hasUpper=/[A-Z]/.test(pw);
    var hasDigit=/[0-9]/.test(pw);
    var hasSymbol=/[^a-zA-Z0-9]/.test(pw);
    var typeCount=(hasLower?1:0)+(hasUpper?1:0)+(hasDigit?1:0)+(hasSymbol?1:0);

    var isCommon=commonPasswords.indexOf(pw.toLowerCase())!==-1;
    var hasKbWalk=hasKeyboardWalk(pw);
    var hasRepeat=hasRepeatingChars(pw);
    var hasSeq=hasSequentialChars(pw);

    var score=0;
    if(len>=8)score+=1;
    if(len>=12)score+=1;
    if(len>=16)score+=1;
    if(typeCount>=2)score+=1;
    if(typeCount>=3)score+=1;
    if(typeCount>=4)score+=1;
    if(!isCommon)score+=1;
    if(!hasKbWalk)score+=1;
    if(!hasRepeat)score+=0.5;
    if(!hasSeq)score+=0.5;

    if(isCommon)score=Math.min(score,1);
    if(len<6)score=Math.min(score,1);

    var maxScore=9;
    var pct=Math.min(100,Math.round(score/maxScore*100));

    var levels=[
      {min:0,label:"Very Weak",color:"#ef4444"},
      {min:20,label:"Weak",color:"#f97316"},
      {min:40,label:"Fair",color:"#eab308"},
      {min:60,label:"Good",color:"#22c55e"},
      {min:80,label:"Strong",color:"#06b6d4"},
      {min:95,label:"Very Strong",color:"#8b5cf6"}
    ];
    var level=levels[0];
    for(var i=levels.length-1;i>=0;i--){if(pct>=levels[i].min){level=levels[i];break}}

    meterFill.style.width=pct+"%";
    meterFill.style.background=level.color;
    ratingEl.textContent=level.label+" ("+pct+"%)";
    ratingEl.style.color=level.color;

    lengthEl.textContent=len;
    typesEl.textContent=typeCount+" / 4";
    crackTimeEl.textContent=estimateCrackTime(pw);

    var checks=[
      {pass:len>=8,text:"At least 8 characters"},
      {pass:len>=12,text:"At least 12 characters"},
      {pass:hasLower,text:"Contains lowercase letters"},
      {pass:hasUpper,text:"Contains uppercase letters"},
      {pass:hasDigit,text:"Contains numbers"},
      {pass:hasSymbol,text:"Contains symbols"},
      {pass:!isCommon,text:"Not a commonly used password"},
      {pass:!hasKbWalk,text:"No keyboard walk patterns"},
      {pass:!hasRepeat,text:"No repeating characters"},
      {pass:!hasSeq,text:"No sequential characters"}
    ];

    checksEl.innerHTML="";
    for(var c=0;c<checks.length;c++){
      var div=document.createElement("div");
      div.className="psc-check "+(checks[c].pass?"pass":"fail");
      div.innerHTML='<span class="icon">'+(checks[c].pass?"✓":"✗")+"</span><span>"+checks[c].text+"</span>";
      checksEl.appendChild(div);
    }

    var suggestions=[];
    if(len<8)suggestions.push("Make it at least 8 characters long.");
    else if(len<12)suggestions.push("Try extending it to 12 or more characters for better protection.");
    if(!hasUpper&&!hasLower)suggestions.push("Add some letters to increase character variety.");
    else if(!hasUpper)suggestions.push("Mix in some uppercase letters, not just at the start.");
    else if(!hasLower)suggestions.push("Include lowercase letters as well.");
    if(!hasDigit)suggestions.push("Adding numbers in unexpected positions helps.");
    if(!hasSymbol)suggestions.push("Include symbols like !, @, #, or others to widen the character set.");
    if(isCommon)suggestions.push("This is a very common password. Choose something more unique.");
    if(hasKbWalk)suggestions.push("Avoid keyboard patterns like qwerty, asdf, or zxcv.");
    if(hasRepeat)suggestions.push("Avoid repeating the same character multiple times in a row.");
    if(hasSeq)suggestions.push("Avoid sequential characters like abc or 123.");

    if(suggestions.length){
      suggestionsBox.style.display="";
      suggestionsList.innerHTML="";
      for(var s=0;s<suggestions.length;s++){
        var li=document.createElement("li");
        li.textContent=suggestions[s];
        suggestionsList.appendChild(li);
      }
    }else{
      suggestionsBox.style.display="none";
    }
  }

  input.addEventListener("input",function(){analyze(input.value)});

  window.toggleVisibility=function(){
    var eyeOn=document.getElementById("psc-eye");
    var eyeOff=document.getElementById("psc-eye-off");
    if(input.type==="password"){
      input.type="text";
      eyeOn.style.display="none";
      eyeOff.style.display="";
    }else{
      input.type="password";
      eyeOn.style.display="";
      eyeOff.style.display="none";
    }
  };
})();
</script>

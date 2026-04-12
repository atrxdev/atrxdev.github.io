---
title: Regex Tester
description: "Test regular expressions in your browser with live matches and clear explanations for faster search, validation, and parsing work."
categories:
  - Text
tool_explanation: |-
  This regex tester lets you write a regular expression and test it against any input string in real time. Matches are highlighted inline, capture groups are broken down in detail, and a built-in reference panel explains common regex syntax. Everything runs locally in your browser using the JavaScript RegExp engine.
how_to_use:
  - Type a regular expression in the pattern field at the top.
  - Toggle flags like global, case-insensitive, or multiline using the flag buttons.
  - Enter or paste your test string in the text area below.
  - Matches are highlighted immediately as you type, with match details listed underneath.
  - Open the Reference panel to look up regex syntax without leaving the page.
tool_article: |-
  Regular expressions are one of the most powerful and most misunderstood tools in programming. They provide a concise way to describe patterns in text, from simple literal matches to complex structures involving repetition, alternation, grouping, and lookahead. But the syntax is dense, and even experienced developers often build regex patterns through trial and error rather than writing them correctly on the first try. A live tester shortens that feedback loop by showing matches, groups, and errors immediately as you edit the pattern.

  The core idea behind a regular expression is that you describe a pattern rather than a specific string. The pattern /\d{3}-\d{4}/ does not match one phone number. It matches any sequence of three digits, a hyphen, and four digits. That generality is what makes regex useful for validation, search, extraction, and text transformation. It is also what makes regex hard to read, because the pattern language prioritizes brevity and flexibility over readability.

  Flags change how the engine interprets the pattern. The global flag causes it to find all matches instead of stopping at the first one. The case-insensitive flag makes letter matching ignore case. The multiline flag changes the behavior of ^ and $ so they match the start and end of each line rather than the entire string. The dotAll flag makes the dot metacharacter match newline characters, which it normally skips. The unicode flag enables full Unicode matching, which matters when working with text outside the ASCII range. Choosing the right combination of flags is often as important as writing the pattern itself.

  Capture groups are one of the most practical features of regex. Parentheses define groups that the engine remembers separately from the full match. This lets you extract specific parts of a match, like pulling the domain out of a URL or the area code out of a phone number. Named groups go further by attaching a label to each group, making the results easier to work with in code. A good regex tester shows each group alongside the full match so you can verify that the pattern captures exactly what you intend.

  One common source of confusion is the difference between greedy and lazy quantifiers. By default, quantifiers like * and + are greedy, meaning they match as much text as possible. Adding a ? makes them lazy, matching as little as possible. The difference matters when the pattern contains multiple variable-length segments. A greedy quantifier can consume text that a later part of the pattern needs, causing unexpected results or failed matches. Seeing the actual matched text in a tester makes it much easier to spot when greediness is the problem.

  Lookaheads and lookbehinds are zero-width assertions. They check whether a pattern exists ahead of or behind the current position without including it in the match. This is useful when you want to match a word only if it is followed by a certain character, or only if it is not preceded by something specific. These constructs are powerful but easy to misuse, and testing them interactively is far more efficient than reasoning about them abstractly.

  Character classes define sets of characters to match. The shorthand classes like \d for digits, \w for word characters, and \s for whitespace cover common cases. Custom classes in square brackets let you specify ranges and individual characters. Negated classes with ^ inside the brackets match everything except the listed characters. Understanding character classes well reduces the need for complex alternation patterns and usually results in cleaner, faster expressions.

  Performance is worth mentioning because poorly written regex patterns can be surprisingly slow. Catastrophic backtracking occurs when the engine explores an exponential number of paths through the input because the pattern contains nested quantifiers or ambiguous alternations. In a browser-based tester this usually just causes a brief delay, but in production code it can freeze a server or crash a process. Keeping patterns specific and avoiding unnecessary nesting helps prevent these issues.

  For most everyday tasks, regex does not need to be complicated. Validating an email format, extracting numbers from a string, replacing a pattern in a document, or splitting text on a delimiter are all common uses that require only basic syntax. A tester helps you build confidence with simple patterns before moving to advanced features. Once you can read and write basic regex fluently, the advanced constructs become much easier to approach because the underlying logic is the same.

  The best way to learn regex is to use it repeatedly on real examples. Reading a reference page teaches you the syntax, but applying it to actual text is what builds intuition. A live tester makes that practice immediate and visual. You see what matches, what does not, where each group starts and ends, and how changing one character in the pattern shifts the result. That tight loop between writing and seeing is what turns regex from a mysterious incantation into a practical tool.
faqs:
  - question: Which regex engine does this tool use?
    answer: |-
      It uses the JavaScript RegExp engine built into your browser. Syntax and behavior may differ slightly from engines in other languages like Python, Java, or PCRE.
  - question: What do the flags do?
    answer: |-
      g (global) finds all matches instead of just the first. i (case-insensitive) ignores letter case. m (multiline) makes ^ and $ match line boundaries. s (dotAll) makes . match newlines. u (unicode) enables full Unicode matching.
  - question: Why does my pattern match differently here than in my code?
    answer: |-
      Different languages use different regex engines with slightly different feature sets. JavaScript does not support some features available in PCRE or Python, such as lookbehind with variable-length patterns in older browsers. Always verify against the engine your code actually uses.
  - question: What are capture groups?
    answer: |-
      Parentheses in a regex create groups. The engine remembers what each group matched separately from the full match. This lets you extract specific parts of the result. Named groups use the syntax (?<name>...) to label each group.
  - question: Does this tool send my data anywhere?
    answer: |-
      No. All matching runs locally in your browser. Nothing is transmitted to a server.
---

<div class="rx-tool">
  <div class="rx-pattern-row">
    <span class="rx-delim">/</span>
    <input type="text" id="rx-pattern" placeholder="enter regex pattern" autocomplete="off" spellcheck="false">
    <span class="rx-delim">/</span>
    <div class="rx-flags" id="rx-flags">
      <button type="button" class="rx-flag" data-flag="g" title="Global – find all matches">g</button>
      <button type="button" class="rx-flag" data-flag="i" title="Case-insensitive">i</button>
      <button type="button" class="rx-flag" data-flag="m" title="Multiline – ^ and $ match line boundaries">m</button>
      <button type="button" class="rx-flag" data-flag="s" title="DotAll – . matches newlines">s</button>
      <button type="button" class="rx-flag" data-flag="u" title="Unicode">u</button>
    </div>
  </div>

  <div class="rx-error" id="rx-error" style="display:none"></div>

  <label class="rx-label" for="rx-input">Test String</label>
  <div class="rx-input-wrap">
    <div class="rx-highlight" id="rx-highlight"></div>
    <textarea id="rx-input" rows="6" placeholder="Type or paste your test string here…" spellcheck="false"></textarea>
  </div>

  <div class="rx-match-info" id="rx-match-info" style="display:none">
    <div class="rx-match-summary" id="rx-match-summary"></div>
    <div class="rx-match-list" id="rx-match-list"></div>
  </div>

  <details class="rx-reference" id="rx-reference">
    <summary>Quick Reference</summary>
    <div class="rx-ref-grid">
      <div class="rx-ref-section">
        <h4>Characters</h4>
        <div class="rx-ref-row"><code>.</code> <span>Any character (except newline)</span></div>
        <div class="rx-ref-row"><code>\d</code> <span>Digit [0-9]</span></div>
        <div class="rx-ref-row"><code>\D</code> <span>Non-digit</span></div>
        <div class="rx-ref-row"><code>\w</code> <span>Word char [a-zA-Z0-9_]</span></div>
        <div class="rx-ref-row"><code>\W</code> <span>Non-word char</span></div>
        <div class="rx-ref-row"><code>\s</code> <span>Whitespace</span></div>
        <div class="rx-ref-row"><code>\S</code> <span>Non-whitespace</span></div>
        <div class="rx-ref-row"><code>\b</code> <span>Word boundary</span></div>
        <div class="rx-ref-row"><code>[abc]</code> <span>Character set</span></div>
        <div class="rx-ref-row"><code>[^abc]</code> <span>Negated set</span></div>
        <div class="rx-ref-row"><code>[a-z]</code> <span>Range</span></div>
      </div>
      <div class="rx-ref-section">
        <h4>Quantifiers</h4>
        <div class="rx-ref-row"><code>*</code> <span>0 or more</span></div>
        <div class="rx-ref-row"><code>+</code> <span>1 or more</span></div>
        <div class="rx-ref-row"><code>?</code> <span>0 or 1</span></div>
        <div class="rx-ref-row"><code>{n}</code> <span>Exactly n</span></div>
        <div class="rx-ref-row"><code>{n,}</code> <span>n or more</span></div>
        <div class="rx-ref-row"><code>{n,m}</code> <span>Between n and m</span></div>
        <div class="rx-ref-row"><code>*?</code> <span>Lazy (minimal)</span></div>
      </div>
      <div class="rx-ref-section">
        <h4>Groups & Anchors</h4>
        <div class="rx-ref-row"><code>(abc)</code> <span>Capture group</span></div>
        <div class="rx-ref-row"><code>(?&lt;name&gt;…)</code> <span>Named group</span></div>
        <div class="rx-ref-row"><code>(?:abc)</code> <span>Non-capturing group</span></div>
        <div class="rx-ref-row"><code>a|b</code> <span>Alternation</span></div>
        <div class="rx-ref-row"><code>^</code> <span>Start of string/line</span></div>
        <div class="rx-ref-row"><code>$</code> <span>End of string/line</span></div>
        <div class="rx-ref-row"><code>(?=…)</code> <span>Positive lookahead</span></div>
        <div class="rx-ref-row"><code>(?!…)</code> <span>Negative lookahead</span></div>
        <div class="rx-ref-row"><code>(?&lt;=…)</code> <span>Positive lookbehind</span></div>
        <div class="rx-ref-row"><code>(?&lt;!…)</code> <span>Negative lookbehind</span></div>
      </div>
    </div>
  </details>
</div>

<style>
.rx-tool{display:flex;flex-direction:column;gap:1rem}

/* Pattern row */
.rx-pattern-row{display:flex;align-items:center;gap:0;background:var(--bg,#0f1117);border:1px solid var(--border,#2a2d3a);border-radius:var(--radius-sm,8px);padding:0 0.5rem;transition:border-color .2s,box-shadow .2s}
.rx-pattern-row:focus-within{border-color:var(--accent,#6366f1);box-shadow:0 0 0 3px var(--accent-glow,rgba(99,102,241,0.18))}
.rx-delim{color:var(--accent,#6366f1);font-family:'SF Mono',SFMono-Regular,Menlo,Consolas,monospace;font-size:1.15rem;font-weight:700;user-select:none;flex-shrink:0;padding:0 0.1rem}
.rx-pattern-row input{flex:1;width:auto;background:transparent;border:none;outline:none;color:var(--text,#e4e4e7);font-family:'SF Mono',SFMono-Regular,Menlo,Consolas,monospace;font-size:0.95rem;padding:0.65rem 0.35rem;margin:0}
.rx-pattern-row input::placeholder{color:var(--text-muted,#9ca3af);opacity:0.5}

/* Flags */
.rx-flags{display:flex;gap:0.25rem;margin-left:0.35rem;flex-shrink:0}
.rx-flag{width:28px;height:28px;display:flex;align-items:center;justify-content:center;background:transparent !important;border:1px solid var(--border,#2a2d3a) !important;border-radius:4px;color:#555 !important;font-family:'SF Mono',SFMono-Regular,Menlo,Consolas,monospace;font-size:0.82rem;font-weight:700;cursor:pointer;transition:all .15s;padding:0;box-shadow:none !important}
.rx-flag:hover{color:var(--text,#e4e4e7) !important;border-color:var(--text-muted,#9ca3af) !important;background:transparent !important;box-shadow:none !important}
.rx-flag.active{background:var(--accent,#6366f1) !important;border-color:var(--accent,#6366f1) !important;color:#fff !important}

/* Error */
.rx-error{color:#ef4444;font-size:0.82rem;padding:0.45rem 0.75rem;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.25);border-radius:var(--radius-sm,8px)}

/* Label */
.rx-label{font-size:0.82rem;font-weight:600;color:var(--text-muted,#9ca3af);text-transform:uppercase;letter-spacing:0.04em}

/* Textarea with highlight overlay */
.rx-input-wrap{position:relative;border-radius:var(--radius-sm,8px);overflow:hidden}
.rx-input-wrap textarea{width:100%;box-sizing:border-box;background:var(--bg,#0f1117);color:var(--text,#e4e4e7);border:1px solid var(--border,#2a2d3a);border-radius:var(--radius-sm,8px);padding:0.75rem;font-family:'SF Mono',SFMono-Regular,Menlo,Consolas,monospace;font-size:0.88rem;line-height:1.6;resize:vertical;margin:0;position:relative;z-index:1;caret-color:var(--text,#e4e4e7)}
.rx-input-wrap textarea:focus{outline:none;border-color:var(--accent,#6366f1);box-shadow:0 0 0 3px var(--accent-glow,rgba(99,102,241,0.18))}
.rx-highlight{position:absolute;top:0;left:0;right:0;bottom:0;padding:0.75rem;font-family:'SF Mono',SFMono-Regular,Menlo,Consolas,monospace;font-size:0.88rem;line-height:1.6;white-space:pre-wrap;word-break:break-word;overflow:hidden;pointer-events:none;z-index:0;color:transparent;border:1px solid transparent;border-radius:var(--radius-sm,8px)}
.rx-highlight mark{background:rgba(99,102,241,0.3);color:transparent;border-radius:2px;border-bottom:2px solid var(--accent,#6366f1)}
.rx-highlight mark.rx-g0{background:rgba(99,102,241,0.3);border-bottom-color:var(--accent,#6366f1)}

/* Match info */
.rx-match-info{border:1px solid var(--border,#2a2d3a);border-radius:var(--radius-sm,8px);overflow:hidden}
.rx-match-summary{padding:0.55rem 0.85rem;font-size:0.82rem;font-weight:600;color:var(--text-muted,#9ca3af);background:var(--surface,#1a1c25);border-bottom:1px solid var(--border,#2a2d3a)}
.rx-match-list{max-height:16rem;overflow-y:auto}
.rx-match-item{padding:0.55rem 0.85rem;border-bottom:1px solid var(--border,#2a2d3a);font-size:0.82rem}
.rx-match-item:last-child{border-bottom:none}
.rx-match-idx{color:var(--text-muted,#9ca3af);font-weight:600;margin-right:0.5rem}
.rx-match-val{font-family:'SF Mono',SFMono-Regular,Menlo,Consolas,monospace;color:var(--text,#e4e4e7);background:rgba(99,102,241,0.12);padding:0.1rem 0.4rem;border-radius:3px;word-break:break-all}
.rx-match-groups{margin-top:0.3rem;padding-left:1.2rem}
.rx-match-grp{color:var(--text-muted,#9ca3af);font-size:0.78rem;line-height:1.5}
.rx-match-grp code{font-family:'SF Mono',SFMono-Regular,Menlo,Consolas,monospace;color:var(--text,#e4e4e7);background:rgba(99,102,241,0.08);padding:0.05rem 0.3rem;border-radius:2px}
.rx-match-pos{color:var(--text-muted,#9ca3af);font-size:0.75rem;margin-left:0.5rem}

/* Reference */
.rx-reference{border:1px solid var(--border,#2a2d3a);border-radius:var(--radius-sm,8px);overflow:hidden}
.rx-reference summary{padding:0.6rem 0.85rem;font-size:0.85rem;font-weight:600;color:var(--text-muted,#9ca3af);cursor:pointer;background:var(--surface,#1a1c25);user-select:none;transition:color .15s}
.rx-reference summary:hover{color:var(--text,#e4e4e7)}
.rx-reference[open] summary{border-bottom:1px solid var(--border,#2a2d3a)}
.rx-ref-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:0;padding:0}
.rx-ref-section{padding:0.75rem 0.85rem;border-right:1px solid var(--border,#2a2d3a)}
.rx-ref-section:last-child{border-right:none}
.rx-ref-section h4{font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--accent,#6366f1);margin:0 0 0.5rem 0}
.rx-ref-row{display:flex;gap:0.6rem;align-items:baseline;font-size:0.8rem;line-height:1.8;color:var(--text-muted,#9ca3af)}
.rx-ref-row code{font-family:'SF Mono',SFMono-Regular,Menlo,Consolas,monospace;color:var(--text,#e4e4e7);background:var(--bg,#0f1117);padding:0.05rem 0.35rem;border-radius:3px;font-size:0.78rem;flex-shrink:0;min-width:4.5rem;display:inline-block}

@media(max-width:600px){
  .rx-ref-grid{grid-template-columns:1fr}
  .rx-ref-section{border-right:none;border-bottom:1px solid var(--border,#2a2d3a)}
  .rx-ref-section:last-child{border-bottom:none}
}
</style>

<script>
(function(){
  var patternInput=document.getElementById("rx-pattern");
  var textArea=document.getElementById("rx-input");
  var highlightEl=document.getElementById("rx-highlight");
  var errorEl=document.getElementById("rx-error");
  var matchInfo=document.getElementById("rx-match-info");
  var matchSummary=document.getElementById("rx-match-summary");
  var matchList=document.getElementById("rx-match-list");
  var flagBtns=document.querySelectorAll(".rx-flag");

  /* ---- Flags ---- */
  var activeFlags={g:true}; /* global on by default */
  flagBtns.forEach(function(btn){
    if(btn.dataset.flag==="g") btn.classList.add("active");
    btn.addEventListener("click",function(){
      var f=btn.dataset.flag;
      activeFlags[f]=!activeFlags[f];
      btn.classList.toggle("active",activeFlags[f]);
      run();
    });
  });

  function getFlags(){
    var s="";
    for(var k in activeFlags) if(activeFlags[k]) s+=k;
    return s;
  }

  /* ---- Escape HTML ---- */
  function esc(str){
    return str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  }

  /* ---- Main run ---- */
  function run(){
    var pat=patternInput.value;
    var text=textArea.value;

    /* Clear state */
    errorEl.style.display="none";
    matchInfo.style.display="none";
    highlightEl.innerHTML=esc(text)+"\n";

    if(!pat){return}

    /* Try compile */
    var re;
    try{
      re=new RegExp(pat,getFlags());
    }catch(e){
      errorEl.textContent=e.message.replace(/^Invalid regular expression: /,"");
      errorEl.style.display="block";
      return;
    }

    if(!text) return;

    /* Collect matches */
    var matches=[];
    var safety=0;
    if(re.global){
      var m;
      while((m=re.exec(text))!==null){
        matches.push({match:m[0],index:m.index,groups:m.slice(1),namedGroups:m.groups||null});
        if(m[0].length===0) re.lastIndex++;
        if(++safety>5000) break;
      }
    }else{
      var m=re.exec(text);
      if(m) matches.push({match:m[0],index:m.index,groups:m.slice(1),namedGroups:m.groups||null});
    }

    if(!matches.length){
      matchInfo.style.display="block";
      matchSummary.textContent="No matches";
      matchList.innerHTML="";
      return;
    }

    /* Build highlight */
    var parts=[];
    var last=0;
    matches.forEach(function(m){
      if(m.index>last) parts.push(esc(text.slice(last,m.index)));
      parts.push("<mark class=\"rx-g0\">"+esc(text.slice(m.index,m.index+m.match.length))+"</mark>");
      last=m.index+m.match.length;
    });
    if(last<text.length) parts.push(esc(text.slice(last)));
    highlightEl.innerHTML=parts.join("")+"\n";

    /* Match details */
    matchInfo.style.display="block";
    matchSummary.textContent=matches.length+" match"+(matches.length===1?"":"es");

    var html="";
    matches.forEach(function(m,i){
      html+="<div class=\"rx-match-item\">";
      html+="<span class=\"rx-match-idx\">Match "+(i+1)+"</span>";
      html+="<span class=\"rx-match-val\">"+esc(m.match)+"</span>";
      html+="<span class=\"rx-match-pos\">index "+m.index+"–"+(m.index+m.match.length)+"</span>";

      /* Capture groups */
      if(m.groups.length>0||m.namedGroups){
        html+="<div class=\"rx-match-groups\">";
        m.groups.forEach(function(g,gi){
          var label="Group "+(gi+1);
          /* Check for named group */
          if(m.namedGroups){
            for(var name in m.namedGroups){
              if(m.namedGroups[name]===g){label=name+" (Group "+(gi+1)+")";break}
            }
          }
          var val=g==null?"<em>no match</em>":"<code>"+esc(g)+"</code>";
          html+="<div class=\"rx-match-grp\">"+esc(label)+": "+val+"</div>";
        });
        html+="</div>";
      }
      html+="</div>";
    });
    matchList.innerHTML=html;
  }

  /* ---- Sync scroll ---- */
  textArea.addEventListener("scroll",function(){
    highlightEl.scrollTop=textArea.scrollTop;
    highlightEl.scrollLeft=textArea.scrollLeft;
  });

  /* ---- Events ---- */
  patternInput.addEventListener("input",run);
  textArea.addEventListener("input",run);

  /* Make textarea transparent background so highlight shows through */
  textArea.style.background="transparent";
  textArea.style.position="relative";
  textArea.style.zIndex="1";
  highlightEl.style.background="var(--bg,#0f1117)";
})();
</script>

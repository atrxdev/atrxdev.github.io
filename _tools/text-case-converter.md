---
title: Text Case Converter
description: Convert text between uppercase, lowercase, title case, and more
tool_explanation: |-
  This text case converter changes copied text into multiple writing and developer-friendly formats, including uppercase, lowercase, title case, sentence case, camelCase, snake_case, kebab-case, and more. It is useful for editing copy, standardizing datasets, preparing headings, and cleaning up names for code or content workflows.
how_to_use:
  - Paste or type your source text into the input box.
  - Review the live character and word count if you need a quick size check.
  - Select the case format you want to apply.
  - Copy the converted output and paste it into your document, spreadsheet, CMS, or code editor.
tool_article: |-
  Text formatting looks trivial until you have to do it repeatedly across different systems with different rules. A heading in a content management system may need title case. A database export may need normalized lowercase values. A CSS class or API field may need kebab-case or snake_case. A JavaScript variable may need camelCase. The transformation itself is rarely complex, but the repetition adds friction and invites inconsistency. A text case converter earns its place by removing that friction and making those transformations fast, predictable, and reversible.

  The practical value goes beyond convenience. Consistent casing improves readability, searchability, and trust in the final output. In editorial work, inconsistent capitalization can make a page feel sloppy even when the underlying writing is strong. In development work, inconsistent naming can create real bugs, failed lookups, style mismatches, or confusing APIs. Teams often underestimate how many tiny decisions about casing are made every week, and how much time disappears into fixing avoidable inconsistencies after the fact.

  Different case styles exist because different contexts optimize for different goals. Uppercase is useful for emphasis and some labels. Lowercase can be cleaner for normalization and comparison. Title case is common for headlines and navigation labels because it creates visual structure. Sentence case often feels more natural and modern in product interfaces. CamelCase and PascalCase are common in programming where spaces are not allowed. Snake_case, kebab-case, dot.case, constant case, and path/case each show up in technical systems, filenames, configuration keys, and naming conventions.

  That variety is exactly why a converter is useful. It lets one source phrase move cleanly between contexts instead of being rewritten each time. Suppose you have a feature name that appears in design copy, analytics events, CSS selectors, and code. Each place may expect a different format. Without a converter, you either retype the phrase repeatedly or adjust it by hand and hope you do not miss a character. With a converter, you can test several outputs in seconds, compare them, and use the version that fits the destination best.

  Content workflows benefit just as much as developer workflows. Editors often receive drafts pasted from multiple sources, each with its own capitalization habits. Product teams copy language from tickets into interfaces. Marketers repurpose webinar titles into landing pages, emails, and social posts. Small casing changes happen constantly, and hand-editing them can be slower than people expect. A converter helps preserve the original wording while changing only the presentation. That keeps revisions focused and reduces the chance of accidental wording drift during repetitive cleanup work.

  There is also a data quality angle. When records or tags are entered by multiple people, inconsistent capitalization can make matching, deduplication, and reporting harder. Lowercasing values before comparison, or converting free-form labels into standardized key formats, can make downstream processing far more reliable. Even when a converter is used manually rather than in a larger pipeline, it helps establish a habit of normalization. That habit becomes valuable when content and data need to move cleanly between spreadsheets, forms, databases, and code.

  Developers in particular benefit from having several naming conventions close at hand. Modern projects often combine languages and frameworks that each lean toward different styles. A component name may use PascalCase, a JSON field may use snake_case, a URL slug may use kebab-case, and an environment variable may require CONSTANT_CASE. Switching between those rules is not hard, but it is easy to make subtle mistakes when moving quickly. A converter offloads the mechanical part of the job so attention can stay on architecture and meaning instead of capitalization trivia.

  That said, a converter should support judgment rather than replace it. Title case rules differ between style guides. Sentence case can change tone. Automatic word splitting may not perfectly handle brand names, abbreviations, or edge cases in every language. The tool is most effective when it gets you close instantly and you spend a final second reviewing the result in context. That is still a major improvement over manual conversion because the review step is much lighter than doing every transformation by hand.

  Ultimately, a text case converter is valuable because it turns a low-level formatting task into a quick, reliable step. That keeps writing cleaner, datasets more consistent, and code naming more deliberate. When a utility can save dozens of tiny edits across a week, it does not need to be flashy to matter. It just needs to be accurate, quick, and available at the moment when a piece of text needs to fit the next system it is about to enter.

  In that sense, the tool is less about typography than momentum. It removes one more avoidable pause from writing and implementation work. When teams can standardize names and labels quickly, they spend less time correcting cosmetic inconsistency later and more time improving the substance of the content or product itself.
faqs:
  - question: Which case should I use for UI headings?
    answer: |-
      It depends on your style guide. Many product teams now prefer sentence case for interface labels, while title case is still common in editorial and marketing contexts.
  - question: Is camelCase the same as PascalCase?
    answer: |-
      No. camelCase starts with a lowercase letter, while PascalCase capitalizes the first letter as well.
  - question: Will the converter rewrite the meaning of my text?
    answer: |-
      It changes letter casing and word joining, but it does not intentionally rewrite the words themselves. You should still review brand names and acronyms after conversion.
  - question: Can this help with data cleanup?
    answer: |-
      Yes. It is useful for normalizing inconsistent labels, tags, headings, or field names before you move them into another system.
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

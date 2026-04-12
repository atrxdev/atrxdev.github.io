---
title: Base64 Encode / Decode
description: "Encode text to Base64 or decode Base64 strings instantly in your browser for debugging, data transfer, integrations, and web development tasks."
categories:
  - Data
tool_explanation: |-
  This tool converts plain text into Base64 and decodes Base64 back into readable text. It is useful for quick testing, debugging, content packaging, and data inspection, especially when you need to verify how text is being transformed inside an API, email payload, token, or data URL.
how_to_use:
  - Choose Encode if you want to turn readable text into Base64.
  - Choose Decode if you want to turn a Base64 string back into text.
  - Paste your source content into the input field.
  - Select Convert, then copy the result or adjust the input if you see a validation error.
tool_article: |-
  Base64 is one of those formats that almost everyone in web development, marketing automation, email operations, or API integration eventually encounters, even if they are not thinking about it by name. At a basic level, Base64 is a way to represent binary or text data using a limited set of readable characters. That makes it useful in systems that are designed to move text safely but still need to carry images, documents, tokens, or structured payloads. It is not glamorous, but it is everywhere for a reason.

  The first thing to understand is what Base64 is not. It is not encryption. It does not protect sensitive data, and it should never be treated as a security measure. If someone can read the Base64 string, they can usually decode it immediately. Base64 is encoding, not secrecy. Its purpose is compatibility. It turns data into a form that travels more reliably through channels that may otherwise mangle raw bytes, special characters, or formatting. That distinction matters because many debugging mistakes start when someone assumes an encoded string is somehow protected.

  A lot of common internet plumbing depends on this exact tradeoff. Email attachments often rely on Base64 within MIME messages so binary files can move through systems built around text. Data URLs can embed small images or files directly inside HTML or CSS by storing the content as Base64. JSON APIs sometimes return binary blobs in encoded form because the transport layer expects text. Authentication schemes, tokens, and configuration strings also use Base64 or Base64-like variants to package values in a predictable way. Once you start looking for it, you see it in many parts of everyday tooling.

  There is a cost, though. Base64 increases size. Encoded content is roughly one third larger than the original binary data because the representation uses more characters to describe the same information. That overhead is often acceptable for portability, but it is worth remembering when performance or payload size matters. If someone embeds a large image as Base64 in a place where a file reference would do, the page can become harder to cache and heavier to transfer. The format is helpful, but like many convenience layers, it should be used with a clear reason.

  Another practical issue is text encoding. Modern text is rarely limited to simple ASCII. People paste accented characters, emoji, and scripts from many languages. If a tool does not handle Unicode correctly, encoded results can break or decode into garbage. That is why browser-side tools need to be careful about how they translate text to bytes and back. When you are debugging a failed integration, a reliable encoder and decoder can save time because it lets you isolate whether the real issue is the Base64 layer, the underlying text encoding, or the system receiving the content.

  That makes a local tool especially useful in troubleshooting. Suppose an API returns a long encoded value and you need to inspect it quickly. Instead of writing a script or opening a console, you can decode it in place and verify whether it is JSON, a readable message, or some binary-looking content that should be handled differently. The same goes in the other direction. If a service expects Base64 input, you can encode a short sample payload and compare it with the server's documentation or a test fixture. Fast iteration is often the difference between guessing and actually understanding the data flow.

  For non-developers, the value is still real. Marketers dealing with email templates, operators handling webhooks, and support teams reviewing exported payloads may not want to touch a command line just to inspect or convert a string. A straightforward encoder and decoder lowers the barrier. It removes setup, avoids unnecessary tooling, and keeps the task focused on the data itself. That is often enough to unblock work without waiting on engineering help for something that is fundamentally a format conversion problem.

  Good Base64 habits come down to accuracy and context. Know whether you are using standard Base64 or a URL-safe variant. Know whether the result should decode to text or to a file-like binary value. Know that encoding does not hide secrets. And know when Base64 is useful versus when it is just making a payload larger without solving a real transport issue. With those basics in place, the format stops feeling obscure and starts acting like what it really is: a practical compatibility layer.

  A simple browser tool supports that workflow well because the task itself is simple. You paste, convert, inspect, and move on. There is no environment setup, no package install, and no risk of altering the original data while experimenting. When you are moving between docs, API responses, templates, and test payloads, that kind of lightweight utility earns its place by saving a few minutes every time an encoded string shows up unexpectedly.
faqs:
  - question: Is Base64 the same as encryption?
    answer: |-
      No. Base64 only changes how data is represented. It does not protect the content from being read by someone who has the encoded string.
  - question: Why is my Base64 output longer than the original text?
    answer: |-
      That is expected. Base64 uses more characters to represent the same content, so the encoded output is larger than the source data.
  - question: Can I decode any Base64 string into readable text?
    answer: |-
      Not always. Some Base64 strings represent binary data like images or files, so the decoded result may not be readable text.
  - question: Does this tool upload my content?
    answer: |-
      The conversion runs in your browser. You can inspect or transform the string without needing a server-side round trip.
---

<div class="b64-mode">
  <div class="b64-tab active" id="tab-encode" onclick="setMode('encode')">Encode</div>
  <div class="b64-tab" id="tab-decode" onclick="setMode('decode')">Decode</div>
</div>

<label id="input-label">Text to encode</label>
<textarea id="b64-input" rows="6" placeholder="Paste your text here…"></textarea>

<button onclick="convert()">Convert</button>

<label>Result</label>
<div class="b64-output-row">
  <textarea id="b64-output" rows="6" readonly placeholder="Result will appear here"></textarea>
  <button type="button" class="b64-copy" id="b64-copy" onclick="copyResult()" title="Copy result">
    <svg id="b64-copy-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
    <svg id="b64-check-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><polyline points="20 6 9 17 4 12"/></svg>
  </button>
</div>

<p class="b64-error" id="b64-error"></p>

<style>
  .b64-mode{display:flex;gap:0;margin-bottom:1.25rem;border-bottom:1px solid var(--border,#2a2d3a)}
  .b64-tab{flex:1;padding:0.6rem 1rem;border:none;border-bottom:2px solid transparent;background:transparent;color:var(--text-muted,#9ca3af);cursor:pointer;font-size:0.95rem;font-weight:500;transition:color .2s,border-color .2s}
  .b64-tab:hover{color:var(--text,#e4e4e7)}
  .b64-tab.active{color:var(--text,#e4e4e7);border-bottom-color:var(--accent,#6366f1)}
  .b64-output-row{display:flex;gap:0;align-items:stretch}
  .b64-output-row textarea{flex:1;border-top-right-radius:0;border-bottom-right-radius:0;margin-bottom:0}
  .b64-copy{background:var(--bg,#0f1117);border:1px solid var(--border,#2a2d3a);border-left:none;border-radius:0 var(--radius-sm,8px) var(--radius-sm,8px) 0;padding:0 0.75rem;cursor:pointer;color:var(--text-muted,#9ca3af);display:flex;align-items:center;justify-content:center;transition:color .2s,background .2s}
  .b64-copy:hover{color:var(--text,#e4e4e7);background:var(--surface-hover,#22242e)}
  .b64-copy:active{transform:scale(0.93)}
  .b64-copy.copied{color:var(--success,#22c55e)}
  .b64-error{color:#ef4444;font-size:0.9rem;min-height:1.4em;margin-top:0.5rem}
</style>

<script>
var b64Mode="encode";

function setMode(mode){
  b64Mode=mode;
  document.getElementById("tab-encode").classList.toggle("active",mode==="encode");
  document.getElementById("tab-decode").classList.toggle("active",mode==="decode");
  document.getElementById("input-label").textContent=mode==="encode"?"Text to encode":"Base64 to decode";
  document.getElementById("b64-input").placeholder=mode==="encode"?"Paste your text here…":"Paste Base64 string here…";
  document.getElementById("b64-error").textContent="";
}

function convert(){
  var input=document.getElementById("b64-input").value;
  var output=document.getElementById("b64-output");
  var error=document.getElementById("b64-error");
  error.textContent="";
  if(!input.trim()){error.textContent="Please enter some text.";output.value="";return}
  try{
    if(b64Mode==="encode"){
      output.value=btoa(unescape(encodeURIComponent(input)));
    }else{
      output.value=decodeURIComponent(escape(atob(input.trim())));
    }
  }catch(e){
    output.value="";
    error.textContent=b64Mode==="decode"?"Invalid Base64 string.":"Encoding failed.";
  }
}

function copyResult(){
  var text=document.getElementById("b64-output").value;
  if(!text)return;
  navigator.clipboard.writeText(text);
  var btn=document.getElementById("b64-copy");
  var copyIcon=document.getElementById("b64-copy-icon");
  var checkIcon=document.getElementById("b64-check-icon");
  btn.classList.add("copied");
  copyIcon.style.display="none";
  checkIcon.style.display="block";
  setTimeout(function(){btn.classList.remove("copied");copyIcon.style.display="block";checkIcon.style.display="none"},1500);
}
</script>

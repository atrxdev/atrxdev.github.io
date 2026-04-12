---
title: Hash Generator
description: "Generate MD5, SHA-1, SHA-256, and SHA-512 hashes from text instantly in your browser for verification, testing, and development work."
categories:
  - Security
  - Data
tool_explanation: |-
  This tool computes cryptographic hash values from text using MD5, SHA-1, SHA-256, and SHA-512. It runs entirely in your browser using the Web Crypto API and a local MD5 implementation. It is useful for verifying checksums, generating content fingerprints, and understanding how different hash algorithms produce fixed-length outputs from arbitrary input.
how_to_use:
  - Type or paste text into the input field.
  - All supported hash values update automatically as you type.
  - Click the copy button next to any hash to copy it to your clipboard.
  - Compare the output with a known hash to verify file integrity or content identity.
tool_article: |-
  Hashing is one of the most fundamental operations in computing, but it often gets confused with encryption or treated as something only security engineers need to understand. In practice, hashes show up across a wide range of everyday tasks, from verifying a downloaded file to generating cache keys, comparing content, and managing data integrity checks. A hash function takes an input of any length and produces a fixed-size output that acts as a fingerprint for that input. Even a tiny change in the source produces a completely different hash, which is why the technique is useful for detecting modifications.

  MD5 is the oldest algorithm in common use. It produces a 128-bit hash, typically shown as a 32-character hexadecimal string. MD5 is fast and widespread, but it is no longer considered secure for cryptographic purposes because researchers have demonstrated practical collision attacks, meaning two different inputs can be crafted to produce the same hash. Despite that weakness, MD5 is still used regularly for non-security tasks like checksum verification, cache invalidation, and content deduplication where collision resistance is less critical.

  SHA-1 produces a 160-bit hash and was widely used in certificate signing, version control systems, and integrity checks. Like MD5, it has been weakened by collision attacks and is no longer recommended for security-sensitive applications. However, it remains relevant in legacy systems and contexts where backward compatibility matters. Git, for example, historically used SHA-1 for commit identification, though it has been moving toward SHA-256.

  SHA-256 is part of the SHA-2 family and produces a 256-bit hash. It is currently considered secure for cryptographic use and is the standard choice for digital signatures, certificate chains, blockchain verification, and integrity checks where collision resistance matters. When documentation or a security specification asks for a SHA hash without specifying a variant, SHA-256 is usually the expected default.

  SHA-512 produces a 512-bit hash and belongs to the same SHA-2 family. It offers a larger output and can be slightly faster than SHA-256 on 64-bit systems because its internal operations align better with 64-bit arithmetic. The larger hash size provides a wider margin against brute-force attacks, though for most practical purposes SHA-256 is already more than sufficient. SHA-512 is sometimes preferred in contexts that require longer hash values or where the performance characteristics of 64-bit operations are beneficial.

  A common use case for a hash generator is checksum verification. When you download software, the publisher often provides a hash of the original file. After downloading, you hash your copy and compare it with the published value. If they match, the file arrived intact and unmodified. If they differ, something changed during transit or the file may not be genuine. This simple comparison process is one of the most practical applications of hashing in everyday computing.

  Developers also use hashes during debugging and integration work. Comparing the hash of a request payload or API response with an expected value can quickly confirm whether the content matches. Content-addressable storage systems, deduplication logic, and ETag headers all rely on hashing to identify and compare data efficiently. Having a quick way to generate a hash from a piece of text removes the need to write a script or search for a command-line recipe every time these situations come up.

  It is important to understand what hashing does not do. A hash is not encryption. You cannot reverse a hash to recover the original input. Hashing is a one-way operation by design. That property is useful for password storage, where the system keeps only the hash and verifies login attempts by hashing the submitted password and comparing results. But it also means you cannot use a hash generator to decode or decrypt anything. The tool creates fingerprints, not encrypted messages.

  For most web and development tasks, SHA-256 is the right default. Use MD5 or SHA-1 only when a specific system requires them or when the task is non-security-related, such as quick content comparison or legacy checksum matching. When security matters, stick to SHA-256 or SHA-512 and keep in mind that the hash itself is only as useful as the process around it. A valid checksum confirms integrity only if you trust the source that published it.
faqs:
  - question: Is MD5 still safe to use?
    answer: |-
      MD5 is not recommended for security purposes because collision attacks are practical. It is still acceptable for non-security tasks like checksum comparison and content fingerprinting where collision resistance is not critical.
  - question: What is the difference between SHA-256 and SHA-512?
    answer: |-
      Both belong to the SHA-2 family. SHA-256 produces a 256-bit hash, SHA-512 produces a 512-bit hash. SHA-512 can be faster on 64-bit systems, but SHA-256 is sufficient for most use cases.
  - question: Can I reverse a hash to get the original text?
    answer: |-
      No. Hashing is a one-way operation. You cannot recover the input from a hash value. That is by design and is what makes hashing useful for integrity verification and password storage.
  - question: Does this tool send my text to a server?
    answer: |-
      No. All hashing is performed locally in your browser using the Web Crypto API and a client-side MD5 implementation.
  - question: Why do small changes in input produce completely different hashes?
    answer: |-
      This property is called the avalanche effect. Good hash functions are designed so that any change in input, even a single character, produces a drastically different output. It makes hashes useful for detecting modifications.
---

<div class="hash-tool">
  <div class="hash-mode">
    <div class="hash-tab active" id="tab-text" onclick="setHashMode('text')">Text</div>
    <div class="hash-tab" id="tab-file" onclick="setHashMode('file')">File</div>
  </div>

  <div id="hash-text-input">
    <label for="hash-input">Text to hash</label>
    <textarea id="hash-input" rows="5" placeholder="Type or paste text here…"></textarea>
  </div>

  <div id="hash-file-input" style="display:none">
    <div class="hash-drop-zone" id="hash-drop-zone">
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><polyline points="13 2 13 9 20 9"/></svg>
      <p>Drop a file here or <span class="hash-browse">browse</span></p>
      <p class="hash-file-hint">Any file type supported</p>
      <input type="file" id="hash-file-picker" hidden>
    </div>
    <div class="hash-file-info" id="hash-file-info" style="display:none">
      <span id="hash-file-name"></span>
      <span id="hash-file-size"></span>
      <button type="button" class="hash-file-clear" onclick="clearHashFile()">✕</button>
    </div>
  </div>

  <div class="hash-results" id="hash-results">
    <div class="hash-row" data-algo="MD5">
      <span class="hash-algo">MD5</span>
      <div class="hash-value-row">
        <input class="hash-output" id="hash-md5" readonly placeholder="—">
        <button type="button" class="hash-copy" onclick="copyHash('hash-md5')" title="Copy">
          <svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          <svg class="check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><polyline points="20 6 9 17 4 12"/></svg>
        </button>
      </div>
    </div>
    <div class="hash-row" data-algo="SHA-1">
      <span class="hash-algo">SHA-1</span>
      <div class="hash-value-row">
        <input class="hash-output" id="hash-sha1" readonly placeholder="—">
        <button type="button" class="hash-copy" onclick="copyHash('hash-sha1')" title="Copy">
          <svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          <svg class="check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><polyline points="20 6 9 17 4 12"/></svg>
        </button>
      </div>
    </div>
    <div class="hash-row" data-algo="SHA-256">
      <span class="hash-algo">SHA-256</span>
      <div class="hash-value-row">
        <input class="hash-output" id="hash-sha256" readonly placeholder="—">
        <button type="button" class="hash-copy" onclick="copyHash('hash-sha256')" title="Copy">
          <svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          <svg class="check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><polyline points="20 6 9 17 4 12"/></svg>
        </button>
      </div>
    </div>
    <div class="hash-row" data-algo="SHA-512">
      <span class="hash-algo">SHA-512</span>
      <div class="hash-value-row">
        <input class="hash-output" id="hash-sha512" readonly placeholder="—">
        <button type="button" class="hash-copy" onclick="copyHash('hash-sha512')" title="Copy">
          <svg class="copy-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          <svg class="check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><polyline points="20 6 9 17 4 12"/></svg>
        </button>
      </div>
    </div>
  </div>
</div>

<style>
.hash-tool{display:flex;flex-direction:column;gap:1.25rem}
.hash-mode{display:flex;gap:0;border:1px solid var(--border,#2a2d3a);border-radius:var(--radius-sm,8px);overflow:hidden;margin-bottom:0.25rem}
.hash-tab{flex:1;text-align:center;padding:0.55rem 1rem;cursor:pointer;font-size:0.9rem;font-weight:600;color:var(--text-muted,#9ca3af);background:var(--bg,#0f1117);transition:background .2s,color .2s;user-select:none}
.hash-tab:hover{background:var(--surface-hover,#22242e)}
.hash-tab.active{background:var(--accent,#6366f1);color:#fff}
.hash-drop-zone{border:2px dashed var(--border,#2a2d3a);border-radius:var(--radius,12px);padding:2.5rem 2rem;text-align:center;cursor:pointer;transition:border-color .2s,background .2s}
.hash-drop-zone:hover,.hash-drop-zone.dragover{border-color:var(--accent,#6366f1);background:var(--accent-glow,rgba(99,102,241,0.15))}
.hash-drop-zone svg{color:var(--text-muted,#9ca3af);margin-bottom:0.75rem}
.hash-drop-zone p{color:var(--text-muted,#9ca3af);margin:0.2rem 0}
.hash-browse{color:var(--accent,#6366f1);cursor:pointer;text-decoration:underline}
.hash-file-hint{font-size:0.82rem;opacity:0.6}
.hash-file-info{display:flex;align-items:center;gap:0.75rem;padding:0.75rem 1rem;background:var(--surface,#1a1c25);border:1px solid var(--border,#2a2d3a);border-radius:var(--radius-sm,8px);font-size:0.9rem}
.hash-file-info #hash-file-name{flex:1;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.hash-file-info #hash-file-size{color:var(--text-muted,#9ca3af);font-size:0.82rem;flex-shrink:0}
.hash-file-clear{background:none;border:none;color:var(--text-muted,#9ca3af);cursor:pointer;font-size:1.1rem;padding:0 0.25rem;line-height:1;transition:color .2s}
.hash-file-clear:hover{color:#ef4444}
.hash-results{display:flex;flex-direction:column;gap:0.75rem}
.hash-row{display:flex;flex-direction:column;gap:0.3rem}
.hash-algo{font-size:0.78rem;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted,#9ca3af)}
.hash-value-row{display:flex;gap:0;align-items:stretch}
.hash-output{flex:1;font-family:'SF Mono',SFMono-Regular,Menlo,Consolas,monospace;font-size:0.85rem;letter-spacing:0.02em;border-top-right-radius:0;border-bottom-right-radius:0;margin-bottom:0;background:var(--bg,#0f1117);color:var(--text,#e4e4e7);border:1px solid var(--border,#2a2d3a);padding:0.6rem 0.75rem;border-radius:var(--radius-sm,8px) 0 0 var(--radius-sm,8px)}
.hash-copy{background:var(--bg,#0f1117);border:1px solid var(--border,#2a2d3a);border-left:none;border-radius:0 var(--radius-sm,8px) var(--radius-sm,8px) 0;padding:0 0.75rem;cursor:pointer;color:var(--text-muted,#9ca3af);display:flex;align-items:center;justify-content:center;transition:color .2s,background .2s}
.hash-copy:hover{color:var(--text,#e4e4e7);background:var(--surface-hover,#22242e)}
.hash-copy:active{transform:scale(0.93)}
.hash-copy.copied{color:var(--success,#22c55e)}
</style>

<script>
(function(){
  var currentMode="text";

  /* --- Mode tabs --- */
  window.setHashMode=function(mode){
    currentMode=mode;
    document.getElementById("tab-text").classList.toggle("active",mode==="text");
    document.getElementById("tab-file").classList.toggle("active",mode==="file");
    document.getElementById("hash-text-input").style.display=mode==="text"?"":"none";
    document.getElementById("hash-file-input").style.display=mode==="file"?"":"none";
    clearOutputs();
  };

  /* --- File drop zone --- */
  var dropZone=document.getElementById("hash-drop-zone");
  var filePicker=document.getElementById("hash-file-picker");
  var fileInfo=document.getElementById("hash-file-info");
  var fileNameEl=document.getElementById("hash-file-name");
  var fileSizeEl=document.getElementById("hash-file-size");

  dropZone.addEventListener("click",function(){filePicker.click()});
  dropZone.addEventListener("dragover",function(e){e.preventDefault();dropZone.classList.add("dragover")});
  dropZone.addEventListener("dragleave",function(){dropZone.classList.remove("dragover")});
  dropZone.addEventListener("drop",function(e){
    e.preventDefault();dropZone.classList.remove("dragover");
    if(e.dataTransfer.files.length)handleFileHash(e.dataTransfer.files[0]);
  });
  filePicker.addEventListener("change",function(){
    if(filePicker.files.length)handleFileHash(filePicker.files[0]);
  });

  function formatBytes(b){
    if(b<1024)return b+" B";
    if(b<1048576)return(b/1024).toFixed(1)+" KB";
    return(b/1048576).toFixed(2)+" MB";
  }

  function handleFileHash(file){
    fileNameEl.textContent=file.name;
    fileSizeEl.textContent=formatBytes(file.size);
    dropZone.style.display="none";
    fileInfo.style.display="";
    var reader=new FileReader();
    reader.onload=function(e){
      var buf=e.target.result;
      md5Out.value=md5Buf(new Uint8Array(buf));
      shaBuf("SHA-1",buf).then(function(h){sha1Out.value=h});
      shaBuf("SHA-256",buf).then(function(h){sha256Out.value=h});
      shaBuf("SHA-512",buf).then(function(h){sha512Out.value=h});
    };
    reader.readAsArrayBuffer(file);
  }

  window.clearHashFile=function(){
    dropZone.style.display="";
    fileInfo.style.display="none";
    filePicker.value="";
    clearOutputs();
  };

  /* --- MD5 (RFC 1321) pure-JS implementation --- */
  function md5(str){
    function safeAdd(x,y){var l=(x&0xFFFF)+(y&0xFFFF);return(((x>>16)+(y>>16)+(l>>16))<<16)|(l&0xFFFF)}
    function bitRotL(n,c){return(n<<c)|(n>>>(32-c))}
    function cmn(q,a,b,x,s,t){return safeAdd(bitRotL(safeAdd(safeAdd(a,q),safeAdd(x,t)),s),b)}
    function ff(a,b,c,d,x,s,t){return cmn((b&c)|((~b)&d),a,b,x,s,t)}
    function gg(a,b,c,d,x,s,t){return cmn((b&d)|(c&(~d)),a,b,x,s,t)}
    function hh(a,b,c,d,x,s,t){return cmn(b^c^d,a,b,x,s,t)}
    function ii(a,b,c,d,x,s,t){return cmn(c^(b|(~d)),a,b,x,s,t)}
    function toWordArray(s){
      var l=s.length,nw=((l+8)>>>6)+1,a=new Array(nw*16);
      for(var i=0;i<nw*16;i++)a[i]=0;
      for(var i=0;i<l;i++)a[i>>2]|=s.charCodeAt(i)<<((i%4)*8);
      a[l>>2]|=0x80<<((l%4)*8);
      a[nw*16-2]=l*8;
      return a;
    }
    function toHex(n){
      var s="",h="0123456789abcdef";
      for(var i=0;i<4;i++)s+=h.charAt((n>>(i*8+4))&0x0F)+h.charAt((n>>(i*8))&0x0F);
      return s;
    }
    var x=toWordArray(unescape(encodeURIComponent(str)));
    var a=1732584193,b=-271733879,c=-1732584194,d=271733878;
    for(var i=0;i<x.length;i+=16){
      var oa=a,ob=b,oc=c,od=d;
      a=ff(a,b,c,d,x[i],7,-680876936);d=ff(d,a,b,c,x[i+1],12,-389564586);c=ff(c,d,a,b,x[i+2],17,606105819);b=ff(b,c,d,a,x[i+3],22,-1044525330);
      a=ff(a,b,c,d,x[i+4],7,-176418897);d=ff(d,a,b,c,x[i+5],12,1200080426);c=ff(c,d,a,b,x[i+6],17,-1473231341);b=ff(b,c,d,a,x[i+7],22,-45705983);
      a=ff(a,b,c,d,x[i+8],7,1770035416);d=ff(d,a,b,c,x[i+9],12,-1958414417);c=ff(c,d,a,b,x[i+10],17,-42063);b=ff(b,c,d,a,x[i+11],22,-1990404162);
      a=ff(a,b,c,d,x[i+12],7,1804603682);d=ff(d,a,b,c,x[i+13],12,-40341101);c=ff(c,d,a,b,x[i+14],17,-1502002290);b=ff(b,c,d,a,x[i+15],22,1236535329);
      a=gg(a,b,c,d,x[i+1],5,-165796510);d=gg(d,a,b,c,x[i+6],9,-1069501632);c=gg(c,d,a,b,x[i+11],14,643717713);b=gg(b,c,d,a,x[i],20,-373897302);
      a=gg(a,b,c,d,x[i+5],5,-701558691);d=gg(d,a,b,c,x[i+10],9,38016083);c=gg(c,d,a,b,x[i+15],14,-660478335);b=gg(b,c,d,a,x[i+4],20,-405537848);
      a=gg(a,b,c,d,x[i+9],5,568446438);d=gg(d,a,b,c,x[i+14],9,-1019803690);c=gg(c,d,a,b,x[i+3],14,-187363961);b=gg(b,c,d,a,x[i+8],20,1163531501);
      a=gg(a,b,c,d,x[i+13],5,-1444681467);d=gg(d,a,b,c,x[i+2],9,-51403784);c=gg(c,d,a,b,x[i+7],14,1735328473);b=gg(b,c,d,a,x[i+12],20,-1926607734);
      a=hh(a,b,c,d,x[i+5],4,-378558);d=hh(d,a,b,c,x[i+8],11,-2022574463);c=hh(c,d,a,b,x[i+11],16,1839030562);b=hh(b,c,d,a,x[i+14],23,-35309556);
      a=hh(a,b,c,d,x[i+1],4,-1530992060);d=hh(d,a,b,c,x[i+4],11,1272893353);c=hh(c,d,a,b,x[i+7],16,-155497632);b=hh(b,c,d,a,x[i+10],23,-1094730640);
      a=hh(a,b,c,d,x[i+13],4,681279174);d=hh(d,a,b,c,x[i],11,-358537222);c=hh(c,d,a,b,x[i+3],16,-722521979);b=hh(b,c,d,a,x[i+6],23,76029189);
      a=hh(a,b,c,d,x[i+9],4,-640364487);d=hh(d,a,b,c,x[i+12],11,-421815835);c=hh(c,d,a,b,x[i+15],16,530742520);b=hh(b,c,d,a,x[i+2],23,-995338651);
      a=ii(a,b,c,d,x[i],6,-198630844);d=ii(d,a,b,c,x[i+7],10,1126891415);c=ii(c,d,a,b,x[i+14],15,-1416354905);b=ii(b,c,d,a,x[i+5],21,-57434055);
      a=ii(a,b,c,d,x[i+12],6,1700485571);d=ii(d,a,b,c,x[i+3],10,-1894986606);c=ii(c,d,a,b,x[i+10],15,-1051523);b=ii(b,c,d,a,x[i+1],21,-2054922799);
      a=ii(a,b,c,d,x[i+8],6,1873313359);d=ii(d,a,b,c,x[i+15],10,-30611744);c=ii(c,d,a,b,x[i+6],15,-1560198380);b=ii(b,c,d,a,x[i+13],21,1309151649);
      a=ii(a,b,c,d,x[i+4],6,-145523070);d=ii(d,a,b,c,x[i+11],10,-1120210379);c=ii(c,d,a,b,x[i+2],15,718787259);b=ii(b,c,d,a,x[i+9],21,-343485551);
      a=safeAdd(a,oa);b=safeAdd(b,ob);c=safeAdd(c,oc);d=safeAdd(d,od);
    }
    return toHex(a)+toHex(b)+toHex(c)+toHex(d);
  }

  /* --- MD5 for ArrayBuffer (binary files) --- */
  function md5Buf(uint8){
    function safeAdd(x,y){var l=(x&0xFFFF)+(y&0xFFFF);return(((x>>16)+(y>>16)+(l>>16))<<16)|(l&0xFFFF)}
    function bitRotL(n,c){return(n<<c)|(n>>>(32-c))}
    function cmn(q,a,b,x,s,t){return safeAdd(bitRotL(safeAdd(safeAdd(a,q),safeAdd(x,t)),s),b)}
    function ff(a,b,c,d,x,s,t){return cmn((b&c)|((~b)&d),a,b,x,s,t)}
    function gg(a,b,c,d,x,s,t){return cmn((b&d)|(c&(~d)),a,b,x,s,t)}
    function hh(a,b,c,d,x,s,t){return cmn(b^c^d,a,b,x,s,t)}
    function ii(a,b,c,d,x,s,t){return cmn(c^(b|(~d)),a,b,x,s,t)}
    function toHex(n){
      var s="",h="0123456789abcdef";
      for(var i=0;i<4;i++)s+=h.charAt((n>>(i*8+4))&0x0F)+h.charAt((n>>(i*8))&0x0F);
      return s;
    }
    var l=uint8.length,nw=((l+8)>>>6)+1,x=new Array(nw*16);
    for(var i=0;i<nw*16;i++)x[i]=0;
    for(var i=0;i<l;i++)x[i>>2]|=uint8[i]<<((i%4)*8);
    x[l>>2]|=0x80<<((l%4)*8);
    x[nw*16-2]=l*8;
    var a=1732584193,b=-271733879,c=-1732584194,d=271733878;
    for(var i=0;i<x.length;i+=16){
      var oa=a,ob=b,oc=c,od=d;
      a=ff(a,b,c,d,x[i],7,-680876936);d=ff(d,a,b,c,x[i+1],12,-389564586);c=ff(c,d,a,b,x[i+2],17,606105819);b=ff(b,c,d,a,x[i+3],22,-1044525330);
      a=ff(a,b,c,d,x[i+4],7,-176418897);d=ff(d,a,b,c,x[i+5],12,1200080426);c=ff(c,d,a,b,x[i+6],17,-1473231341);b=ff(b,c,d,a,x[i+7],22,-45705983);
      a=ff(a,b,c,d,x[i+8],7,1770035416);d=ff(d,a,b,c,x[i+9],12,-1958414417);c=ff(c,d,a,b,x[i+10],17,-42063);b=ff(b,c,d,a,x[i+11],22,-1990404162);
      a=ff(a,b,c,d,x[i+12],7,1804603682);d=ff(d,a,b,c,x[i+13],12,-40341101);c=ff(c,d,a,b,x[i+14],17,-1502002290);b=ff(b,c,d,a,x[i+15],22,1236535329);
      a=gg(a,b,c,d,x[i+1],5,-165796510);d=gg(d,a,b,c,x[i+6],9,-1069501632);c=gg(c,d,a,b,x[i+11],14,643717713);b=gg(b,c,d,a,x[i],20,-373897302);
      a=gg(a,b,c,d,x[i+5],5,-701558691);d=gg(d,a,b,c,x[i+10],9,38016083);c=gg(c,d,a,b,x[i+15],14,-660478335);b=gg(b,c,d,a,x[i+4],20,-405537848);
      a=gg(a,b,c,d,x[i+9],5,568446438);d=gg(d,a,b,c,x[i+14],9,-1019803690);c=gg(c,d,a,b,x[i+3],14,-187363961);b=gg(b,c,d,a,x[i+8],20,1163531501);
      a=gg(a,b,c,d,x[i+13],5,-1444681467);d=gg(d,a,b,c,x[i+2],9,-51403784);c=gg(c,d,a,b,x[i+7],14,1735328473);b=gg(b,c,d,a,x[i+12],20,-1926607734);
      a=hh(a,b,c,d,x[i+5],4,-378558);d=hh(d,a,b,c,x[i+8],11,-2022574463);c=hh(c,d,a,b,x[i+11],16,1839030562);b=hh(b,c,d,a,x[i+14],23,-35309556);
      a=hh(a,b,c,d,x[i+1],4,-1530992060);d=hh(d,a,b,c,x[i+4],11,1272893353);c=hh(c,d,a,b,x[i+7],16,-155497632);b=hh(b,c,d,a,x[i+10],23,-1094730640);
      a=hh(a,b,c,d,x[i+13],4,681279174);d=hh(d,a,b,c,x[i],11,-358537222);c=hh(c,d,a,b,x[i+3],16,-722521979);b=hh(b,c,d,a,x[i+6],23,76029189);
      a=hh(a,b,c,d,x[i+9],4,-640364487);d=hh(d,a,b,c,x[i+12],11,-421815835);c=hh(c,d,a,b,x[i+15],16,530742520);b=hh(b,c,d,a,x[i+2],23,-995338651);
      a=ii(a,b,c,d,x[i],6,-198630844);d=ii(d,a,b,c,x[i+7],10,1126891415);c=ii(c,d,a,b,x[i+14],15,-1416354905);b=ii(b,c,d,a,x[i+5],21,-57434055);
      a=ii(a,b,c,d,x[i+12],6,1700485571);d=ii(d,a,b,c,x[i+3],10,-1894986606);c=ii(c,d,a,b,x[i+10],15,-1051523);b=ii(b,c,d,a,x[i+1],21,-2054922799);
      a=ii(a,b,c,d,x[i+8],6,1873313359);d=ii(d,a,b,c,x[i+15],10,-30611744);c=ii(c,d,a,b,x[i+6],15,-1560198380);b=ii(b,c,d,a,x[i+13],21,1309151649);
      a=ii(a,b,c,d,x[i+4],6,-145523070);d=ii(d,a,b,c,x[i+11],10,-1120210379);c=ii(c,d,a,b,x[i+2],15,718787259);b=ii(b,c,d,a,x[i+9],21,-343485551);
      a=safeAdd(a,oa);b=safeAdd(b,ob);c=safeAdd(c,oc);d=safeAdd(d,od);
    }
    return toHex(a)+toHex(b)+toHex(c)+toHex(d);
  }

  /* --- SHA via Web Crypto API --- */
  async function sha(algo,str){
    var data=new TextEncoder().encode(str);
    var buf=await crypto.subtle.digest(algo,data);
    var arr=new Uint8Array(buf);
    return Array.from(arr).map(function(b){return b.toString(16).padStart(2,"0")}).join("");
  }

  async function shaBuf(algo,arrayBuffer){
    var buf=await crypto.subtle.digest(algo,arrayBuffer);
    var arr=new Uint8Array(buf);
    return Array.from(arr).map(function(b){return b.toString(16).padStart(2,"0")}).join("");
  }

  var input=document.getElementById("hash-input");
  var md5Out=document.getElementById("hash-md5");
  var sha1Out=document.getElementById("hash-sha1");
  var sha256Out=document.getElementById("hash-sha256");
  var sha512Out=document.getElementById("hash-sha512");

  function clearOutputs(){
    md5Out.value="";sha1Out.value="";sha256Out.value="";sha512Out.value="";
  }

  var debounceTimer=null;
  input.addEventListener("input",function(){
    clearTimeout(debounceTimer);
    debounceTimer=setTimeout(computeAll,80);
  });

  function computeAll(){
    var text=input.value;
    if(!text){clearOutputs();return;}
    md5Out.value=md5(text);
    sha("SHA-1",text).then(function(h){sha1Out.value=h});
    sha("SHA-256",text).then(function(h){sha256Out.value=h});
    sha("SHA-512",text).then(function(h){sha512Out.value=h});
  }

  window.copyHash=function(id){
    var el=document.getElementById(id);
    if(!el.value)return;
    navigator.clipboard.writeText(el.value);
    var btn=el.closest(".hash-value-row").querySelector(".hash-copy");
    var copyIcon=btn.querySelector(".copy-icon");
    var checkIcon=btn.querySelector(".check-icon");
    btn.classList.add("copied");
    copyIcon.style.display="none";
    checkIcon.style.display="";
    setTimeout(function(){
      btn.classList.remove("copied");
      copyIcon.style.display="";
      checkIcon.style.display="none";
    },1500);
  };
})();
</script>

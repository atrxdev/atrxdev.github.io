---
title: Image Converter
description: Convert images between PNG, JPEG, WebP, and BMP formats in your browser
tool_explanation: |-
  This tool converts images between common formats including PNG, JPEG, WebP, and BMP entirely in your browser. It is useful when you need to change an image format for compatibility, file size optimization, or platform requirements without uploading anything to a server.
how_to_use:
  - Drop an image onto the upload area or click to select a file from your device.
  - Choose the target format from the dropdown menu.
  - Adjust the quality slider if you selected JPEG or WebP.
  - Select Convert, then download the converted file.
tool_article: |-
  Image format conversion is one of those tasks that seems trivial until you actually need to do it at the right moment. You have a PNG screenshot that needs to be a JPEG for an email attachment. A designer hands over a WebP file and the CMS only accepts PNG. A client sends a BMP and you need something lighter for the web. These situations come up constantly in design, development, content operations, and marketing workflows. A browser-based converter removes the need to install desktop software, find a command-line tool, or upload files to an unknown service.

  Understanding the differences between formats helps you make better choices. PNG uses lossless compression, which preserves every pixel exactly. That makes it ideal for screenshots, diagrams, icons, and anything with sharp edges or text. The tradeoff is file size. PNGs can be significantly larger than lossy alternatives, especially for photographs or complex images with many colors and gradients.

  JPEG is the classic lossy format for photographs and rich imagery. It achieves much smaller file sizes by discarding visual information that is hard to notice at reasonable quality levels. The quality slider controls how aggressive the compression is. Higher values keep more detail but produce larger files. Lower values reduce size but can introduce visible artifacts, especially around sharp edges and text. JPEG works best for photos and visuals where slight quality loss is acceptable in exchange for dramatically smaller files.

  WebP is a modern format that supports both lossy and lossless compression. In lossy mode, it typically produces smaller files than JPEG at comparable visual quality. In lossless mode, it often beats PNG on file size. Browser support for WebP is now widespread, making it a strong default choice for web content. When you need the smallest file that still looks good, WebP is usually worth trying.

  BMP is an older uncompressed format that preserves full pixel data without any compression. Files are large, but the format is simple and universally supported. It is occasionally needed for legacy systems, embedded applications, or specific toolchains that expect raw bitmap data.

  A browser-based tool is especially practical for quick, one-off conversions. There is no software to install, no account to create, and no file uploaded to a third-party server. The conversion happens locally using the Canvas API, which means your images stay on your device. That matters for sensitive content, internal screenshots, or any situation where you prefer not to send files through an external service.

  Quality settings deserve attention when converting to lossy formats. The default quality level is usually a good balance, but it is worth experimenting. For web use, a quality setting around 80 to 85 percent often produces files that look nearly identical to the original while being substantially smaller. For archival or print purposes, you might prefer higher quality or a lossless format. The preview and file size shown after conversion help you evaluate the tradeoff before downloading.

  Format conversion does not improve a bad source image. If the original is blurry, low resolution, or heavily compressed, converting it to a lossless format will not recover lost detail. It will just store the same degraded image in a larger file. Conversion is about changing the container and compression method, not enhancing the content. Starting with the best available source gives you the most flexibility.

  For teams and workflows, having a reliable converter available without setup reduces friction. Someone in marketing can resize a hero image for a blog post. A developer can convert assets for a build pipeline. A support agent can reformat a screenshot for a ticket system. When the tool is fast and accessible, format conversion stops being a blocker and becomes a two-second step in a larger process.
faqs:
  - question: Does this tool upload my images to a server?
    answer: |-
      No. The conversion runs entirely in your browser using the Canvas API. Your images are not sent anywhere.
  - question: What is the difference between lossy and lossless formats?
    answer: |-
      Lossy formats like JPEG and WebP reduce file size by discarding some visual information. Lossless formats like PNG preserve every pixel exactly. The right choice depends on whether file size or perfect quality matters more for your use case.
  - question: Why does my converted JPEG look slightly different from the original PNG?
    answer: |-
      JPEG is a lossy format, so some detail is lost during compression. Increasing the quality slider reduces visible differences but produces a larger file.
  - question: What is the maximum file size I can convert?
    answer: |-
      There is no fixed limit from the tool, but very large images may be slow to process depending on your device and browser memory.
  - question: Can I convert animated GIFs?
    answer: |-
      This tool converts static images. If you upload an animated GIF, only the first frame will be used in the converted output.
---

<div class="img-converter">
  <div class="img-drop-zone" id="drop-zone">
    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
    <p>Drop an image here or <span class="img-browse">browse</span></p>
    <p class="img-hint">PNG, JPEG, WebP, BMP, GIF</p>
    <input type="file" id="file-input" accept="image/*" hidden>
  </div>

  <div class="img-preview-area" id="preview-area" style="display:none">
    <div class="img-preview-box">
      <p class="img-label">Original</p>
      <img id="preview-original" alt="Original image">
      <p class="img-meta" id="original-meta"></p>
    </div>
    <div class="img-preview-box">
      <p class="img-label">Converted</p>
      <img id="preview-converted" alt="Converted image" style="display:none">
      <div class="img-placeholder" id="converted-placeholder">Select format and convert</div>
      <p class="img-meta" id="converted-meta"></p>
    </div>
  </div>

  <div class="img-controls" id="controls" style="display:none">
    <div class="img-control-row">
      <div class="img-field">
        <label for="output-format">Output Format</label>
        <select id="output-format">
          <option value="image/png">PNG</option>
          <option value="image/jpeg">JPEG</option>
          <option value="image/webp" selected>WebP</option>
          <option value="image/bmp">BMP</option>
        </select>
      </div>
      <div class="img-field" id="quality-field">
        <label for="quality-slider">Quality: <span id="quality-value">85</span>%</label>
        <input type="range" id="quality-slider" min="1" max="100" value="85">
      </div>
    </div>
    <div class="img-actions">
      <button type="button" id="convert-btn" onclick="convertImage()">Convert</button>
      <button type="button" id="download-btn" onclick="downloadImage()" disabled>Download</button>
      <button type="button" id="reset-btn" onclick="resetConverter()" class="img-reset">Reset</button>
    </div>
  </div>
</div>

<style>
.img-converter{display:flex;flex-direction:column;gap:1.5rem}
.img-drop-zone{border:2px dashed var(--border,#2a2d3a);border-radius:var(--radius,12px);padding:3rem 2rem;text-align:center;cursor:pointer;transition:border-color .2s,background .2s}
.img-drop-zone:hover,.img-drop-zone.dragover{border-color:var(--accent,#6366f1);background:var(--accent-glow,rgba(99,102,241,0.15))}
.img-drop-zone svg{color:var(--text-muted,#9ca3af);margin-bottom:1rem}
.img-drop-zone p{color:var(--text-muted,#9ca3af);margin:0.25rem 0}
.img-browse{color:var(--accent,#6366f1);cursor:pointer;text-decoration:underline}
.img-hint{font-size:0.85rem;opacity:0.6}
.img-preview-area{display:grid;grid-template-columns:1fr 1fr;gap:1rem}
.img-preview-box{background:var(--surface,#1a1c25);border:1px solid var(--border,#2a2d3a);border-radius:var(--radius-sm,8px);padding:1rem;text-align:center;min-height:160px;display:flex;flex-direction:column;align-items:center}
.img-preview-box img{max-width:100%;max-height:250px;border-radius:4px;margin:0.5rem 0;object-fit:contain}
.img-label{font-weight:600;font-size:0.85rem;text-transform:uppercase;letter-spacing:0.05em;color:var(--text-muted,#9ca3af);margin-bottom:0.5rem}
.img-meta{font-size:0.8rem;color:var(--text-muted,#9ca3af);margin-top:auto;word-break:break-all}
.img-placeholder{color:var(--text-muted,#9ca3af);font-size:0.9rem;display:flex;align-items:center;justify-content:center;flex:1;opacity:0.5}
.img-controls{background:var(--surface,#1a1c25);border:1px solid var(--border,#2a2d3a);border-radius:var(--radius-sm,8px);padding:1.25rem}
.img-control-row{display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:1rem}
.img-field{flex:1;min-width:180px}
.img-field label{display:block;font-size:0.85rem;margin-bottom:0.4rem;color:var(--text-muted,#9ca3af)}
.img-field select{width:100%;padding:0.6rem 0.75rem;background:var(--bg,#0f1117);color:var(--text,#e4e4e7);border:1px solid var(--border,#2a2d3a);border-radius:var(--radius-sm,8px);font-size:0.95rem}
#quality-slider{width:100%;margin-top:0.25rem}
.img-actions{display:flex;gap:0.75rem;flex-wrap:wrap}
.img-actions button{flex:1;min-width:100px}
#download-btn:disabled{opacity:0.4;cursor:not-allowed}
.img-reset{background:transparent;border:1px solid var(--border,#2a2d3a);color:var(--text-muted,#9ca3af);font-weight:400}
.img-reset:hover{background:var(--surface-hover,#22242e);color:var(--text,#e4e4e7);box-shadow:none}
@media(max-width:600px){
  .img-preview-area{grid-template-columns:1fr}
  .img-actions{flex-direction:column}
}
</style>

<canvas id="img-canvas" hidden></canvas>

<script>
(function(){
  var dropZone=document.getElementById("drop-zone");
  var fileInput=document.getElementById("file-input");
  var previewArea=document.getElementById("preview-area");
  var controls=document.getElementById("controls");
  var previewOriginal=document.getElementById("preview-original");
  var previewConverted=document.getElementById("preview-converted");
  var convertedPlaceholder=document.getElementById("converted-placeholder");
  var originalMeta=document.getElementById("original-meta");
  var convertedMeta=document.getElementById("converted-meta");
  var formatSelect=document.getElementById("output-format");
  var qualitySlider=document.getElementById("quality-slider");
  var qualityValue=document.getElementById("quality-value");
  var qualityField=document.getElementById("quality-field");
  var downloadBtn=document.getElementById("download-btn");
  var canvas=document.getElementById("img-canvas");
  var ctx=canvas.getContext("2d");

  var sourceImage=null;
  var convertedBlob=null;
  var originalFileName="";

  dropZone.addEventListener("click",function(){fileInput.click()});
  dropZone.addEventListener("dragover",function(e){e.preventDefault();dropZone.classList.add("dragover")});
  dropZone.addEventListener("dragleave",function(){dropZone.classList.remove("dragover")});
  dropZone.addEventListener("drop",function(e){
    e.preventDefault();
    dropZone.classList.remove("dragover");
    if(e.dataTransfer.files.length)handleFile(e.dataTransfer.files[0]);
  });
  fileInput.addEventListener("change",function(){
    if(fileInput.files.length)handleFile(fileInput.files[0]);
  });

  formatSelect.addEventListener("change",toggleQuality);
  qualitySlider.addEventListener("input",function(){qualityValue.textContent=qualitySlider.value});

  function toggleQuality(){
    var fmt=formatSelect.value;
    qualityField.style.display=(fmt==="image/jpeg"||fmt==="image/webp")?"block":"none";
  }
  toggleQuality();

  function formatBytes(bytes){
    if(bytes<1024)return bytes+" B";
    if(bytes<1048576)return(bytes/1024).toFixed(1)+" KB";
    return(bytes/1048576).toFixed(2)+" MB";
  }

  function handleFile(file){
    if(!file.type.startsWith("image/")){alert("Please select an image file.");return}
    originalFileName=file.name.replace(/\.[^.]+$/,"");
    var reader=new FileReader();
    reader.onload=function(e){
      var img=new Image();
      img.onload=function(){
        sourceImage=img;
        previewOriginal.src=e.target.result;
        originalMeta.textContent=img.naturalWidth+"×"+img.naturalHeight+" · "+file.type.split("/")[1].toUpperCase()+" · "+formatBytes(file.size);
        previewArea.style.display="";
        controls.style.display="";
        dropZone.style.display="none";
        previewConverted.style.display="none";
        convertedPlaceholder.style.display="flex";
        convertedMeta.textContent="";
        convertedBlob=null;
        downloadBtn.disabled=true;
      };
      img.src=e.target.result;
    };
    reader.readAsDataURL(file);
  }

  window.convertImage=function(){
    if(!sourceImage)return;
    var fmt=formatSelect.value;
    canvas.width=sourceImage.naturalWidth;
    canvas.height=sourceImage.naturalHeight;

    if(fmt==="image/jpeg"){
      ctx.fillStyle="#ffffff";
      ctx.fillRect(0,0,canvas.width,canvas.height);
    } else {
      ctx.clearRect(0,0,canvas.width,canvas.height);
    }
    ctx.drawImage(sourceImage,0,0);

    var quality=(fmt==="image/jpeg"||fmt==="image/webp")?qualitySlider.value/100:undefined;

    canvas.toBlob(function(blob){
      if(!blob){alert("Conversion failed. Your browser may not support this format.");return}
      convertedBlob=blob;
      var url=URL.createObjectURL(blob);
      previewConverted.onload=function(){URL.revokeObjectURL(url)};
      previewConverted.src=url;
      previewConverted.style.display="";
      convertedPlaceholder.style.display="none";
      var ext=fmt.split("/")[1];
      convertedMeta.textContent=canvas.width+"×"+canvas.height+" · "+ext.toUpperCase()+" · "+formatBytes(blob.size);
      downloadBtn.disabled=false;
    },fmt,quality);
  };

  window.downloadImage=function(){
    if(!convertedBlob)return;
    var ext=formatSelect.value.split("/")[1];
    var a=document.createElement("a");
    a.href=URL.createObjectURL(convertedBlob);
    a.download=originalFileName+"."+ext;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function(){URL.revokeObjectURL(a.href)},1000);
  };

  window.resetConverter=function(){
    sourceImage=null;
    convertedBlob=null;
    originalFileName="";
    previewOriginal.src="";
    previewConverted.src="";
    previewConverted.style.display="none";
    convertedPlaceholder.style.display="flex";
    originalMeta.textContent="";
    convertedMeta.textContent="";
    previewArea.style.display="none";
    controls.style.display="none";
    dropZone.style.display="";
    downloadBtn.disabled=true;
    fileInput.value="";
  };
})();
</script>

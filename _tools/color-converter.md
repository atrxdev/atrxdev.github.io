---
title: Color Converter
description: "Convert HEX, RGB, and HSL color values instantly in your browser for CSS styling, design systems, and frontend development work."
categories:
  - Design
tool_explanation: |-
  This color converter translates values between HEX, RGB, and HSL while giving you a live preview, an interactive wheel, and a saved palette. It is useful for designers, developers, and marketers who need to move between visual exploration and production-ready color values without switching tools.
how_to_use:
  - Enter a HEX, RGB, or HSL value, or pick a color from the wheel.
  - Adjust the lightness slider or individual channel inputs until the preview matches what you need.
  - Copy the HEX value or save the color to your local palette for later reuse.
  - Reopen saved swatches to compare options or keep a small working set for a project.
tool_article: |-
  Color work looks simple from the outside because the end result is just a visual choice, but anyone who has moved between design files, CSS, brand guidelines, and marketing assets knows how quickly the practical details pile up. One stakeholder sends a HEX value, another asks for RGB, and a designer wants to reason about hue and lightness in HSL. The color itself may be the same, but the format changes depending on the tool and the task. A converter becomes useful because it turns those format jumps into a fast, low-friction part of the workflow.

  HEX is often the most recognizable format in web work because it is compact and common in CSS, design specs, and quick handoff conversations. It expresses red, green, and blue as hexadecimal pairs, usually in the form of a six-character code like `#ff6600`. RGB exposes the same color through decimal channel values, which can make it easier to inspect intensity directly or plug numbers into scripts and UI controls. HSL changes the mental model entirely by describing hue, saturation, and lightness, which is often closer to how humans think when they adjust a color visually.

  Each format has a different strength. HEX is convenient for copying and storing. RGB is precise when you are working channel by channel or interfacing with graphics tools and code. HSL is often the easiest way to generate variations because you can hold the hue roughly steady while changing saturation or lightness to create softer, darker, brighter, or more muted versions. That is one reason many designers prefer HSL during exploration. It maps more naturally to questions like, "What happens if this brand color becomes slightly less saturated but noticeably lighter?"

  A useful converter does more than swap numbers. It helps you understand the relationship between the formats. When you move a cursor around a color wheel, you are effectively selecting hue and saturation visually. When you change lightness, you see how the same color family behaves at different brightness levels. Once that relationship clicks, color conversion stops being a mechanical copy-paste task and becomes a tool for deliberate design decisions. That matters because consistency is not just about matching one exact value. It is about building a coherent system of related colors that behave well together.

  The practical applications are broad. Frontend developers use converters when implementing design systems, hover states, borders, and alerts. Designers use them when testing alternate tones for buttons, cards, backgrounds, or illustrations. Marketers use them when adapting a palette across email templates, landing pages, and social assets. Product teams use them when they need a lighter background tint, a darker interaction state, or a fast way to check whether a pasted color matches the approved brand reference. A good converter saves time precisely because it supports both technical and visual thinking.

  Accessibility should also be part of the conversation any time color is being adjusted. A color can look excellent in isolation and still fail when paired with text or placed against a similar background. Converting formats will not solve contrast issues by itself, but it helps you create and compare alternatives quickly. HSL, in particular, can make it easier to nudge lightness in a controlled direction while preserving the overall identity of the color. That is valuable when you need a palette that is expressive without sacrificing readability or usability.

  Another underrated benefit is palette management. Creative work often involves comparing several close options before a final choice is made. If you do not save those options, you end up recreating them from memory or digging through old messages and screenshots. A local palette keeps the working set nearby. That is especially helpful when you are balancing accents, neutrals, and functional states such as success, warning, or error colors. Being able to save a swatch, reopen it, and continue refining it keeps experimentation organized instead of scattered.

  Color conversion is also a communication tool. Teams often talk past each other because they use different formats or different mental models. One person says a color feels too bright. Another asks for the RGB values. A third wants the exact HEX from the brand sheet. When you can switch formats instantly and see the same color represented multiple ways, those conversations become more concrete. The converter acts as a shared reference point, which reduces ambiguity and makes handoffs cleaner.

  In the end, the value of a color converter is not that it performs a complicated calculation. The math is straightforward. The value is that it keeps the work moving. You can test a color, translate it into the format a tool expects, compare a few nearby options, and keep the useful ones saved locally. That combination of speed, visibility, and format flexibility is what makes a small utility like this worth keeping close when design and implementation work overlap.
faqs:
  - question: Which format should I use for CSS?
    answer: |-
      Any of the supported formats can work in CSS, but HEX is still the most common for quick handoff. HSL is often easier when you want to tune lightness or saturation deliberately.
  - question: Does converting between HEX, RGB, and HSL change the actual color?
    answer: |-
      No. The representation changes, but the underlying color stays the same unless you edit one of the channel values.
  - question: Where is the saved palette stored?
    answer: |-
      The palette is stored in your browser's local storage on the current device, so it stays convenient without requiring an account.
  - question: Can this help with accessibility?
    answer: |-
      It can help you create and compare color variations quickly, which is useful when adjusting for contrast, but you should still test final combinations with a contrast checker.
---

<div class="color-converter">
  <div class="cc-fields">
    <div class="color-preview" id="preview"></div>

    <label>HEX</label>
    <div class="hex-row">
      <input id="hex" placeholder="#ff6600" maxlength="7">
      <button type="button" class="copy-hex" id="copy-hex" onclick="copyHex()" title="Copy HEX">
        <svg id="copy-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        <svg id="check-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><polyline points="20 6 9 17 4 12"/></svg>
      </button>
    </div>

    <label>RGB</label>
    <div class="rgb-row">
      <input id="r" type="number" min="0" max="255" placeholder="R">
      <input id="g" type="number" min="0" max="255" placeholder="G">
      <input id="b" type="number" min="0" max="255" placeholder="B">
    </div>

    <label>HSL</label>
    <div class="hsl-row">
      <input id="hue" type="number" min="0" max="360" placeholder="H">
      <input id="sat" type="number" min="0" max="100" placeholder="S%">
      <input id="lit" type="number" min="0" max="100" placeholder="L%">
    </div>

    <button id="save-color" onclick="saveColor()">Save to Palette</button>

    <label>Palette</label>
    <div class="palette" id="palette"></div>
    <button id="clear-palette" onclick="clearPalette()">Clear Palette</button>
  </div>

  <div class="cc-wheel">
    <div class="wheel-wrapper">
      <canvas id="wheel" width="280" height="280"></canvas>
      <div class="wheel-cursor" id="wheel-cursor"></div>
    </div>
    <label>Lightness</label>
    <input type="range" id="lightness-slider" min="0" max="100" value="50">
  </div>
</div>

<style>
  .color-converter{display:flex;flex-direction:column;gap:1.5rem}
  .cc-fields{flex:1;min-width:0}
  .cc-wheel{flex-shrink:0}
  .wheel-wrapper{position:relative;width:280px;height:280px;margin:0 auto 1rem}
  #wheel{border-radius:50%;cursor:crosshair}
  .wheel-cursor{position:absolute;width:16px;height:16px;border-radius:50%;border:2px solid #fff;box-shadow:0 0 0 1px #000,inset 0 0 0 1px #000;pointer-events:none;transform:translate(-50%,-50%);top:50%;left:50%}
  #lightness-slider{width:100%;margin-bottom:1rem}
  .color-preview{width:100%;height:80px;border-radius:8px;border:1px solid #ccc;margin-bottom:1rem;background:#fff}
  .hex-row{display:flex;gap:0;align-items:stretch}
  .hex-row input{flex:1;border-top-right-radius:0;border-bottom-right-radius:0;margin-bottom:0}
  .copy-hex{background:var(--bg,#0f1117);border:1px solid var(--border,#2a2d3a);border-left:none;border-radius:0 var(--radius-sm,8px) var(--radius-sm,8px) 0;padding:0 0.75rem;cursor:pointer;color:var(--text-muted,#9ca3af);display:flex;align-items:center;justify-content:center;transition:color .2s,background .2s}
  .copy-hex:hover{color:var(--text,#e4e4e7);background:var(--surface-hover,#22242e)}
  .copy-hex:active{transform:scale(0.93)}
  .copy-hex.copied{color:var(--success,#22c55e)}
  .rgb-row,.hsl-row{display:flex;gap:0.5rem}
  .rgb-row input,.hsl-row input{flex:1}
  #save-color{margin:1rem 0 1.5rem;width:100%}
  .palette{display:flex;flex-wrap:wrap;gap:0.5rem;min-height:44px;padding:0.5rem;border:1px solid #ccc;border-radius:8px;margin-bottom:0.5rem}
  .palette .swatch{width:44px;height:44px;border-radius:6px;border:1px solid #ccc;cursor:pointer;position:relative;transition:transform .1s}
  .palette .swatch:hover{transform:scale(1.15)}
  .palette .swatch .remove{position:absolute;top:-6px;right:-6px;width:18px;height:18px;border-radius:50%;background:#e74c3c;color:#fff;font-size:12px;line-height:18px;text-align:center;cursor:pointer;display:none}
  .palette .swatch:hover .remove{display:block}
  #clear-palette{width:100%;margin-top:0.25rem;background:transparent;border:1px solid var(--border,#2a2d3a);color:var(--text-muted,#9ca3af);font-weight:400}
  #clear-palette:hover{background:var(--surface-hover,#22242e);color:var(--text,#e4e4e7);box-shadow:none}
  @media(min-width:680px){
    .color-converter{flex-direction:row-reverse}
    .cc-wheel{width:300px}
  }
</style>

<script>
function clamp(v,min,max){return Math.min(max,Math.max(min,v))}

function hexToRgb(hex){
  hex=hex.replace(/^#/,"");
  if(hex.length===3) hex=hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
  if(hex.length!==6) return null;
  var n=parseInt(hex,16);
  if(isNaN(n)) return null;
  return{r:(n>>16)&255,g:(n>>8)&255,b:n&255}
}

function rgbToHex(r,g,b){
  return"#"+[r,g,b].map(function(v){return clamp(v,0,255).toString(16).padStart(2,"0")}).join("")
}

function rgbToHsl(r,g,b){
  r/=255;g/=255;b/=255;
  var max=Math.max(r,g,b),min=Math.min(r,g,b);
  var h,s,l=(max+min)/2;
  if(max===min){h=s=0}
  else{
    var d=max-min;
    s=l>0.5?d/(2-max-min):d/(max+min);
    if(max===r) h=((g-b)/d+(g<b?6:0))/6;
    else if(max===g) h=((b-r)/d+2)/6;
    else h=((r-g)/d+4)/6;
  }
  return{h:Math.round(h*360),s:Math.round(s*100),l:Math.round(l*100)}
}

function hslToRgb(h,s,l){
  h/=360;s/=100;l/=100;
  var r,g,b;
  if(s===0){r=g=b=l}
  else{
    function hue2rgb(p,q,t){
      if(t<0)t+=1;if(t>1)t-=1;
      if(t<1/6)return p+(q-p)*6*t;
      if(t<1/2)return q;
      if(t<2/3)return p+(q-p)*(2/3-t)*6;
      return p;
    }
    var q=l<0.5?l*(1+s):l+s-l*s;
    var p=2*l-q;
    r=hue2rgb(p,q,h+1/3);
    g=hue2rgb(p,q,h);
    b=hue2rgb(p,q,h-1/3);
  }
  return{r:Math.round(r*255),g:Math.round(g*255),b:Math.round(b*255)}
}

function updatePreview(r,g,b){
  document.getElementById("preview").style.background="rgb("+r+","+g+","+b+")";
}

var wheelCanvas=document.getElementById("wheel");
var wheelCtx=wheelCanvas.getContext("2d");
var wheelRadius=wheelCanvas.width/2;
var wheelDragging=false;
var currentWheelH=0,currentWheelS=0;

function drawWheel(lightness){
  var img=wheelCtx.createImageData(wheelCanvas.width,wheelCanvas.height);
  var cx=wheelRadius,cy=wheelRadius;
  for(var y=0;y<wheelCanvas.height;y++){
    for(var x=0;x<wheelCanvas.width;x++){
      var dx=x-cx,dy=y-cy;
      var dist=Math.sqrt(dx*dx+dy*dy);
      var i=(y*wheelCanvas.width+x)*4;
      if(dist<=wheelRadius){
        var angle=Math.atan2(dy,dx);
        var h=(angle/(2*Math.PI)+1)%1;
        var s=dist/wheelRadius;
        var rgb=hslToRgb(h*360,s*100,lightness);
        img.data[i]=rgb.r;img.data[i+1]=rgb.g;img.data[i+2]=rgb.b;img.data[i+3]=255;
      }else{
        img.data[i]=0;img.data[i+1]=0;img.data[i+2]=0;img.data[i+3]=0;
      }
    }
  }
  wheelCtx.putImageData(img,0,0);
}

function positionCursor(h,s){
  var angle=h/360*2*Math.PI;
  var dist=s/100*wheelRadius;
  var x=wheelRadius+dist*Math.cos(angle);
  var y=wheelRadius+dist*Math.sin(angle);
  var cursor=document.getElementById("wheel-cursor");
  cursor.style.left=x+"px";
  cursor.style.top=y+"px";
}

function pickFromWheel(e){
  var rect=wheelCanvas.getBoundingClientRect();
  var scaleX=wheelCanvas.width/rect.width;
  var scaleY=wheelCanvas.height/rect.height;
  var x=(e.clientX-rect.left)*scaleX;
  var y=(e.clientY-rect.top)*scaleY;
  var dx=x-wheelRadius,dy=y-wheelRadius;
  var dist=Math.min(Math.sqrt(dx*dx+dy*dy),wheelRadius);
  var angle=Math.atan2(dy,dx);
  var h=Math.round(((angle/(2*Math.PI)+1)%1)*360);
  var s=Math.round(dist/wheelRadius*100);
  var l=parseInt(document.getElementById("lightness-slider").value);
  currentWheelH=h;currentWheelS=s;
  positionCursor(h,s);
  var rgb=hslToRgb(h,s,l);
  document.getElementById("hex").value=rgbToHex(rgb.r,rgb.g,rgb.b);
  document.getElementById("r").value=rgb.r;
  document.getElementById("g").value=rgb.g;
  document.getElementById("b").value=rgb.b;
  document.getElementById("hue").value=h;
  document.getElementById("sat").value=s;
  document.getElementById("lit").value=l;
  updatePreview(rgb.r,rgb.g,rgb.b);
}

wheelCanvas.addEventListener("mousedown",function(e){wheelDragging=true;pickFromWheel(e)});
wheelCanvas.addEventListener("mousemove",function(e){if(wheelDragging)pickFromWheel(e)});
document.addEventListener("mouseup",function(){wheelDragging=false});
wheelCanvas.addEventListener("touchstart",function(e){e.preventDefault();wheelDragging=true;pickFromWheel(e.touches[0])},{passive:false});
wheelCanvas.addEventListener("touchmove",function(e){e.preventDefault();if(wheelDragging)pickFromWheel(e.touches[0])},{passive:false});
wheelCanvas.addEventListener("touchend",function(){wheelDragging=false});

document.getElementById("lightness-slider").addEventListener("input",function(){
  var l=parseInt(this.value);
  drawWheel(l);
  var h=parseInt(document.getElementById("hue").value)||0;
  var s=parseInt(document.getElementById("sat").value)||0;
  var rgb=hslToRgb(h,s,l);
  document.getElementById("hex").value=rgbToHex(rgb.r,rgb.g,rgb.b);
  document.getElementById("r").value=rgb.r;
  document.getElementById("g").value=rgb.g;
  document.getElementById("b").value=rgb.b;
  document.getElementById("lit").value=l;
  updatePreview(rgb.r,rgb.g,rgb.b);
});

drawWheel(50);

function copyHex(){
  var hex=document.getElementById("hex").value;
  if(!hex) return;
  var btn=document.getElementById("copy-hex");
  navigator.clipboard.writeText(hex).then(function(){
    document.getElementById("copy-icon").style.display="none";
    document.getElementById("check-icon").style.display="inline";
    btn.classList.add("copied");
    setTimeout(function(){
      document.getElementById("copy-icon").style.display="inline";
      document.getElementById("check-icon").style.display="none";
      btn.classList.remove("copied");
    },1500);
  });
}

function getPalette(){
  try{return JSON.parse(localStorage.getItem("colorPalette"))||[]}catch(e){return[]}
}
function savePalette(colors){
  localStorage.setItem("colorPalette",JSON.stringify(colors));
}
function renderPalette(){
  var el=document.getElementById("palette");
  var colors=getPalette();
  el.innerHTML="";
  colors.forEach(function(hex,i){
    var swatch=document.createElement("div");
    swatch.className="swatch";
    swatch.style.background=hex;
    swatch.title=hex;
    swatch.addEventListener("click",function(){selectColor(hex)});
    var rm=document.createElement("span");
    rm.className="remove";
    rm.textContent="\u00d7";
    rm.addEventListener("click",function(e){e.stopPropagation();removeColor(i)});
    swatch.appendChild(rm);
    el.appendChild(swatch);
  });
}
function saveColor(){
  var hex=document.getElementById("hex").value;
  if(!hex||!hexToRgb(hex)) return;
  var colors=getPalette();
  if(colors.indexOf(hex)===-1){colors.push(hex);savePalette(colors);renderPalette()}
}
function removeColor(i){
  var colors=getPalette();colors.splice(i,1);savePalette(colors);renderPalette();
}
function clearPalette(){
  savePalette([]);renderPalette();
}
function selectColor(hex){
  document.getElementById("hex").value=hex;
  document.getElementById("hex").dispatchEvent(new Event("input"));
}
renderPalette();

document.getElementById("hex").addEventListener("input",function(){
  var rgb=hexToRgb(this.value);
  if(!rgb) return;
  document.getElementById("r").value=rgb.r;
  document.getElementById("g").value=rgb.g;
  document.getElementById("b").value=rgb.b;
  var hsl=rgbToHsl(rgb.r,rgb.g,rgb.b);
  document.getElementById("hue").value=hsl.h;
  document.getElementById("sat").value=hsl.s;
  document.getElementById("lit").value=hsl.l;
  document.getElementById("lightness-slider").value=hsl.l;
  drawWheel(hsl.l);positionCursor(hsl.h,hsl.s);
  updatePreview(rgb.r,rgb.g,rgb.b);
});

["r","g","b"].forEach(function(id){
  document.getElementById(id).addEventListener("input",function(){
    var r=clamp(parseInt(document.getElementById("r").value)||0,0,255);
    var g=clamp(parseInt(document.getElementById("g").value)||0,0,255);
    var b=clamp(parseInt(document.getElementById("b").value)||0,0,255);
    document.getElementById("hex").value=rgbToHex(r,g,b);
    var hsl=rgbToHsl(r,g,b);
    document.getElementById("hue").value=hsl.h;
    document.getElementById("sat").value=hsl.s;
    document.getElementById("lit").value=hsl.l;
    document.getElementById("lightness-slider").value=hsl.l;
    drawWheel(hsl.l);positionCursor(hsl.h,hsl.s);
    updatePreview(r,g,b);
  });
});

["hue","sat","lit"].forEach(function(id){
  document.getElementById(id).addEventListener("input",function(){
    var h=clamp(parseInt(document.getElementById("hue").value)||0,0,360);
    var s=clamp(parseInt(document.getElementById("sat").value)||0,0,100);
    var l=clamp(parseInt(document.getElementById("lit").value)||0,0,100);
    var rgb=hslToRgb(h,s,l);
    document.getElementById("r").value=rgb.r;
    document.getElementById("g").value=rgb.g;
    document.getElementById("b").value=rgb.b;
    document.getElementById("hex").value=rgbToHex(rgb.r,rgb.g,rgb.b);
    document.getElementById("lightness-slider").value=l;
    drawWheel(l);positionCursor(h,s);
    updatePreview(rgb.r,rgb.g,rgb.b);
  });
});
</script>

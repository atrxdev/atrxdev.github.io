---
title: .htaccess Generator
description: Build Apache .htaccess configuration files visually with redirects, security headers, caching, compression, and more
tool_explanation: |-
  This tool helps you create Apache .htaccess files without memorizing the directive syntax. Toggle common configuration blocks, fill in your values, and copy the generated output. It covers redirects, HTTPS enforcement, www canonicalization, custom error pages, security headers, GZIP compression, browser caching, IP blocking, hotlink protection, and directory options. Everything runs in your browser — nothing is sent to a server.
how_to_use:
  - Open any section by clicking its header to expand the configuration panel.
  - Fill in the fields or toggle the switches for the directives you need.
  - The generated .htaccess code updates live in the output panel on the right.
  - Click Copy to copy the full output to your clipboard.
  - Paste the code into your .htaccess file on your Apache server.
tool_article: |-
  The .htaccess file is a directory-level configuration file used by the Apache HTTP Server. It lets you override server settings on a per-directory basis without editing the main server configuration. The name stands for "hypertext access," and the file is read by Apache every time a request hits the directory where it resides. Because it is processed on every request, it is both powerful and performance-sensitive — putting too much logic in .htaccess can slow down your site compared to placing the same rules in the main server config.

  One of the most common uses of .htaccess is URL redirection. A 301 redirect tells browsers and search engines that a page has permanently moved to a new location. A 302 redirect indicates a temporary move. Getting the redirect type right matters for SEO because search engines transfer ranking signals for 301 redirects but not for 302s. The RewriteEngine directive enables Apache's mod_rewrite module, which provides a flexible rule-based system for transforming URLs. RewriteRule and RewriteCond together let you match incoming URLs against patterns and rewrite or redirect them to different destinations.

  Forcing HTTPS is now considered a baseline security practice. The .htaccess approach checks whether the request came in over plain HTTP and, if so, redirects to the HTTPS version of the same URL. This works alongside your SSL certificate to ensure all traffic is encrypted. Similarly, canonicalizing the www prefix — choosing between www.example.com and example.com — prevents duplicate content issues in search engines and keeps analytics clean.

  Custom error pages improve user experience by replacing Apache's default error messages with your own pages. The most common are 404 Not Found and 403 Forbidden, but you can define pages for any HTTP error code. A well-designed error page helps visitors navigate back to working content instead of leaving the site.

  Security headers are HTTP response headers that instruct browsers to enable built-in security features. X-Content-Type-Options prevents MIME-type sniffing. X-Frame-Options blocks clickjacking by controlling whether your pages can be embedded in iframes. X-XSS-Protection was an early cross-site scripting filter. Referrer-Policy controls how much referrer information is sent with requests. Content-Security-Policy is the most comprehensive, letting you define exactly which sources of scripts, styles, images, and other resources the browser should allow. Strict-Transport-Security tells browsers to always use HTTPS for your domain, even if the user types http. These headers do not replace secure coding practices, but they add meaningful defense-in-depth.

  GZIP compression reduces the size of text-based responses like HTML, CSS, JavaScript, and JSON before they are sent to the browser. The browser decompresses them transparently. Enabling compression typically reduces transfer sizes by 60 to 80 percent for text content, which directly improves page load times, especially on slower connections. Apache's mod_deflate handles this, and the .htaccess directives specify which MIME types to compress.

  Browser caching directives tell browsers how long they can keep a local copy of a resource before checking with the server again. Static assets like images, fonts, CSS, and JavaScript files rarely change, so setting long cache lifetimes for these reduces the number of requests the browser needs to make on repeat visits. The ExpiresByType directive sets cache durations per MIME type. Cache-Control headers offer more granular control, including options like no-cache, no-store, and max-age.

  IP blocking lets you deny access to specific IP addresses or ranges. This is useful for blocking known bad actors, restricting access to an admin area, or temporarily locking down a staging site. The Allow and Deny directives in older Apache versions, or the Require directive in Apache 2.4 and later, control this. Blocking by IP is not foolproof since IPs can change or be spoofed, but it is a simple first layer of defense.

  Hotlink protection prevents other sites from embedding your images, videos, or other files directly, which uses your bandwidth without your permission. The .htaccess approach checks the Referer header of incoming requests and blocks those that come from domains you have not approved. It is not perfect because some browsers and privacy tools strip or fake the Referer header, but it stops casual hotlinking effectively.

  Directory options control features like directory listing, which shows a file browser when no index file exists. Disabling directory listing is a common security measure because it prevents visitors from browsing the contents of your directories. The Options directive also controls other features like symbolic link following and server-side includes.

  A .htaccess generator saves time and reduces errors by assembling these directives from a visual interface. The syntax is specific and unforgiving — a single typo can cause a 500 Internal Server Error that takes down your site. Generating the code from a tool, reviewing it, and then deploying it is a safer workflow than writing every directive from memory.
faqs:
  - question: Does this tool send my configuration to a server?
    answer: |-
      No. Everything runs in your browser. The generated code is never transmitted anywhere.
  - question: Where do I put the .htaccess file?
    answer: |-
      Place it in the root directory of your website (the same folder as your index.html or index.php). You can also place it in subdirectories to apply rules only to that directory and its children.
  - question: Will this work on Nginx or IIS?
    answer: |-
      No. The .htaccess file is specific to the Apache HTTP Server. Nginx uses its own configuration format, and IIS uses web.config files.
  - question: Why does my site show a 500 error after adding .htaccess rules?
    answer: |-
      A 500 Internal Server Error usually means there is a syntax error in the file, or the server does not have the required module enabled (like mod_rewrite or mod_headers). Check your server error log for details, and make sure AllowOverride is set to All in the server config.
  - question: Can I use multiple .htaccess files?
    answer: |-
      Yes. Apache processes .htaccess files in order from the root directory down to the requested directory. Rules in deeper directories override rules in parent directories for the same directives.
  - question: Does the order of directives matter?
    answer: |-
      Yes, especially for rewrite rules. Apache processes them top to bottom, and the first matching rule may change the URL before later rules see it. Redirect rules should generally come before rewrite rules.
---

<div class="htgen">
  <div class="htgen-layout">
    <div class="htgen-panels">

      <!-- Force HTTPS -->
      <details class="htgen-section" data-section="https">
        <summary>Force HTTPS</summary>
        <div class="htgen-body">
          <label class="htgen-toggle">
            <input type="checkbox" data-gen="https"> Enable HTTPS redirect
          </label>
        </div>
      </details>

      <!-- WWW Canonicalization -->
      <details class="htgen-section" data-section="www">
        <summary>WWW Redirect</summary>
        <div class="htgen-body">
          <label class="htgen-radio-label">
            <input type="radio" name="www" value="add-www" data-gen="www"> Force www
          </label>
          <label class="htgen-radio-label">
            <input type="radio" name="www" value="remove-www" data-gen="www"> Remove www
          </label>
          <label class="htgen-radio-label">
            <input type="radio" name="www" value="" data-gen="www" checked> No change
          </label>
        </div>
      </details>

      <!-- Redirects -->
      <details class="htgen-section" data-section="redirects">
        <summary>Redirects</summary>
        <div class="htgen-body">
          <div id="htgen-redirect-list"></div>
          <button type="button" class="htgen-add-btn" id="htgen-add-redirect">+ Add Redirect</button>
        </div>
      </details>

      <!-- Custom Error Pages -->
      <details class="htgen-section" data-section="errors">
        <summary>Custom Error Pages</summary>
        <div class="htgen-body">
          <div id="htgen-error-list"></div>
          <button type="button" class="htgen-add-btn" id="htgen-add-error">+ Add Error Page</button>
        </div>
      </details>

      <!-- Security Headers -->
      <details class="htgen-section" data-section="security">
        <summary>Security Headers</summary>
        <div class="htgen-body">
          <label class="htgen-toggle">
            <input type="checkbox" data-gen="x-content-type"> X-Content-Type-Options: nosniff
          </label>
          <label class="htgen-toggle">
            <input type="checkbox" data-gen="x-frame"> X-Frame-Options: SAMEORIGIN
          </label>
          <label class="htgen-toggle">
            <input type="checkbox" data-gen="x-xss"> X-XSS-Protection: 1; mode=block
          </label>
          <label class="htgen-toggle">
            <input type="checkbox" data-gen="referrer"> Referrer-Policy: strict-origin-when-cross-origin
          </label>
          <label class="htgen-toggle">
            <input type="checkbox" data-gen="hsts"> Strict-Transport-Security (HSTS)
          </label>
          <div class="htgen-sub" id="htgen-hsts-opts" style="display:none">
            <label class="htgen-field">
              <span>Max-Age (seconds)</span>
              <input type="number" id="htgen-hsts-age" value="31536000" min="0" data-gen="hsts-age">
            </label>
            <label class="htgen-toggle">
              <input type="checkbox" id="htgen-hsts-sub" data-gen="hsts-sub"> Include subdomains
            </label>
          </div>
          <label class="htgen-toggle">
            <input type="checkbox" data-gen="permissions-policy"> Permissions-Policy (camera, mic, geolocation off)
          </label>
        </div>
      </details>

      <!-- GZIP Compression -->
      <details class="htgen-section" data-section="gzip">
        <summary>GZIP Compression</summary>
        <div class="htgen-body">
          <label class="htgen-toggle">
            <input type="checkbox" data-gen="gzip"> Enable GZIP compression
          </label>
        </div>
      </details>

      <!-- Browser Caching -->
      <details class="htgen-section" data-section="caching">
        <summary>Browser Caching</summary>
        <div class="htgen-body">
          <label class="htgen-toggle">
            <input type="checkbox" data-gen="caching"> Enable Expires headers
          </label>
          <div class="htgen-sub" id="htgen-cache-opts" style="display:none">
            <label class="htgen-field">
              <span>HTML (seconds)</span>
              <input type="number" id="htgen-cache-html" value="3600" min="0" data-gen="cache-val">
            </label>
            <label class="htgen-field">
              <span>CSS/JS (seconds)</span>
              <input type="number" id="htgen-cache-cssjs" value="2592000" min="0" data-gen="cache-val">
            </label>
            <label class="htgen-field">
              <span>Images (seconds)</span>
              <input type="number" id="htgen-cache-img" value="2592000" min="0" data-gen="cache-val">
            </label>
            <label class="htgen-field">
              <span>Fonts (seconds)</span>
              <input type="number" id="htgen-cache-font" value="2592000" min="0" data-gen="cache-val">
            </label>
          </div>
        </div>
      </details>

      <!-- IP Blocking -->
      <details class="htgen-section" data-section="ipblock">
        <summary>Block IPs</summary>
        <div class="htgen-body">
          <div id="htgen-ip-list"></div>
          <button type="button" class="htgen-add-btn" id="htgen-add-ip">+ Add IP</button>
        </div>
      </details>

      <!-- Hotlink Protection -->
      <details class="htgen-section" data-section="hotlink">
        <summary>Hotlink Protection</summary>
        <div class="htgen-body">
          <label class="htgen-toggle">
            <input type="checkbox" data-gen="hotlink"> Enable hotlink protection
          </label>
          <div class="htgen-sub" id="htgen-hotlink-opts" style="display:none">
            <label class="htgen-field">
              <span>Your domain (e.g. example.com)</span>
              <input type="text" id="htgen-hotlink-domain" placeholder="example.com" data-gen="hotlink-val">
            </label>
            <label class="htgen-field">
              <span>File extensions to protect</span>
              <input type="text" id="htgen-hotlink-ext" value="jpg,jpeg,png,gif,webp,svg" data-gen="hotlink-val">
            </label>
          </div>
        </div>
      </details>

      <!-- Directory Options -->
      <details class="htgen-section" data-section="directory">
        <summary>Directory Options</summary>
        <div class="htgen-body">
          <label class="htgen-toggle">
            <input type="checkbox" data-gen="no-index"> Disable directory listing
          </label>
          <label class="htgen-toggle">
            <input type="checkbox" data-gen="follow-symlinks"> Enable FollowSymLinks
          </label>
          <label class="htgen-toggle">
            <input type="checkbox" data-gen="server-sig"> Turn off server signature
          </label>
          <label class="htgen-toggle">
            <input type="checkbox" data-gen="hide-htaccess"> Block access to .htaccess
          </label>
          <label class="htgen-toggle">
            <input type="checkbox" data-gen="hide-dotfiles"> Block access to all dotfiles
          </label>
        </div>
      </details>

      <!-- CORS -->
      <details class="htgen-section" data-section="cors">
        <summary>CORS Headers</summary>
        <div class="htgen-body">
          <label class="htgen-toggle">
            <input type="checkbox" data-gen="cors"> Enable CORS
          </label>
          <div class="htgen-sub" id="htgen-cors-opts" style="display:none">
            <label class="htgen-field">
              <span>Access-Control-Allow-Origin</span>
              <input type="text" id="htgen-cors-origin" value="*" data-gen="cors-val">
            </label>
            <label class="htgen-field">
              <span>Allowed Methods</span>
              <input type="text" id="htgen-cors-methods" value="GET, POST, OPTIONS" data-gen="cors-val">
            </label>
            <label class="htgen-field">
              <span>Allowed Headers</span>
              <input type="text" id="htgen-cors-headers" value="Content-Type, Authorization" data-gen="cors-val">
            </label>
          </div>
        </div>
      </details>

      <!-- Custom Directives -->
      <details class="htgen-section" data-section="custom">
        <summary>Custom Directives</summary>
        <div class="htgen-body">
          <textarea id="htgen-custom" rows="4" placeholder="Paste any additional .htaccess directives here…" data-gen="custom" spellcheck="false"></textarea>
        </div>
      </details>

    </div>

    <!-- Output -->
    <div class="htgen-output">
      <div class="htgen-output-header">
        <span>Generated .htaccess</span>
        <button type="button" id="htgen-copy" class="htgen-copy-btn">Copy</button>
      </div>
      <pre id="htgen-result" class="htgen-code"></pre>
    </div>
  </div>
</div>

<style>
.htgen{display:flex;flex-direction:column;gap:1rem}

.htgen-layout{display:grid;grid-template-columns:1fr 1fr;gap:1rem;align-items:start}
@media(max-width:768px){.htgen-layout{grid-template-columns:1fr}}

/* Panels */
.htgen-panels{display:flex;flex-direction:column;gap:0.5rem}

.htgen-section{border:1px solid var(--border,#2a2d3a);border-radius:var(--radius-sm,8px);overflow:hidden}
.htgen-section summary{padding:0.65rem 0.85rem;font-size:0.88rem;font-weight:600;color:var(--text,#e4e4e7);cursor:pointer;background:var(--surface,#1a1c25);user-select:none;transition:color .15s}
.htgen-section summary:hover{color:var(--accent,#6366f1)}
.htgen-section[open] summary{border-bottom:1px solid var(--border,#2a2d3a)}
.htgen-body{padding:0.75rem 0.85rem;display:flex;flex-direction:column;gap:0.55rem}

/* Toggles */
.htgen-toggle{display:flex;align-items:center;gap:0.55rem;font-size:0.85rem;color:var(--text,#e4e4e7);cursor:pointer}
.htgen-toggle input[type="checkbox"]{accent-color:var(--accent,#6366f1);width:16px;height:16px;cursor:pointer}

/* Radio */
.htgen-radio-label{display:flex;align-items:center;gap:0.55rem;font-size:0.85rem;color:var(--text,#e4e4e7);cursor:pointer}
.htgen-radio-label input[type="radio"]{accent-color:var(--accent,#6366f1);width:16px;height:16px;cursor:pointer}

/* Fields */
.htgen-field{display:flex;flex-direction:column;gap:0.25rem}
.htgen-field span{font-size:0.78rem;color:var(--text-muted,#9ca3af);font-weight:600}
.htgen-field input,.htgen-body textarea{background:var(--bg,#0f1117);color:var(--text,#e4e4e7);border:1px solid var(--border,#2a2d3a);border-radius:6px;padding:0.5rem 0.65rem;font-family:'SF Mono',SFMono-Regular,Menlo,Consolas,monospace;font-size:0.82rem;outline:none;transition:border-color .2s}
.htgen-field input:focus,.htgen-body textarea:focus{border-color:var(--accent,#6366f1);box-shadow:0 0 0 3px var(--accent-glow,rgba(99,102,241,0.18))}
.htgen-body textarea{resize:vertical;line-height:1.6}

/* Sub-options */
.htgen-sub{padding-left:1.4rem;display:flex;flex-direction:column;gap:0.5rem;margin-top:0.15rem}

/* Dynamic rows */
.htgen-row{display:flex;gap:0.4rem;align-items:end}
.htgen-row select{background:var(--bg,#0f1117);color:var(--text,#e4e4e7);border:1px solid var(--border,#2a2d3a);border-radius:6px;padding:0.45rem 0.5rem;font-size:0.82rem;outline:none;cursor:pointer}
.htgen-row select:focus{border-color:var(--accent,#6366f1)}
.htgen-row input{flex:1;background:var(--bg,#0f1117);color:var(--text,#e4e4e7);border:1px solid var(--border,#2a2d3a);border-radius:6px;padding:0.45rem 0.65rem;font-family:'SF Mono',SFMono-Regular,Menlo,Consolas,monospace;font-size:0.82rem;outline:none}
.htgen-row input:focus{border-color:var(--accent,#6366f1)}
.htgen-rm{background:none !important;border:1px solid rgba(239,68,68,0.3) !important;color:#ef4444 !important;border-radius:6px;width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:1rem;flex-shrink:0;transition:border-color .15s,background .15s;padding:0;box-shadow:none !important}
.htgen-rm:hover{background:rgba(239,68,68,0.1) !important;border-color:#ef4444 !important}

/* Add button */
.htgen-add-btn{background:none !important;border:1px dashed var(--border,#2a2d3a) !important;color:var(--text-muted,#9ca3af) !important;border-radius:6px;padding:0.45rem 0.85rem;font-size:0.82rem;cursor:pointer;transition:color .15s,border-color .15s;box-shadow:none !important}
.htgen-add-btn:hover{color:var(--accent,#6366f1) !important;border-color:var(--accent,#6366f1) !important}

/* Output panel */
.htgen-output{position:sticky;top:1rem;border:1px solid var(--border,#2a2d3a);border-radius:var(--radius-sm,8px);overflow:hidden;display:flex;flex-direction:column}
.htgen-output-header{display:flex;justify-content:space-between;align-items:center;padding:0.55rem 0.85rem;background:var(--surface,#1a1c25);border-bottom:1px solid var(--border,#2a2d3a);font-size:0.82rem;font-weight:600;color:var(--text-muted,#9ca3af)}
.htgen-copy-btn{background:var(--accent,#6366f1) !important;color:#fff !important;border:none !important;border-radius:6px;padding:0.3rem 0.85rem;font-size:0.78rem;font-weight:600;cursor:pointer;transition:opacity .15s;box-shadow:none !important}
.htgen-copy-btn:hover{opacity:0.85}
.htgen-code{margin:0;padding:0.85rem;background:var(--bg,#0f1117);color:var(--text,#e4e4e7);font-family:'SF Mono',SFMono-Regular,Menlo,Consolas,monospace;font-size:0.82rem;line-height:1.65;white-space:pre-wrap;word-break:break-all;min-height:12rem;max-height:70vh;overflow-y:auto}
.htgen-empty{color:var(--text-muted,#9ca3af);font-style:italic}

@media(max-width:768px){
  .htgen-output{position:static}
}
</style>

<script>
(function(){
  var resultEl=document.getElementById("htgen-result");
  var copyBtn=document.getElementById("htgen-copy");

  /* ---- Redirect rows ---- */
  var redirectList=document.getElementById("htgen-redirect-list");
  var addRedirectBtn=document.getElementById("htgen-add-redirect");
  function addRedirectRow(type,from,to){
    var row=document.createElement("div");
    row.className="htgen-row";
    row.innerHTML='<select data-gen="redirect"><option value="301"'+(type==="302"?"":' selected')+'>301</option><option value="302"'+(type==="302"?' selected':"")+'>302</option></select>'
      +'<input type="text" placeholder="/old-page" value="'+(from||"")+'" data-gen="redirect">'
      +'<input type="text" placeholder="/new-page" value="'+(to||"")+'" data-gen="redirect">'
      +'<button type="button" class="htgen-rm" title="Remove">&times;</button>';
    row.querySelector(".htgen-rm").addEventListener("click",function(){row.remove();generate()});
    row.querySelectorAll("input,select").forEach(function(el){el.addEventListener("input",generate)});
    redirectList.appendChild(row);
    generate();
  }
  addRedirectBtn.addEventListener("click",function(){addRedirectRow("301","","")});

  /* ---- Error page rows ---- */
  var errorList=document.getElementById("htgen-error-list");
  var addErrorBtn=document.getElementById("htgen-add-error");
  function addErrorRow(code,path){
    var row=document.createElement("div");
    row.className="htgen-row";
    row.innerHTML='<select data-gen="error"><option value="400">400</option><option value="401">401</option><option value="403">403</option><option value="404" selected>404</option><option value="500">500</option><option value="503">503</option></select>'
      +'<input type="text" placeholder="/error-404.html" value="'+(path||"")+'" data-gen="error">'
      +'<button type="button" class="htgen-rm" title="Remove">&times;</button>';
    if(code){row.querySelector("select").value=code}
    row.querySelector(".htgen-rm").addEventListener("click",function(){row.remove();generate()});
    row.querySelectorAll("input,select").forEach(function(el){el.addEventListener("input",generate)});
    errorList.appendChild(row);
    generate();
  }
  addErrorBtn.addEventListener("click",function(){addErrorRow("","")});

  /* ---- IP block rows ---- */
  var ipList=document.getElementById("htgen-ip-list");
  var addIpBtn=document.getElementById("htgen-add-ip");
  function addIpRow(ip){
    var row=document.createElement("div");
    row.className="htgen-row";
    row.innerHTML='<input type="text" placeholder="192.168.1.1" value="'+(ip||"")+'" data-gen="ip">'
      +'<button type="button" class="htgen-rm" title="Remove">&times;</button>';
    row.querySelector(".htgen-rm").addEventListener("click",function(){row.remove();generate()});
    row.querySelector("input").addEventListener("input",generate);
    ipList.appendChild(row);
    generate();
  }
  addIpBtn.addEventListener("click",function(){addIpRow("")});

  /* ---- Sub-option visibility ---- */
  var hstsCheck=document.querySelector('[data-gen="hsts"]');
  var hstsOpts=document.getElementById("htgen-hsts-opts");
  hstsCheck.addEventListener("change",function(){hstsOpts.style.display=hstsCheck.checked?"flex":"none";generate()});

  var cachingCheck=document.querySelector('[data-gen="caching"]');
  var cacheOpts=document.getElementById("htgen-cache-opts");
  cachingCheck.addEventListener("change",function(){cacheOpts.style.display=cachingCheck.checked?"flex":"none";generate()});

  var hotlinkCheck=document.querySelector('[data-gen="hotlink"]');
  var hotlinkOpts=document.getElementById("htgen-hotlink-opts");
  hotlinkCheck.addEventListener("change",function(){hotlinkOpts.style.display=hotlinkCheck.checked?"flex":"none";generate()});

  var corsCheck=document.querySelector('[data-gen="cors"]');
  var corsOpts=document.getElementById("htgen-cors-opts");
  corsCheck.addEventListener("change",function(){corsOpts.style.display=corsCheck.checked?"flex":"none";generate()});

  /* ---- Wire all inputs ---- */
  document.querySelectorAll('.htgen [data-gen]').forEach(function(el){
    var evt=(el.type==="checkbox"||el.type==="radio")?"change":"input";
    el.addEventListener(evt,generate);
  });

  /* ---- Escape for htaccess ---- */
  function esc(s){return s.replace(/</g,"&lt;").replace(/>/g,"&gt;")}

  /* ---- Generate ---- */
  function generate(){
    var lines=[];
    var needsRewrite=false;

    /* Check if rewrite needed */
    var httpsOn=document.querySelector('[data-gen="https"]').checked;
    var wwwVal="";
    document.querySelectorAll('input[name="www"]').forEach(function(r){if(r.checked)wwwVal=r.value});
    if(httpsOn||wwwVal) needsRewrite=true;

    /* Rewrite engine */
    if(needsRewrite){
      lines.push("# Enable Rewrite Engine");
      lines.push("RewriteEngine On");
      lines.push("");
    }

    /* Force HTTPS */
    if(httpsOn){
      lines.push("# Force HTTPS");
      lines.push("RewriteCond %{HTTPS} !=on");
      lines.push("RewriteRule ^(.*)$ https://%{HTTP_HOST}/$1 [R=301,L]");
      lines.push("");
    }

    /* WWW redirect */
    if(wwwVal==="add-www"){
      lines.push("# Force www");
      lines.push("RewriteCond %{HTTP_HOST} !^www\\. [NC]");
      lines.push("RewriteRule ^(.*)$ https://www.%{HTTP_HOST}/$1 [R=301,L]");
      lines.push("");
    }else if(wwwVal==="remove-www"){
      lines.push("# Remove www");
      lines.push("RewriteCond %{HTTP_HOST} ^www\\.(.+)$ [NC]");
      lines.push("RewriteRule ^(.*)$ https://%1/$1 [R=301,L]");
      lines.push("");
    }

    /* Redirects */
    var redirectRows=redirectList.querySelectorAll(".htgen-row");
    if(redirectRows.length){
      var hasAny=false;
      redirectRows.forEach(function(row){
        var els=row.querySelectorAll("input");
        var sel=row.querySelector("select");
        var from=els[0].value.trim();
        var to=els[1].value.trim();
        if(from&&to){
          if(!hasAny){lines.push("# Redirects");hasAny=true}
          lines.push("Redirect "+sel.value+" "+from+" "+to);
        }
      });
      if(hasAny) lines.push("");
    }

    /* Custom error pages */
    var errorRows=errorList.querySelectorAll(".htgen-row");
    if(errorRows.length){
      var hasAny=false;
      errorRows.forEach(function(row){
        var sel=row.querySelector("select");
        var inp=row.querySelector("input");
        var path=inp.value.trim();
        if(path){
          if(!hasAny){lines.push("# Custom Error Pages");hasAny=true}
          lines.push("ErrorDocument "+sel.value+" "+path);
        }
      });
      if(hasAny) lines.push("");
    }

    /* Security headers */
    var secLines=[];
    if(document.querySelector('[data-gen="x-content-type"]').checked)
      secLines.push('Header always set X-Content-Type-Options "nosniff"');
    if(document.querySelector('[data-gen="x-frame"]').checked)
      secLines.push('Header always set X-Frame-Options "SAMEORIGIN"');
    if(document.querySelector('[data-gen="x-xss"]').checked)
      secLines.push('Header always set X-XSS-Protection "1; mode=block"');
    if(document.querySelector('[data-gen="referrer"]').checked)
      secLines.push('Header always set Referrer-Policy "strict-origin-when-cross-origin"');
    if(hstsCheck.checked){
      var age=document.getElementById("htgen-hsts-age").value||"31536000";
      var sub=document.getElementById("htgen-hsts-sub").checked;
      var val="max-age="+age;
      if(sub) val+="; includeSubDomains";
      secLines.push('Header always set Strict-Transport-Security "'+val+'"');
    }
    if(document.querySelector('[data-gen="permissions-policy"]').checked)
      secLines.push('Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"');
    if(secLines.length){
      lines.push("# Security Headers");
      lines.push("<IfModule mod_headers.c>");
      secLines.forEach(function(l){lines.push("  "+l)});
      lines.push("</IfModule>");
      lines.push("");
    }

    /* GZIP */
    if(document.querySelector('[data-gen="gzip"]').checked){
      lines.push("# GZIP Compression");
      lines.push("<IfModule mod_deflate.c>");
      lines.push("  AddOutputFilterByType DEFLATE text/html");
      lines.push("  AddOutputFilterByType DEFLATE text/css");
      lines.push("  AddOutputFilterByType DEFLATE text/javascript");
      lines.push("  AddOutputFilterByType DEFLATE application/javascript");
      lines.push("  AddOutputFilterByType DEFLATE application/json");
      lines.push("  AddOutputFilterByType DEFLATE application/xml");
      lines.push("  AddOutputFilterByType DEFLATE text/xml");
      lines.push("  AddOutputFilterByType DEFLATE text/plain");
      lines.push("  AddOutputFilterByType DEFLATE image/svg+xml");
      lines.push("  AddOutputFilterByType DEFLATE application/xhtml+xml");
      lines.push("  AddOutputFilterByType DEFLATE application/rss+xml");
      lines.push("  AddOutputFilterByType DEFLATE application/atom+xml");
      lines.push("  AddOutputFilterByType DEFLATE font/ttf");
      lines.push("  AddOutputFilterByType DEFLATE font/otf");
      lines.push("  AddOutputFilterByType DEFLATE application/vnd.ms-fontobject");
      lines.push("</IfModule>");
      lines.push("");
    }

    /* Browser Caching */
    if(cachingCheck.checked){
      var cHTML=document.getElementById("htgen-cache-html").value||"3600";
      var cCSS=document.getElementById("htgen-cache-cssjs").value||"2592000";
      var cImg=document.getElementById("htgen-cache-img").value||"2592000";
      var cFont=document.getElementById("htgen-cache-font").value||"2592000";
      lines.push("# Browser Caching");
      lines.push("<IfModule mod_expires.c>");
      lines.push("  ExpiresActive On");
      lines.push("  ExpiresByType text/html \"access plus "+cHTML+" seconds\"");
      lines.push("  ExpiresByType text/css \"access plus "+cCSS+" seconds\"");
      lines.push("  ExpiresByType text/javascript \"access plus "+cCSS+" seconds\"");
      lines.push("  ExpiresByType application/javascript \"access plus "+cCSS+" seconds\"");
      lines.push("  ExpiresByType image/jpeg \"access plus "+cImg+" seconds\"");
      lines.push("  ExpiresByType image/png \"access plus "+cImg+" seconds\"");
      lines.push("  ExpiresByType image/gif \"access plus "+cImg+" seconds\"");
      lines.push("  ExpiresByType image/webp \"access plus "+cImg+" seconds\"");
      lines.push("  ExpiresByType image/svg+xml \"access plus "+cImg+" seconds\"");
      lines.push("  ExpiresByType image/x-icon \"access plus "+cImg+" seconds\"");
      lines.push("  ExpiresByType font/ttf \"access plus "+cFont+" seconds\"");
      lines.push("  ExpiresByType font/otf \"access plus "+cFont+" seconds\"");
      lines.push("  ExpiresByType font/woff \"access plus "+cFont+" seconds\"");
      lines.push("  ExpiresByType font/woff2 \"access plus "+cFont+" seconds\"");
      lines.push("  ExpiresByType application/vnd.ms-fontobject \"access plus "+cFont+" seconds\"");
      lines.push("</IfModule>");
      lines.push("");
    }

    /* IP Blocking */
    var ipRows=ipList.querySelectorAll(".htgen-row");
    if(ipRows.length){
      var ips=[];
      ipRows.forEach(function(row){
        var v=row.querySelector("input").value.trim();
        if(v) ips.push(v);
      });
      if(ips.length){
        lines.push("# Block IPs");
        lines.push("<RequireAll>");
        lines.push("  Require all granted");
        ips.forEach(function(ip){
          lines.push("  Require not ip "+ip);
        });
        lines.push("</RequireAll>");
        lines.push("");
      }
    }

    /* Hotlink Protection */
    if(hotlinkCheck.checked){
      var domain=document.getElementById("htgen-hotlink-domain").value.trim();
      var exts=document.getElementById("htgen-hotlink-ext").value.trim();
      if(domain&&exts){
        var extPattern=exts.split(",").map(function(e){return e.trim()}).filter(Boolean).join("|");
        lines.push("# Hotlink Protection");
        lines.push("RewriteEngine On");
        lines.push("RewriteCond %{HTTP_REFERER} !^$");
        lines.push("RewriteCond %{HTTP_REFERER} !^https?://(www\\.)?"+domain.replace(/\./g,"\\.")+"/ [NC]");
        lines.push("RewriteRule \\.(" + extPattern + ")$ - [F,NC]");
        lines.push("");
      }
    }

    /* Directory Options */
    var dirLines=[];
    if(document.querySelector('[data-gen="no-index"]').checked) dirLines.push("Options -Indexes");
    if(document.querySelector('[data-gen="follow-symlinks"]').checked) dirLines.push("Options +FollowSymLinks");
    if(document.querySelector('[data-gen="server-sig"]').checked) dirLines.push("ServerSignature Off");
    if(dirLines.length){
      lines.push("# Directory Options");
      dirLines.forEach(function(l){lines.push(l)});
      lines.push("");
    }

    if(document.querySelector('[data-gen="hide-htaccess"]').checked){
      lines.push("# Protect .htaccess");
      lines.push("<Files .htaccess>");
      lines.push("  Require all denied");
      lines.push("</Files>");
      lines.push("");
    }

    if(document.querySelector('[data-gen="hide-dotfiles"]').checked){
      lines.push("# Block access to dotfiles");
      lines.push("<FilesMatch \"^\\.\">"); 
      lines.push("  Require all denied");
      lines.push("</FilesMatch>");
      lines.push("");
    }

    /* CORS */
    if(corsCheck.checked){
      var origin=document.getElementById("htgen-cors-origin").value.trim()||"*";
      var methods=document.getElementById("htgen-cors-methods").value.trim()||"GET, POST, OPTIONS";
      var headers=document.getElementById("htgen-cors-headers").value.trim()||"Content-Type, Authorization";
      lines.push("# CORS Headers");
      lines.push("<IfModule mod_headers.c>");
      lines.push('  Header set Access-Control-Allow-Origin "'+origin+'"');
      lines.push('  Header set Access-Control-Allow-Methods "'+methods+'"');
      lines.push('  Header set Access-Control-Allow-Headers "'+headers+'"');
      lines.push("</IfModule>");
      lines.push("");
    }

    /* Custom */
    var custom=document.getElementById("htgen-custom").value.trim();
    if(custom){
      lines.push("# Custom Directives");
      lines.push(custom);
      lines.push("");
    }

    /* Render */
    var output=lines.join("\n").replace(/\n{3,}/g,"\n\n").trim();
    if(output){
      resultEl.innerHTML=esc(output);
      resultEl.classList.remove("htgen-empty");
    }else{
      resultEl.innerHTML='<span class="htgen-empty">Select options on the left to generate your .htaccess file.</span>';
      resultEl.classList.add("htgen-empty");
    }
  }

  /* ---- Copy ---- */
  copyBtn.addEventListener("click",function(){
    var text=resultEl.textContent;
    if(!text||resultEl.querySelector(".htgen-empty")) return;
    navigator.clipboard.writeText(text).then(function(){
      copyBtn.textContent="Copied!";
      setTimeout(function(){copyBtn.textContent="Copy"},1500);
    });
  });

  /* Initial render */
  generate();
})();
</script>

---
title: Subnet Calculator
description: Calculate network details from any IP address and CIDR prefix
tool_explanation: |-
  This subnet calculator takes an IP address with a CIDR prefix length or subnet mask and returns the full network breakdown, including network and broadcast addresses, usable host range, wildcard mask, and total host count. Everything runs in your browser with no server requests.
how_to_use:
  - Enter an IP address in the input field, such as 192.168.1.50.
  - Set the CIDR prefix length using the dropdown or type a subnet mask directly.
  - The results update automatically showing network address, broadcast address, host range, subnet mask, wildcard mask, and total usable hosts.
  - Click any value to copy it to your clipboard.
tool_article: |-
  Subnetting is one of the core skills in network administration, but doing the math by hand is tedious and error-prone. Even experienced engineers reach for a subnet calculator when planning address space, troubleshooting routing issues, or verifying firewall rules. The goal is always the same: given an IP address and a prefix length, determine exactly which addresses belong to the network, where the usable range starts and ends, and how large the subnet is.

  An IPv4 address is a 32-bit number, typically written as four octets in dotted-decimal notation. The CIDR prefix length specifies how many of those 32 bits represent the network portion. The remaining bits identify individual hosts within that network. A /24 prefix, for example, reserves the first 24 bits for the network, leaving 8 bits for hosts, which gives 254 usable addresses after subtracting the network and broadcast addresses. A /16 leaves 16 bits for hosts, allowing 65,534 usable addresses. The relationship between prefix length and available hosts is exponential, which is why small changes in the prefix matter a great deal.

  The subnet mask is the dotted-decimal representation of the prefix. A /24 corresponds to 255.255.255.0, a /16 to 255.255.0.0, and so on. The wildcard mask is simply the bitwise inverse, often used in access control lists on network equipment. Understanding both representations is useful because different vendors and protocols prefer different formats.

  The network address is the lowest address in the range, with all host bits set to zero. The broadcast address is the highest, with all host bits set to one. Neither is available for assignment to a device. The usable host range falls between these two, starting one above the network address and ending one below the broadcast address. For very small subnets like /31 and /32, special rules apply. A /31 is a point-to-point link with two addresses and no broadcast, while a /32 identifies a single host.

  Planning subnets carefully avoids waste and reduces the attack surface. Overallocating a /16 where a /24 would suffice exposes thousands of unused addresses that complicate monitoring and access control. Underallocating leads to renumbering pain when the network grows. A subnet calculator helps test different prefix lengths quickly so you can find the smallest block that comfortably fits your needs.

  This tool is also useful for verifying existing configurations. If a device is assigned an address that falls outside the expected subnet, connectivity will break in ways that are sometimes difficult to diagnose. Pasting the address and prefix into a calculator immediately shows whether the address belongs to the intended network or not. The same check helps when reading firewall rules, route tables, or DHCP scopes that someone else configured.

  For anyone studying for a networking certification, repetitive practice with subnetting is unavoidable. A calculator does not replace that practice, but it provides an instant reference to check your work. Once you are confident in the concepts, the calculator becomes a time-saver rather than a crutch, the same way a developer who understands algorithms still uses a debugger.
faqs:
  - question: What is a CIDR prefix length?
    answer: |-
      It is the number of leading bits in the IP address that define the network portion. A /24 means the first 24 of 32 bits are the network, leaving 8 bits for host addresses.
  - question: What is the difference between subnet mask and wildcard mask?
    answer: |-
      The subnet mask marks the network bits with ones and host bits with zeros. The wildcard mask is the inverse, with zeros for network bits and ones for host bits. Some systems, especially Cisco ACLs, use the wildcard mask instead of the subnet mask.
  - question: Why are the network and broadcast addresses not usable?
    answer: |-
      The network address, with all host bits zero, identifies the network itself. The broadcast address, with all host bits one, is used to send traffic to every host on the subnet. Neither can be assigned to a device.
  - question: Does this tool support IPv6?
    answer: |-
      This version handles IPv4 only. IPv6 subnetting follows the same prefix concept but uses 128-bit addresses with different notation.
  - question: Does this tool send data to a server?
    answer: |-
      No. All calculations happen locally in your browser. No network requests are made.
---

<div class="ns-tool">
  <div class="ns-input-row">
    <div class="ns-field ns-field-ip">
      <label for="ns-ip">IP Address</label>
      <input type="text" id="ns-ip" placeholder="192.168.1.0" maxlength="15" autocomplete="off" spellcheck="false">
    </div>
    <div class="ns-field ns-field-cidr">
      <label for="ns-cidr">/ CIDR</label>
      <select id="ns-cidr"></select>
    </div>
  </div>

  <div class="ns-results" id="ns-results" style="display:none">
    <div class="ns-row" data-field="network">
      <span class="ns-label">Network Address</span>
      <span class="ns-value" id="ns-network">—</span>
    </div>
    <div class="ns-row" data-field="broadcast">
      <span class="ns-label">Broadcast Address</span>
      <span class="ns-value" id="ns-broadcast">—</span>
    </div>
    <div class="ns-row" data-field="hostRange">
      <span class="ns-label">Usable Host Range</span>
      <span class="ns-value" id="ns-host-range">—</span>
    </div>
    <div class="ns-row" data-field="totalHosts">
      <span class="ns-label">Total Usable Hosts</span>
      <span class="ns-value" id="ns-total-hosts">—</span>
    </div>
    <div class="ns-row" data-field="subnetMask">
      <span class="ns-label">Subnet Mask</span>
      <span class="ns-value" id="ns-subnet-mask">—</span>
    </div>
    <div class="ns-row" data-field="wildcardMask">
      <span class="ns-label">Wildcard Mask</span>
      <span class="ns-value" id="ns-wildcard-mask">—</span>
    </div>
    <div class="ns-row" data-field="binary">
      <span class="ns-label">Binary</span>
      <span class="ns-value ns-mono" id="ns-binary">—</span>
    </div>
    <div class="ns-row" data-field="ipClass">
      <span class="ns-label">IP Class</span>
      <span class="ns-value" id="ns-ip-class">—</span>
    </div>
  </div>

  <div class="ns-error" id="ns-error" style="display:none">Enter a valid IPv4 address</div>
</div>

<style>
.ns-tool{display:flex;flex-direction:column;gap:1.25rem}
.ns-input-row{display:flex;gap:0.75rem;align-items:flex-end}
.ns-field label{display:block;font-size:0.82rem;font-weight:600;color:var(--text-muted,#9ca3af);margin-bottom:0.35rem;text-transform:uppercase;letter-spacing:0.04em}
.ns-field-ip{flex:1}
.ns-field-cidr{width:5.5rem;flex-shrink:0}
.ns-field-cidr select{width:100%;padding:0.6rem 0.5rem;background:var(--bg,#0f1117);color:var(--text,#e4e4e7);border:1px solid var(--border,#2a2d3a);border-radius:var(--radius-sm,8px);font-size:0.95rem;cursor:pointer}
.ns-results{display:flex;flex-direction:column;gap:0}
.ns-row{display:flex;justify-content:space-between;align-items:center;padding:0.65rem 0.85rem;border-bottom:1px solid var(--border,#2a2d3a);cursor:pointer;transition:background .15s;border-radius:0}
.ns-row:first-child{border-top:1px solid var(--border,#2a2d3a);border-radius:var(--radius-sm,8px) var(--radius-sm,8px) 0 0}
.ns-row:last-child{border-bottom:1px solid var(--border,#2a2d3a);border-radius:0 0 var(--radius-sm,8px) var(--radius-sm,8px)}
.ns-row:hover{background:var(--surface-hover,#22242e)}
.ns-row:active{background:var(--accent-glow,rgba(99,102,241,0.15))}
.ns-label{font-size:0.85rem;color:var(--text-muted,#9ca3af);white-space:nowrap}
.ns-value{font-family:'SF Mono',SFMono-Regular,Menlo,Consolas,monospace;font-size:0.9rem;color:var(--text,#e4e4e7);text-align:right;word-break:break-all}
.ns-mono{font-size:0.8rem;letter-spacing:0.03em}
.ns-error{color:#ef4444;font-size:0.85rem;text-align:center;padding:0.5rem}
.ns-copied{position:fixed;bottom:1.5rem;left:50%;transform:translateX(-50%);background:var(--accent,#6366f1);color:#fff;padding:0.45rem 1.1rem;border-radius:var(--radius-sm,8px);font-size:0.85rem;font-weight:600;opacity:0;transition:opacity .25s;pointer-events:none;z-index:999}
.ns-copied.show{opacity:1}
</style>

<script>
(function(){
  var ipInput=document.getElementById("ns-ip");
  var cidrSelect=document.getElementById("ns-cidr");
  var resultsEl=document.getElementById("ns-results");
  var errorEl=document.getElementById("ns-error");

  /* Populate CIDR dropdown 0-32 */
  for(var i=0;i<=32;i++){
    var opt=document.createElement("option");
    opt.value=i;opt.textContent="/"+i;
    if(i===24) opt.selected=true;
    cidrSelect.appendChild(opt);
  }

  /* Parse and validate IPv4 */
  function parseIP(str){
    str=str.trim();
    var parts=str.split(".");
    if(parts.length!==4) return null;
    var octets=[];
    for(var i=0;i<4;i++){
      if(!/^\d{1,3}$/.test(parts[i])) return null;
      var n=parseInt(parts[i],10);
      if(n<0||n>255) return null;
      octets.push(n);
    }
    return octets;
  }

  function octetsToInt(o){return((o[0]<<24)|(o[1]<<16)|(o[2]<<8)|o[3])>>>0}
  function intToOctets(n){return[(n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255]}
  function intToStr(n){return intToOctets(n).join(".")}
  function intToBin(n){
    var s="";
    for(var i=31;i>=0;i--){
      s+=((n>>>i)&1);
      if(i>0&&i%8===0) s+=".";
    }
    return s;
  }

  function maskFromCidr(cidr){
    if(cidr===0) return 0;
    return(0xFFFFFFFF<<(32-cidr))>>>0;
  }

  function getClass(firstOctet){
    if(firstOctet<128) return "A";
    if(firstOctet<192) return "B";
    if(firstOctet<224) return "C";
    if(firstOctet<240) return "D (Multicast)";
    return "E (Reserved)";
  }

  function calculate(){
    var octets=parseIP(ipInput.value);
    if(!octets){
      resultsEl.style.display="none";
      errorEl.style.display=ipInput.value.trim()?"block":"none";
      return;
    }
    errorEl.style.display="none";
    resultsEl.style.display="flex";

    var cidr=parseInt(cidrSelect.value,10);
    var ip=octetsToInt(octets);
    var mask=maskFromCidr(cidr);
    var wildcard=(~mask)>>>0;
    var network=(ip&mask)>>>0;
    var broadcast=(network|wildcard)>>>0;

    document.getElementById("ns-network").textContent=intToStr(network);
    document.getElementById("ns-broadcast").textContent=intToStr(broadcast);
    document.getElementById("ns-subnet-mask").textContent=intToStr(mask);
    document.getElementById("ns-wildcard-mask").textContent=intToStr(wildcard);
    document.getElementById("ns-binary").textContent=intToBin(ip);
    document.getElementById("ns-ip-class").textContent="Class "+getClass(octets[0]);

    if(cidr===32){
      document.getElementById("ns-host-range").textContent=intToStr(network);
      document.getElementById("ns-total-hosts").textContent="1";
    } else if(cidr===31){
      document.getElementById("ns-host-range").textContent=intToStr(network)+" – "+intToStr(broadcast);
      document.getElementById("ns-total-hosts").textContent="2";
    } else {
      var first=(network+1)>>>0;
      var last=(broadcast-1)>>>0;
      var total=(last-first+1)>>>0;
      document.getElementById("ns-host-range").textContent=intToStr(first)+" – "+intToStr(last);
      document.getElementById("ns-total-hosts").textContent=total.toLocaleString();
    }
  }

  ipInput.addEventListener("input",calculate);
  cidrSelect.addEventListener("change",calculate);

  /* Click-to-copy on rows */
  var toast=document.createElement("div");
  toast.className="ns-copied";
  toast.textContent="Copied";
  document.body.appendChild(toast);
  var toastTimer;

  resultsEl.addEventListener("click",function(e){
    var row=e.target.closest(".ns-row");
    if(!row) return;
    var val=row.querySelector(".ns-value").textContent;
    if(!val||val==="—") return;
    navigator.clipboard.writeText(val).then(function(){
      clearTimeout(toastTimer);
      toast.classList.add("show");
      toastTimer=setTimeout(function(){toast.classList.remove("show")},1200);
    });
  });

  /* Initialize with example */
  ipInput.value="192.168.1.0";
  calculate();
})();
</script>

---
title: Word Counter
description: Count words in text instantly
---

<textarea id="text"></textarea>

<button onclick="countWords()">Count</button>

<p id="result"></p>

<script>

function countWords(){

let text=document.getElementById("text").value

let words=text.trim().split(/\s+/).length

document.getElementById("result").innerText="Words: "+words

}

</script>
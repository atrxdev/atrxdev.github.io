---
title: BMI Calculator
description: Calculate your body mass index easily
---

<input id="w" placeholder="Weight kg">
<input id="h" placeholder="Height cm">

<button onclick="calcBMI()">Calculate</button>

<p id="result"></p>

<script>

function calcBMI(){

let w=document.getElementById("w").value
let h=document.getElementById("h").value/100

let bmi=w/(h*h)

document.getElementById("result").innerText="BMI: "+bmi.toFixed(2)

}

</script>
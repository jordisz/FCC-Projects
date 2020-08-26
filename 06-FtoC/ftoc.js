backgroundColor(0);

var ctoF = document.getElementById("inputC");
var ftoC = document.getElementById("inputF"); 
var btn = document.getElementById("button");

ctoF.onclick = () =>  ftoC.value = "";
ftoC.onclick = () => ctoF.value = "";

ctoF.addEventListener("keyup", enterKey);
ftoC.addEventListener("keyup", enterKey);

btn.onclick = () => {
    if(ftoC.value){
        wantFToC(ftoC.value);
    } else {
        wantCToF(ctoF.value);
    }
}

ctoF.addEventListener("keyup", backspKey);
ftoC.addEventListener("keyup", backspKey);

function enterKey(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        btn.click();
    }
}

function backspKey(event) {
    if(event.keyCode === 8 || event.keyCode === 46){
        event.preventDefault();
        ftoC.value = "";
        ctoF.value = "";
    }
}

function wantCToF(val){
    let tempC = val;
    if(!isNaN(tempC)){
        backgroundColor(tempC);
        ftoC.value = cToF(tempC);
    } else {
        console.log("tempC is not a number!")
    }
}

function wantFToC(val){
    let tempF = val;
    if(!isNaN(tempF)){
        let tempC = fToC(tempF);
        backgroundColor(tempC);
        ctoF.value = tempC;
    } else {
        console.log("tempF is not a number!")
    }
}

function fToC(temp) {
    return (temp - 32) * 5 / 9;
}

function cToF(temp) {
    return (temp * 9 / 5) + 32;
}


// Page background changes with temperature. Future todo: compute the color according to tempC
function backgroundColor(tempC){
    if (tempC < -10){
        document.body.style.cssText = "background-color: " + "#66cbff";
    } else if(tempC < 5) {
        document.body.style.cssText = "background-color: " + "#66fff9";
    } else if(tempC < 30){
        document.body.style.cssText = "background-color: " + "#66ff84";
    } else if(tempC < 38){
        document.body.style.cssText = "background-color: " +  "#f9ff66";
    } else if(tempC <100){
        document.body.style.cssText = "background-color: " + "#ff9e66";
    } else {
        document.body.style.cssText = "background-color: " + "#ff6666";
    }
}



// To do: append explaining text to #text-bottom. See https://www.javascripttutorial.net/javascript-dom/javascript-createelement/ if current code doesn't work
//
// element.innerHTML = "";
// cFirst = createElement({
//   tagName: 'p',
//   text: "Celsius (known until 1948 as centigrade) is a temperature scale that is named after the Swedish astronomer Anders Celsius (1701–1744), who developed a similar temperature scale two years before his death."
// });
// cSecond = createElement({
//   tagName: 'p',
//   text: "From 1744 until 1954, 0 °C was defined as the freezing point of water and 100 °C was defined as the boiling point of water, both at a pressure of one standard atmosphere."
// });
// cThird = createElement({
//   tagName: 'p',
//   text: "Although these defining correlations are commonly taught in schools today, by international agreement, the unit degree Celsius and the Celsius scale are defined by absolute zero and by the definition of the Boltzmann constant."
// });
// cFourth = createElement({
//   tagName: 'p',
//   text: "This definition also precisely relates the Celsius scale to the Kelvin scale, which defines the SI base unit of thermodynamic temperature with symbol K."
// });
// cFifth = createElement({
//   tagName: 'p',
//   text: "Absolute zero, the lowest temperature possible, is defined as being exactly 0 K and −273.15 °C. A temperature difference of one degree Celsius and that of one Kelvin are exactly the same."
// });

// element.appendChild(cFirst)


// fFirst = createElement({
//   tagName: 'p',
//   text: "The Fahrenheit scale is a temperature scale based on one proposed in 1724 by the physicist Daniel Gabriel Fahrenheit (1686–1736). It uses the degree Fahrenheit (symbol: °F) as the unit. Several accounts of how he originally defined his scale exist.."
// });
// fSecond = createElement({
//   tagName: 'p',
//   text: "The Fahrenheit scale is now usually defined by two fixed points: the temperature at which pure water freezes into ice is defined as 32 °F and the boiling point of water is defined to be 212 °F, both at sea level and under standard atmospheric pressure (a 180 °F separation)."
// });
// fThird = createElement({
//   tagName: 'p',
//   text: "Fahrenheit was the first standardized temperature scale to be widely used, but its use is now limited. It is the official temperature scale in the United States (including its unincorporated territories), its freely associated states in the Western Pacific (Palau, the Federated States of Micronesia and the Marshall Islands), the Cayman Islands, and Liberia."
// });
// fFourth = createElement({
//   tagName: 'p',
//   text: "Fahrenheit is used alongside the Celsius scale in Antigua and Barbuda and other islands which use the same meteorological service, such as Saint Kitts and Nevis, the Bahamas, and Belize. A handful of British Overseas Territories still use both scales, including the British Virgin Islands, Montserrat, Anguilla, and Bermuda. In the United Kingdom, degrees Fahrenheit are often given alongside degrees Celsius, as some people are still more familiar with Fahrenheit, or for editorial effect. All other countries in the world now officially use the Celsius scale"
// });








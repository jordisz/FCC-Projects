const input = document.getElementById("input").value
console.log(input);

function fToC(temp) {
    return (temp - 32) * 5 / 9;
}

function cToF(temp) {
    return (temp * 9 / 5) + 32;
}


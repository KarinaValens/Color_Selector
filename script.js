"use strict";

document.addEventListener("DOMContentLoaded", init);

const HTML = {};
let r, g, b;

function init() {
    //target the div´s background color
    HTML.output = document.querySelector("#output");
    //target the input and output text fields
    HTML.rgb = document.querySelector("#rgb_color");
    HTML.hex = document.querySelector("#hex_color");
    HTML.hls = document.querySelector("#hsl_color");

    displayColor();
}

function displayColor(input) {
    //Showing the color 
    input = document.querySelector("#input").addEventListener("input", changeColor);
}

function changeColor() {
    //changing div backgound
    HTML.output.style.backgroundColor = input.value;
    //displaying the hex value in the output field
    HTML.hex.value = input.value;
    //displaying the rgb value in the output field
    HTML.rgb.value = hexToRgb(input.value);
    //displaying the hls value in the output field
    HTML.hls.value = rgbToHls(r, g, b);
}

function hexToRgb(hex) {
    r = parseInt(hex.substring(1, 3), 16); //function parses a string argument and returns an integer
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
    return `rgb (${r}, ${g}, ${b})`;
}

function rgbToHls(r, g, b) {

    r /= 255;
    g /= 255;
    b /= 255;

    let h, s, l;

    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);

    if (max === min) {
        h = 0;
    } else
    if (max === r) {
        h = 60 * (0 + (g - b) / (max - min));
    } else
    if (max === g) {
        h = 60 * (2 + (b - r) / (max - min));
    } else
    if (max === b) {
        h = 60 * (4 + (r - g) / (max - min));
    }

    if (h < 0) {
        h = h + 360;
    }

    l = (min + max) / 2;

    if (max === 0 || min === 1) {
        s = 0;
    } else {
        s = (max - l) / (Math.min(l, 1 - l));
    }
    // multiply s and l by 100 to get the value in percent, rather than [0,1]
    s *= 100;
    l *= 100;

    return (`${Math.floor(h)}, ${Math.floor(s)}%, ${Math.floor(l)}%`)

}
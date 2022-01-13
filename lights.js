'use strict';
import context from "./scripts/context.js";
import * as Utils from "./scripts/utils.js";

////////////////////////////////////
// Gill Mertens //
////////////////////////////////////

let width = context.canvas.width;
let height = context.canvas.height;

let switchPos = false;
let mouseX = 0;
let mouseY = 0;

let lamps = [];
let lampAmount = Utils.randomNumber(2, 10);

setup();
drawButton(width / 2, 400);
drawLight(width / 2, 100, switchPos);
// wishSucces();
// thxxxx!!!!

window.onmousedown = mouseDown;
window.onmousemove = mouseMove;


function setup() {
    context.fillStyle = Utils.hsl(0, 0, 11);
    context.fillRect(0, 0, width, height);
    context.strokeStyle = Utils.hsl(0, 0, 15);
    for(let i = 0; i < width/20; i++){
        console.log(i%2);
        if(i%2 == 0){
            context.lineWidth = 20;
        } else {
            context.lineWidth = 10;
        }
        context.beginPath();
        context.moveTo(40+i*40, -20);
        context.lineTo(-20, 40+i*40);
        context.stroke();
    }

    for(let i = 0; i < lampAmount; i++) {
        let lamp = {
            x: width / (lampAmount + 1) * (i + 1),
            on: false,
        }
        lamps.push(lamp);
    }
    context.lineWidth = 2;
}

function update() {
    context.fillStyle = Utils.hsl(0, 0, 11);
    context.fillRect(0, 0, width, height);
    context.strokeStyle = Utils.hsl(0, 0, 15);
    for(let i = 0; i < width/20; i++){
        console.log(i%2);
        if(i%2 == 0){
            context.lineWidth = 20;
        } else {
            context.lineWidth = 10;
        }
        context.beginPath();
        context.moveTo(40+i*40, -20);
        context.lineTo(-20, 40+i*40);
        context.stroke();
    }
    context.lineWidth = 2;
    drawButton(width / 2, 400, false);
    drawLight(width / 2, 100, switchPos);
}


function drawButton(x, y, hover) {
    if(hover){
        context.fillStyle = Utils.hsl(0, 0, 81);
    }else {
        context.fillStyle = Utils.hsl(0, 0, 11);
    }
    context.beginPath();
    context.rect(x - 100, y - 100, 200, 200);
    context.rect(x - 50, y - 50, 100, 100);
    context.fill();
    context.strokeStyle = "gray";
    context.stroke();
    context.fillStyle = "gray";
    if(switchPos) {
        context.fillRect(x - 50, y, 100, 50);
    } else {
        context.fillRect(x - 50, y - 50, 100, 50);
    }
}

function drawLight(x, y, on) {
    if(on == true) {
        lamps[Utils.randomNumber(0, (lamps.length - 1))].on = true;
    } else {
        for(let i = 0; i < lamps.length; i++) {
            lamps[i].on = false;
        }
    }
    context.strokeStyle = "gray";
    for(let i = 0; i < lamps.length; i++) {
        context.beginPath();
        context.moveTo(lamps[i].x, y - 50);
        context.arc(lamps[i].x, y, 50, Utils.degrees(270), Utils.degrees(45));
        context.arcTo(lamps[i].x + 25, y + 50, lamps[i].x + 25, y + 100, 50);
        context.lineTo(lamps[i].x + 25, y + 100);
        context.lineTo(lamps[i].x - 25, y + 100);
        context.lineTo(lamps[i].x - 25, y + 75);
        context.arcTo(lamps[i].x - 25, y + 50, lamps[i].x - 50, y, 50);
        context.arc(lamps[i].x, y, 50, Utils.degrees(135), Utils.degrees(270));
        context.stroke();
        if(lamps[i].on){
            context.fillStyle = "#FFD700";
            context.fill();
        }
        context.fillStyle = "gray";
        context.fillRect(lamps[i].x - 25, y + 75, 50, 25);
    }
}

function wishSucces() {
    context.textAlign = "center";
    context.fillStyle = "#FFD700";
    context.font = "bold 96pt Arial";
    context.fillText("VEEL SUCCES!!!", width / 2, 700);
}

function mouseMove(e){
    mouseX = e.pageX;
    mouseY = e.pageY;
    if(mouseX > width/2 - 100 && mouseY > 400 - 100 && mouseX < width/2 + 100 && mouseY < 400 + 100) {
        drawButton(width / 2, 400, true);
    }else{
        drawButton(width / 2, 400, false);
    }
}

function mouseDown() {
    if(mouseX > width/2 - 100 && mouseY > 400 - 100 && mouseX < width/2 + 100 && mouseY < 400 + 100){
        switchPos =! switchPos;
        console.log(lamps);
        update();
    }
}
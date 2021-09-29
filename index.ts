import { createCanvas } from "canvas";
import { writeFileSync } from "fs";
const canvas = createCanvas(500, 500);
const ctx = canvas.getContext("2d");

//y=x
const heightMiddle = canvas.height / 2;
const widthMiddle = canvas.width / 2;

ctx.fillStyle = "white"
ctx.fillRect(0, 0, canvas.width, canvas.height)

//X軸
ctx.strokeStyle = "rgb(0,0,0)"
ctx.beginPath();
ctx.lineTo(0, heightMiddle);
ctx.lineTo(canvas.width, heightMiddle);
ctx.stroke();

//Y軸
ctx.beginPath();
ctx.lineTo(widthMiddle, 0)
ctx.lineTo(widthMiddle, canvas.height)
ctx.stroke()

//Y軸箭頭
const length = 5;
ctx.beginPath();
ctx.lineTo(widthMiddle, 0)
ctx.lineTo(widthMiddle - (length / Math.pow(2, 0.5)), length / Math.pow(2, 0.5))
ctx.stroke()

ctx.beginPath();
ctx.lineTo(widthMiddle, 0)
ctx.lineTo(widthMiddle + (length / Math.pow(2, 0.5)), length / Math.pow(2, 0.5))
ctx.stroke()

//X軸箭頭
ctx.beginPath();
ctx.lineTo(canvas.width, heightMiddle)
ctx.lineTo(canvas.width - (length / Math.pow(2, 0.5)), heightMiddle - length / Math.pow(2, 0.5))
ctx.stroke()

ctx.beginPath();
ctx.lineTo(canvas.width, heightMiddle)
ctx.lineTo(canvas.width - (length / Math.pow(2, 0.5)), heightMiddle + length / Math.pow(2, 0.5))
ctx.stroke()

//X單位線
const unitLength = 10;
const unitLengthLineLength = 5;
let nowWidth = widthMiddle;

while (nowWidth < canvas.width) {
    ctx.strokeStyle = "rgba(0,0,0,0.1)"
    ctx.beginPath()
    ctx.lineTo(nowWidth, 0)
    ctx.lineTo(nowWidth, canvas.height)
    ctx.stroke();
    ctx.strokeStyle = "rgb(0,0,0)"
    ctx.beginPath()
    ctx.lineTo(nowWidth, heightMiddle - (unitLengthLineLength / 2))
    ctx.lineTo(nowWidth, heightMiddle + (unitLengthLineLength / 2))
    ctx.stroke();
    nowWidth += unitLength;
}

nowWidth = widthMiddle;
while (nowWidth > 0) {
    ctx.strokeStyle = "rgba(0,0,0,0.1)"
    ctx.beginPath()
    ctx.lineTo(nowWidth, 0)
    ctx.lineTo(nowWidth, canvas.height)
    ctx.stroke();
    ctx.strokeStyle = "rgb(0,0,0)"
    ctx.beginPath()
    ctx.lineTo(nowWidth, heightMiddle - (unitLengthLineLength / 2))
    ctx.lineTo(nowWidth, heightMiddle + (unitLengthLineLength / 2))
    ctx.stroke();
    nowWidth -= unitLength;
}

//Y單位線
let nowHeight = heightMiddle;
while (nowHeight < canvas.height) {
    ctx.strokeStyle = "rgba(0,0,0,0.1)"
    ctx.beginPath()
    ctx.lineTo(0, nowHeight)
    ctx.lineTo(canvas.width, nowHeight)
    ctx.stroke();
    ctx.strokeStyle = "rgb(0,0,0)"
    ctx.beginPath()
    ctx.lineTo(widthMiddle - (unitLengthLineLength / 2), nowHeight)
    ctx.lineTo(widthMiddle + (unitLengthLineLength / 2), nowHeight)
    ctx.stroke();
    nowHeight += unitLength;
}

nowHeight = heightMiddle;
while (nowHeight > 0) {
    ctx.strokeStyle = "rgba(0,0,0,0.1)"
    ctx.beginPath()
    ctx.lineTo(0, nowHeight)
    ctx.lineTo(canvas.width, nowHeight)
    ctx.stroke();
    ctx.strokeStyle = "rgb(0,0,0)"
    ctx.beginPath();
    ctx.lineTo(widthMiddle - (unitLengthLineLength / 2), nowHeight)
    ctx.lineTo(widthMiddle + (unitLengthLineLength / 2), nowHeight)
    ctx.stroke();
    nowHeight -= unitLength;
}

function draw2Graph(a: number, b: number, c: number) {
    ctx.strokeStyle = "rgb(0,0,0)"
    let previousY = 0
    let previousX = 0
    for (let nowX = 0; nowX + widthMiddle <= canvas.width && (heightMiddle - (nowX * Math.pow(a, 2) + nowX * b + c) >= 0 || heightMiddle - (nowX * Math.pow(a, 2) + nowX * b + c) <= canvas.height); nowX += 0.001) {
        ctx.beginPath();
        ctx.lineTo(widthMiddle + (previousX * unitLength), heightMiddle - (previousY * unitLength));
        previousY = (Math.pow(nowX, 2) * a) + nowX * b + c;
        previousX = nowX;
        ctx.lineTo(widthMiddle + (previousX * unitLength), heightMiddle - (previousY * unitLength));
        ctx.stroke()
    }
    previousY = 0
    previousX = 0
    for (let nowX = 0; widthMiddle + nowX >= 0 && (heightMiddle - (nowX * Math.pow(a, 2) + nowX * b + c) >= 0 || heightMiddle - (nowX * Math.pow(a, 2) + nowX * b + c) <= canvas.height); nowX -= 0.001) {
        ctx.beginPath();
        ctx.lineTo(widthMiddle + (previousX * unitLength), heightMiddle - (previousY * unitLength));
        previousY = (Math.pow(nowX, 2) * a) + nowX * b + c;
        previousX = nowX;
        ctx.lineTo(widthMiddle + (previousX * unitLength), heightMiddle - (previousY * unitLength));
        ctx.stroke()
    }
}

draw2Graph(-1 / 10, 0, 0);

writeFileSync("./photo.png", canvas.toBuffer());
console.log("完成！");

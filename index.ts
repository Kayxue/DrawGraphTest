import { createCanvas } from "canvas";
import { writeFileSync } from "fs";
const canvas = createCanvas(500, 500);
const ctx = canvas.getContext("2d");

//y=x
const heightMiddle = canvas.height / 2;
const widthMiddle = canvas.width / 2;

ctx.strokeStyle="rgb(255,255,255)"
for (let i = 0; i <= canvas.height; i++) {
    ctx.beginPath();
    ctx.lineTo(0, i);
    ctx.lineTo(canvas.width, i);
    ctx.stroke();
}

ctx.strokeStyle="rgb(0,0,0)"
ctx.beginPath();
ctx.lineTo(0, heightMiddle);
ctx.lineTo(canvas.width, heightMiddle);
ctx.stroke();

writeFileSync("./photo.png", canvas.toBuffer());
console.log("完成！");

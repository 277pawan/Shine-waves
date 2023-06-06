import datGui from "https://cdn.skypack.dev/dat.gui";

const gui = new datGui.GUI();
const canvas = document.querySelector("canvas");
const ct = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const wave = {
    y: canvas.height / 2,
    length: 0.005,
    amplitude: 135,
    frequency: 0.01,
};
const stroke = {
    h: 150,
    s: 50,
    l: 70
}
const backcolor = {
    r: 0,
    g: 0,
    b: 0,
    a: 0.01
}
const wavefolder = gui.addFolder('Wave')
wavefolder.add(wave, "y", 0, canvas.height);
wavefolder.add(wave, "length", -0.01, 0.01);
wavefolder.add(wave, "amplitude", -300, 300);
wavefolder.add(wave, "frequency", -0.01, 1);
wavefolder.open();

const strokefolder = gui.addFolder('StrokeColor')
strokefolder.add(stroke, 'h', 0, 455)
strokefolder.add(stroke, 's', 0, 100)
strokefolder.add(stroke, 'l', 0, 100)
strokefolder.open();

const background = gui.addFolder("BackgroundColor")
background.add(backcolor, 'r', 0, 255)
background.add(backcolor, 'g', 0, 255)
background.add(backcolor, 'b', 0, 255)
background.add(backcolor, 'a', 0, 1)
background.open();


var increment = wave.frequency;
function animate() {
    requestAnimationFrame(animate);
    ct.fillStyle = `rgba(${backcolor.r},${backcolor.g},${backcolor.b},${backcolor.a})`
    ct.fillRect(0, 0, canvas.width, canvas.height);
    ct.beginPath();
    ct.moveTo(0, wave.y);

    for (let i = 0; i < canvas.width; i++) {
        ct.lineTo(i, wave.y + Math.sin(i * wave.length + increment) * wave.amplitude);
    }

    ct.strokeStyle = `hsl(${stroke.h},${stroke.s}%, ${stroke.l}%)`;
    ct.stroke();
    increment += wave.frequency;
}

animate();

console.log(window.innerHeight);

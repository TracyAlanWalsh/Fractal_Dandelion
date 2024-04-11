const myCanvas = document.getElementById("my_canvas");
const ctx = myCanvas.getContext("2d");
const container = document.getElementById('container');
const canvas = myCanvas;
const angleInput1 = document.getElementById("angleInput1");
const angleInput2 = document.getElementById("angleInput2");
const angleInput3 = document.getElementById("angleInput3");
const angleInput4 = document.getElementById("angleInput4");
const rotationMultiplierInput = document.getElementById("rotationMultiplierInput");
const inputValue = rotationMultiplierInput.value; // Retrieve the value of the input field

// Define initial starting position and rotation speed
const startX = 450;
const startY = 600;
let rotateSpeed = (10000000);
let transitionInterval;
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let currentValue = 0; // Current rotation value
let targetValue = 360; // Target rotation value
let cc = currentValue; // Alias for current value
let ff = 0; // Counter for transition cycles
container.style.width = canvasWidth + 'px';
container.style.height = canvasHeight + 'px';

// Function to draw the tree
function drawTree() {
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    draw(startX, startY, 148, 0, 1);
}

function smoothTransition(startValue, endValue, duration, updateFunction) {
    let currentFrame = 0;
    const framesPerSecond = 30; 
    const totalFrames = duration / 1000 * framesPerSecond; 
    const increment = (endValue - startValue) / totalFrames; 
    transitionInterval = setInterval(function() {
        currentFrame++;
        currentValue = startValue + increment * currentFrame;
        updateFunction(currentValue); 
        if (currentFrame >= totalFrames) {
            clearInterval(transitionInterval);
            ff++; 
            let target;
            if (ff % 2 === 0) {
                target = targetValue;
            } else {
                target = cc;
            }
            if (endValue !== targetValue) {
            smoothTransition(endValue, targetValue, rotateSpeed, drawTree);
            }
        }
    }, 100 / framesPerSecond); // Interval duration
}

// Function to draw the tree structure recursively
function draw(startX, startY, len, angle, branchWidth) {
    
    ctx.lineWidth = branchWidth;
    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = "#E5E7EB"; 
    ctx.translate(startX, startY);
    ctx.rotate(angle * Math.PI / 180 * currentValue);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, -len);
    ctx.stroke();
    if (len < 40) {
        ctx.restore();
        return;
    }
    const angle1 = parseInt(document.getElementById("angleInput1").value);
    const angle2 = parseInt(document.getElementById("angleInput2").value);
    const angle3 = parseInt(document.getElementById("angleInput3").value);
    const angle4 = parseInt(document.getElementById("angleInput4").value);

    ctx.strokeStyle = "#762d0a"; 
    ctx.stroke();
    draw(0, -len, len * 0.8, angle - angle1, branchWidth * 0.8);
    draw(0, -len, len * 0.8, angle + angle2, branchWidth * 0.8);
    draw(0, -len, len * 0.8, angle - angle3, branchWidth * 0.8);
    draw(0, -len, len * 0.8, angle + angle4, branchWidth * 0.8);
    ctx.restore();
}

// Start the smooth transition animation
smoothTransition(currentValue, targetValue, rotateSpeed, drawTree);

angleInput1.addEventListener("input", updateAngles);
angleInput2.addEventListener("input", updateAngles);
angleInput3.addEventListener("input", updateAngles);
angleInput4.addEventListener("input", updateAngles);

rotationMultiplierInput.addEventListener("change", function() {
    const newMultiplier = parseFloat(rotationMultiplierInput.value);
    updateRotationMultiplier(newMultiplier, drawTree);

});

function updateRotationMultiplier(newMultiplier, updateFunction) {
    let rotationMultiplier = newMultiplier;
    const newRotateSpeed = 2000 * rotationMultiplier;
    clearInterval(transitionInterval);
    smoothTransition(currentValue, targetValue, newRotateSpeed, updateFunction);
}

function updateAngles() {
}
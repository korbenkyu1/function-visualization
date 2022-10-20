const color = document.getElementById('color');
// y=f(x)
const f = document.getElementById('y=f(x)');
f.width = 400;
f.height = 400;
// setup canvas context
const ctx = f.getContext('2d');
ctx.strokeStyle = 'tomato';
ctx.lineWidth = 2.5;

// y=|f(x)|
const f1 = document.getElementById('y=|f(x)|');
f1.width = 400;
f1.height = 400;
// y=f(|x|)
const f2 = document.getElementById('y=f(|x|)');
f2.width = 400;
f2.height = 400;
// |y|=f(x)
const f3 = document.getElementById('|y|=f(x)');
f3.width = 400;
f3.height = 400;
// |y|=f(|x|)
const f4 = document.getElementById('|y|=f(|x|)');
f4.width = 400;
f4.height = 400;

let isDrawing = false;
let x, y;
function onStartDrawing(){
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(x, y);
};
function onDrawing(x, y){
    const rect = f.getBoundingClientRect();
    if(isDrawing){
        ctx.lineTo(x/rect.width*400, y/rect.height*400);
        ctx.stroke();
        return;
    }
    ctx.beginPath();
    ctx.moveTo(x, y);
};
function onEndDrawing(){
    ctx.closePath();
    isDrawing = false;
}
f.addEventListener('mousedown', onStartDrawing);
f.addEventListener('touchstart', onStartDrawing);

f.addEventListener('mousemove', (e)=>{
    onDrawing(e.offsetX, e.offsetY);
});
f.addEventListener('touchmove', (e)=>
{
    e.preventDefault();
    const rect = e.target.getBoundingClientRect();
    onDrawing(e.changedTouches[0].clientX-rect.left, e.changedTouches[0].clientY-rect.top);
});

f.addEventListener('mouseup', onEndDrawing);
f.addEventListener('mouseleave', onEndDrawing);
f.addEventListener('touchend', onEndDrawing);
f.addEventListener('touchcancel', onEndDrawing);

document.querySelector('#erase').addEventListener('click', ()=>{
    ctx.clearRect(0, 0, f.width, f.height)
    f1.getContext('2d').clearRect(0, 0, f1.width, f1.height);
    f2.getContext('2d').clearRect(0, 0, f2.width, f2.height);
    f3.getContext('2d').clearRect(0, 0, f3.width, f3.height);
    f4.getContext('2d').clearRect(0, 0, f4.width, f4.height);
});
document.querySelector('#visualize').addEventListener('click', ()=>{
    const image = f;
    let context; 
    // y=|f(x)|
    context = f1.getContext('2d');
    context.clearRect(0, 0, f1.width, f1.height);
    context.drawImage(image, 0, 0, 400, 200, 0, 0, 400, 200);
    context.scale(1, -1);
    context.drawImage(image, 0, 200, 400, 200, 0, 0, 400, -200);
    context.setTransform(1,0,0,1,0,0);

    // y=f(|x|)
    context = f2.getContext('2d');
    context.clearRect(0, 0, f2.width, f2.height);
    context.drawImage(image, 200, 0, 200, 400, 200, 0, 200, 400);
    context.scale(-1, 1);
    context.drawImage(image, 200, 0, 200, 400, -200, 0, 200, 400);
    context.setTransform(1,0,0,1,0,0);
    // |y|=f(x)
    context = f3.getContext('2d');
    context.clearRect(0, 0, f3.width, f3.height);
    context.drawImage(image, 0, 0, 400, 200, 0, 0, 400, 200);
    context.scale(1, -1);
    context.drawImage(image, 0, 0, 400, 200, 0, -400, 400, 200);
    context.setTransform(1,0,0,1,0,0);
    
    // |y|=f(|x|)
    context = f4.getContext('2d');
    context.clearRect(0, 0, f4.width, f4.height);
    context.drawImage(image, 200, 0, 200, 200, 200, 0, 200, 200);
    context.scale(-1, 1);
    context.drawImage(image, 200, 0, 200, 200, -200, 0, 200, 200);
    context.scale(1, -1);
    context.drawImage(image, 200, 0, 200, 200, -200, -400, 200, 200);
    context.scale(-1, 1);
    context.drawImage(image, 200, 0, 200, 200, 200, -400, 200, 200);
    context.setTransform(1,0,0,1,0,0);
});
let width = 15;
let heigth = 15;
let pixelSize = 10;
let velocity = 2;
let debug = false;
let tamanhoChama = 4;

let canvas = null;
let ctx = null;

let arrCtrlAnimation = []
const fireColorsPalette = [{ "r": 7, "g": 7, "b": 7 }, { "r": 31, "g": 7, "b": 7 }, { "r": 47, "g": 15, "b": 7 }, { "r": 71, "g": 15, "b": 7 }, { "r": 87, "g": 23, "b": 7 }, { "r": 103, "g": 31, "b": 7 }, { "r": 119, "g": 31, "b": 7 }, { "r": 143, "g": 39, "b": 7 }, { "r": 159, "g": 47, "b": 7 }, { "r": 175, "g": 63, "b": 7 }, { "r": 191, "g": 71, "b": 7 }, { "r": 199, "g": 71, "b": 7 }, { "r": 223, "g": 79, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 103, "b": 15 }, { "r": 207, "g": 111, "b": 15 }, { "r": 207, "g": 119, "b": 15 }, { "r": 207, "g": 127, "b": 15 }, { "r": 207, "g": 135, "b": 23 }, { "r": 199, "g": 135, "b": 23 }, { "r": 199, "g": 143, "b": 23 }, { "r": 199, "g": 151, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 175, "b": 47 }, { "r": 183, "g": 175, "b": 47 }, { "r": 183, "g": 183, "b": 47 }, { "r": 183, "g": 183, "b": 55 }, { "r": 207, "g": 207, "b": 111 }, { "r": 223, "g": 223, "b": 159 }, { "r": 239, "g": 239, "b": 199 }, { "r": 255, "g": 255, "b": 255 }]

function gridRepeat(callback = null){
    let index = 0; 
    for(let x = 0; x < width; x+=pixelSize ){
        for(let y = 0; y < heigth; y += pixelSize){
            if(callback != null) callback(index, x, y);
            index++;
        }
    }
}

function render(){
    if(canvas == null || ctx == null) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);    
    ctx.moveTo(0, 0);     
    gridRepeat((index, x, y) => {
        const iData = arrCtrlAnimation.find( item => item.index == index);
        const color = fireColorsPalette[iData.fireIntensit]
        if(debug){
            ctx.fillText(iData.fireIntensit, x+5, y-5);   
            if(color == undefined) ctx.strokeStyle = 'red'
            else ctx.strokeStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
            ctx.strokeRect(x, y, pixelSize, pixelSize); 
        }else{
            if(color == undefined) ctx.fillStyle = 'red'
            else ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
            ctx.fillRect(x, y, pixelSize, pixelSize); 
        }
    })   
    ctx.stroke();
}

function mountArrCtrl(){
    gridRepeat((index, x, y) => {
        arrCtrlAnimation.push({
            index: index,
            fireIntensit: y == heigth-pixelSize ? 36 : 0,
            position: {
                x: x,
                y: y
            }
        })
    })
}

function updateFireAnimation(){
    arrCtrlAnimation.forEach( item => {
        pulse = Math.floor(Math.random() * 6) * pixelSize
        const before = arrCtrlAnimation.find( fItem => fItem.position.x == item.position.x+pulse && fItem.position.y == item.position.y+pixelSize )
        if( before == undefined || before.fireIntensit <= 0 ) return;

        let cast = before.fireIntensit - Math.floor(Math.random() * tamanhoChama)

        if(cast < 0) item.fireIntensit = 0
        else item.fireIntensit = cast
    })
}

function animate(){
    updateFireAnimation();
    render();
    window.requestAnimationFrame(animate);
}


function start(){
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");

    width = canvas.width
    heigth = canvas.height 

    // Montando a array de controle da animação....
    mountArrCtrl();

    // Iniciando a animação...
    window.requestAnimationFrame(animate);

    
    
}
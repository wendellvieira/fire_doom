function start(){
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");

    // Criar linhas
    ctx.moveTo(0,0);
    ctx.lineTo(200, 100);
    ctx.stroke();
    
    // Criar circulos
    ctx.beginPath();
    ctx.arc(90, 50, 40, 0, 2 * Math.PI);    
    ctx.stroke();

    // Criar textos
    ctx.font = "30px Arial";
    ctx.fillText("Hello Word", 30, 50);
    ctx.strokeText("Hello Word", 30, 100);
    ctx.stroke();
}

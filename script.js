// JS script goes here
let form = document.querySelector('#nBarsInput'); //# = reference to ID
//let form = document.getElementById('nForm');

let canvas = document.querySelector('.zdog-canvas');
let ctx = canvas.getContext('2d'); 
let nTextBox = document.getElementById('nTextBox');
let nSubmitButton = document.getElementById('nSubmit');
let nArr = [];
let nVal = [];
nSubmitButton.addEventListener('click', () => {
    // do stuff with textbox.value
    nArr = [];
    nVal = [];
    let barWidth = (canvas.width/nTextBox.value);
    let illo = new Zdog.Illustration({
        element: ".zdog-canvas",
        centered: false
    });
    let randVal = Math.floor((Math.random()*400) + 1);
    nVal.push(randVal);
    let rect = new Zdog.Rect({
        addTo: illo,
        width: barWidth,
        height: randVal,
        color: 'black',
        fill: true,
        translate: {y: canvas.height - randVal / 2, x : barWidth/2}});
    illo.updateRenderGraph();

    for(let i = 1; i < nTextBox.value; ++i){
        randVal = Math.floor((Math.random()*400) + 1);
        rect.copy({
            height: randVal,
            color: 'brown',
            translate: {y: canvas.height - randVal/ 2, x :  (i * barWidth) + barWidth/2}
        });
        
        nArr.push(rect);
        nVal.push(randVal);
        illo.updateRenderGraph();
    }
    console.log(nVal);
    ctx.fillStyle = 'black';
    ctx.font = '48px impact';
    ctx.fillText('test', 500, 500);
});







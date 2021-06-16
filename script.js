const _width = 1000;


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
    console.log(nTextBox.value);
    for(let i = 0; i < nTextBox.value; ++i){
        let randVal = 2 * Math.floor((Math.random()*100) + 1);
        let rect = new Zdog.Rect({
            addTo: illo,
            width: _width / nTextBox.value,
            height: randVal,
            color: 'black',
            fill: true,
            translate: {y: 0, x :  i * (_width/nTextBox.value)}, 
        });
        nArr.push(rect);
        nVal.push(randVal);
        illo.updateRenderGraph();
    }
    console.log(nVal);
});

let illo = new Zdog.Illustration({
    element: ".zdog-canvas",
    centered: false
});




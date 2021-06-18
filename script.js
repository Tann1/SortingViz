// JS script goes here
let form = document.querySelector('#nBarsInput'); //# = reference to ID



let canvas = document.querySelector('.zdog-canvas'); 
let ctx = canvas.getContext('2d'); 
let nTextBox = document.getElementById('nTextBox');
let nSubmitButton = document.getElementById('nSubmit');
let nArr = []; //stores ZdogRect object for each bar
let nVal = []; //stores the array that needs to be sorted 
let unsorted = 'pink'
let sorted = 'brown'
let sorting = 'yellow'


nSubmitButton.addEventListener('click', () => {  // generate graph when submit button is clicked
    
    generateNums(nTextBox.value);
    createCanvas(nTextBox.value);
});


function generateNums(size) {  // generates array of size ntextBox.value, populated with random numbers
    nVal = [];  // reset array
    for (let i = 0; i < size; ++i){
        let randVal = Math.floor((Math.random() * 0.55 * canvas.height) + (0.40 * canvas.height));
        nVal.push([randVal, unsorted]);
    }
}

// do drawing stuff based on given array and N value

function createCanvas(size) { 
    let barWidth = (canvas.width/size);
    let illo = new Zdog.Illustration({  //main parent object of 
        element: ".zdog-canvas",
        centered: false
    });

   

    let rect = new Zdog.Rect({  // create first bar
        addTo: illo,
        width: barWidth,
        height: nVal[0][0],
        color: nVal[0][1],
        fill: true,
        stroke: 2,
        translate: {y: canvas.height - nVal[0][0] / 2, x : barWidth/2}});
    illo.updateRenderGraph();

    for(let i = 1; i < size; ++i){  // create rest of the bars by copying the first bar
        rect.copy({
            height: nVal[i][0],
            color: nVal[i][1],
            translate: {y: canvas.height - nVal[i][0]/ 2, x :  (i * barWidth) + barWidth/2}
        });
        
        
        //nArr.push(rect);
        illo.updateRenderGraph();
        
         /* text setup*/
    }
    for (let i = 0; i < size; ++i) {
        ctx.fillStyle = 'black';
        ctx.textAlign = 'center';
        ctx.font =  (0.50 * barWidth) + 'px monospace';
        console.log((0.75 * barWidth));
        ctx.fillText(nVal[i][0], (i * barWidth) + (barWidth/2), 490);
    }
        
}




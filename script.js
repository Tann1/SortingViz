// JS script goes here
let form = document.querySelector('#nBarsInput'); //# = reference to ID



let canvas = document.querySelector('.zdog-canvas'); 
let ctx = canvas.getContext('2d'); 
let nTextBox = document.getElementById('nTextBox');
let nSubmitButton = document.getElementById('nSubmit');
let nArr = []; //stores ZdogRect object for each bar
let nVal = []; //stores the array that needs to be sorted 
let unsorted = '#c9751a'
let sorted = 'brown'
let sorting = 'yellow'


nSubmitButton.addEventListener('click', () => {  // generate graph when submit button is clicked
    
    generateNums(nTextBox.value);
    createCanvas(nTextBox.value);
    setTimeout(insertionSort, 2000);
    //insertionSort();
    //selectionSort();
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
        width: barWidth * 0.95,
        height: nVal[0][0],
        color: nVal[0][1],
        fill: true,
        stroke: 4,
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
        ctx.fillText(nVal[i][0], (i * barWidth) + (barWidth/2), 490);
    }


    
    //selectionSort();
    //insertionSort();
}

function selectionSort() {

    let curr_pos = 0; //find the position with the lowest current value 
    let temp = 0; //need it for the swap
    for (let i = 0; i < nTextBox.value - 1; ++i) {
        curr_pos = i;
        nVal[i][1] = sorting;
        
        setTimeout(function (){
            createCanvas(nTextBox.value);
            for (let j = curr_pos + 1; j < nTextBox.value; ++j) { //finds the lowest relative value in the array
                if (nVal[j] < nVal[curr_pos])
                    curr_pos = j;
            }
        }, 500);
        

        //swap 
        nVal[i][1] = sorted;
        temp = nVal[i];
        nVal[i] = nVal[curr_pos];
        nVal[curr_pos] = temp;
        createCanvas(nTextBox.value);
        
    }
}

function insertionSort() {
    let val, j;
    nVal[0][1] = sorted;
    for (let i = 1; i < nTextBox.value; i++) {
        val = nVal[i][0]; // current value to sort
        nVal[i][1] = sorting;
        setTimeout(createCanvas(nTextBox.value), 500);
        j = i; // only loop through "sorted" portion
        while (j > 0 && val < nVal[j-1][0]) {  // keep going through sorted portion until correct position is found
            nVal[j][0] = nVal[j-1][0]; // shift other values up
            nVal[j][1] = nVal[j-1][1];
            j--;
            setTimeout(createCanvas(nTextBox.value), 500);
        }
        nVal[j][0] = val;
        nVal[j][1] = sorted;
        setTimeout(createCanvas(nTextBox.value), 500);
    }
}



// JS script goes here
let form = document.querySelector('#nBarsInput'); //# = reference to ID
let sortType = document.querySelector('#algoSelect');



let canvas = document.querySelector('.zdog-canvas'); 
let ctx = canvas.getContext('2d'); 
let nTextBox = document.getElementById('nTextBox');
let nSubmitButton = document.getElementById('nSubmit');
let replayButton = document.getElementById("replayButton");
let nVal = []; //stores the array that needs to be sorted 
let nValUnsorted = [];
let unsorted = '#c9751a'
let sorted = 'green'
let sorting = 'yellow'
let swapColor = 'red'


nSubmitButton.addEventListener('click', () => {  // generate graph when submit button is clicked
    generateNums(nTextBox.value);
    startSort();
});

replayButton.addEventListener('click', () => {
    nVal = nValUnsorted;
    console.log(nValUnsorted);
    startSort();
});


function startSort() {
    createCanvas(nTextBox.value);
    switch (sortType.value) {
        case 'Selection Sort': {
            selectionSort();
            break;
        }
        case 'Insertion Sort': {
            insertionSort();
            break;
        }
        default: {
            alert("Invalid sort type");
            break;
        }
    }
}

function generateNums(size) {  // generates array of size ntextBox.value, populated with random numbers
    nVal = [];  // reset array
    for (let i = 0; i < size; ++i){
        let randVal = Math.floor((Math.random() * 0.55 * canvas.height) + (0.40 * canvas.height));
        nVal.push([randVal, unsorted]);
    }
    copy();
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


}

async function selectionSort() {

    let curr_pos = 0; // find the position with the lowest current value 
    let temp = 0; // need it for the swap
    for (let i = 0; i < nTextBox.value - 1; ++i) {
        curr_pos = i;
        nVal[i][1] = sorting;
        await pause(1000);
        createCanvas(nTextBox.value);
        for (let j = curr_pos + 1; j < nTextBox.value; ++j) { // finds the lowest relative value in the array
            if (nVal[j][0] < nVal[curr_pos][0])
                 curr_pos = j;
        }
        
        //swap 
        temp = nVal[i];
        nVal[i] = nVal[curr_pos];
        nVal[curr_pos] = temp;

        nVal[curr_pos][1] = sorting;
        await pause(1000);
        createCanvas(nTextBox.value);
        


        nVal[i][1] = sorted;
        if (i != curr_pos) {
            nVal[curr_pos][1] = unsorted;
        }
        await pause(1000);
        createCanvas(nTextBox.value);
    }
    nVal[nTextBox.value - 1][1] = sorted;
    createCanvas(nTextBox.value);
    console.log(nVal);
    
}


async function insertionSort() {
    let val, j;
    nVal[0][1] = sorted;
    for (let i = 1; i < nTextBox.value; i++) {
        val = nVal[i]; // current value to sort
        val[1] = sorting; //nVal[i][1] = sorting;
        await pause(1000);
        createCanvas(nTextBox.value);
        j = i; // only loop through "sorted" portion
        while (j > 0 && val[0] < nVal[j-1][0]) {  // keep going through sorted portion until correct position is found
            nVal[j] = nVal[j-1]; // shift other values up
            nVal[j][1] = sorted;
            nVal[j-1] = val;
            j--;
            await pause(1000);
            createCanvas(nTextBox.value);
        }

        nVal[j][1] = sorted;
        await pause(1000);
        createCanvas(nTextBox.value);
    }
}

function pause(ms) {  // pause execution for a given duration in milliseconds
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, ms);
    })
}


function copy() {
    nValUnsorted = [];
    for (let i = 0; i < nVal.length; ++i) {
        nValUnsorted.push(nVal[i]);
    }
}
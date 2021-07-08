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
let sortSpeed = document.getElementById('sortSpeed');
let unsorted = '#fc90a9'//'#c9751a'
let sorted = '#c94260'
let sorting = '#83BCFF'
//let swapColor = 'red'


nSubmitButton.addEventListener('click', () => {  // generate graph when submit button is clicked
    generateNums(nTextBox.value);
    startSort();

});

function enableInput() {
    nSubmitButton.disabled = false;
    replayButton.disabled = false;
    nTextBox.disabled = false;
    sortSpeed.disabled = false;
}

function disableInput() {
    nSubmitButton.disabled = true;
    replayButton.disabled = true;
    nTextBox.disabled = true;
    sortSpeed.disabled = true;
}
replayButton.addEventListener('click', () => {
    nVal = [...nValUnsorted.map(arr => [...arr])];
    //console.log(nValUnsorted);
    startSort();
});


async function startSort() {
    createCanvas(nTextBox.value);
    disableInput();
    switch (sortType.value) {
        case 'Selection Sort': {
            await selectionSort();
            break;
        }
        case 'Insertion Sort': {
            await insertionSort();
            break;
        }
        default: {
            alert("Invalid sort type");
            break;
        }
    }
    enableInput();
}

function generateNums(size) {  // generates array of size ntextBox.value, populated with random numbers
    nVal = [];  // reset array
    nValUnsorted = [];
    for (let i = 0; i < size; ++i){
        let randVal = Math.floor((Math.random() * 0.55 * canvas.height) + (0.40 * canvas.height));
        nVal.push([randVal, unsorted]);
        nValUnsorted.push([randVal, unsorted]);
    }
    //copy();
}

// do drawing stuff based on given array and N value

function createCanvas(size) { 
    let barWidth = (canvas.width/size);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < size; ++i) {
        ctx.fillStyle = nVal[i][1];
        ctx.fillRect(i * barWidth, canvas.height - nVal[i][0], barWidth, nVal[i][0]); //x, y, width, height 
    }

    for (let i = 0; i < size; ++i) {
        ctx.fillStyle = 'white';
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
        await pause(sortSpeed.value);
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
        await pause(sortSpeed.value);
        createCanvas(nTextBox.value);
        


        nVal[i][1] = sorted;
        if (i != curr_pos) {
            nVal[curr_pos][1] = unsorted;
        }
        await pause(sortSpeed.value);
        createCanvas(nTextBox.value);
    }
    nVal[nTextBox.value - 1][1] = sorted;
    createCanvas(nTextBox.value);
    //console.log(nVal);
    return new Promise((resolve, reject) => {resolve('');})
}


async function insertionSort() {
    let val, j;
    nVal[0][1] = sorted;
    for (let i = 1; i < nTextBox.value; i++) {
        val = nVal[i]; // current value to sort
        val[1] = sorting; //nVal[i][1] = sorting;
        await pause(sortSpeed.value);
        createCanvas(nTextBox.value);
        j = i; // only loop through "sorted" portion
        while (j > 0 && val[0] < nVal[j-1][0]) {  // keep going through sorted portion until correct position is found
            nVal[j] = nVal[j-1]; // shift other values up
            nVal[j][1] = sorted;
            nVal[j-1] = val;
            j--;
            await pause(sortSpeed.value);
            createCanvas(nTextBox.value);
        }

        nVal[j][1] = sorted;
        await pause(sortSpeed.value);
        createCanvas(nTextBox.value);
    }
    return new Promise((resolve) => {resolve('');})
}

function pause(ms) {  // pause execution for a given duration in milliseconds
    return new Promise(resolve => {
        setTimeout(() => { resolve('') }, ms * 1000);
    })
}

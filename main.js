const zero = document.getElementById('zero');
const one = document.getElementById('one');
const two = document.getElementById('two');
const three = document.getElementById('three');
const four = document.getElementById('four');
const five = document.getElementById('five');
const six = document.getElementById('six');
const seven = document.getElementById('seven');
const eight = document.getElementById('eight');
const nine = document.getElementById('nine');
const sign = document.getElementById('sign');
const decimal = document.getElementById('decimal');
const plus = document.getElementById('plus');
const subtract = document.getElementById('subtract');
const multiply = document.getElementById('multiply');
const divide = document.getElementById('divide');
const equal = document.getElementById('equal');
const clearAll = document.getElementById('clearAll');
const clear = document.getElementById('clear');
const square = document.getElementById('square');
const rawDisplay = document.querySelector('.raw-display');
const display = document.querySelector('.display');
const factorial = document.getElementById('factorial'); 
const warning = document.querySelector('.warning');

const buttonArray = [zero, one, subtract, two, three, four, five, six, seven, eight, nine, sign, decimal, plus, factorial, square, multiply, divide, equal, clearAll, clear]

buttonArray.forEach(item => {
    item.addEventListener('click', () => {
        displayText(obj[item.id]);
    })
});

window.addEventListener('keydown', (e) => {
    const key = document.querySelector(`input[type][data-key="${e.key}"]`)
        displayText(obj[key.id]);
    

});


const obj = {
    zero: 0,
    one: 1,
    two: 2, 
    three: 3, 
    four: 4, 
    five: 5, 
    six: 6, 
    seven: 7, 
    eight: 8, 
    nine: 9, 
    sign: '+/-', 
    decimal: '.', 
    plus: '+', 
    subtract: '-', 
    multiply: 'x', 
    divide: '/', 
    equal: '=', 
    clearAll: 'AC', 
    clear: 'clear',
    square: 'square',
    factorial: '!'
    
}


function displayText(id) {
    console.log(id);
    switch(id) {
        case 'clear':
            display.textContent = display.textContent.slice(0, -1);
            break;
            case 'AC':
                display.textContent ='';
                rawDisplay.textContent = '';
                break;
        case '!':
            () => { 
                let n = Number(display.textContent)
                rawDisplay.textContent = `${display.textContent} ${id}`;
                display.textContent =  (n < 2 ? 1 : n * fac(n-1));
            }
            break;
        case 'x':
        case '-':
        case '/':
        case '+':
            if(display.textContent.length < 1) {
                warning.textContent = `You must have a number before chosing ${id}`;
                return;
            } else {
                rawDisplay.textContent = `${display.textContent} ${id}`;
                display.textContent ='';
                break;
            }
      
        case '=':
            rawDisplay.textContent += ' ' + display.textContent;
            display.textContent = doEquation(rawDisplay.textContent)
            break;
        default: 
            display.textContent += id;

    }

}
// if I receive a equation like 6+5*5+655+8/5, I will first need to split all of them, convert the operators into actual operations and then do a giant addition of the array. 



function doEquation(string) {
    let value;
    const equationArray = string.split(' ');
    const operators = {
        'x' :  Number(equationArray[0]) * Number(equationArray[2]),
        '/' :  Number(equationArray[0]) / Number(equationArray[2]),
        '-' :  Number(equationArray[0]) - Number(equationArray[2]),
        '+' :  Number(equationArray[0]) + Number(equationArray[2]),
    } 
    equationArray.map(el => {
        if(['x', '-', '+', '/'].includes(el)){    
            value = operators[`${el}`] 
        }
    });
    
    console.log(value)
    return value;


}


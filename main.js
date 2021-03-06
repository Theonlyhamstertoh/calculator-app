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
const rawDisplay = document.querySelector('.raw-display');
const display = document.querySelector('.display');
const warning = document.querySelector('.warning');

let solution = false;
const tempValue = [];

const buttonArray = [zero, one, subtract, two, three, four, five, six, seven, eight, nine, sign, decimal, plus, multiply, divide, equal, clearAll, clear]

buttonArray.forEach(item => {
    item.addEventListener('click', () => {
        displayText(obj[item.id]);
    })
});

window.addEventListener('keydown', (e) => {
    const key = document.querySelector(`input[type][data-key="${e.key}"]`)
    
    displayText(obj[key.id])
    

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
    divide: '÷', 
    equal: '=', 
    clearAll: 'AC', 
    clear: 'clear',
    
}

let positive = true;
function displayText(id) {
    let rawData = rawDisplay.textContent.toString().length;
    let bigData = display.textContent.toString().length;

    if(rawData < 60 && bigData < 10) {
        warning.textContent = '';
        switch(id) {
            case 'clear':
                if(display.textContent.length === 0) {
                    rawDisplay.textContent = rawDisplay.textContent.slice(0, -2)
                } else {
                    display.textContent = display.textContent.slice(0, -1);
                }
                break;
                case 'AC':
                    display.textContent ='';
                    rawDisplay.textContent = '';
                    break;
            case 'x':
            case '-':
            case '÷':
            case '+':
                if(display.textContent.toString().length > 14) {
                    display.textContent = Number(display.textContent).toExponential(2);
                }
    
    
                if(display.textContent.length < 1) {
                    warning.textContent = `please input a number`;
                    break;
                 } 
                // else if(display.textContent >)
                
                if(solution === true){
                    
             
                    rawDisplay.textContent = `${display.textContent} ${id} `;
                    display.textContent = ``
                    solution = false;
    
                } else {
                    
    
                    rawDisplay.textContent += `${display.textContent} ${id} `;
                    display.textContent ='';
    
    
                }
                console.log(rawDisplay.textContent)
                break;
                
          
            case '=': 
    
                if(bigData > 14) {
                    display.textContent = Number(display.textContent).toExponential(2);
                }
                //checks if there is operation at the end of the text to know if there really is a equation or not
                if(solution === true) {
                    break;
                } 
                let top = rawDisplay.textContent.split(' ')
                if(['x', '÷', '+', '-'].includes(top[top.length - 2])) {
                    rawDisplay.textContent += ' ' + display.textContent;
                    display.textContent = SplitEquation(rawDisplay.textContent)
                } else {
                    rawDisplay.textContent = display.textContent;
                
    
                } 
                solution = true;
                break;
            case '+/-':
                if(positive === true) {
                    display.textContent = '-' + display.textContent;
                    positive = false;
                } else if(positive === false) {
                    display.textContent = display.textContent.slice(1);
                    positive = true;
    
                }
                break;
                
    
            case '.': 
                if(display.textContent.includes('.') && solution === false) {
                    break;
                } else if(solution === true) {
                    solution = false;
                    display.textContent = `0${id}`;
                    break;
                } else {
                    if(display.textContent.length === 0) {
                        display.textContent = `0${id}`;
                        break;
                    } else {
                        display.textContent += id;
                        break;
    
                    }
                }
            default: 
                if(solution === true) {
                    display.textContent = id;
                    rawDisplay.textContent = ''
                    solution = false;
                } else {
                    display.textContent += id
                }
                break;
    
        }
    
    } else {
        warning.textContent = 'You have reached max length - delete a few values or clear to continue';

        switch(id) {
            case 'clear':
                if(display.textContent.length === 0) {
                    rawDisplay.textContent = rawDisplay.textContent.slice(0, -2)
                } else {
                    display.textContent = display.textContent.slice(0, -1);
                }
                break;
            case 'AC':
                    display.textContent ='';
                    rawDisplay.textContent = '';
                    break;
            case '=': 
    
                    if(bigData > 14) {
                        display.textContent = Number(display.textContent).toExponential(2);
                    }
                    //checks if there is operation at the end of the text to know if there really is a equation or not
                    if(solution === true) {
                        break;
                    } 
                    let top = rawDisplay.textContent.split(' ')
                    if(['x', '÷', '+', '-'].includes(top[top.length - 2])) {
                        rawDisplay.textContent += ' ' + display.textContent;
                        display.textContent = SplitEquation(rawDisplay.textContent)
                    } else {
                        rawDisplay.textContent = display.textContent;
                    
        
                    } 
                    solution = true;
                    break;
        }
            
        
    }

    console.log(id);

    
}
// the problem is that it is not resetting the value. If the first value is not a + - / *, then we should reset. 

const operators = {
            'x' : (a, b) => {return a * b} ,
            '÷' : (a, b) => {
                console.log(b)
                if(b === '0' ) {
                    warning.textContent = 'Division by zero is not possible!';
                    display.textContent = '';
                    rawDisplay.textContent = '';
                } else {
                    return a / b;
                } 
            },
            '-' : (a, b) => {
                console.log('test', a, '-', b)
                return Number(a) - Number(b)},
            '+' : (a, b) => {
                console.log('test', a, '+', b);
                return Number(a) + Number(b)},
        } 
    

function SplitEquation(string) {
    console.log('asdasdasdasdasdasd')
    console.log(string)
    const equationArray = string.split(' ').filter(el => el !== '');

    console.log(equationArray)
    // I want to have it keep on pushing until it reaches a + or - or end
    equationArray.filter((e, i) => {     
        let spliceCount = i;
        let deleteCount = 1;

        
        if(['x', '÷'].includes(e)) {
            while(spliceCount <= equationArray.length) {
                if( equationArray[spliceCount] !== undefined && !['+', '-'].includes(equationArray[spliceCount]) ) {
                    spliceCount++;
                    deleteCount++;
                } else {
                    this.splitedArray = equationArray.map(el => el).splice(i - 1, deleteCount);

                    if(this.splitedArray.length === 1) {
                        return this.splitedArray[0]; 
                    } else {
                        while(this.splitedArray.length !== 1) {
                            this.splitedArray.filter((e, i) => {
                                if(i > 1) {
                                    return equationArray;
                                } else if(['x','÷'].includes(e)) {
                             
                                    this.splitedArray.splice(i - 1, 3, operators[e](this.splitedArray[i - 1],this.splitedArray[i + 1]))
                                        
                                  
                                    
                                }
                                
                                
                            }, 0)
                            console.log(this.splitedArray)

                        }
                    }

                    equationArray.splice(i - 1, deleteCount, this.splitedArray[0])
                    break;
                }
                
            }   
        } 

        
    });

    if(!['x', '÷'].includes(equationArray)) {
        while(equationArray.length !== 1) {
            equationArray.map((e, i) => {
                if(i > 1) {
                    return;
                } else if(['-', '+'].includes(e)) {
                    console.log(equationArray)
                    console.log(i, e)
                    equationArray.splice(i - 1, 3, operators[e](equationArray[i-1], equationArray[i + 1]))
                    return equationArray;
                }  
            })
            
        }
        
    }
    
    console.log('asdasdasdasdasdas')
    if(equationArray[0].toString().length > 14) {
        equationArray[0] = equationArray[0].toExponential(2)
    }
    return equationArray;

}



//Variables
const display = document.getElementById("display");
const numberButtons = document.querySelectorAll(".number-button");
const operatorButtons = document.querySelectorAll(".operator-button");
const clearBtn = document.getElementById("clear");
const signChangerBtn = document.getElementById('plus-minus');
const equalsBtn = document.getElementById('equals');
let currentInput = "";
const decimalBtn = document.getElementById('decimal');
const calculatorBtn = document.getElementById('calculator-type');
const modal = document.getElementById('modal');
const extraFunctionsDiv = document.getElementById('extra-functions');
const roundDiv = document.getElementById('round');
const truncateDiv = document.getElementById('truncate');
const displayTokens = [
    {type: "number", value: '0'},
    {type: "operator", value: ''},
    {type: "number", value: null}
]

//Functions
const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => {return b === 0 ? 'Bruh fr, ÷ 0?😂' : a / b};
const mod = (a,b) => a % b;

function operate(operator,num1,num2){
    let answer;
    switch (operator){
        case "+":
            answer = add(num1,num2);
            break;
        case "-":
            answer = subtract(num1,num2);
            break;
        case "x":
            answer = multiply(num1,num2);
            break;
        case "*":
            answer = multiply(num1,num2);
            break;
        case "/":
            answer = divide(num1,num2);
            break;
        case "÷":
            answer = divide(num1,num2);
            break;
        case "%":
            answer = mod(num1,num2);
            break;
        default:
            return;
    }
    console.log(answer)
    return answer;
}

function clearAll(){
    display.textContent = '0';
    currentInput = '';
    const [firstInputObj, operatorObj, secondInputObj] = displayTokens;
    firstInputObj.value = '0';
    secondInputObj.value = null;
    operatorObj.value = '';
}

function backspace(){
    const [firstInputObj, operatorObj, secondInputObj] = displayTokens;
    if (!Number.isFinite(Number(firstInputObj.value))) return;
    if(!currentInput && !firstInputObj.value) return
    if(!currentInput && secondInputObj.value === null && operatorObj.value){
        operatorObj.value = '';
        currentInput = firstInputObj.value;
        return;
    }
    if(currentInput){
        currentInput = currentInput.slice(0,currentInput.length - 1);
        if(!operatorObj.value){
            firstInputObj.value = currentInput ? currentInput : '0';
            if(currentInput){
                firstInputObj.value = currentInput
            }
            else{
                firstInputObj.value = '0';
                toggleBackspaceSwitch();
            }
        }else{
            secondInputObj.value = currentInput ?  currentInput : null;
        }
    }
}

function changeSign(){
    const [firstInputObj, operatorObj, secondInputObj] = displayTokens;
    if(!Number.isFinite(Number(firstInputObj.value)) || display.textContent.trim() === '0' || (operatorObj.value && secondInputObj.value === null)) return;
    if(firstInputObj.value !== '0' && !operatorObj.value){
        firstInputObj.value = `${-Number(firstInputObj.value)}`
        return;
    }
    if(operatorObj.value && (secondInputObj.value !== null && secondInputObj.value !== '0')){
        secondInputObj.value = `${-Number(secondInputObj.value)}`
        return;
    }
}

function inputDigit(digit){
    const [firstInputObj, operatorObj, secondInputObj] = displayTokens;
    if (!Number.isFinite(Number(firstInputObj.value))) return;
    if(!currentInput && firstInputObj.value === '0') toggleBackspaceSwitch();
    if(!currentInput && operatorObj.value && clearBtn.innerHTML === 'AC') toggleBackspaceSwitch();
    if(digit === '.' && currentInput.includes('.')) return;
    if(digit === '.' && !currentInput) currentInput = '0';
    currentInput += digit;
    if(operatorObj.value){
        secondInputObj.value = currentInput
    }
    else{
        firstInputObj.value = currentInput
    }
}

function inputOperator(operator){
    const [firstInputObj, operatorObj, secondInputObj] = displayTokens;
    if (!Number.isFinite(Number(firstInputObj.value))) return;
    if(operatorObj.value && !secondInputObj.value) {
        operatorObj.value = operator; // replace operator
        return;
    }
    if(firstInputObj.value !== null && !operatorObj.value){
        currentInput = '';
        operatorObj.value = operator;
        return
    }
    if(firstInputObj.value !== null && operatorObj.value && secondInputObj.value !== null){
        const firstValue = firstInputObj.value.includes('.') ? parseFloat(firstInputObj.value) : Number(firstInputObj.value);
        const secondValue = secondInputObj.value.includes('.') ? parseFloat(secondInputObj.value) : Number(secondInputObj.value);
        firstInputObj.value = `${operate(operatorObj.value,firstValue,secondValue)}`;
        operatorObj.value = operator;
        secondInputObj.value = null;
        currentInput = '';
        return
    }
}

function render(){
    display.textContent = displayTokens.forEach((token,index) => console.log(`Value at index ${index} is ${token.value}`))
    display.textContent = displayTokens.map(token => {
        if(token.value === null || token.value === '') return '';
        if(token.value !== null && !isNaN(token.value) && `${token.value}`.includes('.')){
            const pointIndex = token.value.indexOf('.');
            const afterPoint = token.value.slice(pointIndex+1);
            if(afterPoint.length > 9){
                return parseFloat(token.value).toFixed(5);
            }
        }
        return token.value;
    }).join(' ');
}

function calculate(){
    const [firstInputObj, operatorObj, secondInputObj] = displayTokens;
    if (!Number.isFinite(Number(firstInputObj.value))) return;
    if(firstInputObj.value !== null && operatorObj.value && secondInputObj.value !== null){
        const firstValue = firstInputObj.value.includes('.') ? parseFloat(firstInputObj.value) : Number(firstInputObj.value);
        const secondValue = secondInputObj.value.includes('.') ? parseFloat(secondInputObj.value) : Number(secondInputObj.value);
        firstInputObj.value = `${operate(operatorObj.value,firstValue,secondValue)}`;
        secondInputObj.value = null;
        operatorObj.value = '';
        currentInput = '';
        toggleBackspaceSwitch();
    }
}

function handleDecimalInput(){
    const [firstInputObj] = displayTokens;
    if (!Number.isFinite(Number(firstInputObj.value))) return;
    if(display.textContent.trim() === '0'){
        currentInput = '0';
    }
    inputDigit('.');
}

function toggleBackspaceSwitch(){
    clearBtn.innerHTML = clearBtn.innerHTML.trim() === 'AC' ? `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id='backspace-icon'><title>backspace-outline</title><path d="M19,15.59L17.59,17L14,13.41L10.41,17L9,15.59L12.59,12L9,8.41L10.41,7L14,10.59L17.59,7L19,8.41L15.41,12L19,15.59M22,3A2,2 0 0,1 24,5V19A2,2 0 0,1 22,21H7C6.31,21 5.77,20.64 5.41,20.11L0,12L5.41,3.88C5.77,3.35 6.31,3 7,3H22M22,5H7L2.28,12L7,19H22V5Z" /></svg>` : 'AC';
}

function handleExtraFunctions(e){
    const [firstInputObj] = displayTokens;
    if (!Number.isFinite(Number(firstInputObj.value))) return;
    e.stopPropagation(); // Prevent the click from immediately closing the modal
    modal.classList.add('active');
}

function roundValue(){
    const [firstInputObj, , secondInputObj] = displayTokens;
    firstInputObj.value = `${Math.round(Number(firstInputObj.value))}`;
    if(secondInputObj.value === null) return;
    secondInputObj.value = `${Math.round(Number(secondInputObj.value))}`;
}

function truncateValue(){
    const [firstInputObj, , secondInputObj] = displayTokens;
    firstInputObj.value = `${Math.trunc(Number(firstInputObj.value))}`;
    if(secondInputObj.value === null) return;
    secondInputObj.value = `${Math.trunc(Number(secondInputObj.value))}`;
}

//Event Listeners
window.addEventListener('DOMContentLoaded',()=>{
    render();
})

numberButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        inputDigit(e.target.textContent);
        render();
    });
});

//fix this!!!!!!!!!!!!!!!!!!
decimalBtn.addEventListener("click", () => {
    handleDecimalInput();
    render();
});

operatorButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        inputOperator(e.target.textContent);
        render();
    });
});

equalsBtn.addEventListener('click', ()=>{
    calculate();
    render();
})

clearBtn.addEventListener("click", ()=>{
    clearBtn.innerHTML === 'AC' ? clearAll() : backspace();
    render();
});

signChangerBtn.addEventListener('click',()=>{
    changeSign();
    render();
});

calculatorBtn.addEventListener('click', (e) => {
    handleExtraFunctions(e);
});

modal.addEventListener('click', () => {
    modal.classList.remove('active');
});

roundDiv.addEventListener('click',()=>{
    roundValue();
    render();
})

truncateDiv.addEventListener('click',()=>{
    truncateValue();
    render();
})

document.addEventListener('keydown',(e)=>{
    if (/\d/.test(e.key)) {
        inputDigit(e.key);
    }

    if (["+", "-", "*", "/", "%"].includes(e.key)) {
        inputOperator(e.key);
    }

    if (e.key === "Enter") {
        calculate();
    }

    if (e.key === "Backspace") {
        backspace();
    }

    if(e.key === '.'){
        handleDecimalInput()
    }
    if(e.key === 'Escape'){
        clearAll();
    }
    render();
})


//Testing Block
/*const test = operate("+",1,2);
console.log(test);
console.log(operate("-",1,2));
console.log(operate("*",1,2));
console.log(operate("/",1,2));*/
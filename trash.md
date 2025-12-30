function enterDigits(e){
    const value = e.target.textContent;
    //display.textContent = '';
    if(currentNumber[currentNumber.length-1] === ')'){
        currentNumber = currentNumber.slice(0,currentNumber.length-1) + value + ')';
        display.textContent = display.textContent.slice(0,display.textContent.length-1) + value + ')';
    }
    else {
        currentNumber += value;
        display.textContent += value;
    }
    console.log(`Current number is : ${currentNumber}`)
}

function enterOperator(e){
    const value = e.target.textContent;
    if(operator) return;
    operator = value;
    display.textContent += operator;
    firstNumber = Number(currentNumber);
    currentNumber = '';
}


//Have to fix finding parenthesis logic for the changeSign function to make it air tight!
function changeSign(){
    const numberToChange = display.textContent;
    if(!/^[\d\)]$/.test(numberToChange[numberToChange.length-1])) return;
    if(/^\d+$/.test(numberToChange) || firstHalfRegex.test(numberToChange)){
        display.textContent = firstHalfRegex.test(numberToChange) ? `${-Number(numberToChange.replace(/[\(\)]/g,''))}` : `(${-Number(numberToChange)})`;
        currentNumber = display.textContent;
        return;
    }
    const signIndex = numberToChange.match(operatorsRegex).index;
    const firstHalf = numberToChange.slice(0,signIndex+2);
    const restOfDisplay = numberToChange.slice(signIndex+2);
    if(bracketsRegex.test(restOfDisplay)){
        currentNumber = `${-Number(restOfDisplay.slice(1,restOfDisplay.length-1))}`;
        display.textContent = firstHalf + currentNumber;
    }
    else{
        display.textContent = firstHalf + `(${-Number(restOfDisplay)})`
        currentNumber = display.textContent;
    }
}
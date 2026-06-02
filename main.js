const toggleBar = document.querySelector('.toggle-bar');
const toggleCircle = document.querySelector('.toggle-circle');
const body = document.body;

function getInitialTheme() {
    const savedTheme = localStorage.getItem('savedTheme');
    if (savedTheme) {
        return parseInt(savedTheme);
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (prefersDark) {
        return 1; 
    } else {
        return 2; 
    }
}

let currentTheme = getInitialTheme();

function applyTheme(themeNumber) {
    body.setAttribute('data-theme', themeNumber);

    if (themeNumber === 1) {
        toggleCircle.style.left = '5px';
    } else if (themeNumber === 2) {
        toggleCircle.style.left = 'calc(50% - 8px)'; 
    } else if (themeNumber === 3) {
        toggleCircle.style.left = 'calc(100% - 21px)';
    }
}

applyTheme(currentTheme);

toggleBar.addEventListener('click', () => {
    currentTheme++;
    if (currentTheme > 3) {
        currentTheme = 1;
    }

    applyTheme(currentTheme);
    localStorage.setItem('savedTheme', currentTheme); 
});

// calc javascript methods

const resultScreen = document.querySelector('.result-container');
const buttons = document.querySelectorAll('.components > div');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.innerText;
        handleCalculation(buttonText);
    });
});

let currentInput = "";
function handleCalculation(value) {
    if (value === 'RESET') {
        currentInput = "";
        resultScreen.innerText = "0";
    } else if (value === 'DEL') {
        currentInput = currentInput.slice(0, -1);
        resultScreen.innerText = currentInput || "0";
    } else if (value === '=') {
        try {
            let equation = currentInput.replace(/x/g, '*');
            // let result = eval(equation);
            let result = new Function(`return ${equation}`)();

            resultScreen.innerText = result;
            currentInput = result.toString();
        } catch (error) {
            resultScreen.innerText = "Error";
            currentInput = "";
        }
    } else {
        if (resultScreen.innerText === "0" && !isNaN(value)) {
            currentInput = value;
        } else {
            currentInput += value;
        }
        resultScreen.innerText = currentInput;
    }
}

// keybord semilator

window.addEventListener('keydown', (event) => {
    const key = event.key;

    if ((key >= '0' && key <= '9') || key === '+' || key === '-' || key === '/' || key === '.') {
        event.preventDefault();
        findAndClickButton(key);
    } else if (key === '*') {
        event.preventDefault();
        findAndClickButton('x');
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        findAndClickButton('=');
    } else if (key === 'Backspace') {
        event.preventDefault();
        findAndClickButton('DEL');
    } else if (key === 'Escape') {
        event.preventDefault();
        findAndClickButton('RESET');
    }
});

function findAndClickButton(textContentValue) {
    const allButtons = document.querySelectorAll('.components > div');
    allButtons.forEach(button => {
        if (button.textContent.trim() === textContentValue) {
            button.click();
        }
    });
}

import '../index.html';
import '../assets/styles/style.scss';
import variables from './variables';

const { setNumber, input, even, reset, moreLess, tryButton, counterElem } = variables;

let number = 0;
let counter = 0;

const renderNumber = () => {
    number = Math.floor(Math.random() * 100) + 1;
    console.log(number)

    if (number > 0) {
        setNumber.setAttribute('disabled', '');
        setNumber.innerHTML = 'Number was set';
        setNumber.style.color = 'red';
        setNumber.style.background = 'gray';
        tryButton.removeAttribute('disabled', '');
        input.removeAttribute('disabled', '');
        tryButton.style.background = 'transparent';
        tryButton.style.cursor = 'pointer';
        input.style.cursor = 'pointer';
    }
}

const equalNumbers = () => {
    if (input.value > number) {
        moreLess.innerHTML = 'Setted number is smaller than the entered number, try again!';
    } else if (input.value < number) {
        moreLess.innerHTML = 'Setted number is bigger than the entered number, try again!';
    }

    counter++;
    counterElem.innerHTML = `${counter} tries`;

    evenNumber();

    if (input.value == number) {
        const modalBack = document.createElement('div');
        modalBack.className = 'modal-back';
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `<div>Congrats! You guessed the number! <br/><br/> The number is ${number}! <br/><br/> It took you ${counter} tries! <br/><br/> <button class="close-btn">Close</button></button></div>`;
        document.body.append(modalBack);
        modalBack.prepend(modal);

        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-back')) {
                modal.remove();
                modalBack.remove();
                resetAll();
            }
        })
        document.querySelector('.close-btn').addEventListener('click', () => {
            modal.remove();
            modalBack.remove();
            resetAll();
        })
    }
}

const evenNumber = () => {
    if (counter == 3) {
        if (Number(number) % 2 === 0) {
            even.innerHTML = 'The number is even';
        } else {
            even.innerHTML = 'The number is odd'
        }
    }
}

const validate = () => {
    if (input.value < 1 || input.value > 100) {
        input.style.color = 'red';
    } else {
        input.style.color = 'black';
    }
}

const resetAll = () => {
    setNumber.removeAttribute('disabled', '');
    setNumber.innerHTML = 'Set number!';
    setNumber.style.color = 'White';
    tryButton.setAttribute('disabled', '');
    tryButton.style.background = 'gray';
    tryButton.style.cursor = 'not-allowed';
    number = 0;
    counter = 0;
    counterElem.innerHTML = `0 tries`;
    input.value = 0;
    even.innerHTML = '';
    moreLess.innerHTML = '';
    input.value = ''
    input.style.cursor = 'not-allowed';
}

setNumber.addEventListener('click', renderNumber);
tryButton.addEventListener('click', equalNumbers);
input.addEventListener('input', validate);
reset.addEventListener('click', resetAll);

document.addEventListener('DOMContentLoaded', () => {
    if (number === 0) {
        tryButton.setAttribute('disabled', '');
        input.setAttribute('disabled', '');
    }
})
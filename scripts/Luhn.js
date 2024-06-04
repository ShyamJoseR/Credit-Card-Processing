// Card Generator
document.getElementById('binNumber').addEventListener('input', updateSchemeIcon);
document.getElementById('generateCards').addEventListener('click', generateCards);

// function updateSchemeIcon() {
//     const binNumber = document.getElementById('binNumber').value;
//     const schemeIcon = document.getElementById('schemeIcon');
//     const numOfDigits = document.getElementById('numOfDigits');

//     if (binNumber[0] === '4') {
//         schemeIcon.src = 'https://www.svgrepo.com/show/328144/visa.svg';
//         numOfDigits.textContent = '16 Digits';
//     } else if (binNumber[0] === '2' || binNumber[0] === '5') {
//         schemeIcon.src = 'https://th.bing.com/th/id/OIP.zwF8PfS0ts5xahm20UapPAHaEc?rs=1&pid=ImgDetMain';
//         numOfDigits.textContent = '16 Digits';
//     } else {
//         schemeIcon.src = '';
//         numOfDigits.textContent = '';
//     }
// }

function updateSchemeIcon() {
    const binNumber = document.getElementById('binNumber').value;
    const schemeIcon = document.getElementById('schemeIcon');
    const numOfDigits = document.getElementById('numOfDigits');

    if (binNumber[0] === '4') {
        schemeIcon.src = 'https://www.svgrepo.com/show/328144/visa.svg';
        numOfDigits.textContent = '16 Digits';
    } else if (binNumber[0] === '2' || binNumber[0] === '5') {
        schemeIcon.src = 'https://th.bing.com/th/id/OIP.zwF8PfS0ts5xahm20UapPAHaEc?rs=1&pid=ImgDetMain';
        numOfDigits.textContent = '16 Digits';
    } else {
        schemeIcon.src = 'https://cdn-icons-png.flaticon.com/512/10616/10616584.png';
        numOfDigits.textContent = '';
    }
}

function generateCards() {
    const binNumber = document.getElementById('binNumber').value;
    const limit = parseInt(document.getElementById('limit').value);
    const displayArea = document.getElementById('displayArea');
    const numOfDigits = binNumber[0] === '4' || binNumber[0] === '2' || binNumber[0] === '5' ? 16 : 0;

    displayArea.value = '';

    for (let i = 0; i < limit; i++) {
        const cardNumber = generateCardNumber(binNumber, numOfDigits);
        displayArea.value += cardNumber + '\n';
    }
}

function generateCardNumber(binNumber, numOfDigits) {
    let cardNumber = binNumber;
    const remainingDigits = numOfDigits - binNumber.length - 1;

    for (let i = 0; i < remainingDigits; i++) {
        cardNumber += Math.floor(Math.random() * 10);
    }

    cardNumber += calculateLuhnCheckDigit(cardNumber);

    return cardNumber;
}

// Reference Number Generator
document.getElementById('transactionDate').addEventListener('input', updateFormattedDate);
document.getElementById('generateRefNumbers').addEventListener('click', generateRefNumbers);

function updateFormattedDate() {
    const transactionDate = document.getElementById('transactionDate').value;
    const formattedDate = document.getElementById('formattedDate');

    if (transactionDate) {
        const year = transactionDate.slice(2, 4);
        const month = transactionDate.slice(5, 7);
        const day = transactionDate.slice(8, 10);
        const yddd = year + (month + day).padStart(3, '0');
        formattedDate.textContent = yddd;
    } else {
        formattedDate.textContent = '';
    }
}

function generateRefNumbers() {
    const startsWith = document.getElementById('startsWith').value;
    const acquirerBin = document.getElementById('acquirerBin').value;
    const transactionDate = document.getElementById('transactionDate').value;
    const limit = parseInt(document.getElementById('refLimit').value);
    const refDisplayArea = document.getElementById('refDisplayArea');

    const year = transactionDate.slice(2, 4);
    const month = transactionDate.slice(5, 7);
    const day = transactionDate.slice(8, 10);
    const yddd = year + (month + day).padStart(3, '0');

    refDisplayArea.value = '';

    for (let i = 0; i < limit; i++) {
        const refNumber = generateRefNumber(startsWith, acquirerBin, yddd);
        refDisplayArea.value += refNumber + '\n';
    }
}

function generateRefNumber(startsWith, acquirerBin, yddd) {
    let refNumber = startsWith + acquirerBin + yddd;

    for (let i = 0; i < 11; i++) {
        refNumber += Math.floor(Math.random() * 10);
    }

    refNumber += calculateLuhnCheckDigit(refNumber);

    return refNumber;
}

// Check Digit Calculator
document.getElementById('cardNumber').addEventListener('input', validateCardNumber);
document.getElementById('refNumber').addEventListener('input', validateRefNumber);

function validateCardNumber() {
    const cardNumber = document.getElementById('cardNumber').value;
    const cardCheckDigit = document.getElementById('cardCheckDigit');
    const cardMessage = document.getElementById('cardMessage');

    if (cardNumber.includes('?')) {
        if (cardNumber.length >= 15 && cardNumber.length <= 19) {
            const calculatedCheckDigit = calculateLuhnCheckDigit(cardNumber.replace('?', '0'));
            cardCheckDigit.textContent = calculatedCheckDigit;
            cardMessage.innerHTML = `The valid card number is ${cardNumber.replace('?', calculatedCheckDigit)}`;
            cardMessage.className = 'valid-message';
        } else {
            cardCheckDigit.textContent = '';
            cardMessage.textContent = '';
        }
    } else {
        if (cardNumber.length >= 15 && cardNumber.length <= 19) {
            if (validateLuhn(cardNumber)) {
                cardMessage.textContent = 'The entered card number is valid';
                cardMessage.className = 'valid-message';
            } else {
                cardMessage.textContent = 'The entered card number is invalid';
                cardMessage.className = 'invalid-message';
            }
        } else {
            cardMessage.textContent = '';
        }
    }
}

function validateRefNumber() {
    const refNumber = document.getElementById('refNumber').value;
    const refCheckDigit = document.getElementById('refCheckDigit');
    const refMessage = document.getElementById('refMessage');

    if (refNumber.includes('?')) {
        if (refNumber.length === 23) {
            const calculatedCheckDigit = calculateLuhnCheckDigit(refNumber.replace('?', '0'));
            refCheckDigit.textContent = calculatedCheckDigit;
            refMessage.innerHTML = `The valid number is ${refNumber.replace('?', calculatedCheckDigit)}`;
            refMessage.className = 'valid-message';
        } else {
            refCheckDigit.textContent = '';
            refMessage.textContent = '';
        }
    } else {
        if (refNumber.length === 23) {
            if (validateLuhn(refNumber)) {
                refMessage.textContent = 'The entered number is valid';
                refMessage.className = 'valid-message';
            } else {
                refMessage.textContent = 'The entered number is invalid';
                refMessage.className = 'invalid-message';
            }
        } else {
            refMessage.textContent = '';
        }
    }
}

// Luhn's Algorithm
function calculateLuhnCheckDigit(number) {
    let sum = 0;
    let isEvenIndex = false;

    for (let i = number.length - 1; i >= 0; i--) {
        let digit = parseInt(number[i]);

        if (isEvenIndex) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        isEvenIndex = !isEvenIndex;
    }

    const checkDigit = (10 - (sum % 10)) % 10;
    return checkDigit.toString();
}

function validateLuhn(number) {
    let sum = 0;
    let isEvenIndex = false;

    for (let i = number.length - 1; i >= 0; i--) {
        let digit = parseInt(number[i]);

        if (isEvenIndex) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        isEvenIndex = !isEvenIndex;
    }

    return sum % 10 === 0;
}
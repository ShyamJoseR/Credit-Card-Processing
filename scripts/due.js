document.addEventListener('DOMContentLoaded', function () {
    const currentBalanceInput = document.getElementById('currentBalance');
    const pastDueInput = document.getElementById('pastDue');
    const minAmountDuePercentageInput = document.getElementById('minAmountDuePercentage');
    const currencyDecimalPlacesSelect = document.getElementById('currencyDecimalPlaces');
    const calculateButton = document.getElementById('calculate');
    const minAmountDueOutput = document.getElementById('minAmountDue');
    const totalAmountDueOutput = document.getElementById('totalAmountDue');
    
    const currentBalanceError = document.getElementById('currentBalanceError');
    const pastDueError = document.getElementById('pastDueError');

    function validateCurrencyInput(inputElement, errorElement) {
        const value = inputElement.value.trim();
        if (/^\$?\d+(\.\d{1,2})?$/.test(value)) {
            errorElement.style.display = 'none';
            return parseFloat(value.replace('$', ''));
        } else {
            errorElement.innerText = 'Please enter a valid number with up to 2 decimal places.';
            errorElement.style.display = 'block';
            return NaN;
        }
    }

    function validatePercentageInput(inputElement) {
        const value = inputElement.value.trim();
        if (/^\d+(\.\d{1,7})?\%?$/.test(value)) {
            return parseFloat(value.replace('%', '')) / 100;
        } else {
            return NaN;
        }
    }

    function formatCurrency(value, decimalPlaces) {
        return `$${value.toFixed(decimalPlaces)}`;
    }

    calculateButton.addEventListener('click', function () {
        const currentBalance = validateCurrencyInput(currentBalanceInput, currentBalanceError);
        const pastDue = validateCurrencyInput(pastDueInput, pastDueError);
        const minAmountDuePercentage = validatePercentageInput(minAmountDuePercentageInput);
        const currencyDecimalPlaces = parseInt(currencyDecimalPlacesSelect.value, 10);

        if (!isNaN(currentBalance) && !isNaN(pastDue) && !isNaN(minAmountDuePercentage)) {
            const minAmountDue = currentBalance * minAmountDuePercentage;
            const totalAmountDue = pastDue + minAmountDue;
            minAmountDueOutput.value = formatCurrency(minAmountDue, currencyDecimalPlaces);
            totalAmountDueOutput.value = formatCurrency(totalAmountDue, currencyDecimalPlaces);
        } else {
            alert('Please provide valid input values.');
        }
    });
});

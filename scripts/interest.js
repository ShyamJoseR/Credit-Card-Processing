let debitTransactions = [];
let creditTransactions = [];

function formatCurrencyInput(value) {
    return `$${parseFloat(value.replace(/[^\d.-]/g, '')).toFixed(2)}`;
}

function formatPercentageInput(value) {
    return `${parseFloat(value.replace(/[^\d.-]/g, '')).toFixed(7)}%`;
}

function calculateInterest(amount, days, rate) {
    return parseFloat((amount * rate * days).toFixed(2));
}

document.getElementById('interestStartDebit').addEventListener('change', function () {
    document.getElementById('debitDateLabel').innerText = this.value === 'From Transaction Date' ? 'Transaction Date:' : 'Posting Date:';
});

document.getElementById('interestStartCredit').addEventListener('change', function () {
    document.getElementById('creditDateLabel').innerText = this.value === 'From Transaction Date' ? 'Transaction Date:' : 'Posting Date:';
});

document.getElementById('addDebitTransaction').addEventListener('click', function () {
    const amount = formatCurrencyInput(document.getElementById('debitAmount').value);
    const date = document.getElementById('debitDate').value;
    const rate = parseFloat(document.getElementById('interestRate').value.replace(/[^\d.-]/g, '')) / 100;
    const accruedDate = new Date(document.getElementById('accruedThroughDate').value);
    const transactionDate = new Date(date);
    const days = Math.ceil((accruedDate - transactionDate) / (1000 * 60 * 60 * 24));
    const interest = calculateInterest(parseFloat(amount.replace(/[^\d.-]/g, '')), days, rate);

    debitTransactions.push({ amount, date, interest });
    renderTable('debitTable', debitTransactions);
});

document.getElementById('addCreditTransaction').addEventListener('click', function () {
    const amount = formatCurrencyInput(document.getElementById('creditAmount').value);
    const date = document.getElementById('creditDate').value;
    const rate = parseFloat(document.getElementById('interestRate').value.replace(/[^\d.-]/g, '')) / 100;
    const accruedDate = new Date(document.getElementById('accruedThroughDate').value);
    const transactionDate = new Date(date);
    const days = Math.ceil((accruedDate - transactionDate) / (1000 * 60 * 60 * 24));
    const interest = calculateInterest(parseFloat(amount.replace(/[^\d.-]/g, '')), days, rate);

    creditTransactions.push({ amount, date, interest });
    renderTable('creditTable', creditTransactions);
});

function renderTable(tableId, transactions) {
    const tableBody = document.getElementById(tableId).querySelector('tbody');
    tableBody.innerHTML = '';
    transactions.forEach((transaction, index) => {
        const row = tableBody.insertRow();
        row.insertCell(0).innerText = index + 1;
        row.insertCell(1).innerText = transaction.amount;
        row.insertCell(2).innerText = transaction.date;
        row.insertCell(3).innerText = `$${transaction.interest.toFixed(2)}`;
    });
}

document.getElementById('calculateInterest').addEventListener('click', function () {
    const debitInterest = debitTransactions.reduce((sum, t) => sum + t.interest, 0);
    const creditInterest = creditTransactions.reduce((sum, t) => sum + t.interest, 0);
    const totalInterest = debitInterest - creditInterest;
    document.getElementById('interestResult').innerText = `Interest: $${totalInterest.toFixed(2)}`;
});

document.getElementById('calculateMinDue').addEventListener('click', function () {
    const interestText = document.getElementById('interestResult').innerText;
    const interest = parseFloat(interestText.replace(/[^0-9.-]+/g, ""));
    const minDue = interest * 10;
    document.getElementById('minDueResult').innerText = `Minimum Amount Due: $${minDue.toFixed(2)}`;
});

document.addEventListener('DOMContentLoaded', function () {
const box1Inputs = document.querySelectorAll('#yearBase, #interestStartDebit, #interestStartCredit, #interestRate, #accruedThroughDate');
const buttons = document.querySelectorAll('#addDebitTransaction, #addCreditTransaction, #calculateInterest, #calculateMinDue');

function validateBox1Inputs() {
    for (let input of box1Inputs) {
        if (input.value.trim() === '' || (input.id === 'interestRate' && !/^\d+(\.\d{1,7})?\%?$/.test(input.value))) {
            return false;
        }
    }
    return true;
}

function toggleButtons() {
    const allValid = validateBox1Inputs();
    for (let button of buttons) {
        button.disabled = !allValid;
    }
}

for (let input of box1Inputs) {
    input.addEventListener('input', toggleButtons);
    input.addEventListener('change', toggleButtons);
}

toggleButtons(); // Initial validation check
});
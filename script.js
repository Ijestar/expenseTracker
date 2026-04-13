function openExpenseForm() {
    document.getElementById("expenseForm").style.display = "flex";
}

function openIncomeForm() {
    document.getElementById("incomeForm").style.display = "flex";
}


function closeForm() {
    document.getElementById("expenseForm").style.display = "none";
    document.getElementById("incomeForm").style.display = "none";

    document.getElementById(`eform`).reset();
    document.getElementById(`iform`).reset();
}

let monthlyExpense = 1050;
let monthlyIncome = 8050;
let monthlyBalance = 7000;

const transactions = [
{
    id: 1,
    date: "2026-03-04",
    category: "Food",
    description: "Dinner with friends",
    amount: 300,
},

{
    id: 2,
    date: "2026-03-03",
    category: "Transportatiom",
    description: "Transport",
    amount: 150,
},

{
    id: 3,
    date: "2026-03-02",
    category: "Entertainment",
    description: "Movie ticket",
    amount: 200,
},

{
    id: 4,
    date: "2026-03-01",
    category: "Housing",
    description: "Rent",
    amount: 400,
}
];

function getExpense(){
   const expense = parseFloat (document.getElementById("expenseAmount").value);
   const category = document.getElementById("expenseCategory").value;
   const date =  document.getElementById("expenseDate").value;
   const description =  document.getElementById("expenseDescription").value;

   if(!expense || !category || !date){
    alert("Fill up your expense details")
    return;
   }

   monthlyExpense += expense;
   monthlyBalance -= expense;

   document.getElementById('monthlyBalance').textContent = `$${monthlyBalance.toLocaleString()}.00`;
   document.getElementById('monthlyExpense').textContent = `$${monthlyExpense.toLocaleString()}.00`;
   document.getElementById('expenseStats').textContent = `Monthly Expenses $${monthlyExpense.toLocaleString()}.00`;

   //appendToTransaction();

   const newTransaction = {
    id: transactions.length +1,
    date: date,
    category: category,
    description: description,
    amount: expense,
   }

   transactions.unshift(newTransaction);

   appendTransactionToTable();

   function calculateExpensePercentage(monthlyExpense){
    const initialMonthlyExpense = 1050;
    let expensePercentage = eval(100*(monthlyExpense-initialMonthlyExpense)/initialMonthlyExpense);
    document.getElementById('expensePercentage').textContent = parseInt(expensePercentage);
}
calculateExpensePercentage(monthlyExpense);
   closeForm();
}


function getIncome(){
   const income = parseFloat (document.getElementById("incomeAmount").value);
   const category = document.getElementById("incomeCategory").value;
   const date =  document.getElementById("incomeDate").value;
   const description =  document.getElementById("incomeDescription").value;

   if(!income || !category || !date){
    alert("Fill up your income details")
    return;
   }

   monthlyIncome += income;
   monthlyBalance += income;

   document.getElementById('monthlyBalance').textContent = `$${monthlyBalance.toLocaleString()}.00`;
   document.getElementById('monthlyIncome').textContent = `$${monthlyIncome.toLocaleString()}.00`;
   document.getElementById('incomeStats').textContent = `Monthly Income $${monthlyIncome.toLocaleString()}.00`;

   //appendToTransaction();

   const newTransaction = {
    id: transactions.length +1,
    date: date,
    category: category,
    description: description,
    amount: income,
   }

   transactions.unshift(newTransaction);
   appendTransactionToTable();

   function calculateIncomePercentage(monthlyIncome){
    const initialMonthlyIncome = 8050;
    let incomePercentage = eval(100*(monthlyIncome-initialMonthlyIncome)/initialMonthlyIncome);
    document.getElementById('incomePercentage').textContent = parseInt(incomePercentage);
    }
    calculateIncomePercentage(monthlyIncome);
   closeForm();
}


function appendTransactionToTable(){
    const tableBody = document.getElementById('transactionTableBody');
    tableBody.innerHTML='';

    const recentTransactions = transactions.slice(0,10);

    recentTransactions.forEach((transaction) =>{
        const row = document.createElement('tr');

        row.innerHTML = `
            <td> ${transaction.date}</td>
            <td> ${transaction.category}</td>
            <td> ${transaction.description}</td>
            <td> $${transaction.amount}</td>
            <td>...</td>
        `;
        tableBody.appendChild(row);
    })
}

const body = document.getElementById('body');

const themes = {
    light: {
        bg: "#f5f7fb",
        text: "#0f2f69"
    },
    dark: {
        bg: "#000000",
        text: "#f5f7fb",
    }
};

function applyTheme(mode) {
    body.style.backgroundColor = themes[mode].bg;
    document.getElementById('sTitle').style.color = themes[mode].text;
    document.getElementById('sParagraph').style.color = themes[mode].text;
    document.getElementById('greeting').style.color = themes[mode].text;

    localStorage.setItem('theme', mode);
}

const savedMode = localStorage.getItem('theme') || 'light';
applyTheme(savedMode);

function onDarkMode() {
    const currentMode = localStorage.getItem('theme') || 'light';
    const nextMode = (currentMode === 'light') ? 'dark' : 'light';

    applyTheme(nextMode);
}
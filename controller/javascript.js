const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

let currentUser = null;
let balance = 100000;
const maxLoginAttempts = 3;
let loginAttempts = 0;
const transactions = [];

const loginForm = document.getElementById('login-form');
const mainMenu = document.getElementById('main-menu');
const registerForm = document.getElementById('register-form');
const userUsername = document.getElementById('user-username');
const checkBalanceBtn = document.getElementById('check-balance');
const withdrawBtn = document.getElementById('withdraw');
const transferBtn = document.getElementById('transfer');
const depositBtn = document.getElementById('deposit');
const showTransactionsBtn = document.getElementById('show-transactions');
const logoutBtn = document.getElementById('logout');


function showLoginForm() {
    loginForm.style.display = 'block';
    mainMenu.style.display = 'none';
    registerForm.style.display = 'none';
}

function showMainMenu() {
    loginForm.style.display = 'none';
    mainMenu.style.display = 'block';
    registerForm.style.display = 'none';
    userUsername.textContent = currentUser.username;
}


document.getElementById('login').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    
    if (username === 'user@gmail.com' && password === '123456789') {
        currentUser = { username };
        loginAttempts = 0;
        showMainMenu();
    } else {
        loginAttempts++;
        if (loginAttempts >= maxLoginAttempts) {
            alert('Has alcanzado el número máximo de intentos de inicio de sesión.');
            showLoginForm();
        } else {
            aler('Intento no valido. Intento ' + loginAttempts + ' de ' + maxLoginAttempts);
        }
    }
});


document.getElementById('logout').addEventListener('click', function () {
    currentUser = null;
    showLoginForm();
});

checkBalanceBtn.addEventListener('click', function () {
    alert('Saldo actual: ' + balance);
});

withdrawBtn.addEventListener('click', function () {
    const amount = parseFloat(prompt('Ingrese la cantidad a retirar:'));
    if (amount >= 10000 && balance >= amount) {
        balance -= amount;
        transactions.push({ type: 'Retiro', amount });
        alert('Retiro exitoso. Saldo actual: ' + balance);
    } else {
        alert('Retiro no válido.');
    }
});

transferBtn.addEventListener('click', function () {
    const username = prompt('Ingrese el nombre de usuario del destinatario:');
    const amount = parseFloat(prompt('Ingrese la cantidad a transferir:'));

    if (currentUser.username === username) {
        alert('No puedes transferir dinero a tu propia cuenta.');
    } else {

        if (amount >= 10000 && balance >= amount) {
            balance -= amount;
            transactions.push({ type: 'Transferencia a ' + username, amount });
            alert('Transferencia exitosa. Saldo actual: ' + balance);
        } else {
            alert('Transferencia no válida.');
        }
    }
});

depositBtn.addEventListener('click', function () {
    const amount = parseFloat(prompt('Ingrese la cantidad a consignar:'));
    if (amount >= 10000) {
        balance += amount;
        transactions.push({ type: 'Depósito', amount });
        alert('Depósito exitoso. Saldo actual: ' + balance);
    } else {
        alert('El depósito mínimo es de 10000.');
    }
});

showTransactionsBtn.addEventListener('click', function () {
    let transactionHistory = 'Historial de transacciones:\n';
    transactions.forEach(transaction => {
        transactionHistory += transaction.type + ': ' + transaction.amount + '\n';
    });
    alert(transactionHistory);
});

showLoginForm();
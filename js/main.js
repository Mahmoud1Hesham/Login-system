// Global variables
var nameInput = document.querySelector('#name-input');
var emailInput = document.querySelector('#email-input');
var passInput = document.querySelector('#password-input');
var signUpBtn = document.querySelector('#sign-up');
// var loginNameInput = document.querySelector('#logNameInput');
// var loginPassInput = document.querySelector('#logPassInput');
var usersArr = JSON.parse(localStorage.getItem('usersArr')) || [];
var isValid = true;


// Regestration Page ...

signUpBtn.addEventListener('click', function() {
    addUser();
});

function addUser() {
    isValid = true; // Reset isValid for each addUser call
    var nameValue = nameInput.value.trim();
    var emailValue = emailInput.value.trim();
    var passValue = passInput.value.trim();
    var isCurrentUser = false;

    // Name validation
    validateName(nameValue);

    // Email validation
    validateEmail(emailValue);
    
    // Password validation
    validatePassword(passValue);

    if (isValid) {
        var user = {
            name: nameValue,
            email: emailValue,
            password: passValue,
            islogedin : isCurrentUser
        };
        usersArr.push(user);
        localStorage.setItem('usersArr', JSON.stringify(usersArr));
        console.log(usersArr);
        // Clear the input fields after successful sign-up
        clear();
        alert('User successfully added!');
        open('index.html');
    }
}

function clear() {
    nameInput.value = '';
    emailInput.value = '';
    passInput.value = '';
}

function validateName(name) {
    if (name.length < 3 || /[^a-zA-Z\s]/.test(name)) {
        document.querySelector('#name-error').textContent = "Name must be at least 3 characters long and contain no symbols or dots.";
        isValid = false;
    } else {
        document.querySelector('#name-error').textContent = "";
    }
}

function validateEmail(email) {
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    var emailError = "";

    if (isEmailRegistered(email)) {
        emailError = "Email is already registered.";
        isValid = false;
    }

    if (!emailPattern.test(email)) {
        emailError = "Please enter a valid email address.";
        isValid = false;
    }

    document.querySelector('#email-error').textContent = emailError;
}

function validatePassword(pass) {
    if (pass.length < 5 || pass.length > 10) {
        document.querySelector('#password-error').textContent = "Password must be between 5 and 10 characters long.";
        isValid = false;
    } else {
        document.querySelector('#password-error').textContent = "";
    }
}

function isEmailRegistered(email) {
    for (var i = 0; i < usersArr.length; i++) {
        if (usersArr[i].email === email) {
            return true;
        }
    }
    return false;
}


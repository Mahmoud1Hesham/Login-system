var loginNameInput = document.querySelector('#logNameInput');
var loginPassInput = document.querySelector('#logPassInput');
var signinBtn =document.querySelector('#loginBtn');
var usersArr = JSON.parse(localStorage.getItem('usersArr')) || [];


for(var i = 0; i< usersArr.length; i++){
    usersArr[i].islogedin = false;
}


// Login Page ...
signinBtn.addEventListener('click',function(){
login();
})
// Login function using a simple loop
function login() {
    console.log('clicked');
    var emailValue = loginNameInput.value.trim();
    var passValue = loginPassInput.value.trim();
    var emailError = "";
    var passError = "";
    var user = null; // Initial value for the found user

    // Loop through the usersArr to find the matching user
    for (var i = 0; i < usersArr.length; i++) {
        if (usersArr[i].email === emailValue && usersArr[i].password === passValue) {
            user = usersArr[i];
            break;
        }
    }

    if (!user) {
        if (!isEmailRegistered(emailValue)) {
            emailError = "Email not registered.";
        } else {
            passError = "Incorrect password.";
        }
        document.querySelector('#login-email-error').textContent = emailError;
        document.querySelector('#login-pass-error').textContent = passError;
    } else {
        alert('Login successful!');
        user.islogedin = true;
        localStorage.setItem('usersArr', JSON.stringify(usersArr));
        open('home.html');
    console.log('login done ...');
    console.log(user);
    }
}

function isEmailRegistered(email) {
    for (var i = 0; i < usersArr.length; i++) {
        if (usersArr[i].email === email) {
            return true;
            console.log('ture');
        }
    }
    return false;
    console.log('false');
}

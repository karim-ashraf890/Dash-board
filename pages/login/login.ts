import { isEmail, removeError, showError } from '../../helpers/helper';
import '../../global.scss';
import './login.scss';
import axios from "axios";


let errors: { email: string[]; password: string[] } = {
    email: [],
    password: [],
};

let emailSignIn = document.getElementById("signIn") as HTMLInputElement;

emailSignIn.addEventListener("keyup", addAndRemoveErrorEmail);
emailSignIn.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Enter") {
        logInUser()
    }
});

function addAndRemoveErrorEmail() {
    errors.email = [];
    let emailValue = emailSignIn.value;
    if (isEmail(emailValue)) {
        removeError("signIn");
    } else {
        if (emailValue != '')
            errors.email.push("Wrong email");
    }

    if (emailValue == '') {
        errors.email.push("Must enter this field");
    }

    if (errors.email.length > 0) {
        showError("signIn", errors.email);
    };
    updateButton();
};

let Password = document.getElementById("Password") as HTMLInputElement;

Password.addEventListener("keyup", addAndRemoveErrorPassword);
Password.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Enter") {
        logInUser()
    }
});

function addAndRemoveErrorPassword() {
    errors.password = [];
    let PasswordValue = Password.value;
    if (PasswordValue.length >= 5) {
        removeError("Password")
    } else {
        if (PasswordValue.length !== 0)
            errors.password.push("Password should be more than 5 length");
    }

    if (PasswordValue.length == 0) {
        errors.password.push("Password should be more than 5 length");
        errors.password.push("Must enter this field");
    }

    if (errors.password.length > 0) {
        showError("Password", errors.password);
    };
    updateButton();
};

const loginButton = document.getElementById("login") as HTMLButtonElement;

function updateButton() {
    const containsErrors = errors.email.length > 0 || errors.password.length > 0;
    const noErrors = emailSignIn.value !== "" && Password.value !== "";

    if (containsErrors || !noErrors) {
        loginButton.disabled = true;
    } else {
        loginButton.disabled = false;
    }
};

loginButton.addEventListener("click", logInUser)
function logInUser() {
    axios.post('http://127.0.0.1:9696/authentication/dashboard_login', {
        email: "ash@trainee-mart.com",
        password: "12345678"
    })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });
}










import { isEmail, removeError, showError } from '../../helpers/helper';
import '../../global.scss';
import './login.scss';


let emailSignIn = document.getElementById("signIn") as HTMLInputElement;
emailSignIn.addEventListener("keyup", addAndRemoveErrorEmail);
function addAndRemoveErrorEmail() {
    let emailValue = emailSignIn.value;
    let messages: string[] = [];
    if (isEmail(emailValue)) {
        removeError("signIn")
    } else {
        if (emailValue != '')
            messages.push("Wrong email");
    }

    if (emailValue == '') {
        messages.push("Must enter this field");
    }

    if (messages.length > 0) {
        showError("signIn", messages);
    }
};
let Password = document.getElementById("Password") as HTMLInputElement;
Password.addEventListener("keyup", addAndRemoveErrorPassword);
function addAndRemoveErrorPassword() {
    let PasswordValue = Password.value;
    let messages: string[] = [];
    if (PasswordValue.length >= 5) {
        removeError("Password")
    } else {
        if (PasswordValue.length !== 0)
            messages.push("Password should be more than 5 length");
    }

    if (PasswordValue.length == 0) {
        messages.push("Password should be more than 5 length");
        messages.push("Must enter this field");

    }

    if (messages.length > 0) {
        showError("Password", messages);
    }
}









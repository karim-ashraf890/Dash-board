import { isEmail, removeError, showError } from '../../helpers/helper';
import '../../global.scss';
import './login.scss';


let emailSignIn = document.getElementById("signIn") as HTMLInputElement;
emailSignIn.addEventListener("keydown", addAndRemoveError);
function addAndRemoveError() {
    let emailValue = emailSignIn.value;
    if (isEmail(emailValue)) {
        removeError("signIn")
    } else {
        removeError("signIn");
        showError("signIn", ["Wrong email"]);
    }
}









export function showError(id: string, messages: string[]) {
    let input = document.getElementById(id);
    input.classList.add('inputerror');
    const errorMessage = document.createElement('div');
    errorMessage.classList.add("messageerror");
    errorMessage.id = "messageerror" + id;
    errorMessage.textContent = "" + messages;
    input.insertAdjacentElement('afterend', errorMessage);
};

export function removeError(id: string) {
    let input = document.getElementById(id);
    input.classList.remove('inputerror');
    let errorMessage = document.getElementById("messageerror" + id);
    if (errorMessage != null) {
        errorMessage.remove();
    }
};

export function isEmail(s: string): boolean {
    const re = /^[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/;
    return re.test(s.trim());
}
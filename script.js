const username = document.querySelector('.username');
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const passwordConf = document.querySelector('.password-confirm');
const form = document.querySelector('.form');

function getInput(input){
    const inp = input.value;
    return inp;
}

function showError(input, message){
    const formControl = input.parentElement;
    formControl.classList.add('error');
    const small = formControl.querySelector('small');
    small.innerText = message;
    input.style.border = "1px solid red";
}

function showSucces(input){
    const formControl = input.parentElement;
    formControl.classList.remove('error');
    input.style.border = "1px solid #22c1c3";
}

function checkEmail(email){
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(email.value)){
        showSucces(email);
    } else {
        showError(email, 'Email is not valid');
    }
}

function checkRequired(inputArr) {
    inputArr.forEach((input)=>{
        if(input.value === '') {
            showError(input, `${input.dataset.name} is Required`);
        }
        else {
            showSucces(input);
        }
    });
}

function checkLength(input, min, max){
    if(input.value.length < min){
        showError(input, `${input.dataset.name} must be at least ${min} characters`);
    } else if(input.value.length > max){
        showError(input, `${input.dataset.name} must be less than ${max} characters`);
    } else {
        showSucces(input);
    }
}

function checkPassword(pass1, pass2){
    if(pass1.value !== pass2.value) {
        showError(pass2, 'Passwords do not match');
    }
}

form.addEventListener('submit', function(e){
    e.preventDefault();
    checkRequired([username, email, password, passwordConf]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 30);
    checkEmail(email);
    checkPassword(password, passwordConf);
});

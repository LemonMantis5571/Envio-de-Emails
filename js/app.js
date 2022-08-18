const SendBTN = document.querySelector('#enviar');
const ResetBTN = document.querySelector('#resetBtn');
const form = document.querySelector('#enviar-mail');

const email = document.querySelector('#email');
const issue = document.querySelector('#asunto');
const message = document.querySelector('#mensaje');

const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

LoadEvents();
function LoadEvents() {
    document.addEventListener('DOMContentLoaded', StartAPP);

    email.addEventListener('blur', ValidateForm);
    issue.addEventListener('blur', ValidateForm);
    message.addEventListener('blur', ValidateForm);

    ResetBTN.addEventListener('click', FormReset);

    form.addEventListener('submit', SendEmail);
}

function StartAPP(e) {
    e.preventDefault();
    SendBTN.disabled = true;
    SendBTN.classList.add('cursor-not-allowed', 'opacity-50');
}

function ValidateForm(e){
    e.preventDefault();
    if (e.target.value.length > 0){
        
        const removeerror = document.querySelector('p.error');

        if(removeerror){
            removeerror.remove();
        }


        e.target.classList.remove('border', 'border-red-500');
        e.target.classList.add('border', 'border-green-500');

    }

    else{
        e.target.classList.remove('border', 'border-green-500');
        e.target.classList.add('border', 'border-red-500');
        ShowError('You cannot leave it blank');
        
    }

    if(e.target.type === 'email'){
        if(email.value.match(validRegex)){
            const removeerror = document.querySelector('p.error');
            if(removeerror){
                removeerror.remove();
            }
     
            e.target.classList.remove('border', 'border-red-500');
            e.target.classList.add('border', 'border-green-500');
            
        }

        else{
            e.target.classList.remove('border', 'border-green-500');
            e.target.classList.add('border', 'border-red-500');
            ShowError('You need to insert a valid Email');
        }
    }

    if (email.value.match(validRegex) && issue.value != '' && message.value != ''){
        SendBTN.disabled = false;
        SendBTN.classList.remove('cursor-not-allowed', 'opacity-50');
    }

    else{
        console.log("You did not");
    }
}

function ShowError(message) {
    const ErrorMessage = document.createElement('p');
    ErrorMessage.textContent = message;
    ErrorMessage.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errors = document.querySelectorAll('.error');
    if(errors.length === 0){
        form.appendChild(ErrorMessage);
    }


}

function SendEmail(e){
    e.preventDefault();
    
    const spinner = document.querySelector('#spinner');
    spinner.style.display= 'flex';
    
    setTimeout(() => {
        spinner.style.display = 'none';

        const correct = document.createElement('p');
        correct.textContent = 'Message sended successfully';
        correct.classList.add('border', 'text-center', 'my-10', 'p-2', 'bg-green-500');

        form.insertBefore(correct, spinner);
        
    }, 3000);
}

function FormReset(e){
    e.preventDefault();
    const p = document.querySelector('p');
    p.remove();
    form.reset();
    StartAPP();
}
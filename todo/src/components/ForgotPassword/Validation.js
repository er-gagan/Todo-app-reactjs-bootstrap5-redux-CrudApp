const MinCharactersAllowed = (e, nameMsg, MinVal) => {
    e.target.classList.add('is-invalid');
    e.target.classList.remove('is-valid');
    nameMsg.classList.add("invalid-feedback");
    nameMsg.classList.remove("valid-feedback");
    nameMsg.innerText = `** Minimum ${MinVal} characters allowed`
}

const correctCharacters = (e, nameMsg) => {
    e.target.classList.remove('is-invalid');
    e.target.classList.add('is-valid');
    nameMsg.classList.remove("invalid-feedback");
    nameMsg.classList.add("valid-feedback");
    nameMsg.innerText = "** Correct"
}

const MaxCharactersAllowed = (e, nameMsg, MaxVal) => {
    e.target.classList.add('is-invalid');
    e.target.classList.remove('is-valid');
    nameMsg.classList.add("invalid-feedback");
    nameMsg.classList.remove("valid-feedback");
    nameMsg.innerText = `** Maximum ${MaxVal} characters allowed`
}

const somethingWentWrong = (e, nameMsg) => {
    e.target.classList.add('is-invalid');
    e.target.classList.remove('is-valid');
    nameMsg.classList.add("invalid-feedback");
    nameMsg.classList.remove("valid-feedback");
    nameMsg.innerText = "** Something went wrong"
}

const checkLength = (Value, MinVal, MaxVal, e, nameMsg) => {
    if (Value.length < MinVal) {
        MinCharactersAllowed(e, nameMsg, MinVal)
        return (false)
    }
    else if (Value.length >= MinVal && Value.length <= MaxVal) {
        correctCharacters(e, nameMsg)
        return (true)
    }
    else if (Value.length > MaxVal) {
        MaxCharactersAllowed(e, nameMsg, MaxVal)
        return (false)
    }
    else {
        somethingWentWrong(e, nameMsg)
        return (false)
    }
}

const undefinedValueLength = (e, nameMsg) => {
    e.target.classList.remove('is-invalid');
    e.target.classList.remove('is-valid');
    nameMsg.classList.remove("invalid-feedback");
    nameMsg.classList.remove("valid-feedback");
    nameMsg.innerText = ""
}

const MainFieldValidationCheck = (e, nameMsg, msg) => {
    e.target.classList.add('is-invalid');
    e.target.classList.remove('is-valid');
    nameMsg.classList.add("invalid-feedback");
    nameMsg.classList.remove("valid-feedback");
    nameMsg.innerText = msg
}

const matchPasswordValid = (matchPassword, pass1, pass2) => {
    matchPassword.classList.remove("valid-feedback");
    matchPassword.classList.remove("invalid-feedback");
    pass1.classList.remove('is-invalid');
    pass1.classList.add('is-valid');
    pass2.classList.remove('is-invalid');
    pass2.classList.add('is-valid');
    matchPassword.innerText = ""
}

const matchPasswordInvalid = (matchPassword, pass1, pass2) => {
    matchPassword.classList.remove("valid-feedback");
    matchPassword.classList.add("invalid-feedback");
    pass1.classList.add('is-invalid');
    pass1.classList.remove('is-valid');
    pass2.classList.add('is-invalid');
    pass2.classList.remove('is-valid');
    matchPassword.innerText = "** Password doesn't match"
}

export { checkLength, undefinedValueLength, MainFieldValidationCheck, matchPasswordValid, matchPasswordInvalid }
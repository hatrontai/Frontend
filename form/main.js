
// Object
function Validator(options) {

    function check(inputElement, rule) {
        var errorMessage = inputElement.parentElement.querySelector(options.formMessage) 
        if (rule.preCheck) {
            // console.log('check pass')
            var pw = formElement.querySelector(rule.preCheck).value
            if (rule.test(inputElement.value, pw)) {
            errorMessage.innerText = ""
            inputElement.parentElement.classList.remove('invalid')
            }
            else {
                errorMessage.innerText = rule.errorMessage
                inputElement.parentElement.classList.add('invalid')
            }
        }
        else {
            if (rule.test(inputElement.value)) {
                errorMessage.innerText = ""
                inputElement.parentElement.classList.remove('invalid')
            }
            else {
                errorMessage.innerText = rule.errorMessage
                inputElement.parentElement.classList.add('invalid')
            }
        }
    }

    var formElement = document.querySelector(options.form);
    if (formElement) {
        options.rules.forEach(function (rule) {
            var inputElement = formElement.querySelector(rule.selector);
            // console.log(inputElement)
            if (inputElement) {
                inputElement.onblur = function() {
                   check(inputElement, rule)
                }
            }
        });
    }
}

// Rules define
Validator.isRequired = function(selector) {
    return {
        selector: selector,
        errorMessage: "Vui long nhap ten cua ban!", 
        test: function(value) {
            return value ? true : false;
        }
    }
}

Validator.isEmail = function(selector) {
    return {
        selector: selector,
        errorMessage: "Vui long nhap dung dinh dang email!",
        test: function(value) {
            return String(value).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        }
    }    
}

Validator.isPassword = function(selector, min) {
    return {
        selector: selector,
        errorMessage: "Mat khau phai it nhat " + min + " ki tu",
        test: function(pw) {
            return pw.length >= min ? true : false;
        }
    }
}

Validator.checkPassword = function(selector, preCheck) {
    return {
        selector: selector,
        preCheck: preCheck,
        errorMessage: "Xac nhan mat khau khong dung",
        test: function(pw, pwCheck) {
            return pw & pw === pwCheck ? true : false;
        }
    }
}

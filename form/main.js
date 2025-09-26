
// Object
function Validator(options) {

    var selectorRules = {};

    function check(inputElement, rule) {
        var errorMessage = inputElement.parentElement.querySelector(options.formMessage) 
        var rules = selectorRules[rule.selector]
        for (i= 0; i < rules.length; i++) {
            if (rules[i].test(inputElement.value)) {
                errorMessage.innerText = ""
                inputElement.parentElement.classList.remove('invalid')
            }
            else {
                errorMessage.innerText = rules[i].errorMessage
                inputElement.parentElement.classList.add('invalid')
                break
            }
        }
    }

    var formElement = document.querySelector(options.form);
    if (formElement) {
        options.rules.forEach(function (rule) {
            var inputElement = formElement.querySelector(rule.selector);
            var errorMessage = inputElement.parentElement.querySelector(options.formMessage) 
            // console.log(inputElement)

            // save rule into the selectorRule
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule)
            }
            else {
                selectorRules[rule.selector] = [rule]
            }

            if (inputElement) {
                inputElement.onblur = function() {
                   check(inputElement, rule)
                }
                inputElement.onclick = function() {
                    errorMessage.innerText = ""
                    inputElement.parentElement.classList.remove('invalid')
                }
            }
        })
    }

    console.log(selectorRules)
}

// Rules define
Validator.isRequired = function(selector, message) {
    return {
        selector: selector,
        errorMessage: message || "Trường này là bắt buộc!", 
        test: function(value) {
            return value ? true : false;
        }
    }
}

Validator.isEmail = function(selector, message) {
    return {
        selector: selector,
        errorMessage: message || "Vui lòng nhập đúng định dạng email.",
        test: function(value) {
            return String(value).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        }
    }    
}

Validator.isPassword = function(selector, min, message) {
    return {
        selector: selector,
        errorMessage: message || `Mật khấu phải ít nhất ${min} kí tự.`,
        test: function(pw) {
            return pw.length >= min ? true : false;
        }
    }
}

Validator.checkPassword = function(selector, getConfirm, message) {
    return {
        selector: selector,
        getConfirm: getConfirm,
        errorMessage: message || "Xác nhận mật khẩu không đúng.",
        test: function(pwCheck) {
            return pwCheck === getConfirm() ? true : false;
        }
    }
}


// Object
function Validator(options) {

    var selectorRules = {};

    function getParrent(element, selector) {
        while (element.parentElement) {
            if(element.parentElement.matches(selector)) {
                return element.parentElement
            }
            element = element.parentElement
        }
    }

    // validate the input with rule
    function validate(inputElement, rule) {
        var errorMessage = getParrent(inputElement, options.formGroupSelector).querySelector(options.formMessage)
        // var errorMessage = inputElement.parentElement.querySelector(options.formMessage) 
        var rules = selectorRules[rule.selector]
        for (i= 0; i < rules.length; i++) {
            if (rules[i].test(inputElement.value)) {
                errorMessage.innerText = ""
                getParrent(inputElement, options.formGroupSelector).classList.remove('invalid')
            }
            else {
                errorMessage.innerText = rules[i].errorMessage
                getParrent(inputElement, options.formGroupSelector).classList.add('invalid')
                return false
            }
        }
        return true
    }

    var formElement = document.querySelector(options.form);
    if (formElement) {
        
        // event submit
        formElement.onsubmit = function(e) {
            e.preventDefault();

            var isFormValid = true
            // check value input
            options.rules.forEach(function(rule) {
                var inputElement = formElement.querySelector(rule.selector);
                if (inputElement) {
                    if (!validate(inputElement, rule)) {
                        isFormValid = false
                    }
                }
            })
            if (isFormValid) {
                if (typeof options.onSubmit === 'function') {

                    var enableInputs = formElement.querySelectorAll('[name]:not([disabled])')
                    var valueInputs = Array.from(enableInputs).reduce(function (value, input){
                        value[input.name] = input.value
                        return value
                    }, {})
                    options.onSubmit(valueInputs)
                }
            }
        }

        // event fill input
        options.rules.forEach(function (rule) {
            var inputElement = formElement.querySelector(rule.selector);
            var errorMessage = getParrent(inputElement, options.formGroupSelector).querySelector(options.formMessage) 
            // console.log(inputElement)

            // save rule into the selectorRules
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule)
            }
            else {
                selectorRules[rule.selector] = [rule]
            }

            // event blur out of input
            if (inputElement) {
                inputElement.onblur = function() {
                   validate(inputElement, rule)
                }
                inputElement.onclick = function() {
                    errorMessage.innerText = ""
                    getParrent(inputElement, options.formGroupSelector).classList.remove('invalid')
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
            return getConfirm() && pwCheck === getConfirm() ? true : false;
        }
    }
}


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
    function validate(inputElement, selector) {
        var errorMessage = getParrent(inputElement, options.formGroupSelector).querySelector(options.formMessage)
        // var errorMessage = inputElement.parentElement.querySelector(options.formMessage) 
        var rules = selectorRules[selector]
        var check = true;
        for (i= 0; i < rules.length; i++) {
            switch (inputElement.type) {
                case 'radio':   
                case 'checkbox':
                    check = rules[i].test(formElement.querySelector(selector + ':checked'))
                    // console.log(formElement.querySelector(selector + ':checked'))
                    break
                default:
                    check = rules[i].test(inputElement.value)
            }
            if (check) {
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
                var inputElements = Array.from(formElement.querySelectorAll(rule.selector));
                inputElements.forEach(function(inputElement) {
                    if (inputElement) {
                        if (!validate(inputElement, rule.selector)) {
                            isFormValid = false
                        }
                    }
                })
            })
            if (isFormValid) {
                if (typeof options.onSubmit === 'function') {

                    var enableInputs = formElement.querySelectorAll('[name]:not([disabled])')
                    var valueInputs = Array.from(enableInputs).reduce(function (value, input){
                        switch (input.type) {
                            case 'checkbox':
                                if (input.matches(':checked')) {
                                    if (Array.isArray(value[input.name])) {
                                        value[input.name].push(input.value)
                                    }
                                    else {
                                        value[input.name] = [input.value]
                                    }
                                }
                                break
                            case 'radio':
                                if (input.matches(':checked')) {
                                    value[input.name] = input.value
                                }
                                break
                            case 'file':
                                value[input.name] = input.files
                                break
                            default:
                                value[input.name] = input.value
                        }
                        
                        return value
                    }, {})
                    options.onSubmit(valueInputs)
                }
            }
        }

        // event fill input
        options.rules.forEach(function (rule) {
            var inputElements = Array.from(formElement.querySelectorAll(rule.selector));
            var errorMessage = getParrent(inputElements[0], options.formGroupSelector).querySelector(options.formMessage) 
            inputElements.forEach(function(inputElement) {
                // event blur out of input
                if (inputElement) {
                    inputElement.onblur = function() {
                    validate(inputElement, rule.selector)
                    }
                    inputElement.oninput = function() {
                        errorMessage.innerText = ""
                        getParrent(inputElement, options.formGroupSelector).classList.remove('invalid')
                    }
                }
            })

            // console.log(inputElement)

            // save rule into the selectorRules
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule)
            }
            else {
                selectorRules[rule.selector] = [rule]
            }
        })
    }

    // console.log(selectorRules)
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

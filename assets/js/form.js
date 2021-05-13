const form = () => {

    //FORM VALIDATION
    const validateForm = (form) => {
        var el = document.getElementsByClassName("validate-error-row");
        while(el.length > 0){
            el[0].nextSibling.classList.remove("error");
            el[0].parentNode.removeChild(el[0]);
        }
        if(document.querySelector(".error__message")) {
            document.querySelector(".error__message").classList.remove("active");
        }
        var valItems = document.querySelectorAll('[data-required="true"]'), formValid = true;
        function insertValidation(el, msg) {
            el.classList.add("error");
            var er = document.createElement('span');
            er.className = "validate-error-row";
            er.innerHTML = msg;
            el.insertAdjacentElement('beforebegin', er);
        }
        for (var i = 0, valItem; valItem = valItems[i++];) { // jshint ignore:line
            var node = valItem.nodeName, valid = true, msg;
            if (node === "INPUT") {
                if (valItem.getAttribute('type') != "email") {
                    if (valItem.getAttribute('type') == "text") {
                        valid = valItem.value.length < 1 ? false: valid;
                        msg = "Please enter a value";
                    } else if (valItem.getAttribute('type') == "file") {
                        valid = valItem.value.length < 1 ? false: valid;
                        msg = "Please select a file";
                    } else if (valItem.getAttribute('type') == "checkbox") {
                        valid = !valItem.checked ? false : valid;
                        msg = "You must select this option";
                    } else if (valItem.getAttribute('type') == "radio") {
                        valid = !valItem.checked ? false : valid;
                        msg = "You must select this option";
                    } else if (valItem.getAttribute('type') == "tel") {
                        valid = valItem.value.length < 1 ? false: valid;
                        msg = "Please enter a value";
                        if (valid) {
                            var telReg = /^(?:\W*\d){11}\W*$/;
                            valid = !telReg.test(valItem.value) ? false : valid;
                            msg = "Please enter a valid phone number";
                        }
                    } 
                } else {
                    valid = valItem.value.length < 1 ? false: valid;
                    msg = "Please enter a value";
                    if (valid) {
                        var emReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        valid = !emReg.test(valItem.value) ? false : valid;
                        msg = "Please enter a valid email";
                    }
                }
            } else if (node === "SELECT") {
                valid = valItem.value == 0 ? false: valid;
                msg = "Please select from one of the options";
            } else if (node === "TEXTAREA") {
                valid = valItem.value.length < 1 ? false: valid;
                msg = "Please enter a value";
            }
            if (!valid) {
                if(document.querySelector(".error__message")) {
                    document.querySelector(".error__message").classList.add("active");
                }
                if(document.querySelector("#manualAddress")) {
                    document.querySelector("#manualAddress").classList.add("active");
                }
                insertValidation(valItem, msg);
                formValid = false;
            }
        }
        return formValid;
    };

    //ADD DATA TO OBJECT
    const isValidElement = element => { return element.name && element.value; };
    const isValidValue = element => { return !['checkbox', 'radio'].includes(element.type) || element.checked; };
    const isCheckbox = element => element.type === 'checkbox';
    const isMultiSelect = element => element.options && element.multiple;
    const getSelectValues = options => [].reduce.call(options, (values, option) => { return option.selected ? values.concat(option.value) : values;}, []);
    const formToJSON = elements => [].reduce.call(elements, (data, element) => {
    if (isValidElement(element) && isValidValue(element)) {
        if (isCheckbox(element)) {
        data[element.name] = (data[element.name] || []).concat(element.value);
        } else if (isMultiSelect(element)) {
        data[element.name] = getSelectValues(element);
        } else {
        data[element.name] = element.value;
        }
    }
    return data;
    }, {});


    // YOUR DETAILS FORM ON SUBMIT
    if (document.getElementById('yourDetailsForm')) {
		var detailsForm = document.getElementById('yourDetailsSubmit');
		detailsForm.addEventListener('click', function(e) {
			e.preventDefault();
			if (validateForm(form)) {
                const userDetails = formToJSON(yourDetailsForm.elements); 
                alert("Successfully Submitted");
                console.log(userDetails);
                //SAVE ENDPOINT NEEDED HERE
                //IF SUCCESSFUL ON SAVE OF DATA GO HERE:
                // window.location.href = 'payment.html';
			}
		});
    }

    //REGISTER FORM ON SUBMIT
    if (document.getElementById('registerForm')) {
		var formRegister= document.getElementById('registerSubmit');
		formRegister.addEventListener('click', function(e) {
			e.preventDefault();
			if (validateForm(form)) {
                const registerDetails = formToJSON(registerForm.elements); 
                alert("Successfully Submitted");
                console.log(registerDetails);
                //SAVE ENDPOINT NEEDED HERE FOR REGISTER DETAILS
			}
		});
    }
};

export default form;
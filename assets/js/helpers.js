export const hasVal = (val) => {
    return val.length > 0 ? {valid: true} : {valid: false, message: "Please enter a value"};
};

export const emailCheck = (val) => {
    const reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i; // jshint ignore:line
    if (val) {
        if (reg.exec(val)) {
            return {valid: true};
        } else {
            return {valid: false, message: "Please enter a valid email"};
        }
    } else {
        return {valid: false, message: "Please enter a valid email"};
    }
};

export const numberCheck = (val) => {
    const reg = /^[0-9]+$/; // jshint ignore:line
    if (val) {
        if (reg.exec(val)) {
            return {valid: true};
        } else {
            return {valid: false, message: "Please enter a valid number"};
        }
    } else {
        return {valid: false, message: "Please enter a valid number"};
    }
};

export const numberLengthCheck = (val) => {
    const reg = /^([0-9]){10,}$/; // jshint ignore:line
    if (val) {
        if (reg.exec(val)) {
            return {valid: true};
        } else {
            return {valid: false, message: "Please enter a valid number of at least 10 digits in length"};
        }
    } else {
        return {valid: false, message: "Please enter a valid number"};
    }
};

export const matchCheck = (val, matchEl) => {
    if (val) {
        matchEl = document.getElementById(matchEl);
        if (matchEl) {
            if (matchEl.value === val) {
                return {valid: true};
            } else {
                return {valid: false, message: "Fields do not match"};
            }
        } else {
            return {valid: false, message: "Unable to match fields"};
        }
    } else {
        return {valid: false, message: "Please enter a value"};
    }
};

export const passwordCheck = (val) => {
    //const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/; // jshint ignore:line
    const reg = /^([a-zA-Z0-9]{8,})$/;
    if (val) {
        if (reg.exec(val)) {
            return {valid: true};
        } else {
            return {valid: false, message: "Your password must be at least 8 characters in length"};
        }
    } else {
        return {valid: false, message: "Your password must be at least 8 characters in length"};
    }
};
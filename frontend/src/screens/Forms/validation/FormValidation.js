const formValidate = (value) => {
    const { name, email, password, confirmPassword, avatar } = value;
    let errors = {};

    // name validation 
    if (!name) {
        errors.name = 'name is required!';
    }
    else if (name.length < 3) {
        errors.name = 'name must be 3 letters!';
    }
    else if (name.length > 40) {
        errors.name = 'name is to long!';
    }

    //email validation
    if (!email) {
        errors.email = "email is required!";
    } else
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
            errors.email = "please enter a valid email."
        }

    //password validation
    if (!password) {
        errors.password = 'password is required!';
    }
    else if (password.length < 8) {
        errors.password = 'password must be 8 letters!';
    }


    // confrim password validation
    if (!password) {
        errors.confirmPassword = '';
    } else if (confirmPassword !== password) {
        errors.confirmPassword = 'password do not match!';
    }

    if (!avatar) {
        errors.avatar = 'image is required.'
    }

    return errors;
}

export default formValidate

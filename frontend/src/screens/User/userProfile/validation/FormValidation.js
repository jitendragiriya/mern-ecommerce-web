const formValidate = (value) => {
    const { password, confirmPassword } = value;
    let errors = {};

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
    
    return errors;
}

export default formValidate

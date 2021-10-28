import React from 'react'
import Success from '../../components/Success'

const ForgotPassSuccess = ({ match }) => {
    return (
        <Success
            message={`Email sent to ${match.params.id} successfully! `}
            p='plase check your email.'
            url='/login'
            btn='login'
            title='forgot email sent' />
    )
}

export default ForgotPassSuccess

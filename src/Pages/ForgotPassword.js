import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { Link } from 'react-router-dom';

const initialFormState = {
    email: '', newPassword: '', authCode: '', formType: 'sendEmail'
}

export default function ForgotPassword(props) {
    
    const [formState, updateFormState] = useState(initialFormState)

    function onChange(e){
        e.persist()
        updateFormState(() => ({...formState, [e.target.name]: e.target.value}))
    }

    function sendEmail () {
        const { email } = formState
        Auth.forgotPassword(email)
        .then(
            data => console.log(data),
            updateFormState(() => ({...formState, formType: "enterCode"}))
        )
        .catch(err => console.log(err));
    }

    function changePassword() {
        const { email, newPassword, authCode } = formState
        Auth.forgotPasswordSubmit(email, authCode, newPassword)
        .then(
            data => console.log(data),
            props.history.push("/SignIn")
            )
        .catch(err => console.log(err));
    }
    

    const { formType } = formState
    return (
        <div>
            <h1>Forgot Password</h1>
            <div>
                {formType === 'sendEmail' && (
                    <div>
                        <input name="email" onChange={onChange} placeholder="email" />
                        <button onClick={sendEmail} >Send confirmation code to user's email</button>
                    </div>
                )}
                {formType === 'enterCode' && (
                    <div>
                        <input name="newPassword" onChange={onChange} placeholder="New Password" />
                        <input name="authCode" onChange={onChange} placeholder="Confirmation Code" />
                        <button onClick={changePassword} >Change Password</button>
                    </div>
                )}
            </div>
        </div>
    )
}
import React, { useState } from 'react';
import { Auth } from 'aws-amplify';

const initialFormState = {
    firstName: '', 
    lastName: '', 
    email: '', 
    password: '', 
    authCode: '',
    formType: 'signUp'
}

export default function SignUp() {

    const [formState, updateFormState] = useState(initialFormState)

    function onChange(e){
        e.persist()
        updateFormState(() => ({...formState, [e.target.name]: e.target.value}))
    }

    async function signUp() {
        const { firstName, lastName, email, password } = formState
        try {
            const { user } = await Auth.signUp({
                username: email,
                password: password,
                attributes: {
                    email,
                    'custom:firstName': firstName,
                    'custom:lastName': lastName,
                }
            });
            console.log(user);
            updateFormState(() => ({...formState, formType: "confirmSignUp"}))
        } catch (error) {
            console.log('error signing up:', error.message);
        }
    }

    async function confirmSignUp() {
        const { email, authCode } = formState
        try {
            await Auth.confirmSignUp(email, authCode);
            updateFormState(() => ({...formState, formType: "signIn"}))
          } catch (error) {
              console.log('error confirming sign up', error);
          }      
    }

    const { formType } = formState
    return (
        <div>
            {formType === 'signUp' && (
                <div>
                    <input name="firstName" onChange={onChange} placeholder="firstName" />
                    <input name="lastName" onChange={onChange} placeholder="lastName" />
                    <input name="email" onChange={onChange} placeholder="email" />
                    <input name="password" onChange={onChange} placeholder="password" />
                    <button onClick={signUp} >Sign Up</button>
                </div>
            )}
            {formType === 'confirmSignUp' && (
                <div>
                    <input name="authCode" onChange={onChange} placeholder="Confirmation Code" />
                    <button onClick={confirmSignUp} >Confirm Sign Up</button>
                </div>
            )}
            {formType === 'signIn' && (
                <div>
                    <h1>Account Created!</h1>
                </div>
            )}
        </div>
  );
}
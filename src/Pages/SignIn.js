import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { Link } from 'react-router-dom';

const initialFormState = {
    email: '', password: '', formType: 'signIn'
}

export default function SignIn(props) {

    const [formState, updateFormState] = useState(initialFormState)

    function onChange(e){
        e.persist()
        updateFormState(() => ({...formState, [e.target.name]: e.target.value}))
    }

    async function signIn() {
        const { email, password } = formState
        try {
            const user = await Auth.signIn(email, password);
            props.history.push("/LoggedIn")
        } catch (error) {
            console.log(error.message);
        }
    }

    const { formType } = formState

    return (
        <div>
            <h1>Sign In</h1>
            <div>
                {formType === 'signIn' && (
                    <div>
                        <input name="email" onChange={onChange} placeholder="email" />
                        <input name="password" onChange={onChange} placeholder="password" />
                        <button onClick={signIn} >Sign In</button>
                    </div>
                )}
            </div>
            <div>
                <button onClick={() => Auth.federatedSignIn( {provider: 'Google'} )}
                >Google</button>
            </div>
            <div>
                <button onClick={() => Auth.federatedSignIn( {provider: 'Facebook'} )}
                >Facebook</button>
            </div>
            <div>
                <Link to="/SignUp">Sign Up</Link>
            </div>
            <div>
                <Link to="/ForgotPassword">Forgot your Password?</Link>
            </div>
        </div>
  );
}
import React from 'react';
import { Auth } from 'aws-amplify';

export default function LoggedIn(props) {

    async function checkUser(){
        const user = await Auth.currentAuthenticatedUser()
        console.log('user: ', user)
    }

    async function signOut() {
        try {
            await Auth.signOut();
            props.history.push("/SignIn")
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }

    return (
        <div>
            <h1>Logged In</h1>
            <button onClick={checkUser}
            >Check User</button>
            <button onClick={signOut}
            >Sign Out</button>
        </div>
    )
}
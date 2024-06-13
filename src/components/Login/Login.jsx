import { GoogleAuthProvider, getAuth, signInWithPopup, signOut,GithubAuthProvider } from "firebase/auth";
import app from "../../firebase/firebase.init";
import { useState } from "react";

const Login = () => {
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider(); 
    const githubProvider = new GithubAuthProvider();
    const [user, setUser] = useState([])

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
    .then(result => {
        const LoginUser = result.user;
        setUser(LoginUser)
        console.log(LoginUser)
    })
    .catch(error => {
        console.log('error', error.message)
    })
    } 
    
    const handleGithubLogin = () => {
        signInWithPopup(auth, githubProvider)

        .then(result => {
            const loggedUser = result.user
            setUser(loggedUser)
            console.log(loggedUser)
        })
        .catch(error => {
            console.log(error)
        })
    }
    const handleSignOut = () =>{
        signOut(auth).then( result => {
            console.log(result)
            setUser(null)
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <div>
            {
                user ? <button onClick={handleSignOut}>Sign Out</button> : 
                <>
                <button onClick={handleGoogleSignIn}>Google Login</button>
                <button onClick={handleGithubLogin}>Github Login</button>
                </>
                
            }
            
            
            {
                user && <div>
                    <h3>{user.displayName}</h3>
                    <h5>{user.email}</h5>
                    <img src={user.photoURL} alt="" />
                </div>
            }
        </div>
    );
};

export default Login;
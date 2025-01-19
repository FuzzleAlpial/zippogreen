import { useState } from "react"
import { authenticate, addAccount } from "../../service";
import NavBar from "../general/nav-bar";

export default function Register(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const userID = localStorage.getItem("isLoggedIn");

    if (userID){
        window.location.href="./"
    }

    const handleClick = async(event) => {
        event.preventDefault();
        
        if (password !== password2){
            alert("Passwords do not match. Please try again.");
            return;
        }

        await addAccount({
            username, 
            password
        }).then((response) => {
            localStorage.setItem("isLoggedIn", response.id);
            window.location.href = "./";
        }).catch((err) => {
            alert("Username has been taken. Please try again with a new username.")
        });   
        };

    return(
        <body id="login-body">
            <header>
                <NavBar/>
            </header>
            <main>
                <form name="register" id="register-form">
                    <a href="./login">Back to log in</a>
                    <h1 class="login-h1">Register</h1>
                    <label for="username" className="required">Username</label>
                    <input type="text" id="username" name="username" max="100" onChange={e => setUsername(e.target.value)} required/>

                    <label for="password" className="required">Password</label>
                    <input type="password" id="password" name="password" max="100" onChange={e => setPassword(e.target.value)} required/>

                    <label for="password2" className="required">Re-enter Password</label>
                    <input type="password" id="password2" name="password2" max="100" onChange={e => setPassword2(e.target.value)} required/>

                    <button disabled={String(username)=="" || String(password)=="" || String(password2)==""} onClick={handleClick}>Sign up</button>
                </form>
            </main>
        </body>
    )
}
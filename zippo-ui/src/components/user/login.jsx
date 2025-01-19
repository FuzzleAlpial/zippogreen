import { useState } from "react"
import { authenticate } from "../../service";
import NavBar from "../general/nav-bar";

export default function LogIn(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const userID = localStorage.getItem("isLoggedIn");

    if (userID){
        window.location.href="./"
    }

    const handleClick = async(event) => {
        event.preventDefault();

        await authenticate({
            username, 
            password
        }).then((response) => {
            localStorage.setItem("isLoggedIn", response.id);
            window.location.href = "./";
        }).catch(() => {
            alert("Validation failed. Please try again.")
        });   
    };

    return(
        <body id="login-body">
            <header>
                <NavBar/>
            </header>
            <main>
                <form name="login" id="login-form">
                    <h1 class="login-h1">Log in</h1>
                    <label for="username" className="required">Username</label>
                    <input type="text" id="username" name="username" max="100" onChange={e => setUsername(e.target.value)} required/>

                    <label for="password" className="required">Password</label>
                    <input type="password" id="password" name="password" max="100" onChange={e => setPassword(e.target.value)} required/>

                    <button disabled={String(username)==="" || String(password)===""} onClick={handleClick}>Login</button>
                    <a href="./register">Create a new account</a>
                </form>
            </main>
        </body>
    )
}
import { useState } from "react";

function Admin(props) {
    return (
        <div className="Admin">
            <form>
                <label for="username">Username</label>
                <input id="username" type="text"/>
                <label for="password">Password</label>
                <input id="password" type="password"/>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default Admin;
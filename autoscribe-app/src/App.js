import React, { useState } from 'react';
import { Route, Route} from 'react-router-dom';

function App() {
  //takes username and password inputs at time of register button clicked
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");

  const register = () => {
    //Database posting goes here
    //assign usernameReg to username variable and passwordReg to PASSWORD
  };
  return (
    <div className="App">
      <div className="registration">
        <h1>Registration</h1>
        <label>Username</label>
        <input 
          type = "text"
          onChange={(e) => {
            setUsernameReg(e.target.value);
          }}
        />
        <label>Password</label>
        <input 
          type = "text"
          onChange={(e) => {
            setPasswordReg(e.target.value);
          }}
        />
        <button onClick={register}>Register</button>
      </div>
      <div className="login">
        <h1>Login</h1>
        <input type="text" placeholder="Username..." />
        <input type="text" placeholder="Password..." />
        <button>Log In</button>
      </div>
    </div>
  );
}

export default App;

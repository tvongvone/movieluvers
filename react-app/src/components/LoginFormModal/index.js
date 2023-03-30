import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import { getMyWatchlists } from "../../store/watchlists";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const demoUser = async (e) => {
    e.preventDefault();
    const password = "password";
    const credential = "demo@aa.io";
    const response = await dispatch(login(credential, password));
    dispatch(getMyWatchlists())
    closeModal()
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        dispatch(getMyWatchlists())
        closeModal()
    }
  };


    return (
      <div className="login-modal-wrapper">
        <div className='login-title'>
        <i className="fa-solid fa-film" style={{color: 'red'}}></i>
          <div style={{color: "white"}}>Log in</div>
        </div>
        <div className="login-form-container">
          <form className='login-form' onSubmit={handleSubmit}>
              {errors.map((error, idx) => (
                <div key={idx}>{error}</div>
              ))}
            <label>
              Email
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email'
                required
              />
            <label>
              Password
              </label>
              <input
                type="password"
                value={password}
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                required
              />
        <div className='login-buttons-container'>
            <button id='login-submit-button' type="submit">Log In</button>
          <div>OR</div>
          <button id='demo-user-submit-button' onClick={demoUser}>Demo User</button>
        </div>
          </form>
        </div>
      </div>
    );
}

export default LoginFormModal;

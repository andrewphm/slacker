import React, { useState } from 'react';
import axios from 'axios';

// Cookies
import Cookies from 'universal-cookie';

// Image
import signinImage from '../assets/signup.jpg';

// Components
import { Spinner } from './index';

const cookies = new Cookies();

const initialState = {
  fullName: '',
  username: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  avatarURL: '',
};

const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDemo = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const username = 'Demo';
    const password = 'demo';

    const URL = 'https://slacker-chat.herokuapp.com/auth';

    const {
      data: { token, userId },
    } = await axios.post(`${URL}/login`, {
      username,
      password,
    });

    cookies.set('token', token);
    cookies.set('username', username);
    cookies.set('userId', userId);
    window.location.reload();
    setIsLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { fullName, username, password, avatarURL } = form;

    const URL = 'https://slacker-chat.herokuapp.com/auth';

    try {
      const {
        data: { token, userId, hashedPassword },
      } = await axios.post(`${URL}/${isSignUp ? 'signup' : 'login'}`, {
        username,
        password,
        fullName,
        avatarURL,
      });

      setError(false);
      cookies.set('token', token);
      cookies.set('username', username);
      cookies.set('userId', userId);

      if (isSignUp) {
        cookies.set('fullName', fullName);
        cookies.set('avatarURL', avatarURL);
        cookies.set('hashedPassword', hashedPassword);
      }
      window.location.reload();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(true);
      console.log(error);
    }
  };

  const switchMode = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>{isSignUp ? 'Sign Up' : 'Sign In'}</p>
          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">Full Name</label>
                <input
                  name="fullName"
                  type="text"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="username">Username</label>
              <input
                name="username"
                type="text"
                placeholder="Username"
                onChange={handleChange}
                required
              />
            </div>
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="avatarURL">Avatar URL</label>
                <input
                  name="avatarURL"
                  type="text"
                  placeholder="Avatar URL (optional)"
                  onChange={handleChange}
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                required
              />
            </div>
            {isSignUp && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {isLoading ? (
              <Spinner />
            ) : (
              <div className="auth__form-container_fields-content_button">
                <button type="onsubmit">
                  {isSignUp ? 'Sign Up' : 'Sign In'}
                </button>

                <button onClick={handleDemo}>Demo Sign In</button>
              </div>
            )}
          </form>
          <div className="auth__form-container_fields-account">
            {error && (
              <p className="error">Username or password is incorrect...</p>
            )}
            <p>
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}
              <span onClick={switchMode}>
                {isSignUp ? ' Sign In' : ' Sign Up'}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="auth__form-container_image">
        <img src={signinImage} alt="sign in" />
      </div>
    </div>
  );
};

export default Auth;

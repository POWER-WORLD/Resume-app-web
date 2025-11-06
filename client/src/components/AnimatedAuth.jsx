import React, { useState } from 'react';
import '../assets/styles/animatedAuth.css';
import { useAuth } from '../context/AuthContext';

function AnimatedAuth({ onClose }) {
  const [active, setActive] = useState(false);
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [role, setRole] = useState('WebDev');
  const [error, setError] = useState(null);

  const { register, loginWithEmail } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await register({ fullName: signUpName, email: signUpEmail, password: signUpPassword, role });
      localStorage.setItem('seenAnimatedLogin', 'true');
      onClose?.();
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await loginWithEmail({ email: signInEmail, password: signInPassword });
      localStorage.setItem('seenAnimatedLogin', 'true');
      onClose?.();
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className={`auth-overlay`}>
      <div className={`container ${active ? 'active' : ''}`} id="container">
        <div className="form-container sign-up">
          <form onSubmit={handleRegister}>
            <h1>Create Account</h1>
            <div className="social-icons">
              <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
            <span>or use your email for registration</span>
            <input value={signUpName} onChange={e => setSignUpName(e.target.value)} type="text" placeholder="Name" required />
            <input value={signUpEmail} onChange={e => setSignUpEmail(e.target.value)} type="email" placeholder="Email" required />
            <input value={signUpPassword} onChange={e => setSignUpPassword(e.target.value)} type="password" placeholder="Password" required />
            <select value={role} onChange={e => setRole(e.target.value)}>
              <option>Student</option>
              <option>SoftDev</option>
              <option>WebDev</option>
              <option>Data Scientist</option>
              <option>Other</option>
            </select>
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in">
          <form onSubmit={handleLogin}>
            <h1>Sign In</h1>
            <div className="social-icons">
              <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
              <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
            <span>or use your email password</span>
            <input value={signInEmail} onChange={e => setSignInEmail(e.target.value)} type="email" placeholder="Email" required />
            <input value={signInPassword} onChange={e => setSignInPassword(e.target.value)} type="password" placeholder="Password" required />
            <a href="#">Forget Your Password?</a>
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className="hidden" id="login" onClick={() => setActive(false)}>Sign In</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all of site features</p>
              <button className="hidden" id="register" onClick={() => setActive(true)}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
      {error && <div className="auth-error">{error}</div>}
    </div>
  );
}

export default AnimatedAuth;

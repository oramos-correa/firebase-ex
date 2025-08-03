import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import './SignIn.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert('Login failed: ' + error.message);
    }
  };

  return (
    <div className="sign-in-container">
      <div className="sign-in-form-wrapper">
        <form onSubmit={handleSubmit} className="sign-in-form">
          <h2 style={{ textAlign: 'center' }}>Sign In</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign In</button>
        </form>

        <div className="demo-credentials">
          <p><strong>Email:</strong> surgeon1@example.com</p>
          <p><strong>Password:</strong> Password</p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

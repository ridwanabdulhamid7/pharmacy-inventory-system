import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
      
      // Save the token and role to the browser's local storage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.role);
      
      alert('Login Successful!');
      navigate('/dashboard'); // Send them to the dashboard
    } catch (err) {
      alert(err.response.data.message || 'Login failed');
    }
  };

  return (
    <div style={{ padding: '50px' }}>
      <h2>Pharmacy Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label><br/>
          <input type="text" onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label><br/>
          <input type="password" onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" style={{ marginTop: '10px' }}>Login</button>
      </form>
    </div>
  );
}
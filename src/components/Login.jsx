import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      // setMessage(res.data.message);
      const token=res.data.token;
      console.log('Token:', token);
      if(token){
        localStorage.setItem("token",token);
        setMessage("Login Successful!")
        navigate('/dashboard');
      }
      else{
        setMessage("Invalid login response");
      }
    } catch (err) {
      setMessage(err.response?.data?.message ||'Something went wrong');
    }
}
  return (
    <>
     <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br /><br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required autoComplete='current-password'
      />
      <br /><br />
      <button type="submit">Login</button>
    </form>
    {message && <p>{message}</p>}
      <p>
        Don't have an account? <a href="/register">Register Here</a>
      </p>
    </>
  )
}

export default Login

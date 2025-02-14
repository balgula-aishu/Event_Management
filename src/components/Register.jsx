import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
     const res= await axios.post('http://localhost:5000/api/auth/register', { email, password });
      alert(res.data.message)
      setTimeout(()=>{
        navigate('/',{state:{email}});
      },1000);
    } catch (err) {
      setMessage(err.response ? err.response.data.message : 'Something went wrong');
    }
}
  return (
    <>
      <form onSubmit={handleSubmit}>
      <h2>Register</h2>
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
        required
      />
      <br /><br />
      <button type="submit">Register</button>
    </form>
    {message && <p>{message}</p>}
      <p>
        Already have an account? <a href="/">Login</a>
      </p>
    </>
  )
}

export default Register

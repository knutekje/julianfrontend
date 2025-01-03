// src/pages/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Box } from '@mui/material';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (email === 'admin@example.com' && password === 'password') {
      localStorage.setItem('authToken', 'dummy-token'); // Save token to localStorage
      navigate('/dashboard'); // Redirect after login
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <Box
        className="p-6 bg-gray-800 text-white rounded shadow-lg"
        sx={{ width: '100%', maxWidth: 400 }}
      >
        <div className="bg-red-500 text-white p-4">
    Tailwind Test
  </div>
        <div className='border-t-neutral-700 bg-red-700'>HELLO</div>
        <Typography variant="h5" component="h1" gutterBottom className="text-center font-bold">
          Login
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputLabelProps={{ style: { color: '#bdbdbd' } }}
          sx={{ input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#bdbdbd' } } }}
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputLabelProps={{ style: { color: '#bdbdbd' } }}
          sx={{ input: { color: 'white' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#bdbdbd' } } }}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleLogin}
          className="mt-4"
        >
          Login
        </Button>
      </Box>
    </div>
  );
};

export default Login;

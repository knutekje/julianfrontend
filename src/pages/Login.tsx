import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography, Box } from '@mui/material';
import { authApiUrl } from '../uris';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(`${authApiUrl}login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('authToken', data.token); // Save token in localStorage
        navigate('/dashboard'); // Redirect to the dashboard
      } else {
        setError('Invalid email or password'); // Handle non-2xx responses
      }
    } catch (error) {
      setError('Something went wrong. Please try again later.'); // Handle network errors
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <Box
        className="p-6 bg-gray-800 text-white rounded shadow-lg"
        sx={{ width: '100%', maxWidth: 400 }}
      >
        <Typography variant="h5" component="h1" gutterBottom className="text-center font-bold">
          Login
        </Typography>
        {error && (
          <Typography
            variant="body2"
            className="text-red-500 text-center mb-4"
          >
            {error}
          </Typography>
        )}
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputLabelProps={{ style: { color: '#bdbdbd' } }}
          sx={{
            input: { color: 'white' },
            '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#bdbdbd' } },
          }}
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
          sx={{
            input: { color: 'white' },
            '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#bdbdbd' } },
          }}
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

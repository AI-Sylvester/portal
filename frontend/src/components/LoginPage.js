import React, { useState } from 'react';
import {
  Box, Typography, CircularProgress, Alert, TextField, Button, Paper
} from '@mui/material';

function LoginPage({ onLogin }) {
  const [cusId, setCusId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    setError('');

    if (!cusId.trim() || !password.trim()) {
      setError('Customer ID and Password are required');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/customers/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cusId: cusId.trim(), password: password.trim() }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error || 'Login failed');
      } else {
        localStorage.setItem('user', JSON.stringify(data.user));
        onLogin(data.user);
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleLogin();
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f4f6f8" padding={2}>
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 400, width: '100%' }}>
        <Typography variant="h5" align="center" gutterBottom>
          Customer Portal Login
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <TextField
          label="Customer ID"
          fullWidth
          value={cusId}
          onChange={(e) => setCusId(e.target.value)}
          onKeyDown={handleKeyDown}
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          margin="normal"
        />
        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          disabled={isLoading || !cusId || !password}
          sx={{ mt: 2 }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
        </Button>
      </Paper>
    </Box>
  );
}

export default LoginPage;

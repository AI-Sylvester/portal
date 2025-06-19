import React from 'react';
import {
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Divider,
} from '@mui/material';

function Savings({ savingsSummary, loading, error }) {
  const regIds = Object.keys(savingsSummary);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={3}>
        <CircularProgress color="primary" />
      </Box>
    );

  if (error)
    return (
      <Alert severity="error" sx={{ mt: 3 }}>
        {error}
      </Alert>
    );

  if (regIds.length === 0) {
    return (
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          mt: 3,
          backgroundColor: '#fff',
          borderRadius: 2,
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
          maxWidth: 600,
          margin: 'auto',
        }}
      >
        <Typography
          variant="subtitle1"
          color="textSecondary"
          align="center"
        >
          No savings data found.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={4}
      sx={{
        padding: 3,
        mt: 3,
        backgroundColor: '#fff',
        borderRadius: 2,
        boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
        maxWidth: 600,
        margin: 'auto',
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          fontWeight: 600,
          letterSpacing: 0.5,
          color: '#1e293b',
          mb: 3,
        }}
      >
        Savings Summary
      </Typography>

      {regIds.map((regId) => (
        <Box
          key={regId}
          mb={3}
          sx={{
            borderLeft: '5px solid #0d47a1',
            paddingLeft: 2,
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 700, color: '#0d47a1', mb: 0.5 }}
          >
            RegId: {regId}
          </Typography>
          <Typography variant="body2" sx={{ mb: 0.4, color: '#374151' }}>
            <strong>Total Received Amount:</strong>{' '}
            <span style={{ color: '#1e40af' }}>
              ₹{savingsSummary[regId].totalReceivedAmount.toFixed(2)}
            </span>
          </Typography>
          <Typography variant="body2" sx={{ color: '#374151' }}>
            <strong>Total Gold Gram:</strong>{' '}
            <span style={{ color: '#1e40af' }}>
              {savingsSummary[regId].totalGoldGram.toFixed(2)} g
            </span>
          </Typography>
          <Divider sx={{ mt: 1.5, borderColor: '#e5e7eb', opacity: 0.7 }} />
        </Box>
      ))}
    </Paper>
  );
}

export default Savings;

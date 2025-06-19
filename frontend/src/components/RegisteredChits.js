import React from 'react';
import {
  Paper,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Grid,
} from '@mui/material';

function RegisteredChits({ chits, loading, error }) {
  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })
      : 'N/A';

  return (
    <Paper
      sx={{
        padding: 3,
        borderRadius: 3,
        bgcolor: '#f4f6f9',
        boxShadow: 3,
        minHeight: 300,
      }}
    >
      <Typography variant="h5" gutterBottom color="primary.dark" fontWeight={600}>
        Registered Chits
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      ) : chits?.length === 0 ? (
        <Typography mt={2} color="textSecondary">
          No registered chits found.
        </Typography>
      ) : (
        <Grid container spacing={3} mt={1}>
          {chits.map((chit) => (
            <Grid item xs={12} md={6} key={chit._id}>
              <Paper
                elevation={1}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  backgroundColor: '#ffffff',
                  border: '1px solid #dce3ea',
                }}
              >
                {/* Header */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                  borderBottom="1px solid #eceff1"
                  pb={1}
                >
                  <Typography variant="subtitle1" fontWeight={600} color="primary.main">
                    {chit.schemeName}
                  </Typography>
                  <Typography
                    variant="caption"
                    color={chit.status === 'Closed' ? 'error.main' : 'success.main'}
                    fontWeight={500}
                    sx={{
                      border: '1px solid',
                      px: 1.5,
                      py: 0.3,
                      borderRadius: 2,
                      borderColor: chit.status === 'Closed' ? 'error.main' : 'success.main',
                    }}
                  >
                    {chit.status}
                  </Typography>
                </Box>

                {/* Info */}
               <Grid container spacing={2}>
  {/* Chit Details Section */}
  <Grid item xs={12}>
    <Box
      p={2}
      bgcolor="#f9f9f9"
      border="1px solid #e0e0e0"
      borderRadius={2}
    >
      <Typography
        variant="subtitle1"
        fontWeight={600}
        gutterBottom
        color="primary.main"
      >
        Chit Details
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" fontWeight={500} color="text.secondary">Reg ID</Typography>
          <Typography variant="body2">{chit.regId}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" fontWeight={500} color="text.secondary">Installment</Typography>
          <Typography variant="body2">₹ {chit.installAmount?.toLocaleString()}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" fontWeight={500} color="text.secondary">Started On</Typography>
          <Typography variant="body2">{formatDate(chit.startedOn)}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" fontWeight={500} color="text.secondary">Maturity Date</Typography>
          <Typography variant="body2">{formatDate(chit.maturityDate)}</Typography>
        </Grid>
      </Grid>
    </Box>
  </Grid>

  {/* Nominee Details Section */}
  <Grid item xs={12}>
    <Box
      p={2}
      bgcolor="#f9fbfc"
      border="1px solid #e0e0e0"
      borderRadius={2}
    >
      <Typography
        variant="subtitle1"
        fontWeight={600}
        gutterBottom
        color="primary.main"
      >
        Nominee Details
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" fontWeight={500} color="text.secondary">Name</Typography>
          <Typography variant="body2">{chit.nomineeName || 'N/A'}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" fontWeight={500} color="text.secondary">Relation</Typography>
          <Typography variant="body2">{chit.relation || 'N/A'}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" fontWeight={500} color="text.secondary">Phone</Typography>
          <Typography variant="body2">{chit.nomineeNumber || 'N/A'}</Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" fontWeight={500} color="text.secondary">City</Typography>
          <Typography variant="body2">{chit.nomineeCity || 'N/A'}</Typography>
        </Grid>
      </Grid>
    </Box>
  </Grid>

  {/* Closed Info Section */}
  {chit.status === 'Closed' && (
    <Grid item xs={12}>
      <Box
        p={2}
        bgcolor="#fff8f8"
        border="1px solid #f2c0c0"
        borderRadius={2}
      >
        <Typography
          variant="subtitle1"
          fontWeight={600}
          gutterBottom
          color="error.main"
        >
          Closure Info
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" fontWeight={500} color="text.secondary">Closed On</Typography>
            <Typography variant="body2">{formatDate(chit.closedOn)}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" fontWeight={500} color="text.secondary">Total Amount</Typography>
            <Typography variant="body2">₹ {chit.totalAmount?.toLocaleString() || 'N/A'}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" fontWeight={500} color="text.secondary">Pay Mode</Typography>
            <Typography variant="body2">{chit.payMode || 'N/A'}</Typography>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  )}
</Grid>

              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Paper>
  );
}

export default RegisteredChits;

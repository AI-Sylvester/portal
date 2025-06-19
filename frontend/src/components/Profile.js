import React from 'react';
import {
  Paper,
  Box,
  Typography,
  Grid,
  Stack,
  Divider,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

function Profile({ customer }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    cusId,
    name,
    grade,
    number,
    PID,
    mobile1,
    mobile2,
    active,
    addressLine1,
    addressLine2,
    city,
    state,
  } = customer || {};

  const fullAddress = [
    number && `#${number}`,
    addressLine1,
    addressLine2,
    city,
    state,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <Paper
      sx={{
        padding: isMobile ? 3 : 5,
        borderRadius: 3,
        bgcolor: 'white',
        boxShadow: 3,
      }}
    >
      <Box mb={3} display="flex" alignItems="center">
        <VerifiedUserIcon color="primary" sx={{ fontSize: 40, mr: 1 }} />
        <Typography
          variant="h4"
          color="primary.dark"
          fontSize={isMobile ? '1.6rem' : '2rem'}
        >
          Customer Profile
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <Typography><strong>Customer ID:</strong> {cusId}</Typography>
            <Typography><strong>Name:</strong> {name}</Typography>
            <Typography><strong>Grade:</strong> {grade}</Typography>
            <Typography><strong>Number:</strong> {number}</Typography>
            <Typography><strong>PID:</strong> {PID}</Typography>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <Typography><strong>Mobile 1:</strong> {mobile1}</Typography>
            <Typography><strong>Mobile 2:</strong> {mobile2}</Typography>
            <Typography><strong>Status:</strong> {active ? 'Active' : 'Inactive'}</Typography>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" alignItems="center" mb={1}>
            <LocationOnIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
            <Typography variant="subtitle1" fontWeight="bold">Address:</Typography>
          </Box>
          <Typography whiteSpace="pre-line">
            {fullAddress || 'No address provided'}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default Profile;

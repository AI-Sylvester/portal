import React, { useMemo, useState } from 'react';
import {
  Typography,
  Box,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

function Transaction({ transactions, loading, error }) {
  const [selectedRegId, setSelectedRegId] = useState('');

  // Get unique regIds for filter dropdown
  const uniqueRegIds = useMemo(() => {
    const regIds = transactions.map(tx => tx.regId).filter(Boolean);
    return [...new Set(regIds)];
  }, [transactions]);

  // Filter transactions by selected regId
  const filteredTransactions = selectedRegId
    ? transactions.filter(tx => tx.regId === selectedRegId)
    : transactions;

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  if (transactions.length === 0) {
    return <Typography>No transactions found.</Typography>;
  }

  return (
    <Box>
      <Typography variant="h6" mb={2}>
        Your Transactions
      </Typography>

      {/* Filter by Reg ID */}
      <FormControl sx={{ mb: 2, minWidth: 200 }}>
        <InputLabel id="regid-filter-label">Filter by Reg ID</InputLabel>
        <Select
          labelId="regid-filter-label"
          value={selectedRegId}
          label="Filter by Reg ID"
          onChange={(e) => setSelectedRegId(e.target.value)}
        >
          <MenuItem value="">
            <em>All</em>
          </MenuItem>
          {uniqueRegIds.map((regId) => (
            <MenuItem key={regId} value={regId}>
              {regId}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell><strong>EID</strong></TableCell>
              <TableCell><strong>Reg ID</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
              <TableCell><strong>Paid For</strong></TableCell>
              <TableCell><strong>Gold Gram</strong></TableCell>
              <TableCell><strong>Pay Mode</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTransactions.map((tx) => (
              <TableRow key={tx._id}>
                <TableCell>{tx.EID}</TableCell>
                <TableCell>{tx.regId || 'N/A'}</TableCell>
                <TableCell>
                  {new Date(tx.date).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </TableCell>
                <TableCell>{tx.paidFor}</TableCell>
                <TableCell>{tx.goldGram}</TableCell>
                <TableCell>{tx.payMode}</TableCell>
                <TableCell>{tx.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default Transaction;

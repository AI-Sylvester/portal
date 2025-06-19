import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

import LoginPage from './components/LoginPage';
import Profile from './components/Profile';
import RegisteredChits from './components/RegisteredChits';
import Transaction from './components/Transaction';
import Savings from './components/Savings';

import api from './services/api';

function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));

  const [customer, setCustomer] = useState(null);
  const [loadingCustomer, setLoadingCustomer] = useState(false);
  const [customerError, setCustomerError] = useState('');

  const [chits, setChits] = useState([]);
  const [chitsLoading, setChitsLoading] = useState(false);
  const [chitsError, setChitsError] = useState('');

  const [transactions, setTransactions] = useState([]);
  const [transactionsLoading, setTransactionsLoading] = useState(false);
  const [transactionsError, setTransactionsError] = useState('');

  const [savingsSummary, setSavingsSummary] = useState({});
  const [savingsLoading, setSavingsLoading] = useState(false);
  const [savingsError, setSavingsError] = useState('');

  const [activeTab, setActiveTab] = useState('profile');

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (!user) return;

    const fetchCustomer = async () => {
      setLoadingCustomer(true);
      setCustomerError('');
      try {
        const { data, status } = await api.get(`/customers/${user.cusId}`);
        if (status !== 200) throw new Error(data.error || 'Failed to fetch customer');
        setCustomer(data);
      } catch (err) {
        setCustomerError(err.message);
      } finally {
        setLoadingCustomer(false);
      }
    };

    fetchCustomer();
  }, [user]);

  const fetchChits = async () => {
    setChitsLoading(true);
    setChitsError('');
    try {
      const { data, status } = await api.get(`/chitregisters/by-cusid/${user.cusId}`);
      if (status !== 200) throw new Error(data.message || 'Failed to fetch chits');
      setChits(data);
    } catch (err) {
      setChitsError(err.message);
    } finally {
      setChitsLoading(false);
    }
  };

  const fetchTransactions = async () => {
    setTransactionsLoading(true);
    setTransactionsError('');
    try {
      const { data, status } = await api.get(`/transactions/by-cusid/${user.cusId}`);
      if (status !== 200) throw new Error(data.message || 'Failed to fetch transactions');
      setTransactions(data);
    } catch (err) {
      setTransactionsError(err.message);
    } finally {
      setTransactionsLoading(false);
    }
  };

  const fetchSavings = async () => {
    setSavingsLoading(true);
    setSavingsError('');
    try {
      const { data, status } = await api.get(`/transactions/by-cusid/${user.cusId}`);
      if (status !== 200) throw new Error(data.message || 'Failed to fetch savings data');

      const grouped = data.reduce((acc, tx) => {
        const regId = tx.regId || 'Unknown';
        if (!acc[regId]) {
          acc[regId] = { totalReceivedAmount: 0, totalGoldGram: 0 };
        }
        acc[regId].totalReceivedAmount += tx.receivedAmount || 0;
        acc[regId].totalGoldGram += tx.goldGram || 0;
        return acc;
      }, {});

      setSavingsSummary(grouped);
    } catch (err) {
      setSavingsError(err.message);
    } finally {
      setSavingsLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'registeredChits') fetchChits();
    if (tab === 'transaction') fetchTransactions();
    if (tab === 'savings') fetchSavings();
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setCustomer(null);
    setChits([]);
    setTransactions([]);
    setSavingsSummary({});
  };

  if (!user) return <LoginPage onLogin={setUser} />;
  if (loadingCustomer) return <Typography>Loading...</Typography>;
  if (customerError) return <Typography color="error">{customerError}</Typography>;

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#0d47a1' }}>
        <Toolbar sx={{ justifyContent: 'space-between', px: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Customer Portal
          </Typography>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Welcome, {customer?.name || user.cusId}
            </Typography>
            <IconButton color="inherit" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Box maxWidth={900} mx="auto" p={isMobile ? 2 : 4}>
        <Box mb={3} display="flex" gap={2} flexWrap="wrap">
          {['profile', 'registeredChits', 'transaction', 'savings'].map((tab) => (
            <Button
              key={tab}
              variant={activeTab === tab ? 'contained' : 'outlined'}
              onClick={() => handleTabChange(tab)}
              sx={{ textTransform: 'capitalize' }}
            >
              {tab === 'registeredChits' ? 'Chits' : tab}
            </Button>
          ))}
        </Box>

        {activeTab === 'profile' && <Profile customer={customer} />}

        {activeTab === 'registeredChits' && (
          <RegisteredChits chits={chits} loading={chitsLoading} error={chitsError} />
        )}

        {activeTab === 'transaction' && (
          <Transaction
            user={user}
            transactions={transactions}
            loading={transactionsLoading}
            error={transactionsError}
          />
        )}

        {activeTab === 'savings' && (
          <Savings
            savingsSummary={savingsSummary}
            loading={savingsLoading}
            error={savingsError}
          />
        )}
      </Box>
    </>
  );
}

export default App;

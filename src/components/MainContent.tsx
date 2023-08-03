import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { drawerWidth } from '../constants';
import axios from 'axios';
import Grid from '@mui/material/Grid';



interface PortfolioItem {
  symbol: string;
  shares: string;
}



export const MainContent: React.FC = () => {
  const [symbol, setSymbol] = React.useState('');
  const [shares, setShares] = React.useState('');
  const [portfolio, setPortfolio] = React.useState<PortfolioItem[]>([]);
  

  const handleAdd = async () => { // Make this function async
    const formData = new FormData();
    formData.append('symbols', symbol);
    formData.append('shares', shares);
  
    try {
      const response = await axios.post('http://localhost:5000/receive', formData); // Replace with your backend URL
      console.log(response.data); // Log the response to the console
      
      const newPortfolio = [...portfolio, { symbol, shares }];
      setPortfolio(newPortfolio);
      console.log(newPortfolio); // Log the updated portfolio to the console
    } catch (error) {
      console.error(error);
    }
  
    setSymbol('');
    setShares('');
  };
  

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      component="main"
      sx={{ 
        flexGrow: 1, 
        p: 3, 
        width: { sm: `calc(100% - ${drawerWidth}px)` }, 
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar />
      <Box 
        display="flex" 
        flexDirection={isMobile ? 'column' : 'row'} 
        alignItems="center" 
        justifyContent={isMobile ? 'center' : 'flex-start'}
      >
        <TextField 
          required 
          id="symbol-field" 
          label="Symbol" 
          variant="filled" 
          value={symbol} 
          sx={{ mr: 2 }}
          onChange={(e) => setSymbol(e.target.value)}
        />
        <TextField 
          required 
          id="shares-field" 
          label="Shares" 
          variant="filled" 
          value={shares} 
          sx={{ mr: 2 }}
          onChange={(e) => setShares(e.target.value)}
        />
        <Box 
          display="flex" 
          justifyContent={isMobile ? 'center' : 'flex-start'} 
          width="100%"
        >
          <Button 
            variant="outlined" 
            onClick={handleAdd} 
            size="large" // Make the button larger
            sx={{ mt: 1 }} // Add some margin top for vertical alignment
          >
            Add
          </Button>
        </Box>
      </Box>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        {portfolio.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h5">{item.symbol}</Typography>
                <Typography variant="body2">{item.shares} shares</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
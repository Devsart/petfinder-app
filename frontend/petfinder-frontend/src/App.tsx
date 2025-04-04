import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, CssBaseline, Box, AppBar, Toolbar, Typography, Button, Tab, Tabs } from '@mui/material';
import HomePage from './pages/HomePage';
import RegisterPetPage from './pages/RegisterPetPage';
import RegisterLostPetPage from './pages/RegisterLostPetPage';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#f5f5dc', // Bege claro
    },
    background: {
      default: '#f5f5dc', // Fundo bege claro como na imagem
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          textTransform: 'none',
          padding: '10px 20px',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 500,
          minWidth: 120,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar>
              <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                  <img src="/logo.png" alt="PetFinder Logo" style={{ height: 50, marginRight: 10 }} />
                  <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                    PetFinder
                  </Typography>
                  <Typography variant="h5" component="div" sx={{ ml: 1 }}>
                    Brasil
                  </Typography>
                </Link>
              </Box>
              <Button 
                variant="outlined" 
                color="primary"
                sx={{ 
                  borderRadius: 4,
                  px: 3,
                  py: 1
                }}
              >
                Login/Cadastro
              </Button>
            </Toolbar>
          </AppBar>
        </Box>

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register-pet" element={<RegisterPetPage />} />
            <Route path="/register-lost-pet" element={<RegisterLostPetPage />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;

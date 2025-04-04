import React, { useState, useEffect } from 'react';
import { Box, Typography, Tabs, Tab, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { fetchLostPets } from '../services/api';
import { LostPet } from '../types';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const HomePage: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [lostPets, setLostPets] = useState<LostPet[]>([]);

  useEffect(() => {
    const getLostPets = async () => {
      try {
        const pets = await fetchLostPets();
        setLostPets(pets);
      } catch (error) {
        console.error('Erro ao buscar pets perdidos:', error);
      }
    };

    getLostPets();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Agrupar pets por localização
  const petsByLocation: Record<string, LostPet[]> = {};
  lostPets.forEach(pet => {
    if (!petsByLocation[pet.location]) {
      petsByLocation[pet.location] = [];
    }
    petsByLocation[pet.location].push(pet);
  });

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 2, overflow: 'hidden' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          aria-label="pet finder tabs"
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              py: 2,
              fontSize: '1.1rem',
            },
            '& .Mui-selected': {
              backgroundColor: 'white',
            }
          }}
        >
          <Tab label="Encontrar pets perdidos" />
          <Tab label="Perdi meu pet" />
        </Tabs>
      </Box>
      
      <TabPanel value={tabValue} index={0}>
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Perdosscer pet perdidos
          </Typography>
          
          <Grid container spacing={3} sx={{ mt: 4 }}>
            {Object.entries(petsByLocation).map(([location, pets]) => (
              <Grid item xs={12} sm={6} md={3} key={location}>
                <Card sx={{ 
                  maxWidth: 345, 
                  mx: 'auto',
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: 3
                }}>
                  <CardMedia
                    component="img"
                    height="240"
                    image={`http://localhost:8000/${pets[0].photo_path}`}
                    alt={`Pet perdido em ${location}`}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" component="div">
                      {location}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </TabPanel>
      
      <TabPanel value={tabValue} index={1}>
        <Box sx={{ my: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Registre seu pet perdido
          </Typography>
          <Typography variant="body1" paragraph>
            Preencha o formulário com as informações do seu pet para que possamos ajudar a encontrá-lo.
          </Typography>
          <Box sx={{ mt: 4 }}>
            {/* Formulário será implementado na próxima etapa */}
            <Typography variant="body1">
              Formulário de registro de pet perdido em construção...
            </Typography>
          </Box>
        </Box>
      </TabPanel>
    </Box>
  );
};

export default HomePage;

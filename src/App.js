import React, { useState } from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import Dashboard from './components/Dashboard';
import ProductoList from './components/ProductoList';
import ProductoForm from './components/ProductoForm';
import InventarioBox from './components/InventarioBox';
import CombinacionesBox from './components/CombinacionesBox';
import ModalGatos from './components/ModalGatos';
import FooterDatoInutil from './components/FooterDatoInutil';

function App() {
  const [vista, setVista] = useState(null);

  const renderVista = () => {
    switch (vista) {
      case 'listar': return <ProductoList />;
      case 'crear': return <ProductoForm />;
      case 'inventario': return <InventarioBox />;
      case 'combinaciones': return <CombinacionesBox />;
      case 'modalGato': return <ModalGatos />;
      case 'footer': return <FooterDatoInutil />;
      default: return <Dashboard setVista={setVista} />;
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Gestión de Productos PTM
      </Typography>

      <Box mb={2} textAlign="right">
        {vista && (
          <Button onClick={() => setVista(null)} variant="outlined">
            ⬅ Volver al menú
          </Button>
        )}
      </Box>

      {renderVista()}
    </Container>
  );
}

export default App;
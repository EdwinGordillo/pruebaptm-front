import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Alert, Container } from '@mui/material';

function FooterDatoInutil() {
  const [dato, setDato] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerDato = async () => {
      try {
        const res = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/today?language=en');
        const data = await res.json();
        setDato(data.text);
      } catch (err) {
        console.error(err);
        setError('No se pudo cargar el dato inútil del día.');
      } finally {
        setCargando(false);
      }
    };

    obtenerDato();
  }, []);

  return (
    <Box
      component="footer"
      sx={{
        mt: 6,
        py: 3,
        px: 2,
        borderTop: '1px solid #ccc',
        backgroundColor: '#f9f9f9',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography variant="subtitle2" gutterBottom>
            Dato inútil del día:
        </Typography>

        {cargando ? (
            <CircularProgress size={20} />
        ) : error ? (
            <Alert severity="error">{error}</Alert>
        ) : (
            <Typography variant="body2" color="text.secondary">
                {dato}
            </Typography>
        )}
      </Container>
    </Box>
  );
}

export default FooterDatoInutil;
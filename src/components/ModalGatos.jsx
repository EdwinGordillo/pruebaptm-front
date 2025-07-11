import React, { useEffect, useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Typography, CircularProgress, Alert, Button
} from '@mui/material';

function ModalGatos() {
  const [abierto, setAbierto] = useState(false);
  const [curiosidades, setCuriosidades] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarCuriosidades = async () => {
      setCargando(true);
      setError(null);

      try {
        const res1 = await fetch('https://meowfacts.herokuapp.com/?lang=esp');
        const res2 = await fetch('https://meowfacts.herokuapp.com/?lang=esp');
        const data1 = await res1.json();
        const data2 = await res2.json();

        // Accede a los textos correctamente
        setCuriosidades([data1.data[0], data2.data[0]]);
        setAbierto(true);
      } catch (err) {
        console.error(err);
        setError('No se pudieron cargar las curiosidades.');
      } finally {
        setCargando(false);
      }
    };

    cargarCuriosidades();
  }, []);

  const cerrarModal = () => {
    setAbierto(false);
  };

  return (
    <Dialog open={abierto} onClose={cerrarModal}>
        <DialogTitle>Sabías que...</DialogTitle>
        <DialogContent dividers>
            {cargando ? (
            <CircularProgress />
            ) : error ? (
            <Alert severity="error">{error}</Alert>
            ) : (
            curiosidades.map((curio, index) => (
                <Typography key={index} paragraph>
                • {curio}
                </Typography>
            ))
            )}
        </DialogContent>
        <DialogActions>
            <Button onClick={cerrarModal} color="primary">
            Cerrar
            </Button>
        </DialogActions>
    </Dialog>
  );
}   

export default ModalGatos;
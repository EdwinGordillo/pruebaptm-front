import React, { useState } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer
} from '@mui/material';
import api from '../services/api';

function CombinacionesBox() {
  const [valor, setValor] = useState('');
  const [resultado, setResultado] = useState([]);
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  const buscarCombinaciones = async () => {
    setMensaje(null);
    setError(null);
    setResultado([]);

    if (!valor || isNaN(valor)) {
      setError('Ingrese un valor numérico válido');
      return;
    }

    try {
      const res = await api.get(`/productos/combinaciones`, {
        params: { valor }
      });
      setResultado(res.data.datos);
      setMensaje(res.data.mensaje);
    } catch (err) {
      console.error(err);
      setError('No se pudo obtener las combinaciones');
    }
  };

  const limpiarCampos = () => {
    setValor('');
    setResultado([]);
    setMensaje(null);
    setError(null);
  };

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Buscar combinaciones de productos por valor máximo
      </Typography>

      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <TextField
            label="Valor máximo"
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
        />
        <Button variant="contained" onClick={buscarCombinaciones}>
            Buscar
        </Button>
        <Button variant="outlined" color="secondary" onClick={limpiarCampos}>
            Limpiar
        </Button>
      </Box>

      {mensaje && <Alert severity="success">{mensaje}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}

      {resultado.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Producto 1</TableCell>
                <TableCell>Producto 2</TableCell>
                <TableCell align="right">Suma Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {resultado.map((combo, idx) => (
                <TableRow key={idx}>
                  <TableCell>{combo[0] || '-'}</TableCell>
                  <TableCell>{combo[1] || '-'}</TableCell>
                  <TableCell align="right">
                    ${combo[3] || combo[2] || 0}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
}

export default CombinacionesBox;
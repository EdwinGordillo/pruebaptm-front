import React, { useEffect, useState } from 'react';
import {
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Divider
} from '@mui/material';
import api from '../services/api';

function InventarioBox() {
  const [valorTotal, setValorTotal] = useState(null);
  const [productoMayorValor, setProductoMayorValor] = useState(null);
  const [productoMayorPrecio, setProductoMayorPrecio] = useState(null);
  const [productoMayorCantidad, setProductoMayorCantidad] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    cargarDatosInventario();
  }, []);

  const cargarDatosInventario = async () => {
    try {
      const [resTotal, resProductos] = await Promise.all([
        api.get('/productos/valor-inventario'),
        api.get('/productos')
      ]);

      setValorTotal(resTotal.data.datos);

      const productos = resProductos.data.datos;

      if (productos.length > 0) {
        const mayorValor = productos.reduce((max, p) =>
            (p.precio * p.cantidadEnStock) > (max.precio * max.cantidadEnStock) ? p : max
        );

        const mayorPrecio = productos.reduce((max, p) =>
            p.precio > max.precio ? p : max
        );

        const mayorCantidad = productos.reduce((max, p) =>
            p.cantidadEnStock > max.cantidadEnStock ? p : max
        );

        setProductoMayorValor(mayorValor);
        setProductoMayorPrecio(mayorPrecio);
        setProductoMayorCantidad(mayorCantidad);
      }
    } catch (err) {
        console.error('Error cargando inventario:', err);
        setError('No se pudo obtener el inventario.');
    } finally {
        setCargando(false);
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
            Inventario
        </Typography>

        {cargando ? (
            <CircularProgress />
        ) : error ? (
            <Alert severity="error">{error}</Alert>
        ) : (
        <>
            <Typography variant="body1" gutterBottom>
                <strong>Valor total del inventario:</strong>
            </Typography>
            <Typography variant="h4" color="primary" gutterBottom>
                ${valorTotal.toFixed(2)}
            </Typography>

            <Divider sx={{ my: 3 }} />

            {productoMayorValor && (
            <>
                <Typography variant="subtitle1" gutterBottom>
                    Producto con mayor valor total (precio × cantidad):
                </Typography>
                <Typography>{productoMayorValor.nombre}</Typography>
                <Typography variant="body2" color="text.secondary">
                    Precio: ${productoMayorValor.precio} × Cantidad: {productoMayorValor.cantidadEnStock} ={' '}
                    <strong>${(productoMayorValor.precio * productoMayorValor.cantidadEnStock).toFixed(2)}</strong>
                </Typography>

                <Divider sx={{ my: 2 }} />
            </>
            )}

            {productoMayorPrecio && (
            <>
                <Typography variant="subtitle1" gutterBottom>
                    Producto con mayor precio unitario:
                </Typography>
                <Typography>{productoMayorPrecio.nombre}</Typography>
                <Typography variant="body2" color="text.secondary">
                    Precio: <strong>${productoMayorPrecio.precio}</strong>
                </Typography>

                <Divider sx={{ my: 2 }} />
            </>
            )}

            {productoMayorCantidad && (
            <>
                <Typography variant="subtitle1" gutterBottom>
                    Producto con mayor cantidad en stock:
                </Typography>
                <Typography>{productoMayorCantidad.nombre}</Typography>
                <Typography variant="body2" color="text.secondary">
                    Cantidad: <strong>{productoMayorCantidad.cantidadEnStock}</strong>
                </Typography>
            </>
          )}
        </>
      )}
    </Paper>
  );
}

export default InventarioBox;
import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Paper,
  Typography,
  Box,
  Snackbar,
  Alert
} from '@mui/material';
import api from '../services/api';

function ProductoForm({ productoEditar = null, onSuccess, onMensaje }) {
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        cantidadEnStock: '',
    });

    const [notificacion, setNotificacion] = useState({
        abierto: false,
        mensaje: '',
        tipo: 'success'
    });

    useEffect(() => {
        if (productoEditar) {
        setFormData({
            nombre: productoEditar.nombre || '',
            descripcion: productoEditar.descripcion || '',
            precio: productoEditar.precio || '',
            cantidadEnStock: productoEditar.cantidadEnStock || '',
        });
        }
    }, [productoEditar]);

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const limpiar = () => {
        setFormData({
        nombre: '',
        descripcion: '',
        precio: '',
        cantidadEnStock: '',
        });
    };

    const mostrarNotificacion = (mensaje, tipo = 'success') => {
        setNotificacion({ abierto: true, mensaje, tipo });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        const response = productoEditar
            ? await api.put(`/productos/${productoEditar.id}`, formData)
            : await api.post('/productos', formData);

        if (onMensaje) {
            onMensaje(response.data.mensaje);
        } else {
            mostrarNotificacion(response.data.mensaje, 'success');
        }

        limpiar();
        if (onSuccess) onSuccess();
        } catch (err) {
        console.error(err);
        if (onMensaje) {
            onMensaje('Error al guardar el producto');
        } else {
            mostrarNotificacion('Error al guardar el producto', 'error');
        }
        }
    };

    return (
        <>
        <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
            {productoEditar ? 'Editar Producto' : 'Crear Producto'}
            </Typography>

            <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
                fullWidth
                name="nombre"
                label="Nombre"
                margin="normal"
                required
                value={formData.nombre}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                name="descripcion"
                label="Descripción"
                margin="normal"
                value={formData.descripcion}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                name="precio"
                label="Precio"
                type="number"
                margin="normal"
                required
                value={formData.precio}
                onChange={handleChange}
            />
            <TextField
                fullWidth
                name="cantidadEnStock"
                label="Cantidad en Stock"
                type="number"
                margin="normal"
                required
                value={formData.cantidadEnStock}
                onChange={handleChange}
            />

            <Box mt={2}>
                <Button type="submit" variant="contained" color="primary">
                {productoEditar ? 'Actualizar' : 'Crear'}
                </Button>
            </Box>
            </Box>
        </Paper>

        <Snackbar
            open={notificacion.abierto}
            autoHideDuration={3000}
            onClose={() => setNotificacion({ ...notificacion, abierto: false })}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert
            severity={notificacion.tipo}
            variant="filled"
            onClose={() => setNotificacion({ ...notificacion, abierto: false })}
            sx={{ width: '100%' }}
            >
            {notificacion.mensaje}
            </Alert>
        </Snackbar>
        </>
    );
}

export default ProductoForm;
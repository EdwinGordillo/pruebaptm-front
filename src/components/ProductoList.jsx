import React, { useEffect, useState } from 'react';
import api from '../services/api';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Typography, CircularProgress, Divider,
  Snackbar, Alert
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ProductoForm from './ProductoForm';

function ProductoList() {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [productoEditar, setProductoEditar] = useState(null);
    const [notificacion, setNotificacion] = useState({
        abierto: false,
        mensaje: '',
    });

    // Estados para ordenamiento
    const [ordenCampo, setOrdenCampo] = useState(null);
    const [ordenAsc, setOrdenAsc] = useState(true);

    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = async () => {
        try {
        const res = await api.get('/productos');
        setProductos(res.data.datos);
        } catch (error) {
        console.error('Error cargando productos:', error);
        } finally {
        setCargando(false);
        }
    };

    const manejarOrden = (campo) => {
        if (ordenCampo === campo) {
        setOrdenAsc(!ordenAsc);
        } else {
        setOrdenCampo(campo);
        setOrdenAsc(true);
        }
    };

    const productosOrdenados = [...productos].sort((a, b) => {
        if (!ordenCampo) return 0;
        const valA = a[ordenCampo];
        const valB = b[ordenCampo];

        if (typeof valA === 'string') {
        return ordenAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
        } else {
        return ordenAsc ? valA - valB : valB - valA;
        }
    });

    return (
        <>
        <Paper sx={{ p: 2, mt: 4 }}>
            <Typography variant="h6" gutterBottom>
            Lista de Productos
            </Typography>

            {cargando ? (
            <CircularProgress />
            ) : (
            <TableContainer component={Paper}>
                <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell
                            onClick={() => manejarOrden('nombre')}
                            style={{ cursor: 'pointer' }}
                        >
                            Nombre {ordenCampo === 'nombre' ? (ordenAsc ? '↑' : '↓') : ''}
                        </TableCell>
                        <TableCell
                            onClick={() => manejarOrden('descripcion')}
                            style={{ cursor: 'pointer' }}
                        >
                            Descripción {ordenCampo === 'descripcion' ? (ordenAsc ? '↑' : '↓') : ''}
                        </TableCell>
                        <TableCell
                            onClick={() => manejarOrden('precio')}
                            style={{ cursor: 'pointer' }}
                        >
                            Precio {ordenCampo === 'precio' ? (ordenAsc ? '↑' : '↓') : ''}
                        </TableCell>
                        <TableCell
                            onClick={() => manejarOrden('cantidadEnStock')}
                            style={{ cursor: 'pointer' }}
                        >
                            Cantidad {ordenCampo === 'cantidadEnStock' ? (ordenAsc ? '↑' : '↓') : ''}
                        </TableCell>
                        <TableCell align="right">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {productos.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={5} align="center">
                        No hay productos registrados.
                        </TableCell>
                    </TableRow>
                    ) : (
                    productosOrdenados.map((prod) => (
                        <TableRow key={prod.id}>
                        <TableCell>{prod.nombre}</TableCell>
                        <TableCell>{prod.descripcion}</TableCell>
                        <TableCell>${prod.precio}</TableCell>
                        <TableCell>{prod.cantidadEnStock}</TableCell>
                        <TableCell align="right">
                            <IconButton
                            color="primary"
                            size="small"
                            onClick={() => setProductoEditar(prod)}
                            >
                            <EditIcon />
                            </IconButton>
                            <IconButton color="error" size="small">
                            <DeleteIcon />
                            </IconButton>
                        </TableCell>
                        </TableRow>
                    ))
                    )}
                </TableBody>
                </Table>
            </TableContainer>
            )}
        </Paper>

        {productoEditar && (
            <>
            <Divider sx={{ my: 4 }} />
            <ProductoForm
                productoEditar={productoEditar}
                onSuccess={() => {
                setProductoEditar(null);
                cargarProductos();
                }}
                onMensaje={(msg) =>
                setNotificacion({ abierto: true, mensaje: msg })
                }
            />
            </>
        )}

        <Snackbar
            open={notificacion.abierto}
            autoHideDuration={3000}
            onClose={() => setNotificacion({ ...notificacion, abierto: false })}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <Alert
            onClose={() => setNotificacion({ ...notificacion, abierto: false })}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
            >
            {notificacion.mensaje}
            </Alert>
        </Snackbar>
        </>
    );
}

export default ProductoList;
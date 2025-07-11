import React from 'react';
import { Grid, Card, CardActionArea, CardContent, Typography } from '@mui/material';

function Dashboard({ setVista }) {
  const opciones = [
    { label: 'Listar Productos', key: 'listar' },
    { label: 'Crear Producto', key: 'crear' },
    { label: 'Inventario', key: 'inventario' },
    { label: 'Combinaciones', key: 'combinaciones' },
    { label: 'Curiosidades Gato', key: 'modalGato' },
    { label: 'Dato Inútil Diario', key: 'footer' },
  ];

  return (
    <Grid container spacing={2}>
      {opciones.map((op) => (
        <Grid item xs={12} sm={6} key={op.key}>
          <Card>
            <CardActionArea onClick={() => setVista(op.key)}>
              <CardContent>
                <Typography variant="h6" align="center">
                    {op.label}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Dashboard;
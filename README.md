# A&J Imports Motors — Portal web

Landing page + ficha de producto para A&J Imports Motors C.A., en HTML/CSS/JS puro (sin dependencias, sin base de datos).

## Estructura del proyecto

```
aj-imports-motors/
├── index.html          → Landing principal (hero, catálogo, servicios, contacto)
├── producto.html        → Ficha de detalle de producto (galería, specs, reseñas)
├── css/
│   ├── index.css         → Estilos de la landing
│   └── product.css       → Estilos de la ficha de producto
└── js/
    ├── index.js           → Lógica de la landing
    └── product.js         → Lógica de la ficha de producto
```

Ambas páginas comparten el mismo sistema de diseño (variables de color en `:root`, modo oscuro, tipografía) pero cada una tiene su propio CSS/JS porque su contenido es distinto.

## Funcionalidades

- **Bilingüe (ES/EN)** — botón en el nav, traduce todo el contenido de la página.
- **Modo oscuro** — botón 🌙/☀️ junto al de idioma.
- **Panel de edición sin base de datos** (solo en `index.html`) — botón ✎ flotante:
  - Clic en cualquier texto para editarlo directo.
  - Clic en cualquier imagen para reemplazarla desde tu computadora.
  - "Guardar cambios" → persiste en el navegador (`localStorage`).
  - "Descargar HTML" → exporta un `index.html` nuevo con los cambios ya aplicados (la forma más confiable de persistir sin backend).
- **Catálogo con tabs** — Vehículos / Repuestos, cada uno con sus propios filtros.
- **Ficha de producto** (`producto.html?id=veh-0`, `?id=part-3`, etc.):
  - Galería: foto principal + 4 miniaturas, clic para reemplazar.
  - Calificación de 5 estrellas con promedio calculado en vivo.
  - Sistema de comentarios (persistido por producto en `localStorage`).

## Cómo usarlo

1. Abre `index.html` en tu navegador (doble clic, o súbelo a cualquier hosting estático).
2. Haz clic en cualquier vehículo o repuesto del catálogo para ir a su ficha de producto.
3. Para editar contenido de la landing, usa el botón ✎ en la esquina inferior derecha de `index.html`.

## Notas técnicas

- No requiere servidor, build step, ni dependencias — son archivos estáticos.
- `localStorage` funciona una vez alojado en un dominio real; dentro de vistas previas en sandbox (como la de Claude.ai) puede no persistir entre recargas — usa "Descargar HTML" para no perder cambios ahí.
- Los datos de vehículos/repuestos/artículos viven como arreglos JS al inicio de `js/index.js` y `js/product.js` — reemplázalos por tu inventario real o conéctalos a una API más adelante.

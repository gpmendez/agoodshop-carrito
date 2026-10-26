# agoodshop-carrito

## Descripción

Este proyecto consiste en una simulación de un carrito de compra desarrollada con HTML, CSS, JavaScript y PHP.
La aplicación muestra un catálogo de productos obtenido mediante una petición HTTP realizada con fetch(). Los datos son proporcionados por un archivo PHP que devuelve información en formato JSON.

El usuario puede:

- Visualizar los productos disponibles.
- Aumentar o disminuir la cantidad de cada producto.
- Consultar el subtotal de cada artículo.
- Ver un resumen actualizado del carrito.
- Calcular automáticamente el importe total.
- Vaciar el carrito mediante un botón específico.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript (ES6)
- PHP
- JSON
- XAMPP (Apache)
  
## Funcionamiento

1. Al cargar la página, JavaScript realiza una petición mediante fetch() al archivo productos.php.
2. PHP devuelve la información de los productos en formato JSON.
3. JavaScript procesa los datos recibidos y genera dinámicamente el catálogo.
4. El usuario puede modificar las cantidades de los productos.
5. El carrito actualiza automáticamente los subtotales y el total de la compra.

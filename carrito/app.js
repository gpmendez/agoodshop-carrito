class Carrito {

    constructor(productos, moneda = "€") {

        this.productos = productos;
        this.moneda = moneda;

        for (const producto of this.productos) {

            producto.price = Number(producto.price)|| 0;
            producto.quantity = 0;
            producto.subtotal = 0;

        }
    }

    obtenerInformacionProducto(sku) {

        return this.productos.find(
            producto => producto.SKU === sku
        );

    }

    actualizarUnidades(sku, unidades) {

        const producto =
            this.obtenerInformacionProducto(sku);

        if (!producto) {
            return;
        }

        producto.quantity =
            Math.max(0, parseInt(unidades) || 0);

        producto.subtotal = Number(
            (
                producto.price *
                producto.quantity
            ).toFixed(2)
        );
    }

    obtenerCarrito() {

        const products =
            this.productos.filter(
                producto =>
                    producto.quantity > 0
            );

        let total = 0;

        for (const producto of products) {

            total += producto.subtotal;

        }

        return {
            products,
            total: Number(
                total.toFixed(2)
            ),
            currency: this.moneda
        };
    }

    vaciarCarrito() {

        for (const producto of this.productos) {

            producto.quantity = 0;
            producto.subtotal = 0;

        }
    }
}

// ELEMENTOS DEL DOM

let carrito;

const tabla =
    document.getElementById("productos");

const resumen =
    document.getElementById("resumen");

const total =
    document.getElementById("total");

const estado =
    document.getElementById("estado");

const vaciar =
    document.getElementById("vaciar");


// FORMATO MONEDA


function dinero(numero) {

    return (
        numero.toFixed(2)
        + " "
        + carrito.moneda
    );

}


// MOSTRAR INTERFAZ


function mostrar() {

    tabla.replaceChildren();
    resumen.replaceChildren();

    for (const producto of carrito.productos) {

        const fila =
            document.createElement("tr");

        fila.innerHTML = `
            <td>
                <strong></strong>
                <small></small>
            </td>

            <td class="cantidad">
                <button type="button" class="menos">
                    −
                </button>

                <input
                    type="text"
                    readonly
                    aria-label="Cantidad">

                <button type="button" class="mas">
                    +
                </button>
            </td>

            <td class="precio"></td>

            <td class="subtotal"></td>
        `;

        fila.querySelector("strong")
            .textContent =
            producto.title;

        fila.querySelector("small")
            .textContent =
            "REF: " + producto.SKU;

        fila.querySelector("input")
            .value =
            producto.quantity;

        fila.querySelector(".precio")
            .textContent =
            dinero(producto.price);

        fila.querySelector(".subtotal")
            .textContent =
            dinero(producto.subtotal);

        fila.querySelector(".menos")
            .onclick =
            () => cambiar(
                producto.SKU,
                -1
            );

        fila.querySelector(".mas")
            .onclick =
            () => cambiar(
                producto.SKU,
                1
            );

        tabla.append(fila);
    }

    const datos =
        carrito.obtenerCarrito();

    if (datos.products.length === 0) {

        const li =
            document.createElement("li");

        li.textContent =
            "El carrito está vacío.";

        resumen.append(li);
    }

    for (const producto of datos.products) {

        const li =
            document.createElement("li");

        li.textContent =
            `${producto.quantity} × ${producto.title}: ${dinero(producto.subtotal)}`;

        resumen.append(li);
    }

    total.textContent =
        dinero(datos.total);
}


// CAMBIAR CANTIDAD


function cambiar(sku, cambio) {

    const producto =
        carrito.obtenerInformacionProducto(sku);

    if (!producto) {
        return;
    }

    carrito.actualizarUnidades(
        sku,
        producto.quantity + cambio
    );

    mostrar();
}


// BOTÓN VACIAR


vaciar.addEventListener(
    "click",
    () => {

        carrito.vaciarCarrito();

        mostrar();

    }
);

// CARGAR API


const URL_API =
    "productos.php";

async function iniciar() {

    try {

        const respuesta =
            await fetch(URL_API);

        if (!respuesta.ok) {

            throw new Error(
                "HTTP " +
                respuesta.status
            );
        }

        const datos =
            await respuesta.json();

        carrito =
            new Carrito(
                datos.products,
                datos.currency
            );

        mostrar();

        estado.textContent =
            "Productos cargados correctamente.";

    } catch (error) {

        estado.textContent =
            "Error al cargar productos: "
            + error.message;
    }
}

iniciar();
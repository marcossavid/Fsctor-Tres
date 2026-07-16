const spanVolver = document.querySelector('div.back-link')
const tableBody = document.querySelector('table tbody#cartBody')
const pTotalCarrito = document.querySelector('p#totalAmount')
const buttonCheckout = document.querySelector('button#buttonFinalizarCompra')
const carrito = recuperarCarrito()

// Funciones de lógica

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito) )
}

function recuperarCarrito() {
    const carritoRecuperado = JSON.parse( localStorage.getItem('carrito') )

    if (carritoRecuperado === null ) {
        return []
    } else {
        return carritoRecuperado
    }
}

function armarFilaCarrito(producto) {
    return `<tr>
                <td class="product-image">${producto.imagen}</td>
                <td class="product-name">${producto.nombre}</td>
                <td class="product-price">$ ${producto.precio.toLocaleString('es-AR')}</td>
                <td class="product-delete">
                    <span class="product-delete material-symbols-outlined" 
                          id="${producto.id}">
                        delete
                    </span>
                </td>
            </tr>`
}

function cargarCarritoDeCompras() {
    if (carrito.length > 0) {
        tableBody.innerHTML = ''

        carrito.forEach((producto)=> {
            tableBody.innerHTML += armarFilaCarrito(producto)
        })

        pTotalCarrito.textContent = `$ ${calcularTotalCarrito()}`
    } else {
        location.href = 'index.html'
    }
}

function calcularTotalCarrito() {
    if (carrito.length > 0) {
        let total = carrito.reduce((acc, producto)=> acc + producto.precio, 0 )

        return total.toLocaleString('es-AR')
    }
}


// Función Principal
cargarCarritoDeCompras()


// Eventos
buttonCheckout.addEventListener('click', ()=> {
    localStorage.removeItem('carrito')
    carrito.length = 0
    alert('🛍️ Muchas gracias por su compra.')
    setTimeout(()=> {
        location.href = 'index.html'
    }, 3500)
})

spanVolver.addEventListener('click', ()=> location.href = 'index.html' )
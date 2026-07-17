// DECLARAR VARIABLES, CONSTANTES Y ENLACES AL DOM HTML
const btnCarrito = document.querySelector('div.checkout-header')
const inputSearch = document.querySelector('input#inputSearch')
const divContenedor = document.querySelector('div.products-container')
const divContainerCategorias = document.querySelector('div.container-categories')
const carrito = recuperarCarrito()


// FUNCIONES DE LÓGICA 

function retornarSpanCategoria(cate) {
    // return `<span class="category-tag">${cate}</span>`

    const spanCategoria = document.createElement('span')
    spanCategoria.className = 'category-tag'
    spanCategoria.id = cate.toLowerCase()
    spanCategoria.textContent = cate.toUpperCase()

    return spanCategoria
}

function cargarCategorias() {
    if (arrayCategorias.length > 0) {
        for (let categoria of arrayCategorias) {
            divContainerCategorias.append(retornarSpanCategoria(categoria))
        }
        activarClickEnCategorias()
    }
}

function crearCardHTMLError() {
    return `<div class="card error">
                <div class="card-icon-image">🔌</div>
                <div class="card-error-title"><h2>No se encuentran productos</h2></div>
                <div class="card-error-detail">Intenta nuevamente en unos instantes.</div>
            </div>`
}

function crearCardProducto(producto) {
    return `<div class="card">
                <div class="card-icon-image">${producto.imagen}</div>
                <div class="card-product-title">${producto.nombre}</div>
                <div class="card-product-price">${producto.precio}</div>
                <button class="card-button-buy" id="${producto.id}">
                    Comprar
                </button>
            </div>`
}

function cargarProductos(array) {
    divContenedor.innerHTML = ""

    if (array.length > 0) {
        for (let producto of array) {
            divContenedor.innerHTML += crearCardProducto(producto)
        }
        activarClickBotonesComprar()
    } else {
        divContenedor.innerHTML = crearCardHTMLError()
    }
}

function obtenerProductos() {
    fetch('assets/js/productos.json')
    .then((response)=> response.json())
    .then((data)=> arrayProductos.push(...data))
    .then(()=> cargarProductos(arrayProductos))
    .catch((error)=> console.error(error) )
}

function activarClickEnCategorias() {
    const spanCategorias = document.querySelectorAll('span.category-tag')

    if (spanCategorias.length > 0) {
        for (let categoria of spanCategorias) {
            categoria.addEventListener('click', ()=> {
                let cate = categoria.textContent.toLowerCase()

                if (cate === 'todos los productos') {
                    cargarProductos(arrayProductos)
                    return 
                }

                const productosFiltrados = arrayProductos.filter((producto)=> producto.categoria === cate )

                if (productosFiltrados.length > 0) {
                    cargarProductos(productosFiltrados)
                } else {
                    alert('No se encontraron productos en esta categoria.')
                }
            })
        }
    }
}

function activarClickBotonesComprar() {
    const botonesComprar = document.querySelectorAll('button.card-button-buy')

    if (botonesComprar.length > 0) {
        for (let botonComprar of botonesComprar) {
            botonComprar.addEventListener('click', ()=> {
                const productoSeleccionado = arrayProductos.find((producto)=> producto.id === botonComprar.id )
                carrito.push(productoSeleccionado)
                guardarCarrito()
            })
        }
    }
}

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

// FUNCIÓN PRINCIPAL
cargarCategorias()
obtenerProductos()


// EVENTOS (aquellos elementos que tendrán un evento definido)
// Usamos el evento 'input' para que se dispare con cada letra que escribes
inputSearch.addEventListener('input', () => {
    let textoAbuscar = inputSearch.value.toLowerCase();

    // Si el input está vacío, recargamos todos los productos originales
    if (textoAbuscar === '') {
        cargarProductos(arrayProductos); // Asumiendo que 'arrayProductos' es tu lista completa original
        return;
    }

   // Usamos .startsWith() en lugar de .includes()
    const productosFiltrados = arrayProductos.filter((producto) => 
        producto.nombre.toLowerCase().startsWith(textoAbuscar)
    );

    // Mostramos los resultados
    cargarProductos(productosFiltrados);
});

btnCarrito.addEventListener('click', ()=> location.href = 'checkout.html' )


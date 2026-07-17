// DECLARAR VARIABLES (SIN DECLARAR arrayProductos DE NUEVO)
const btnCarrito = document.querySelector('div.checkout-header');
const inputSearch = document.querySelector('input#inputSearch');
const divContenedor = document.querySelector('div.products-container');
const divContainerCategorias = document.querySelector('#divContainerCategorias');
const carrito = recuperarCarrito();

// --- FUNCIONES DE LÓGICA ---
const imagenesCategorias = {
    "laptops": "assets/images/celu.png", // Usa los nombres que realmente tienes en tu carpeta
    "smartphones": "assets/images/celu.png",
    "monitores": "assets/images/monitor.png",
    // Agrega todas las que necesites
};
function retornarSlideCategoria(cate, imgUrl) {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.id = cate.toLowerCase();
    slide.innerHTML = `
        <img src="${imgUrl}" alt="${cate}" class="category-img">
        <div class="category-name">${cate.toUpperCase()}</div>
    `;
    return slide;
}

function cargarCategorias(listaCategorias) { 
    divContainerCategorias.innerHTML = ""; 

    for (let categoria of listaCategorias) {
        // Usamos directamente tu diccionario de imágenes
        const imgUrl = imagenesCategorias[categoria.toLowerCase()] || "assets/images/default.png";

        // Pasamos solo 'imgUrl' a la función, ya que 'icono' ya no es necesario
        divContainerCategorias.append(retornarSlideCategoria(categoria, imgUrl));
    }

    // Inicialización del Swiper
    new Swiper('.swiper-categorias', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 3, 
        loop: true,
        pagination: {
            el: '.categorias-pagination',
            clickable: true,
        },
        coverflowEffect: {
            rotate: 30,
            stretch: 0,
            depth: 150,
            modifier: 1,
            slideShadows: true,
        },
        on: {
            click: function (swiper) {
                const slide = swiper.clickedSlide;
                if (!slide) return;
                
                const cate = slide.id;
                
                // Filtramos productos
                if (cate === 'todos los productos') {
                    cargarProductos(window.arrayProductos);
                } else {
                    const filtrados = window.arrayProductos.filter(p => p.categoria.toLowerCase() === cate);
                    cargarProductos(filtrados);
                }

                // Scroll suave
                document.querySelector('.products-container').scrollIntoView({ 
                    behavior: 'smooth' 
                });
            }
        }
    });
}

function cargarProductos(array) {
    divContenedor.innerHTML = "";
    if (array.length > 0) {
        array.forEach(producto => {
            divContenedor.innerHTML += crearCardProducto(producto);
        });
        activarClickBotonesComprar();
    } else {
        divContenedor.innerHTML = crearCardHTMLError();
    }
}

function crearCardHTMLError() {
    return `<div class="card error">
                <div class="card-icon-image">🔌</div>
                <div class="card-error-title"><h2>No se encuentran productos</h2></div>
                <div class="card-error-detail">Intenta nuevamente en unos instantes.</div>
            </div>`;
}

function crearCardProducto(producto) {
    return `<div class="card">
                <div class="card-icon-image">${producto.imagen}</div>
                <div class="card-product-title">${producto.nombre}</div>
                <div class="card-product-price">${producto.precio}</div>
                <button class="card-button-buy" id="${producto.id}">Comprar</button>
            </div>`;
}

function activarClickBotonesComprar() {
    document.querySelectorAll('button.card-button-buy').forEach(btn => {
        btn.addEventListener('click', () => {
            const prod = window.arrayProductos.find(p => p.id === btn.id);
            carrito.push(prod);
            guardarCarrito();
        });
    });
}

function guardarCarrito() { localStorage.setItem('carrito', JSON.stringify(carrito)); }
function recuperarCarrito() { return JSON.parse(localStorage.getItem('carrito')) || []; }

// --- EVENTOS E INICIALIZACIÓN ---

inputSearch.addEventListener('input', () => {
    let busqueda = inputSearch.value.toLowerCase();
    const filtrados = window.arrayProductos.filter(p => p.nombre.toLowerCase().startsWith(busqueda));
    cargarProductos(busqueda === '' ? window.arrayProductos : filtrados);
});

btnCarrito.addEventListener('click', () => location.href = 'checkout.html');

document.addEventListener('DOMContentLoaded', () => {
    obtenerProductos(); 
});

function obtenerProductos() {
    fetch('assets/js/productos.json')
    .then(res => res.json())
    .then(data => {
        // Guardamos en el objeto global window para evitar problemas de alcance
        window.arrayProductos = data; 
        
        // Calculamos las categorías desde los datos obtenidos
        const categoriasUnicas = ['todos los productos', ...new Set(data.map(p => p.categoria))];
        
        cargarProductos(window.arrayProductos);
        cargarCategorias(categoriasUnicas); 
    })
    .catch(err => console.error(err));
}
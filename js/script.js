document.addEventListener('DOMContentLoaded', function() {

    const modal = document.getElementById('modal-producto');
    const cerrarModal = document.querySelector('.cerrar-modal');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalDetalles = document.getElementById('modal-detalles');
    const modalBotonWhatsapp = document.getElementById('modal-boton-whatsapp');

    // Selector específico para los botones "Ver más" de las ofertas destacadas
    const botonesVerMasOfertas = document.querySelectorAll('.ofertas-destacadas .producto a');

    botonesVerMasOfertas.forEach(boton => {
        boton.addEventListener('click', function(event) {
            event.preventDefault(); // <--- ¡Asegúrate de que esta línea esté aquí!
            const productoId = obtenerIdProducto(this);
            if (productoId) {
                mostrarDetallesProducto(productoId);
            } else {
                console.warn('No se pudo obtener el ID del producto.');
            }
        });
    });

    cerrarModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    function obtenerIdProducto(elemento) {
        // Intentar obtener el ID del atributo data-product-id del contenedor .producto
        const productId = elemento.closest('.producto')?.dataset?.productId;
        if (productId) {
            return productId;
        }
        return null;
    }

    function mostrarDetallesProducto(id) {
        let detalles = {};
        if (id === 'oferta1') {
            detalles = {
                nombre: 'Oferta Especial 1',
                descripcion: 'Descripción detallada de la oferta especial número 1.',
                precio: '$XX.XX',
                imagen: 'ruta/a/tu/imagen-oferta1.jpg' // Añade la ruta de la imagen
            };
        } else if (id === 'oferta2') {
            detalles = {
                nombre: 'Oferta Especial 2',
                descripcion: 'Descripción detallada de la oferta especial número 2.',
                precio: '$YY.YY',
                imagen: 'ruta/a/tu/imagen-oferta2.jpg' // Añade la ruta de la imagen
            };
        }
        // ... añade más casos para las otras ofertas ...
    
        if (detalles.nombre) {
            modalTitulo.textContent = detalles.nombre;
            modalDetalles.innerHTML = `
                <img src="${detalles.imagen}" alt="${detalles.nombre}" class="modal-imagen">
                <p>${detalles.descripcion}</p>
                <p>Precio: <strong>${detalles.precio}</strong></p>
            `;
    
            const telefonoNegocio = '+549XXXXXXXXXXX'; // Reemplaza con tu número
            const mensaje = `Hola, estoy interesado/a en la oferta: ${detalles.nombre} - ${detalles.precio}`;
            modalBotonWhatsapp.href = `https://wa.me/${telefonoNegocio}?text=${encodeURIComponent(mensaje)}`;
            modalBotonWhatsapp.style.display = 'inline-block';
    
            modal.style.display = 'block';
        } else {
            alert('Detalles de la oferta no encontrados para el ID: ' + id);
        }
    }


    // Carrusel de textos dinámico
    const carouselTexts = document.querySelectorAll('.carousel-text');
    let currentIndex = 0;

    function showNextText() {
        carouselTexts.forEach(text => text.classList.remove('active'));
        currentIndex = (currentIndex + 1) % carouselTexts.length;
        carouselTexts[currentIndex].classList.add('active');
    }

    if (carouselTexts.length > 0) {
        carouselTexts[0].classList.add('active');
        setInterval(showNextText, 3000); // Cambia el texto cada 3 segundos
    }

   

    // Funcionalidad para preguntas frecuentes (ejemplo básico)
    const preguntas = document.querySelectorAll('.pregunta h3');
    preguntas.forEach(pregunta => {
        pregunta.addEventListener('click', function() {
            this.nextElementSibling.classList.toggle('visible');
        });
    });








});
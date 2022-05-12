const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const total = document.querySelector('#total').textContent;
const precioTotal = document.querySelector('#precioTotal');
let articulosCarrito = [];

cargarListeners();

function cargarListeners() {
    // Presionamos boton para agregar cursos
    listaCursos.addEventListener('click', agregarCurso);

    // Presionamos para eliminar cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Presionamos para vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        carritoHtml();
    });

    // Desaparecemos el total
    total.remove();
}

// Funciones
function agregarCurso(e) {
    e.preventDefault(); // Evita que el evento por defecto se ejecute
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSelect = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSelect);
    }
}

function eliminarCurso(e) {
    e.preventDefault(); // Evita que el evento por defecto se ejecute
    if (e.target.classList.contains('borrar-curso')) {
        const curso_id = e.target.getAttribute('data-id');
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== curso_id);
        carritoHtml();
    }
}

function leerDatosCurso(curso) {
    // Crea un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisa si un elemento existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);

    if (existe) {
        // Actualizar cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; // Retorna el objeto actualizado
            } else {
                return curso; // Retorna los objetos que no son duplicados
            }
        });

        articulosCarrito = [...cursos];
    } else {
        // Se agrega al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHtml();
}

// Muestra el carrito de compras en el html (Llenarlo)
function carritoHtml() {
    LimpiarHtml();

    articulosCarrito.forEach(curso => {
        const { imagen, titulo, precio, id, cantidad } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${imagen}"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id=${id}>X</a></td>
        `;

        contenedorCarrito.appendChild(row);
    });
}

// Eliminar los cursos del tbody
function LimpiarHtml() {
    // Forma lenta
    /*contenedorCarrito.innerHTML = '';*/

    // Forma rapida y sencilla
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
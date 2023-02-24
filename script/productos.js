var ProdsCarrito = [];

const productosHtml = () => {
    const productos = getProductos()
    const arrayReducido = productos.reduce((acc, elemento) => {
        return acc + `
        <p>
            ${elemento.descrip}
        </p>
        
        `
    }, "")

    document.querySelector(".contenedorpro").innerHTML = arrayReducido
}

async function getProductos() {
    const repuesta = await fetch("https://63c27ec1b0c286fbe5ee8771.mockapi.io/FinalJavaScript/ShopIsa")
    if (!repuesta.ok) {
        throw new Error(`HTTP error! status: ${repuesta.status}`);
    }
    let data = await repuesta.json()
    console.log(data)
    return  data;
}

let formProductos = document.querySelector("#form-productos")
const inputProducto = document.querySelector("#input-producto")
const inputPrecio = document.querySelector("#input-precio")
const inputImg = document.querySelector("#input-img")
const inputDescrip = document.querySelector("#input-descrip")
const inputCategoria = document.querySelector("#input-categoria")
const inputCantidad = document.querySelector("#input-cantidad")
const inputOferta = document.querySelector("#input-oferta")
const inputDescuento = document.querySelector("#input-descuento")

formProductos.addEventListener('onsubmit', (event) => {
    e.preventDefault()

    fetch("https://63c27ec1b0c286fbe5ee8771.mockapi.io/FinalJavaScript/ShopIsa", {
        method: "POST",
        body: JSON.stringify({
            Img: inputImg.value,
            Precio: inputPrecio.value,
            Producto: inputProducto.value,
            Descrip: inputDescrip.value,
            Categoria: inputCategoria.value,
            Cantidad: inputCantidad.value,
            Oferta: inputOferta.value,
            Descuento: inputDescuento.value
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => res.json())
    .then(data => console.log(data))
});



async function updateProducto(id) {
    fetch(`https://63c27ec1b0c286fbe5ee8771.mockapi.io/FinalJavaScript/ShopIsa/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            Img: Img,
            Precio: Precio,
            Producto: Producto,
            Descrip: Descrip,
            Categoria: Categoria,
            Cantidad: Cantidad,
            Oferta: Oferta,
            Descuento: Descuento
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })


    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch(() => {
        console.log("No se encontro registro para modificar, vuelva a intentarlo")
    })
}


const inputProductos = document.querySelector("#input-busqueda")

function peticion(busqueda) {
    fetch(`https://63c27ec1b0c286fbe5ee8771.mockapi.io/FinalJavaScript/ShopIsa/${busqueda}/`)
    .then(res => res.json())
    .then(data => {
        alert(`El nombre del producto buscado es: ${data.descrip}`)
    })
    .catch(() => console.log("no se encontro"))
}






const cards = (array) => {
    const nodos = array.reduce((acc, element) => {
        return acc + `
        <div class="card" id="descrip-${element.descrip}">
            <div class="container-img">
                <img src=${element.img} alt=${element.descrip}>
            </div>
            <h2>
                ${element.descrip}
            </h2>
            <h3>
                ${element.status}
            </h3>
        </div>
        `
    }, "")
    document.querySelector(".contenedorcard").innerHTML = nodos
}

const personajes = async () => {
    const respuesta = await fetch("https://63c27ec1b0c286fbe5ee8771.mockapi.io/FinalJavaScript/ShopIsa")
    const data = await respuesta.json()
    cards(data.results)
    const cardsPersonajes = document.querySelectorAll(".card")
    cardsPersonajes.forEach(elemento => {
        elemento.onclick = () => {
            const id = elemento.id.slice(10)
            const filtrarPersonaje = data.results.filter(elemento => {
                return elemento.id === Number(id)
            })
            console.log(filtrarPersonaje)
        }
    })
}


let paginaSiguiente = 40

function nextPage() {
    document.querySelector("#next").onclick = () => {
        if (paginaSiguiente != 42) {
            paginaSiguiente++
            document.querySelector("#next")
        }
        console.log(paginaSiguiente)
        fetch(`https://63c27ec1b0c286fbe5ee8771.mockapi.io/FinalJavaScript/ShopIsa?page=${paginaSiguiente}`)
            .then(res => res.json())
            .then(data => {
                cards(data.results)
            })

    }
}


function Consultar() {
    let carrito2 = JSON.parse(localStorage.getItem('carrito2')) ||
    [];

    fetch()
    .then(res => res.json())
    .then(data => cargarproductos(data));
}


async function CargarCarrito(id) {

    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    console.log(cart);
;

    let  listaProductos =  await getProductos();

    
    listaProductos.forEach(producto => {
        if (producto.id == id) {
            cart.push(producto);
        }
        });

    
    localStorage.setItem("cart", JSON.stringify(cart));

}

async function EliminarProductoCarrito(id) {

    
    let cart = JSON.parse(localStorage.getItem("cart") || "[]");
    console.log(cart);
    ;
    let aux = [];

    
    cart.forEach(producto => {
        if (producto.id != id) {
            aux.push(producto);
        }
    });

    
    localStorage.setItem("cart", JSON.stringify(aux));

}

async function VaciarCarrito() {
    let aux = [];
    localStorage.setItem("cart", JSON.stringify(aux));
  }
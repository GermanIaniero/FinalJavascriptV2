const descuento = null

const mostrarOfertas = true

function compare( a, b ) {
    if ( a.descrip < b.descrip ){
      return -1;
    }
    if ( a.descrip > b.descrip ){
      return 1;
    }
    return 0;
}

async function cardsHtml ( contenedor, filtrarOferta ) {
    let  listaProductos =  await getProductos();
    console.log(listaProductos)
    listaProductos.forEach(producto => {

        if (producto.oferta == true) {

            const card = document.createElement("div")
            
            card.className = "card col-md-2 col-lg-2 col-xl-2 mx-auto mb-4"
            card.id = producto.id
            card.innerHTML = `
            <div class="container-img">
                <img src=${producto.img} alt=${producto.descrip}>
            </div>
            <h2>
                ${producto.descrip}
            </h2><br/>
            <h5>
               Precio: ${producto.precio}<br/>
               Descuento: ${producto.descuento}%<br/>
               Total: ${producto.precio - (producto.precio * producto.descuento / 100)}
            </h5>
            <button class="carrito" onclick="CargarCarrito(${producto.id})" id="${producto.id}">Agregar al Carrito</button>
        `
            contenedor.appendChild(card)
        }
    });

    console.log("lista de producto cargada")
}


const contenedor = document.querySelector(".list-product")


if(mostrarOfertas){
    document.getElementById('titulo').innerHTML="Mostrando Ofertas"
}else{
    document.getElementById('titulo').innerHTML="Mostrando Productos sin Ofertas"
}

cardsHtml(contenedor,mostrarOfertas)



/* cards 2 js */

contenedor = document.querySelector(".container")

const cardHtml = ( array ) => {
    const generarNodos = array.reduce(( acc, element) => {
     if (element.oferta == true) {  
        return acc + `
         <div class="container">
           <!--<div class="row list-product">-->
            <div class="card" id="stockProductos-${element.id}">
                <div class="container-img">
                <img src=${element.img} alt=${element.descrip}>
                </div>
                <h2>
                    ${element.descrip}
                </h2><br/>
                <h5>
                   Precio: ${element.precio}<br/>
                   Descuento: ${element.descuento}%<br/>
                   Total: ${element.precio - (element.precio * element.descuento / 100)}
                </h5>
                <button id="boton-${element.id}" class="boton-card">
                    Añadir al carrito
                </button>
            </div>
          </div>  
        </div>  
        `
     }  
    }, "")

    contenedor.innerHTML = generarNodos
}

cardHtml(stockProductos)

let carrito = []


function aniadirAlCarrito (array) {
    const botonAniadir = document.querySelectorAll(".boton-card")    
    botonAniadir.forEach( boton => {
        boton.onclick = () => {
            const id = boton.id.slice(6)
            const filtrarProducto = array.find((elemento) => {
                return elemento.id === Number(id)
            })
            carrito.push(filtrarProducto)   
            localStorage.setItem("carrito", JSON.stringify(carrito))   
        }
        
    })
}

aniadirAlCarrito(stockProductos)

const productosElegidos = JSON.parse(localStorage.getItem("carrito"))
carrito = productosElegidos || []
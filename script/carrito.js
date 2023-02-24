let infoDelLs = JSON.parse(localStorage.getItem("carrito"))

const cardHtml = ( array ) => {
    const generarNodos = array.reduce(( acc, element) => {
        return acc + `
        <div class="container">
          <div class="row list-product">
            <div class="card" id="stockProductos2-${element.id}">
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
                    Eliminar del carrito
                </button>
            </div>
          </div>
        </div>   
        `
    }, "")

    document.querySelector(".carrito-contenedor").innerHTML = generarNodos
}

cardHtml(infoDelLs || [])

function borrarDelCarrito (array) {
    const botonAniadir = document.querySelectorAll(".boton-card")    
    botonAniadir.forEach( boton => {
        boton.onclick = () => {
            const id = boton.id.slice(6)            
            const filtrarProducto = array.filter((elemento, i) => {
                return elemento.id != Number(id)
            })
            infoDelLs = filtrarProducto
            localStorage.setItem("carrito", JSON.stringify(infoDelLs))
            console.log(infoDelLs)    
            cardHtml(infoDelLs)
            borrarDelCarrito(infoDelLs)       
        }
        
    })
}

borrarDelCarrito(infoDelLs)

const botonBorrarCarrito = document.querySelector("#borrar-productos")

botonBorrarCarrito.onclick = () => {
    localStorage.removeItem("carrito")
    document.querySelector(".carrito-contenedor").innerHTML = "no hay productos"
}

function HacerClick() {
    swal({
      title: "¿Desea continuar con el pago?",
      text: "Verifique antes de pagar",
      icon: "info",
      button: "Entendido"
    });
  }
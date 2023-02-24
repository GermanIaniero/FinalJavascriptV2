const carritoAbrir = document.getElementById('boton-carrito');
const carritoCerrar = document.getElementById('carritoCerrar');

const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const modalCarrito = document.getElementsByClassName('modal-carrito')[0]

carritoAbrir.addEventListener('click', ()=> {
    contenedorModal.classList.toggle('modal-active')
})
carritoCerrar.addEventListener('click', ()=> {
    contenedorModal.classList.toggle('modal-active')
})
modalCarrito.addEventListener('click',(e)=>{
    e.stopPropagation()
})
contenedorModal.addEventListener('click', ()=>{
    carritoCerrar.click()
})



let infoDelLs = JSON.parse(localStorage.getItem("carrito"))

const cardHtml = ( array ) => {
    const generarNodos = array.reduce(( acc, element) => {
        return acc + `
            <div class="card" id="button-${element.id}">
                <div class="container-img">
                    <img src=${element.img} alt=${element.descrip}>
                </div>                
                <h2>
                    ${element.descrip}
                </h2>
                <button id="boton-${element.id}" class="boton-card">
                    Eliminar del carrito
                </button>
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
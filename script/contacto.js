const form = document.getElementById("form")
const nombre = document.getElementById("fname")
const apellido = document.getElementById("lname")
const email = document.getElementById("email")
const parrafo = document.getElementById("warnings")

form.addEventListener("submit", e=>{
    e.preventDefault()
    let warnings = ""
    let entrar = false
    let Email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
    parrafo.innerHTML = ""
    if(nombre.value.length <3){
        warnings += `El nombre no es valido <br>`
        entrar = true
    }
    if(!Email.test(email.value)){
        warnings += `El email no es valido <br>`
        entrar = true
    }
    if(apellido.value.length <3){
        warnings += `El apellido no es valido <br>`
        entrar = true
    }
    

    if(entrar){
        parrafo.innerHTML = warnings
    }else{
        parrafo.innerHTML = "Enviado"
    }
})

  function limpiarFormulario() {
    document.getElementById("miForm").reset();
  }



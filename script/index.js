let nav2 = document.getElementById("nav"); 
nav2.onclick = myFunction; 

  
  
  function myFunction() {
    let x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  
  let swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });


 const btn = document.querySelector(".dark");
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme == "dark") {
    document.body.classList.add("dark-theme");
  }
  
  btn.addEventListener("click", function () {
    document.body.classList.toggle("dark-theme");
  
    let theme = "light";
    if (document.body.classList.contains("dark-theme")) {
      theme = "dark";
    }
    localStorage.setItem("theme", theme);
  });



  let p = document.getElementById("pagar"); 
  p.onclick = muestraAlerta; 
  
  function muestraAlerta(evento) {
    alert("Esta a punto de pagar");
  }
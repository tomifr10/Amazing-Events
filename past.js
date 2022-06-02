let buscador = document.querySelector(".buscador");
let textoBusq = "";
let dataEventos;
let dataFecha;
let dataPastEvent;
let check = "";
let filtroDef = [];
let filtroCat = [];


async function dataAPI() {
    await fetch("https://amazing-events.herokuapp.com/api/events")
        .then(resp => resp.json())
        .then(eventos => dataEventos = eventos);
        console.log(dataEventos);

    dataFecha = dataEventos.currentDate;
    let dataPastEvent = dataEventos.events.filter(event => event.date < dataFecha);
    console.log(dataPastEvent)
    
    let categories = dataPastEvent.map(evento => evento.category);
    
    function creadorCheck() {
        let catFil = new Set (categories);
        catFil = Array.from(catFil);
        console.log(catFil)
        catFil.forEach((category,index) => {
            check += `
            <div class="caja-check">
                    <input class="box" type="checkbox" name="category" value="${category}" id="${index}">
                    <label>${category}</label>
                </div>`;
            document.querySelector(".checkbox").innerHTML = check;
        });
    }

    buscador.addEventListener("keyup", (e)=> {
        let letra = e.target.value;
        textoBusq = letra;
        mostarFiltro();
    });

    creadorCheck();

    let checkboxes = document.querySelectorAll(".box");
    let filtroCat = [];
    checkboxes.forEach(caja => caja.addEventListener("click", (e)=> {
        let check = e.target;
        if(check.checked) {
            filtroCat.push(check.value);
            mostarFiltro();
        } else {
            filtroCat.splice(e.target.indexOff, 1);
        // filtroCat = filtroCat.filter(cheq => cheq !== check.value);
        mostarFiltro();
        }
    }));

    function creadorTarjPast(filtro){
        let tarjeta = "";
        filtro.map(crearTarjeta => {
        tarjeta += `
            <div class="card tarjeta" style="width: 18rem;">
              <img src="${crearTarjeta.image}" class="card-img-top" alt="...">
              <div class="card-body">
                  <h5 class="card-title text-center">${crearTarjeta.name}</h5>
                  <p class="text-center">${crearTarjeta.description}</p>
                  <div class="d-flex w-75 justify-content-around align-items-center">
                  <span>Price: $${crearTarjeta.price}</span>
                  <a href="details.html?id=${crearTarjeta._id}" class="btn btn-primary">See more</a>
                  </div>
                </div>
            </div>`;
        document.querySelector(".tarjetas").innerHTML = tarjeta;
        })
        // dataPastEvent.map((evento,id) =>evento.id = id);
    };

    function mostarFiltro() {
        filtroDef = [];
        if(filtroCat.length > 0 && textoBusq != "") {
            filtroCat.map(tarjCheck => {
                filtroDef.push(...dataPastEvent.filter(tarj=> (tarj.category == tarjCheck) && tarj.name.toLowerCase().includes(textoBusq.toLowerCase().trim())))
            });
            if(filtroDef.length == 0) {
                document.querySelector(".tarjetas").innerHTML =  `<p class="noFound">No results found.</p>`;
            };
        } else if(filtroCat.length == 0 && textoBusq != "") {
            filtroDef.push(...dataPastEvent.filter(title => 
                title.name.toLowerCase().includes(textoBusq.toLowerCase().trim())
            ));
            if(filtroDef.length == 0) {
                document.querySelector(".tarjetas").innerHTML =  `<p class="noFound">No results found.</p>`;
            };
        } else if (filtroCat.length > 0 && textoBusq == "") {
            filtroCat.map(tarjCheck => {
                filtroDef.push(...dataPastEvent.filter(tarj => tarj.category == tarjCheck))
            });
            if(filtroDef.length == 0) {
                document.querySelector(".tarjetas").innerHTML =  `<p class="noFound">No results found.</p>`;
            };
        } else filtroDef.push(...dataPastEvent);
        creadorTarjPast(filtroDef);
    }
    mostarFiltro();
}
dataAPI()




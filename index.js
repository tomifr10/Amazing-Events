let buscador = document.querySelector(".buscador");
let textoBusq = "";
let filtroCat = [];
let dataEventos = [];
let check = "";

async function dataAPI() {
    await fetch("https://amazing-events.herokuapp.com/api/events")
    .then(resp => resp.json())
    .then(eventos => dataEventos = eventos.events)
    
    let categories = dataEventos.map(evento => evento.category);
    function creadorCheck() {
        let catFil = new Set (categories);
        catFil = Array.from(catFil);
        catFil.forEach((category,index) => {
            check += `
                <div class="caja-check">
                    <input class="box" type="checkbox" name="category" value="${category}" id="${index}">
                    <label>${category}</label>
                </div>`;
            document.querySelector(".checkbox").innerHTML = check;
        });
    }

    creadorCheck();

    let checkboxes = document.querySelectorAll(".box");
    checkboxes.forEach((caja) => caja.addEventListener("change", (e)=> {
        cheqTarj(e);
    }));

    mostarFiltro();
        
}

dataAPI();

function creadorTarj(evento) {
    let tarjeta = ""
    evento.map((crearTarjeta) => {
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
    });
    // dataEventos.map((evento,id) =>evento.id = id);

}

function cheqTarj(e) {
    if(e.target.checked) {
        filtroCat.push(e.target.value)
        console.log(filtroCat);
        mostarFiltro();
    } else {
        filtroCat = filtroCat.filter(check => check !== e.target.value);
        console.log(filtroCat);
        
        mostarFiltro()
    }
}

buscador.addEventListener("keyup", (e) => {
    textoBusq = e.target.value;
    mostarFiltro();
});

function mostarFiltro() {
    let filtroDef = [];
    if(filtroCat.length > 0 && textoBusq !== "") {
        filtroCat.map(categoria => {
            filtroDef.push(...dataEventos.filter(categ => (categ.category == categoria) && (categ.name.toLowerCase().includes((textoBusq.toLowerCase().trim())))))
        });
        if(filtroDef.length == 0) {
            document.querySelector(".tarjetas").innerHTML =  `<p class="noFound">No results found.</p>`;
        }
    } else if (filtroCat.length == 0 && textoBusq !== "") {
        filtroDef.push(...dataEventos.filter(categ => categ.name.toLowerCase().includes((textoBusq.toLowerCase().trim()))));
        if(filtroDef.length == 0) {
            document.querySelector(".tarjetas").innerHTML =  `<p class="noFound">No results found.</p>`;
        }
    } else if (filtroCat.length > 0 && textoBusq == "") {
        filtroCat.map(categoria => filtroDef.push(...dataEventos.filter(categ => (categ.category == categoria))));
        if(filtroDef.length == 0) {
            document.querySelector(".tarjetas").innerHTML =  `<p class="noFound">No results found.</p>`;
        }
    } else filtroDef.push(...dataEventos);
    creadorTarj(filtroDef)
};

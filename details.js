// let dataEventos;

async function dataAPI() {
  await fetch("https://amazing-events.herokuapp.com/api/events")
      .then(resp => resp.json())
      .then(evento => dataEventos = evento.events);
      // dataEventos.map((evento,id) => evento.id = id);
      console.log(dataEventos)
      console.log(dataEventos.id)
      function tarjDetallada() {
        // console.log(dataEventos)
        let id = location.search.split("?id=").filter(num => num = Number);
        let idElegido = id[1];
        console.log(idElegido)
        let evento = dataEventos.find((evento) =>{
            return evento._id == idElegido;
        })
        console.log(evento)
        let templateHtml = `
                <img class="foto-tarj" src="${evento.image}">
                <div class="texto-tarj">
                    <h5 class="titulo-details">${evento.name}</h5>
                    <p class="p-details">${evento.description}</p>
                    <p class="p-details"><span>Place:</span> ${evento.place}</p>
                    <p class="p-details"><span>Date:</span> ${evento.date}</p>
                    <p class="p-details"><span>Price:</span> $${evento.price}</p>
                    <p class="p-details"><span>Catagory: </span>${evento.category}</p>
                    </div>`
        document.querySelector('.tarj-detalle').innerHTML = templateHtml
      }
      tarjDetallada()
}
dataAPI()


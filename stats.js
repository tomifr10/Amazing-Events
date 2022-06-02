let dataEventos;
let attendance;
async function dataAPI() {
    await fetch("https://amazing-events.herokuapp.com/api/events")
        .then(resp => resp.json())
        .then(eventos => data = eventos)

    let dataEventos = data.events;
    let dataFecha = data.currentDate;
    let assisEv = dataEventos.filter(event => event.assistance);
    let capEv = dataEventos.filter(event => event.capacity);

    let assisPerc = [];

    function porcAssis() {
        assisEv.map(ev => {
            let num = ev.assistance;
            let den = ev.capacity;
            let attendanceEvent = num / den;
            assisPerc.push(attendanceEvent);
        })
    }
    porcAssis(assisEv);

    function percentageHigh() {
        percHigh = 0;
        assisPerc.forEach((element) => {
            if (percHigh < element) {
                percHigh = element;
            }
        });
        let indiceMost = assisPerc.indexOf(percHigh)
        let printMost = assisEv[indiceMost].name
        let hAssis = document.querySelector(".h-assis");
        hAssis.innerHTML = printMost + ": " + percHigh * 100 + "%";
    };
    percentageHigh();

    function percentageLow() {
        percLow = 1;
        assisPerc.forEach((element) => {
            if (percLow > element) {
                percLow = element;
            }
        });
        let indiceLow = assisPerc.indexOf(percLow)
        let printLow = assisEv[indiceLow].name
        let lAssis = document.querySelector(".l-assis");
        lAssis.innerHTML = printLow + ": " + percLow * 100 + "%";
    };
    percentageLow();

    function capacityHigh() {
        let arrayCap = capEv.map(e => e.capacity);
        highestCap = arrayCap.sort(function (a, b) {
            return b - a
        })[0];
        let printCap = capEv.filter(e => e.capacity == highestCap);
        let hCap = document.querySelector(".h-cap");
        hCap.innerHTML = printCap[0].name + ": " + highestCap + " people";
    };
    capacityHigh();


    let cat = dataEventos.map(e => e.category);
    let categ = new Set(cat);
    let categories = Array.from(categ);
    let arrayPast = [];
    let arrayUpCom = [];

    let dataPastEvent = dataEventos.filter(event => event.date < dataFecha);
    let dataUpComEvent = dataEventos.filter(event => event.date > dataFecha);

    categories.forEach(category => {
        arrayPast.push({
            category: category,
            data: dataPastEvent.filter(evento => evento.category == category)
        })
    })

    let arrayRev = []
    arrayPast.map(datos => {
        arrayRev.push({
            category: datos.category,
            assistance: datos.data.map(item => item.assistance),
            capacity: datos.data.map(item => item.capacity),
            revenue: datos.data.map(item => item.assistance * item.price)
        })

    })
    console.log(arrayRev)

    arrayRev.forEach(category => {
        let totalAssistance = 0
        category.assistance.forEach(estimate => totalAssistance += Number(estimate))
        category.assistance = totalAssistance

        let totalCapacityFut = 0
        category.capacity.forEach(capacity => totalCapacityFut += Number(capacity))
        category.capacity = totalCapacityFut

        let totalRevenue = 0
        category.revenue.forEach(estimateRevenue => totalRevenue += Number(estimateRevenue))
        category.revenue = totalRevenue

        category.porcentajeAttendace = ((totalAssistance * 100) / totalCapacityFut).toFixed(2)
    })

    let catUp = dataUpComEvent.map(e => e.category);
    console.log(catUp)
    let categUp = new Set(catUp);
    let categoriesUp = Array.from(categUp);
    console.log(categoriesUp)

    categoriesUp.forEach(category => {
        arrayUpCom.push({
            category: category,
            data: dataUpComEvent.filter(evento => evento.category == category)
        })
    });
    console.log(arrayUpCom)
    let arrayEstimate = [];
    arrayUpCom.map(category => {
        arrayEstimate.push({
            category: category.category,
            capacity: category.data.map(evento => evento.capacity),
            estimate: category.data.map(evento => evento.estimate),
            porcentajeAttendace: category.data.map(evento => ((evento.estimate * 100) / evento.capacity).toFixed(2)),
            estimateRevenue: category.data.map(evento => evento.estimate * evento.price)
        })
    })
    console.log(arrayEstimate);

    arrayEstimate.forEach(evento => {
        let estimateRev = 0;
        evento.estimateRevenue.map(estimate => estimateRev += estimate);
        evento.estimateRevenue = estimateRev;

        let totalEstimate = 0;
        evento.estimate.map(estimate => (totalEstimate += Number(estimate)));
        evento.estimate = totalEstimate;

        let totalCap = 0;
        evento.capacity.map(evento => totalCap += Number(evento));
        evento.capacity = totalCap;

        evento.porcentajeAttendace = ((totalEstimate * 100) / totalCap).toFixed(2)
    })

    function creadorTablaPast(e) {
        let tabla = `<tr>
                        <th>Categories</th>
                        <th>Revenues</th>
                        <th>Percentage of attendance</th>
                    </tr>`;
        arrayRev.forEach(evento => {
            tabla += `<tr>
                    <td>${evento.category}</td>
                    <td>$${evento.revenue}</td>
                    <td>${evento.porcentajeAttendace}%</td>
                </tr>`
        })
        document.querySelector(".past").innerHTML += tabla;
    }
    creadorTablaPast();

    function creadorTablaUpCom(e) {
        let tabla = `<tr>
                        <th>Categories</th>
                        <th>Estimate revenues</th>
                        <th>Estimate percentage of attendance</th>
                    </tr>`;
        arrayEstimate.forEach(evento => {
            tabla += `<tr>
                    <td>${evento.category}</td>
                    <td>$${evento.estimateRevenue}</td>
                    <td>${evento.porcentajeAttendace}%</td>
                </tr>`
        })
        document.querySelector(".up-com").innerHTML += tabla;
    }
    creadorTablaUpCom()
}
dataAPI();
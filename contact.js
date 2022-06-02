// let mensaje;
// let contMensaje = document.querySelector(".contMensaje");

// function mensajeEnviado() {
//     mensaje = "";
//     console.log("enviado")
//     mensaje += `
//             <div class="alert alert-success  alert-dismissible d-flex align-items-center" role="alert">
//             <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
//             <div>
//             La consulta fue enviada exitosamente.
//             </div>
//             </div>
//             `
//     contMensaje.innerHTML += mensaje;
// }

const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

const alert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}

// let contMensaje = document.querySelector(".contMensaje");
const alertTrigger = document.getElementById('liveAlertBtn')
if (alertTrigger) {
  alertTrigger.addEventListener('click', () => {
    alert('Message sended successfully!', 'success')
  })
}


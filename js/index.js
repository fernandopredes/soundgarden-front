const BASE_URL = "https://xp41-soundgarden-api.herokuapp.com";

// chama id do HTML
const listaEventos = document.getElementById("lista")

// Instancia a API
const tresEventos = async () => {
    try {
        const response = await fetch('https://xp41-soundgarden-api.herokuapp.com/events');
        const data = await response.json();
        return data;
    } catch (error) {
    }
}
// Cria funções para acessar os três últimos eventos e remove os passados
function acessaEventoAPI(eventos) {
    return eventos.sort((a, b) => { 
        return new Date(a.scheduled) - new Date(b.scheduled) })
}

function excluiAntigos(eventos) {
    return eventos.filter((evento) => {
        return new Date() - new Date(evento.scheduled) < 0;
    })}

// cria ids, class e atributos necessários
function direcionaEventos(eventos){
    eventos.forEach((eventApi)=>{
        const setLista = listaEventos.appendChild(document.createElement('article'));
        setLista.className = 'evento card p-5 m-3';
        
        const titulo = setLista.appendChild(document.createElement('h2'));
        const nomeEvento = eventApi.name;
        const dataEvento = eventApi.scheduled.substring(0,10).replaceAll('-','/')
        titulo.innerText = nomeEvento + '-' + dataEvento;
        
        const atracoes = setLista.appendChild(document.createElement('h4'));
        atracoes.innerText = eventApi.attractions;
        
        const descricao = setLista.appendChild(document.createElement('p'));
        descricao.innerText = eventApi.description;
        
        const btnReservar = setLista.appendChild(document.createElement('a'));
        btnReservar.textContent = "Reservar Ingresso";
        btnReservar.setAttribute("class", "btn btn-primary")
        btnReservar.classList.add('btn-reservar');
        
        const div = setLista.appendChild(document.createElement('div'));
        div.setAttribute("id", "div-container");

            })
            return direcionaEventos
        }
// Acessa a array e seleciona quais ítens quer carregar
async function main() {
    try {
        const events = await tresEventos();
        const orderedEvents = acessaEventoAPI(events);
        const removedPastEvents = excluiAntigos(orderedEvents);
        const threeNearestEvents = removedPastEvents.slice(0,3);
        direcionaEventos(threeNearestEvents);

        setEventListenerOnModalButton();
    } catch (error) {
    }

    //abre modal
    const modal = document.querySelector("#modal-1");

    // const resposta = await fetch(`${BASE_URL}/bookings`, options);
async function abreModal(id) {
    modal.setAttribute("style", "display:flex");
    const resposta = await fetch(`${BASE_URL}/events/${id}`, {
      method: "GET",
      redirect: "follow",
      headers: { "Content-Type": "application/json" },
    })
// abreModal(resposta)

}

//fecha modal
function fecharModal ()   {
    modal.setAttribute("style", "none");
}

const close = document.querySelector("#form > span")
close.onclick = () => {
    fecharModal();
  };

  //abre modal após clicar em reservar ingresso
const btn = document.querySelector(".btn")
btn.onclick = () => {
    abreModal();
}

//envia formulário.
const formReserva = modal.querySelector("form");
// formReserva.addEventListener("enviar", (event) => {
//   event.preventDefault();

  const body = {};

  for (i = 0; i < formReserva.elements.length - 1; i++) {
    const item = formReserva.elements[i];

    body[item.name] = item.value;
  }

fetch(`${BASE_URL}/bookings`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(() => {
    //   alert("Reserva feita com sucesso");
      modalReservaObj.hide();
    })
    .catch((error) => console.log(error.message));


main();}

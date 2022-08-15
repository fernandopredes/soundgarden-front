/*Lista os Eventos Principais na Landing Page*/
const listaEventos = document.getElementById("lista")

//cria as tags e elementos no article
function direcionaEventos(eventos){
    eventos.forEach(async (eventApi)=>{

const setLista = listaEventos.appendChild(document.createElement('article'));
setLista.className = 'evento card p-5 m-3';

const titulo = setLista.appendChild(document.createElement('h2'));
const nomeEvento = eventApi.name;
const dataEvento = eventApi.scheduled.substring(0,10)
titulo.innerText = nomeEvento + '-' + dataEvento;

const atracoes = setLista.appendChild(document.createElement('h4'));
atracoes.innerText = eventApi.attractions;

const descricao = setLista.appendChild(document.createElement('p'));
descricao.innerText = eventApi.description;

const btnReservar = setLista.appendChild(document.createElement('a'));
btnReservar.textContent = "Reservar Ingresso";
btnReservar.setAttribute("class", "btn btn-primary")

const div = setLista.appendChild(document.createElement('div'));
div.setAttribute("id", "div-container");

setLista.append(titulo,atracoes,descricao,btnReservar)

    })
    return direcionaEventos
}

//chama API

fetch('https://xp41-soundgarden-api.herokuapp.com/events', {
    "method": "GET",
}).then(response => { return response.json() }
).then(eventos => direcionaEventos(eventos)
).catch(error => console.log(error));

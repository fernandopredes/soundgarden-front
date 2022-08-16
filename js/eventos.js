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


//chama API

fetch('https://xp41-soundgarden-api.herokuapp.com/events', {
    "method": "GET",
}).then(response => { return response.json() }
).then(eventos => direcionaEventos(eventos)
).catch(error => console.log(error));

//Direciona Eventos na index

async function abreModal(id) {
    modal.setAttribute("style", "display:flex");
    const resposta = await fetch(`${BASE_URL}/events/${id}`, {
      method: "GET",
      redirect: "follow",
      headers: { "Content-Type": "application/json" },
    })}

function fecharModal ()   {
    modal.setAttribute("style", "none");
}

const close = document.querySelector("#form > span")

close.onclick = () => {
    fecharModal();
  };

const btn = document.querySelector(".btn")

btn.onclick = () => {
    abreModal();
}

// const reservarTicket = {
//     owner_name: nome.value,
//     owner_email: email.value,
//     number_tickets: parseInt(ingresso.value),
//     event_id: inputId.value,
//   };

//   const options = {
//     method: "POST",
//     body: JSON.stringify(reservarTicket),
//     headers: { "Content-Type": "application/json" },
//     redirect: "follow",
//   };


//   const conteudoResposta = await resposta.json();
//   console.log(conteudoResposta);

  if (resposta.status == 201) {
    alert("Reserva realizada com sucesso");

    fecharModal();
  }


main();



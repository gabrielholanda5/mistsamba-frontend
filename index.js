let idCardParaEditar = null

function abrirModalEvento(titulo, evento = null) {
    
    const modal = document.querySelector("#modalEvento")
    const tituloModal = modal.querySelector("h3")
    tituloModal.textContent = titulo
    modal.classList.remove("hidden")
    modal.classList.add("flex")


    const form = document.querySelector("#formEvento")
    const btnSalvar = document.querySelector("#btnSalvar")
    
    if (evento) {
        idCardParaEditar = evento.id
        document.querySelector("#title").value = evento.title
        document.querySelector("#location").value = evento.location || ""
        document.querySelector("#date").value = evento.date
        document.querySelector("#start_time").value = evento.start_time
        document.querySelector("#end_time").value = evento.end_time

        btnSalvar.setAttribute("onclick", "editarEvento()")
    } else {
        idCardParaEditar = null
        form.reset()
        btnSalvar.setAttribute("onclick", "salvarNovoEvento()")
    }
}

function fecharModalEvento() {
    const modal = document.querySelector("#modalEvento")
    modal.classList.add("hidden")
    modal.classList.remove("flex")
    const form = document.querySelector("#formEvento")
    form.reset()
}

let idCardParaExcluir = null

function abrirModalDeletar(idCard) {
    idCardParaExcluir = idCard
    const modal = document.querySelector("#modalDeletar")
    modal.classList.add("flex")
    modal.classList.remove("hidden")
}

function fecharModalDeletar() {
    const modal = document.querySelector("#modalDeletar")
    modal.classList.add("hidden")
    modal.classList.remove("flex")
}

async function carregarEventos(){
    try{
        const resposta = await fetch("https://mistsamba-api.onrender.com/eventos")
        const eventos = await resposta.json()

        const container = document.querySelector("#listaEventos");
        container.innerHTML = ""

        if(eventos.length === 0){
            container.innerHTML = `<p class="text-xs text-[#94A3B8]">Nenhum compromisso cadastrado.</p>`;
            return;
        }

        eventos.forEach(evento => {

            const [ano, mesIndex, diaMes] = evento.date.split('-')
            const dataObj = new Date(ano, mesIndex - 1, diaMes)

            const mes = dataObj.toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase().replace('.', '')
            const diaSemana = dataObj.toLocaleDateString('pt-BR', { weekday: 'short' }).toUpperCase().replace('.', '')
            const dia = diaMes

            container.innerHTML += `
                <div class="flex justify-between items-center py-4 px-4 bg-[#121723] border border-[#1F293D] hover:border-[#334155] rounded-xl">
                    <div class="flex gap-4">
                        <div class="flex flex-col justify-center items-center py-2 px-6 rounded-lg bg-[#1E293B] ">
                            <p class="text-[15px] text-[#94A3B8]">${mes}</p>
                            <p class="text-[20px]">${diaSemana}</p>
                            <p class="text-[15px] text-[#94A3B8]">${dia}</p>
                        </div>
                        <div class="flex flex-col justify-between gap-2 ">
                            <div>
                                <p>${evento.title}</p>
                            </div>
                            <div>
                                <p class="text-[10px] text-[#94A3B8]">${evento.location}</p>
                            </div>
                            <div class="flex gap-2">
                                <p class="text-[10px] bg-[#1E293B] px-2 py-0.5 rounded-md">Inicio: ${evento.start_time}</p>
                                <p class="text-[10px] bg-[#1E293B] px-2 py-0.5 rounded-md">Fim: ${evento.end_time}</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-4 md:flex-row">
                        <button onclick='abrirModalEvento("Editar Evento", ${JSON.stringify(evento)})' class="cursor-pointer"><box-icon type='solid' name='edit' color="#ffffff"></box-icon></button>
                        <button onclick="abrirModalDeletar('${evento.id}')" class="cursor-pointer"><box-icon name='trash' color="#ffffff" ></box-icon></button>
                    </div>
                </div>
            `
        }) 
    } catch (erro){
        console.error("Erro ao carregar os eventos do banco:", erro)
    }
}

async function salvarNovoEvento() {
    
    const dados = {
        title: document.querySelector("#title").value,
        location: document.querySelector("#location").value,
        date: document.querySelector("#date").value,
        start_time: document.querySelector("#start_time").value,
        end_time: document.querySelector("#end_time").value
    }

    try {
        const resposta = await fetch("https://mistsamba-api.onrender.com/eventos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dados)
        })

        if(resposta.ok){
            fecharModalEvento()
            carregarEventos()
        }

    } catch (erro) {
        console.error("Erro ao criar:", erro)
    }
}

async function editarEvento() {
    const dadosAtualizados = {
        title: document.querySelector("#title").value,
        location: document.querySelector("#location").value,
        date: document.querySelector("#date").value,
        start_time: document.querySelector("#start_time").value,
        end_time: document.querySelector("#end_time").value
    }

    try {
        const resposta = await fetch(`https://mistsamba-api.onrender.com/eventos/${idCardParaEditar}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dadosAtualizados)
        })

        if (resposta.ok) {
            fecharModalEvento();
            carregarEventos(); 
        }
    } catch (erro) {
        console.error("Erro ao atualizar o evento:", erro)
    }
}

async function excluirEvento() {
    
    try {
        const resposta = await fetch(`https://mistsamba-api.onrender.com/eventos/${idCardParaExcluir}`, {
            method: "DELETE"
        })

        if (resposta.ok) {
            fecharModalDeletar()
            carregarEventos()   
        }
    } catch (erro) {
        console.error("Erro ao excluir:", erro)
    }
}


window.onload = () => {
    carregarEventos()
}
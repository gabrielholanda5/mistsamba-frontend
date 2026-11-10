function abrirModalEvento(titulo) {
    const modal = document.querySelector("#modalEvento")
    const tituloModal = modal.querySelector("h3")
    tituloModal.textContent = titulo
    modal.classList.remove("hidden");
    modal.classList.add("flex");
}

function fecharModalEvento() {
    const modal = document.querySelector("#modalEvento")
    modal.classList.add("hidden")
    modal.classList.remove("flex")
}

function abrirModalDeletar() {
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
                        <button onclick="abrirModalEvento('Editar Evento')" class="cursor-pointer"><box-icon type='solid' name='edit' color="#ffffff"></box-icon></button>
                        <button onclick="abrirModalDeletar()" class="cursor-pointer"><box-icon name='trash' color="#ffffff" ></box-icon></button>
                    </div>
                </div>
            `
        }) 
    } catch (erro){
        console.error("Erro ao carregar os eventos do banco:", erro)
    }
}



window.onload = () => {
    carregarEventos();
};
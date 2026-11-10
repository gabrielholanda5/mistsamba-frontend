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

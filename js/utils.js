export const listaClientes = document.getElementById("listaClientes");
export const add = document.getElementById("add");
export const nomeCliente = document.getElementById("nomeCliente");
export const emailCliente = document.getElementById("emailCliente");

export function criarElementoCliente(cliente, onDelete) {
    const item = document.createElement("li");
    item.textContent = `${cliente.nome} - ${cliente.email} `;

    const botao = document.createElement("button");
    botao.textContent = "X";


    botao.addEventListener("click", () => {
        if (typeof onDelete === "function") {
            onDelete();
        }
    });

    item.appendChild(botao);


    return item;
}


export function limparCampos(...inputs) {
    inputs.forEach(input => {
        if (input && input.value !== undefined) {
            input.value = "";
        }
    });
}

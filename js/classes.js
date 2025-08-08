import { listaClientes, add, nomeCliente, emailCliente, limparCampos, criarElementoCliente } from "./utils.js";

export class ClienteApp {
    #apiUrl;
    constructor(apiUrl) {
        this.#apiUrl = apiUrl;
    }

    get url() {
        return this.#apiUrl;
    }

    iniciar() {
        this.carregarClientes();
        add.addEventListener("click", () => this.adicionarCliente());
    }

    async carregarClientes() {
        try {
            const response = await fetch(this.url);
            const clientes = await response.json();


            clientes.forEach(cliente => {
                const elemento = criarElementoCliente(
                    cliente,
                    () => this.removerCliente(cliente._id, elemento)
                );
                listaClientes.appendChild(elemento);
            });

        } catch (erro) {
            console.error("Erro ao carregar os clientes", erro);
        }
    }

    async adicionarCliente() {
        const nome = nomeCliente.value;
        const email = emailCliente.value;

        if (!nome || !email) {
            alert("Por favor preencha os dois campos");
            return;
        }

        const novoCliente = { nome, email };

        try {
            const response = await fetch(this.url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(novoCliente)
            });

            const clienteCriado = await response.json();


            const elemento = criarElementoCliente(
                clienteCriado,
                () => this.removerCliente(clienteCriado._id, elemento)
            );
            listaClientes.appendChild(elemento);


            limparCampos(nomeCliente, emailCliente);

        } catch (erro) {
            console.error("Erro ao adicionar cliente", erro);
        }
    }

    async removerCliente(id, elemento) {
        try {
            await fetch(`${this.url}/${id}`, {
                method: "DELETE"
            });
            elemento.remove();
        } catch (erro) {
            console.error("Erro ao remover cliente", erro);
        }
    }
}

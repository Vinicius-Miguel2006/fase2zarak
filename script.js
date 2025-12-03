function selecionarHumor(humor) {
    aplicarTema(humor);
    salvarHumor(humor);
    mostrarMensagem(humor);

    if (["triste", "raiva", "ansioso", "mal"].includes(humor)) {
        document.getElementById("btnAtendimento").style.display = "inline-block";
    }
}
function aplicarTema(humor) {
    const cores = {
        feliz: "#f9ff7d",
        neutro: "#bfc8d1",
        triste: "#89a6ff",
        raiva: "#ff8a8a",
        ansioso: "#c7ffd6",
        mal: "#ffd4a3"
    };
    document.body.style.backgroundColor = cores[humor];
}

function mostrarMensagem(humor) {
    const msg = document.getElementById("mensagem");

    const mensagens = {
        feliz: "Que ótimo te ver feliz! Continue espalhando essa energia!",
        neutro: "Tudo bem estar neutro às vezes. Um passo de cada vez.",
        triste: "Sinto muito que esteja triste. Lembre-se: você não está sozinho.",
        raiva: "Respire fundo. Você tem força para lidar com isso.",
        ansioso: "Respire fundo e solte o ar devagar… conte até 10.",
        mal: "Cuide de você hoje, ok? Descansar também é importante."
    };

    msg.textContent = mensagens[humor];
}
function detectarHumor() {
    const texto = document.getElementById("textoHumor").value.toLowerCase();

    if (texto.includes("feliz") || texto.includes("bem")) selecionarHumor("feliz");
    else if (texto.includes("triste") || texto.includes("chorar")) selecionarHumor("triste");
    else if (texto.includes("ansioso") || texto.includes("preocupado")) selecionarHumor("ansioso");
    else if (texto.includes("raiva") || texto.includes("irritado")) selecionarHumor("raiva");
    else if (texto.includes("mal") || texto.includes("doente")) selecionarHumor("mal");
    else if (texto.includes("normal") || texto.includes("ok")) selecionarHumor("neutro");
}

function salvarHumor(humor) {
    localStorage.setItem("humorAtual", humor);
}

window.onload = function () {
    const humorSalvo = localStorage.getItem("humorAtual");
    if (humorSalvo) {
        aplicarTema(humorSalvo);
        mostrarMensagem(humorSalvo);
    }
};

const chatBox = document.getElementById("chatBox");
const chatArea = document.getElementById("chatArea");
const chatInput = document.getElementById("chatInput");

function abrirChat() {
    chatBox.style.display = "flex";
    chatArea.innerHTML = "";

    setTimeout(() => {
        adicionarMensagem("Olá! Como posso te ajudar hoje?", "bot");
    }, 300);
}

function fecharChat() {
    chatBox.style.display = "none";
}

function enviarMensagem() {
    const texto = chatInput.value.trim();
    if (texto === "") return;

    adicionarMensagem(texto, "user");
    chatInput.value = "";

    setTimeout(() => {
        adicionarMensagem(
            "Entendi. Vou transferir você para um de nossos profissionais, por favor, aguarde...",
            "bot"
        );
    }, 800);
}

chatInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") enviarMensagem();
});

function adicionarMensagem(texto, tipo) {
    const msg = document.createElement("div");
    msg.classList.add("msg", tipo);

    msg.innerHTML = `
        <img class="avatar" src="${tipo === 'user' ? 'user.png' : 'bot.png'}">
        <span>${texto}</span>
    `;

    chatArea.appendChild(msg);
    chatArea.scrollTop = chatArea.scrollHeight;
}

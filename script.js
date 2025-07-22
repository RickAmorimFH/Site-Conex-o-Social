
document.getElementById('ano').textContent = new Date().getFullYear();

function responder(opcao) {
    const chatHistory = document.getElementById('chat-history');
    const respostas = {
        1: "Oferecemos assessoria, consultoria e planejamento para empresas e organizações.",
        2: "Você pode agendar uma consulta pelo nosso formulário de contato ou ligando para (62) 99999-9999.",
        3: "Atendemos de segunda a sexta-feira, das 08h às 18h.",
        4: "Sim! Atendemos fora da cidade com agendamento prévio."
    };

    const userMsg = document.createElement('div');
    userMsg.className = 'chat-message user';
    userMsg.innerHTML = `<div class="message">${document.querySelectorAll('.chat-options button')[opcao-1].innerText}</div>`;
    chatHistory.appendChild(userMsg);

    setTimeout(() => {
        const claraMsg = document.createElement('div');
        claraMsg.className = 'chat-message clara';
        claraMsg.innerHTML = `
            <img src="img/clara-avatar.png" alt="Clara">
            <div class="message">${respostas[opcao]}</div>`;
        chatHistory.appendChild(claraMsg);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }, 500);
}


function toggleMenu() {
    const moreMenu = document.getElementById('more-menu');
    const btn = event.target;

    if (moreMenu.style.display === "none") {
        moreMenu.style.display = "block";
        btn.innerHTML = "Menos opções ▲";
    } else {
        moreMenu.style.display = "none";
        btn.innerHTML = "Mais opções ▼";
    }
}

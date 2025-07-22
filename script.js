
function initMap() {
    const destino = { lat: -15.5508, lng: -47.8946 }; // Água Fria de Goiás
    const map = new google.maps.Map(document.getElementById("mapa"), {
        zoom: 12,
        center: destino,
    });
    new google.maps.Marker({ position: destino, map: map });
}

function calcularDistancia() {
    const endereco = document.getElementById('endereco').value;
    if (endereco.trim() === "") {
        alert("Digite um endereço para calcular a distância.");
        return;
    }
    alert("Função de cálculo de distância real com API ainda precisa da sua chave API.");
}

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

document.getElementById('ano').textContent = new Date().getFullYear();

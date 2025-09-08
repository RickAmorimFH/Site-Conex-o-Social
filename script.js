
/* Conexão Social – JS corrigido e otimizado (2025-09-08)
*/
(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // ===== Menu hamburguer =====
  const toggle = $('.nav-toggle');
  const menu = $('#menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    }, { passive: true });
  }

  // ===== Scroll suave para âncoras =====
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const el = document.querySelector(href);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, { passive: true });

  // ===== Formulário de distância (Google Maps) =====
  const form = $('#form-distancia');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      calcularDistancia();
    });
  }

  // ===== Mini-chat =====
  const chat = $('.chat');
  if (chat) {
    chat.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-opt]');
      if (btn) responder(Number(btn.dataset.opt));
    }, { passive: true });
  }

  // ===== Ano no rodapé =====
  const ano = $('#ano');
  if (ano) ano.textContent = new Date().getFullYear();
})();

// ====== GOOGLE MAPS ======
function initMap() {
  // Coordenadas: ajustar conforme necessário
  const destino = { lat: -15.5508, lng: -47.8946 };
  const el = document.getElementById('mapa');
  if (!el || !window.google || !google.maps) return;
  const map = new google.maps.Map(el, { zoom: 12, center: destino });
  new google.maps.Marker({ position: destino, map });
}

function calcularDistancia() {
  const out = document.getElementById('resultado');
  const input = document.getElementById('endereco');
  if (!out || !input) return;

  const endereco = (input.value || '').trim();
  if (!endereco) {
    out.textContent = 'Digite um endereço para calcular a distância.';
    return;
  }

  if (!window.google || !google.maps) {
    out.textContent = 'Mapa não carregou. Verifique sua conexão e a chave da API.';
    return;
  }

  const geocoder = new google.maps.Geocoder();
  const service = new google.maps.DistanceMatrixService();
  const destino = { lat: -15.5508, lng: -47.8946 };

  geocoder.geocode({ address: endereco }, (results, status) => {
    if (status !== 'OK' || !results || !results[0]) {
      out.textContent = 'Endereço não encontrado. Tente ser mais específico.';
      return;
    }
    const origem = results[0].geometry.location;
    service.getDistanceMatrix(
      {
        origins: [origem],
        destinations: [destino],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
      },
      (resp, st) => {
        if (st !== 'OK' || !resp || !resp.rows || !resp.rows[0] || !resp.rows[0].elements[0]) {
          out.textContent = 'Não foi possível calcular agora. Tente novamente.';
          return;
        }
        const row = resp.rows[0].elements[0];
        if (row.status !== 'OK') {
          out.textContent = 'Rota indisponível.';
          return;
        }
        out.textContent = `Distância: ${row.distance.text} · Tempo estimado: ${row.duration.text}`;
      }
    );
  });
}

// ====== Mini-chat ( Rick ) ======
function responder(opcao) {
  const chatHistory = document.getElementById('chat-history');
  if (!chatHistory) return;

  const respostas = {
    1: 'Oferecemos assessoria contínua, capacitações práticas e elaboração de documentos oficiais (atas, ofícios, resoluções, planos).',
    2: 'Agende pelo WhatsApp ou envie um e-mail com sua necessidade. Respondo em até 1 dia útil.',
    3: 'Atendimento de segunda a sexta, das 08h às 18h.',
    4: 'Sim, atendo outras cidades com agendamento prévio.'
  };

  const btn = document.querySelector('[data-opt="' + String(opcao) + '"]');

  const userMsg = document.createElement('div');
  userMsg.className = 'chat-message user';
  userMsg.innerHTML = '<div class="message">' + (btn ? btn.textContent : 'Pergunta') + '</div>';
  chatHistory.appendChild(userMsg);

  setTimeout(() => {
    const claraMsg = document.createElement('div');
    claraMsg.className = 'chat-message clara';
    claraMsg.innerHTML =
      '<img src="img/clara-avatar.png" alt="Avatar da Clara" />' +
      '<div class="message">' + (respostas[opcao] || 'Posso ajudar com mais alguma coisa?') + '</div>';
    chatHistory.appendChild(claraMsg);
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }, 250);
}

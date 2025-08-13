(function(){
  const byId = (id)=>document.getElementById(id);
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('menu');
  if(toggle && menu){
    toggle.addEventListener('click', ()=>{
      const open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    }, {passive:true});
  }
  document.addEventListener('click', (e)=>{
    const a = e.target.closest('a[href^="#"]');
    if(!a) return; if(a.getAttribute('href') === '#') return; if(a.getAttribute('href') === '#') return;
    const el = document.querySelector(a.getAttribute('href'));
    if(el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); }
  }, {passive:true});
  const form = byId('form-distancia');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault(); calcularDistancia();
    });
  }
  const chat = document.querySelector('.chat');
  if(chat){
    chat.addEventListener('click', (e)=>{
      const btn = e.target.closest('button[data-opt]');
      if(btn){ responder(Number(btn.dataset.opt)); }
    }, {passive:true});
  }
  const ano = byId('ano'); if(ano) ano.textContent = new Date().getFullYear();
})();
function initMap() {
  const destino = { lat: -15.5508, lng: -47.8946 };
  const map = new google.maps.Map(document.getElementById("mapa"), { zoom: 12, center: destino });
  new google.maps.Marker({ position: destino, map });
}
function calcularDistancia(){
  const endereco = document.getElementById('endereco').value.trim();
  const out = document.getElementById('resultado');
  if(!endereco){ out.textContent = "Digite um endereço para calcular a distância."; return; }
  const geocoder = new google.maps.Geocoder();
  const service = new google.maps.DistanceMatrixService();
  const destino = "-15.5508,-47.8946";
  geocoder.geocode({ address:endereco }, (results, status)=>{
    if(status !== "OK" || !results[0]){ out.textContent = "Endereço não encontrado. Tente ser mais específico."; return; }
    const origem = results[0].geometry.location;
    service.getDistanceMatrix({ origins:[origem], destinations:[destino], travelMode: google.maps.TravelMode.DRIVING, unitSystem: google.maps.UnitSystem.METRIC }, (resp, st)=>{
      if(st !== "OK"){ out.textContent = "Não foi possível calcular agora. Tente novamente."; return; }
      const row = resp.rows[0].elements[0];
      if(row.status !== "OK"){ out.textContent = "Rota indisponível."; return; }
      out.textContent = `Distância: ${row.distance.text} · Tempo estimado: ${row.duration.text}`;
    });
  });
}
function responder(opcao){
  const chatHistory = document.getElementById('chat-history');
  const respostas = {
    1: "Oferecemos assessoria contínua, capacitações práticas e elaboração de documentos oficiais (atas, ofícios, resoluções, planos).",
    2: "Agende pelo WhatsApp ou envie um e-mail com sua necessidade. Retorno em até 1 dia útil.",
    3: "Atendimento de segunda a sexta, das 08h às 18h.",
    4: "Sim. Atendemos outras cidades com agendamento prévio."
  };
  const userMsg = document.createElement('div');
  userMsg.className = 'chat-message user';
  const btn = document.querySelector('[data-opt="'+opcao+'"]');
  userMsg.innerHTML = `<div class="message">${btn ? btn.textContent : "Pergunta"}</div>`;
  chatHistory.appendChild(userMsg);
  setTimeout(()=>{
    const claraMsg = document.createElement('div');
    claraMsg.className = 'chat-message clara';
    claraMsg.innerHTML = `<img src="img/clara-avatar.png" alt="Atendente"> <div class="message">${respostas[opcao]||"Posso ajudar com mais alguma coisa?"}</div>`;
    chatHistory.appendChild(claraMsg);
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }, 250);
}

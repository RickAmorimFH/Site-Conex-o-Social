function initMap() {
    const destino = { lat: -15.5508, lng: -47.8946 }; // Coordenadas de Água Fria de Goiás
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
    // Simulação
    const distanciaSimulada = 120; // em km
    const consumo = 9; // km/l
    const precoCombustivel = 6.00; // R$/l
    const litros = distanciaSimulada / consumo;
    const custo = litros * precoCombustivel *2; // O *2 é porque tem que calcular ida e volta;

    document.getElementById('resultado').innerHTML = `
        Distância aproximada: <strong>${distanciaSimulada} km</strong><br>
        Custo estimado de combustível: <strong>R$ ${custo.toFixed(2)}</strong>`;
}

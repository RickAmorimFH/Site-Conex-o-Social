
# 📖 Conexão Social – Assessoria, Consultoria e Planejamento

## 📌 Sobre o Projeto
O **Conexão Social** é um site institucional desenvolvido para apresentar serviços de assessoria e consultoria em **Assistência Social**, com foco em municípios de pequeno porte e equipes do **SUAS**.

O projeto inclui:
- Landing Page moderna (HTML + CSS responsivo).
- Mini-chat interativo (JavaScript).
- Integração com **Google Maps API** para cálculo de distâncias.
- Layout otimizado para desktop e mobile.

---

## 🛠️ Tecnologias Utilizadas
- **HTML5** – Estrutura semântica.  
- **CSS3** – Variáveis, Grid e Flexbox.  
- **JavaScript (Vanilla)** – Menu, scroll suave, chat e Google Maps.  
- **Google Maps API** – Mapa interativo e cálculo de distância/tempo.

---

## 🚀 Funcionalidades
✔️ Menu responsivo com toggle.  
✔️ Sessão Hero com botões de ação.  
✔️ Cards de serviços.  
✔️ Mini-chat Clara com respostas automáticas.  
✔️ Seção de localização com Google Maps API.  
✔️ Cálculo de distância a partir do endereço informado.  
✔️ Rodapé dinâmico com ano automático.  

---

## ⚙️ Configuração e Uso

### 1. Estrutura de arquivos
```
/conexao-social
  ├── index.html
  ├── style.css
  ├── script.js
  └── README.md
```

### 2. Configuração do Google Maps API
1. Acesse o [Google Cloud Console](https://console.cloud.google.com/).  
2. Crie ou use um projeto existente.  
3. Ative as seguintes APIs:  
   - Maps JavaScript API  
   - Geocoding API  
   - Distance Matrix API  
4. Crie uma chave de API e restrinja por domínio (HTTP referrer).  
   - Exemplo: `https://seudominio.com/*`  
   - Para testes locais: `http://localhost/*`  
5. Substitua no `index.html`:  
```html
<script 
  src="https://maps.googleapis.com/maps/api/js?key=SUA_CHAVE_AQUI&callback=initMap" 
  async defer></script>
```

---

## 👨‍💻 Autor
**Conexão Social – Assessoria, Consultoria e Planejamento**  
Projeto em desenvolvimento e manutenção contínua.

---

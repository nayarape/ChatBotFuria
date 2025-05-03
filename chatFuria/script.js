
const GIPHY_API_KEY = "Sd9lh5V7EW1Kf3Gh5YS8v6WIAxps7zXqm"; 
let userNickname = "Torcedor" + Math.floor(Math.random() * 1000);
let messageCount = 0;


document.getElementById('enterChatBtn').addEventListener('click', () => {
  document.querySelector('.landing').style.display = 'none';
  document.querySelector('.chat').style.display = 'flex';
  

  const nickname = prompt("Como você quer ser chamado no chat?", userNickname);
  if (nickname && nickname.trim() !== "") {
    userNickname = nickname.trim();
  }
  
 
  startLiveStatus();
  addSystemMessage(`Bem-vindo ao chat da FURIA, ${userNickname}!`);
  
 
  simulateOtherFans();
});


document.getElementById('sendMessageBtn').addEventListener('click', sendUserMessage);


document.getElementById('userMessage').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendUserMessage();
  }
});


function sendUserMessage() {
  const messageInput = document.getElementById('userMessage');
  const message = messageInput.value.trim();
  if (message) {
    addUserMessage(message);
    messageInput.value = '';
    
    
    checkKeywordsAndRespond(message);
  }
}


function checkKeywordsAndRespond(message) {
  const lowerMessage = message.toLowerCase();
  
  
  setTimeout(() => {
    if (lowerMessage.includes('gol') || lowerMessage.includes('ponto')) {
      addBotMessage("Vamos comemorar essa conquista! 🏆");
      sendCelebrationGif();
    } else if (lowerMessage.includes('horário') || lowerMessage.includes('quando')) {
      addBotMessage("O próximo jogo da FURIA está programado para hoje às 19:00 (Brasília)");
    } else if (lowerMessage.includes('escalação') || lowerMessage.includes('jogadores')) {
      addBotMessage("Escalação da FURIA para o jogo de hoje: arT, KSCERATO, yuurih, drop e saffee");
    } else if (lowerMessage.includes('próximo') || lowerMessage.includes('jogo')) {
      fetchUpcomingMatches();
    }
  }, 1000);
}


function addUserMessage(text) {
  const messageArea = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'message own';
  
  const sender = document.createElement('div');
  sender.className = 'message-sender';
  sender.textContent = userNickname;
  
  const content = document.createElement('div');
  content.className = 'message-text';
  content.textContent = text;
  
  div.appendChild(sender);
  div.appendChild(content);
  messageArea.appendChild(div);
  messageArea.scrollTop = messageArea.scrollHeight;
}

function addOtherUserMessage(username, text) {
  const messageArea = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'message';
  
  const sender = document.createElement('div');
  sender.className = 'message-sender';
  sender.textContent = username;
  
  const content = document.createElement('div');
  content.className = 'message-text';
  content.textContent = text;
  
  div.appendChild(sender);
  div.appendChild(content);
  messageArea.appendChild(div);
  messageArea.scrollTop = messageArea.scrollHeight;
}

function addBotMessage(text) {
  const messageArea = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'message bot';
  
  const sender = document.createElement('div');
  sender.className = 'message-sender';
  sender.textContent = "FURIA Bot";
  
  const content = document.createElement('div');
  content.className = 'message-text';
  content.textContent = text;
  
  div.appendChild(sender);
  div.appendChild(content);
  messageArea.appendChild(div);
  messageArea.scrollTop = messageArea.scrollHeight;
}

function addSystemMessage(text) {
  const messageArea = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'system-message';
  div.textContent = text;
  messageArea.appendChild(div);
  messageArea.scrollTop = messageArea.scrollHeight;
}

function addHighlightMessage(text) {
  const messageArea = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'highlight-message';
  div.textContent = text;
  messageArea.appendChild(div);
  messageArea.scrollTop = messageArea.scrollHeight;
}


function startLiveStatus() {
  
  updateMatchInfo();
  
  
  setInterval(updateMatchInfo, 45000); 
  
  
  setTimeout(() => {
    addBotMessage("A partida entre FURIA e NAVI já vai começar! Preparem-se torcedores! 🎮");
  }, 2000);
  
  setTimeout(() => {
    addOtherUserMessage("FURIA_Fan99", "Estou confiante que vamos ganhar hoje! 💪");
  }, 5000);
  
  setTimeout(() => {
    updateScore(1, 0);
    addHighlightMessage("🔥 PONTO PARA FURIA! 🔥 Novo placar: 1-0");
  }, 10000);
}


function updateMatchInfo() {
  const teams = ['NAVI', 'G2', 'Vitality', 'Liquid', 'Astralis', 'MIBR', 'Cloud9', 'NIP'];
  const maps = ['Inferno', 'Mirage', 'Dust2', 'Nuke', 'Overpass', 'Ancient', 'Vertigo'];
  
  
  const currentOpponent = document.getElementById('opponent').textContent;
  const opponent = teams.includes(currentOpponent) ? currentOpponent : teams[Math.floor(Math.random() * teams.length)];
  
  const mapName = maps[Math.floor(Math.random() * maps.length)];
  const statusOptions = ['Ao Vivo', '1° Half', '2° Half', 'Overtime'];
  const matchStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)];
  
  document.getElementById('opponent').textContent = opponent;
  document.getElementById('mapName').textContent = mapName;
  document.getElementById('matchStatus').textContent = matchStatus;
  document.getElementById('gameStatus').textContent = `FURIA vs ${opponent} - ${mapName}`;
}

function updateScore(furiaScore, oppScore) {
  document.getElementById('furiaScore').textContent = furiaScore;
  document.getElementById('oppScore').textContent = oppScore;
}

document.getElementById('updateStatusBtn').addEventListener('click', () => {
  const currentFuriaScore = parseInt(document.getElementById('furiaScore').textContent);
  const currentOppScore = parseInt(document.getElementById('oppScore').textContent);
  
 
  const newFuriaScore = Math.min(currentFuriaScore + Math.floor(Math.random() * 3), 16);
  const newOppScore = Math.min(currentOppScore + Math.floor(Math.random() * 2), 16);
  
  updateScore(newFuriaScore, newOppScore);
  
  
  if (newFuriaScore > currentFuriaScore) {
    addHighlightMessage(`🔥 PONTO PARA FURIA! 🔥 Novo placar: ${newFuriaScore}-${newOppScore}`);
    if (Math.random() > 0.5) {
      sendCelebrationGif();
    }
  } else if (newOppScore > currentOppScore) {
    addHighlightMessage(`⚠️ Ponto para ${document.getElementById('opponent').textContent}. Novo placar: ${newFuriaScore}-${newOppScore}`);
  }
  
  updateMatchInfo();
});


async function fetchUpcomingMatches() {
  try {
    addBotMessage("Buscando próximas partidas...");
    
    
    const matches = [
      { team1: "FURIA", team2: "NAVI", date: "Hoje, 19:00", event: "ESL Pro League" },
      { team1: "FURIA", team2: "Astralis", date: "Amanhã, 16:30", event: "ESL Pro League" },
      { team1: "Liquid", team2: "FURIA", date: "Sexta, 14:00", event: "BLAST Premier" }
    ];
    
    
    setTimeout(() => {
      if (matches.length > 0) {
        addBotMessage("Próximos jogos da FURIA:");
        matches.forEach(match => {
          addHighlightMessage(`${match.team1} vs ${match.team2} - ${match.date} (${match.event})`);
        });
      } else {
        addBotMessage("Nenhum jogo da FURIA encontrado nos próximos dias.");
      }
    }, 1500);
    
  } catch (error) {
    console.error('Erro ao buscar partidas:', error);
    addBotMessage("Não foi possível buscar os próximos jogos.");
  }
}


async function sendCelebrationGif() {
    try {
      
      const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_API_KEY}&tag=celebration,sports,victory&rating=g`);
      
      if (!response.ok) {
        throw new Error(`Erro na API do Giphy: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data && data.data && data.data.images && data.data.images.fixed_height) {
        const gifUrl = data.data.images.fixed_height.url;
        
        // Adiciona o GIF no chat
        const messageArea = document.getElementById('chatMessages');
        const div = document.createElement('div');
        div.className = 'gif-container';
        
        const img = document.createElement('img');
        img.src = gifUrl;
        img.alt = 'GIF de comemoração';
        img.className = 'gif-message';
        
        // Adicionar evento de carregamento para debug
        img.onload = () => console.log('GIF carregado com sucesso:', gifUrl);
        img.onerror = (e) => console.error('Erro ao carregar GIF:', e);
        
        div.appendChild(img);
        messageArea.appendChild(div);
        messageArea.scrollTop = messageArea.scrollHeight;
        
        console.log('GIF adicionado ao chat:', gifUrl);
      } else {
        console.error('Resposta da API do Giphy sem os dados esperados:', data);
        // Usar GIF alternativo de placeholder
        usePlaceholderGif();
      }
    } catch (error) {
      console.error('Erro ao buscar GIF:', error);
      // Usar GIF alternativo de placeholder em caso de erro
      usePlaceholderGif();
    }
  }
  
  
  function usePlaceholderGif() {
    const messageArea = document.getElementById('chatMessages');
    const div = document.createElement('div');
    div.className = 'gif-container';
    
    const img = document.createElement('img');
    
    img.src = "https://i.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif";
    img.alt = 'GIF de comemoração';
    img.className = 'gif-message';
    
    
    img.onerror = () => {
      img.src = "/api/placeholder/300/200";
      img.alt = 'Celebração';
    };
    
    div.appendChild(img);
    messageArea.appendChild(div);
    messageArea.scrollTop = messageArea.scrollHeight;
  }


document.getElementById('celebrationBtn').addEventListener('click', () => {
  addUserMessage("VAMOS FURIA!!! 🔥🔥🔥");
  sendCelebrationGif();
});


document.getElementById('cheerBtn').addEventListener('click', () => {
  const cheers = [
    "VAMOS FURIA! RUMO AO TÍTULO! 🔥🏆",
    "HOJE É DIA DE VITÓRIA! FURIA NUNCA DESISTE! 💪",
    "FURIA É PAIXÃO! ESTAMOS JUNTOS NESSA! ❤️🔥",
    "FURIA, MINHA VIDA! VAMOS GANHAR! 🔥"
  ];
  
  const randomCheer = cheers[Math.floor(Math.random() * cheers.length)];
  addUserMessage(randomCheer);
});


function simulateOtherFans() {
  const fanNames = ["FURIA_Fan99", "Torcedor1", "Torcedor2", "FuriaLover", "CSGOFan", "BrasilCS"];
  const messages = [
    "Esse time é demais! 🔥",
    "Que jogada incrível! 👏",
    "Vamos virar esse jogo!",
    "KSCERATO está jogando muito hoje!",
    "Precisamos melhorar na defesa",
    "FURIA SEMPREEE 🔥🔥🔥",
    "Quem mais está ansioso pro próximo round?",
    "Adversário está forte hoje",
    "VAMOS FURIAAAAAA",
    "Alguém viu essa jogada do arT?",
    "QUE CLUTCH FENOMENAL!",
    "O yuurih está INSANO hoje"
  ];
  
  
  function randomMessage() {
    const fanName = fanNames[Math.floor(Math.random() * fanNames.length)];
    const message = messages[Math.floor(Math.random() * messages.length)];
    
    addOtherUserMessage(fanName, message);
  }
  

  setTimeout(randomMessage, 15000);
  
  
  setInterval(() => {
    
    if (Math.random() < 0.7) {
      randomMessage();
    }
  }, Math.random() * 20000 + 10000);
  
  
  updateOnlineUsers();
}


function updateOnlineUsers() {
  const usersList = document.getElementById('usersList');
  const baseUsers = ["Torcedor1", "Torcedor2", "FURIA_Fan99"];
  const extraUsers = ["FuriaLover", "CSGOFan", "BrasilCS", "ArTFan", "YuurihSUPER", "KSCERATO_BR"];
  
  
  usersList.innerHTML = '';
  
  
  const userItem = document.createElement('li');
  userItem.innerHTML = `<i class="fas fa-circle user-online"></i> ${userNickname} (Você)`;
  usersList.appendChild(userItem);
  
  
  baseUsers.forEach(user => {
    const li = document.createElement('li');
    li.innerHTML = `<i class="fas fa-circle user-online"></i> ${user}`;
    usersList.appendChild(li);
  });
  
  
  const extraCount = Math.floor(Math.random() * 4);
  const shuffledUsers = extraUsers.sort(() => 0.5 - Math.random()).slice(0, extraCount);
  
  shuffledUsers.forEach(user => {
    const li = document.createElement('li');
    li.innerHTML = `<i class="fas fa-circle user-online"></i> ${user}`;
    usersList.appendChild(li);
  });
  
  
  const totalUsers = 1 + baseUsers.length + extraCount;
  addSystemMessage(`${totalUsers} torcedores online`);
  
  
  setTimeout(updateOnlineUsers, 60000 + Math.random() * 60000);
}


function checkImportantEvents() {
  const events = [
    { text: "FURIA se classifica para o Major! 🎉", probability: 0.15 },
    { text: "Novo recorde pessoal para KSCERATO! 🔥", probability: 0.2 },
    { text: "FURIA anuncia novo patrocinador!", probability: 0.1 },
    { text: "Próximo jogo contra Astralis será decisivo para classificação", probability: 0.25 }
  ];
  
  events.forEach(event => {
    if (Math.random() < event.probability) {
      setTimeout(() => {
        addHighlightMessage(`📢 NOTÍCIA: ${event.text}`);
      }, Math.random() * 180000 + 60000); 
    }
  });
}


setTimeout(checkImportantEvents, 45000);


function updateGameStats() {
  const players = ["arT", "KSCERATO", "yuurih", "drop", "saffee"];
  const player = players[Math.floor(Math.random() * players.length)];
  const actions = [
    `${player} conseguiu 3 kills neste round! 🔫`,
    `${player} fez um clutch incrível! 🎯`,
    `${player} lidera em abates com 24 kills! 💪`,
    `${player} com uma taxa de headshot de 68%! 🎯`,
    `${player} defendeu o bomb site sozinho! 🛡️`
  ];
  
  const randomAction = actions[Math.floor(Math.random() * actions.length)];
  
  setTimeout(() => {
    addBotMessage(`📊 ESTATÍSTICA: ${randomAction}`);
  }, Math.random() * 45000 + 30000); 
  
  
  setTimeout(updateGameStats, Math.random() * 120000 + 60000);
}


setTimeout(updateGameStats, 30000);


function checkInactivity() {
  const lastMessageTime = Date.now();
  
  setInterval(() => {
    const currentTime = Date.now();
    const inactiveTime = currentTime - lastMessageTime;
    
    
    if (inactiveTime > 120000) {
      const prompts = [
        "Como você está se sentindo com o desempenho da FURIA hoje?",
        "Qual jogador está se destacando mais na sua opinião?",
        "Quem você acha que será o próximo adversário difícil para a FURIA?",
        "O que você está achando da estratégia do time neste mapa?"
      ];
      
      const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
      addBotMessage(randomPrompt);
    }
  }, 150000);
}


setTimeout(checkInactivity, 180000);


function addRandomEmojis() {
  const emojiSets = [
    "🔥🔥🔥",
    "👏👏👏",
    "🏆🎮🔥",
    "💪😎🔥",
    "🇧🇷🔥🏆"
  ];
  
  if (Math.random() < 0.3) {
    const emojis = emojiSets[Math.floor(Math.random() * emojiSets.length)];
    const fanName = ["FURIA_Fan99", "Torcedor1", "FuriaLover"][Math.floor(Math.random() * 3)];
    
    addOtherUserMessage(fanName, emojis);
  }
  
  
  setTimeout(addRandomEmojis, Math.random() * 60000 + 30000);
}


setTimeout(addRandomEmojis, 40000);
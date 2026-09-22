// Importa a biblioteca Express e também os tipos para o TypeScript
// O Express será utilizado para criar o servidor web
import express from "express";
import type { Express, Request, Response } from "express";

import fs from "fs"
// Importa a classe Player do arquivo Player.ts
import { Player } from "./models/Player.js";

// Cria uma aplicação Express
// A função express() devolve um objeto que representa o servidor da aplicação
const app: Express = express();

// Middleware para permitir que o servidor entenda requisições com corpo em JSON
app.use(express.json());

// Define a porta onde o servidor ficará disponível
// Neste caso, o servidor poderá ser acessado pela porta 8081
const PORT: number = 8081;

// Instanciação de um jogador utilizando a classe Player
// Criamos (instanciamos) um novo jogador chamado "Hero" com 100 de saúde e nível 5
// A partir da classe Player que foi importada do arquivo Player.ts
let player1: Player = new Player("Hero", 100, 5);

// Define o nome do diretório onde os arquivos serão armazenados
const DATA_FILE = "./data/player.json"

/* 
Função para garantir que o diretório de dados exista antes de salvar os arquivos.
Se o 
*/
function ensureDataDirectory() {
    const dataFolder = "./data";
    if (!fs.existsSync(dataFolder)) {
        fs.mkdirSync(dataFolder);
    }
}

// Chamar a função para garatir que o diretório de dados exista
// antes de qualquer operação de leitura ou escrita de arquivos
ensureDataDirectory();

// Função para salvar os dados do jogador em um arquivo JSON
function savePlayerData(player: Player) {
    // Converte o objeto player em uma string JSON
    const playerData = JSON.stringify(player, null, 2);
    // Salva a string JSON em um arquivo chamado player.json dentro do diretório data
    fs.writeFileSync(DATA_FILE, playerData, "utf-8");
}

// Função para carregar os dados do jogador a partir de um arquivo JSON
function loadPlayerData(): Player {
    // Verifica se o arquivo player.json existe
    if (fs.existsSync(DATA_FILE)) {
        // Lê o conteúdo do arquivo
        const playerData = fs.readFileSync(DATA_FILE, "utf-8");
        const playerdata = JSON.parse(playerData);

        /* ATENÇÃO: JSON.parse() retorna a um objeto "puro"
        // (sem os métofos da classe Player). 
        // Para que possamos utilizar os métodos da classe Player,
        // precisamos criar uma nova instância da classe player com os dados carregados do arquivo.
        */
        return new Player(playerdata.name, playerdata.health, playerdata.level);
    }
    // Cria um novo players se não existir com nome "Jogador1", 100 de saúde e nível 1
    const newPlayer = new Player("Jogador1", 100, 1);
    savePlayerData(newPlayer);
    return newPlayer;
}

// Incializa o player carregando seu estado do arquivo JSON
let player: Player = loadPlayerData();



// Quando o usuário acessar a rota "/player" via GET, o servidor responderá com os dados do jogador
// A função de callback recebe dois parâmetros: req (requisição) e res (resposta)
app.get("/player", (req: Request, res: Response) => {
    res.json({
        mensagem: "Informações do jogador",
        player: player1
    });
});

// Rota POST para o jogador atacar
// Quando o usuário acessar a rota "/player/attack" via POST, o servidor chamará o método attack() do jogador
// É utilizada para enviar dados ou realizar ações que alteram o estado do servidor 
// como nesse caso onde o jogador realiza uma ação (como acionar um comportamento de ataque)
// que é o método attack() do jogador
// A função de callback recebe dois parâmetros: req (requisição) e res (resposta)
app.post("/player/attack", (req: Request, res: Response) => {
    const attackMessage = player1.attack(); // Chama o método attack() do jogador
    // Retorna uma resposta JSON com a mensagem de ataque
    res.json({
        mensagem: attackMessage
    });
});

// Rota POST para o jogador receber dano
// Quando o usuário acessar a rota "/player/damage" via POST, o servidor chamará o
// método takeDamage() do jogador, passando o valor do dano recebido como parâmetro. 
app.post("/player/damage", (req: Request, res: Response) => {
    // Extrai o valor do dano do corpo da requisição 
    const { damage } = req.body;

    // Validação simples para evitar erros caso 'damage' não seja um número
    if (typeof damage !== "number") {
        res.status(400).json({ mensagem: "Por favor, informe um valor numérico para 'damage'." });
        return;
    }

    // Chama o método takeDamage() do jogador
    const damageMessage = player1.takeDamage(damage);
    // Salva o estado atual do jogador no arquivo JSON
    savePlayerData(player1);

    // Retorna uma resposta JSON com a mensagem de dano para o cliente que fez a requisição
    res.json({
        // Retorna a mensagem de dano recebido 
        action: damageMessage,
        // Retorna a saúde atual do jogador 
        currentHealth: player1.health,
        // Retorna o nível atual do jogador
        currentLevel: player1.level
    });
});

// Rota POST para o jogador subir de nível
// Quando o usuário acessar a rota "/player/level" via POST, o servidor chamará o
// método levelUp() do jogador, passando o valor do nível como parâmetro.
app.post("/player/level", (req: Request, res: Response) => {
    // Extrai o valor do nível do corpo da requisição
    const { level } = req.body;

    // Validação simples para evitar erros caso 'level' não seja um número
    if (typeof level !== "number") {
        res.status(400).json({ mensagem: "Por favor, informe um valor numérico para 'level'." });
        return;
    }

    // Chama o método levelUp() do jogador
    const levelMessage = player1.levelUp(level);

    // Salva o estado atual do jogador no arquivo JSON
    savePlayerData(player1);

    // Retorna uma resposta JSON com a mensagem de evolução
    res.json({
        // Retorna a mensagem de evolução
        action: levelMessage,
        // Retorna a saúde atual do jogador
        currentHealth: player1.health,
        // Retorna o nível atual do jogador
        currentLevel: player1.level
    });
});

// Inicializa o servidor utilizando a porta definida
// O método listen() faz o servidor começar a "escutar" requisições HTTP
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log("Rotas disponíveis");
    console.log(`GET http://localhost:${PORT} /player - Obtém informações do jogador`);
    console.log(`POST http://localhost:${PORT} /player/attack - Faz o jogador atacar`);
    console.log(`POST http://localhost:${PORT} /player/damage - Faz o jogador receber dano`);
    console.log(`POST http://localhost:${PORT}/player/health - Recupera a saúde do jogador`);
    console.log(`POST http://localhost:${PORT} /player/level - Faz o jogador subir de nível`);

});
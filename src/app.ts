// Importa a biblioteca Express e também o tipo Express
// O Express será utilizado para criar o servidor web
import express from "express";
import type { Express, Request, Response } from "express";
// importar a classe Player do arquivo Player.ts
import { Player } from "./models/Player.js";

// Cria uma aplicação Express
// A função express() devolve um objeto que representa o servidor da aplicação
const app: Express = express();

// middleware para permitir que o servidor entenda requisições com corpo em JSON
app.use(express.json());

// Define a porta onde o servidor ficará disponível
// Neste caso, o servidor poderá ser acessado pela porta 8081
const PORT: number = 8081;

// Instanciação de um jogador utilizando a classe Player
// Criamos (instanciamos) um novo jogador chamado "Hero" com 100 de saúde e nível 5
// A partir da classe Player que foi importada do arquivo Player.ts
let player1: Player = new Player("Hero", 100, 5);

// Rota GET para obter informações do jogador
// Quando o usuário acessar a rota "/player" via GET, o servidor responderá com os dados do jogador
// A função de callback recebe dois parâmetros: req (requisição) e res (resposta)
app.get("/player", (req: Request, res: Response) => {
    res.json({
        mensagem: "Informações do jogador",
        player:player1
    });
});

// Rota POST para o jogador atacar
// Quando o usuário acessar a rota "/player/attack" via POST, o servidor chamará o método attack() 
// do jogador
// È ultilizada para enviar dados ou realizar ações que alteram o estado do servidor 
// como nesse caso onde o jogador realiza uma ação (como acionar um comportamento de ataque)
// que é o metodo attack() do jogador 
// A função de callback recebe dois parâmetros: req (requisição) e res (resposta)
app.post("/player/attack", (req: Request, res: Response) => {
  const attackMessage = player1.attack(); // Chama o método attack() do jogador
  // Retorna uma resposta JSON com a mensagem de ataque
    res.json({ 
    mensagem: attackMessage
    })
});

// Rota POST para o jogador receber dano
// Quando o usuário acessar a rota "/player/damage" via POST, o servidor chamará o
// método takeDamage() do jogador, passando o valor do dano recebido como 
// parâmetro. 
app.post("/player/damage", (req: Request, res: Response) => {
  // Extrai o valor do dano do corpo da requisição 
    const { damage } = req.body; 
  // Chama o método takeDamage() do jogador
    const damageMessage = player1.takeDamage(damage);
  // Retorna uma resposta JSON com a mensagem de dano
  // para o cliente que fez a requisição
    res.json({
    // Retorna a mensagem de dano recebido 
    action: damageMessage,

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
    console.log("Rotas disponíveis:");
    console.log(`GET http://localhost:${PORT}/player - Obter informações do jogador`);
    console.log(`POST http://localhost:${PORT}/player/attack - Jogador realiza um ataque`);
    console.log(`POST http://localhost:${PORT}/player/damage - Jogador recebe dano`);

});
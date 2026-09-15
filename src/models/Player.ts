// A palavra "classe" define uma que estamos criando um molde.
// A palavra "export" permite que esse arquivo seja usado
//  por outros arquivos (como o app.ts)
export class Player {
    public name: string; // O nome do jogador (texto)
    public health: number; // A saúde do jogador (número)
    public level: number; // O nível do jogador (número)

    // Construtores (O construtor é um método especial que executado
    // automáticamente quando a classe é instanciada uma única vez)
    constructor(name: string, health: number = 100, level: number = 1) {
        // A palavra "this" faz referencia a própia classe, ou seja:
        // "Pegue o atríbuto 'name' da classe Player e atribua o valor
        // d parâmetro 'name' a ele"
        this.name = name;
        this.health = health;
        this.level = level;
    }

    // Métodos (Comportamentos da classe)
    // Métodos são as "funções" que a classe pode executar, ou seja, são os
    // comportamentos da classe
    // O método "attack" é um método que retorna uma string
    public attack(): string {
        const damage = this.level * 10; // Calcula o dano baseado no nível do jogador
        return `${this.name} atacau e causou $ {damage} de dano`;
    }
    // O método do "takeDamage" é um método que recebe um número como parâmetro e
    // não retorna nada (void).
    public takeDamage(anount: number): string {
        this.health -= anount; // Reduz a saúde do jogador pelo valor do paâmetro
        // regra para garantir que a saúde não fique negativa
        if (this.health < 0) {
            this.health = 0; // Garante que a saúde não fique negativa
            return `${this.name} foi derrotado!`;
        }

        return `${this.name} recebeu ${anount} de dano e agora tem ${this.health} de saúde.`;
    }
}
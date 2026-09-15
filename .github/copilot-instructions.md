# AI Coding Agent Instructions for meu-projeto-backend-3

## Project Overview
A TypeScript-based RPG backend using Express.js with a Player entity system. The codebase demonstrates game mechanics through HTTP REST endpoints managing player stats (health, level) and actions (attack, take damage).

**Tech Stack**: Node.js + Express 5.x + TypeScript 7.x, executed via `tsx` (TypeScript executor)

## Architecture & Component Relationships

### Core Files
- **[src/app.ts](../src/app.ts)**: Express server entry point (port 8081). Instantiates a single `Player` instance and exposes three REST routes.
- **[src/models/Player.ts](../src/models/Player.ts)**: Game entity class with health/level stats and action methods (attack, takeDamage).

### Data Flow
1. Client sends HTTP request to Express route
2. Route handler calls Player instance method
3. Method modifies player state (health reduction, damage calculation)
4. Response returned as JSON

## Critical Developer Workflows

### Running the Project
```bash
npm run dev  # Starts tsx watch mode, auto-reloads on file changes (development only)
```
Execute from workspace root. No build step needed; `tsx` handles TypeScript transpilation.

### Adding Routes
1. Create method on `Player` class in [src/models/Player.ts](../src/models/Player.ts)
2. Add `app.post()` or `app.get()` handler in [src/app.ts](../src/app.ts) (after line 28)
3. Call player method and return JSON response

## Project-Specific Patterns & Conventions

### Type Safety
- **Typed imports**: Use `import type { Express, Request, Response }` for types only; regular imports for values.
- **Method return types**: All Player methods return strings for API responses (see `attack()` and `takeDamage()`).
- **Constructor defaults**: Player defaults to 100 health and level 1 if not provided.

### Game Mechanics
- **Damage calculation**: `damage = level * 10` (defined in `Player.attack()`)
- **Health floor**: `takeDamage()` prevents negative health, sets floor at 0
- **Victory condition**: String "foi derrotado!" returned when health reaches 0

### Portuguese Comments
Codebase uses Portuguese for educational comments/documentation. Preserve this convention when adding code.

## Integration Points & External Dependencies

### Express Middleware
- `app.use(express.json())` enables request body parsing (required for POST routes)
- All routes require JSON requests/responses

### Module Configuration
- **"type": "module"** in package.json enables ES6 imports
- **.js extensions required** in import statements (e.g., `import { Player } from "./models/Player.js"`)

## Common Tasks

### Modifying Player Stats
Edit constructor defaults in [Player.ts](../src/models/Player.ts#L11).

### Adding Player Actions
1. Add public method to Player class returning string
2. Add route in [app.ts](../src/app.ts) calling player method
3. Return response with `res.json({ mensagem: methodResult })`

### Debugging
Run `npm run dev` and check terminal output. Inspect HTTP responses in client (curl, Postman, browser).

# Inglês Legal - Teacher Leno

Aplicação interativa para ensino de inglês desenvolvida para a EMEF Quintino Bocaiúva - Osasco.

## Como publicar no GitHub Pages

1. **Configuração**: O site está configurado para o endereço `https://lenilsonxavier-dev.github.io/inglesquintino/`.
2. **GitHub Actions**: O arquivo `.github/workflows/deploy.yml` automatiza tudo.
3. No seu repositório no GitHub, vá em **Settings > Pages**.
4. Em **Build and deployment > Source**, certifique-se de que está selecionado **GitHub Actions**.

## Por que a página estava em branco? (404) Corrigido ✅

Fizemos as correções necessárias:
1. **Base Path Relativo**: O `base` no `vite.config.ts` está agora como `'./'`. Isso faz com que o site funcione tanto no GitHub Pages (`/inglesquintino/`) quanto no Vercel (`/`), sem precisar mudar o código.
2. **Caminhos no index.html**: O script é carregado via `src/main.tsx` (caminho relativo), o que resolve o erro de carregamento de recursos.
3. **GitHub Action**: O processo de deploy automatizado continua funcionando normalmente.

**Dica para Vercel:**
Ao importar no Vercel, use as configurações padrão. Ele detectará que é um projeto Vite e fará o build automaticamente.

**Sites Oficiais:**
- **GitHub Pages**: `https://lenilsonxavier-dev.github.io/inglesquintino/`
- **Vercel**: `https://inglesquintino.vercel.app/`

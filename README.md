# Inglês Legal - Teacher Leno

Aplicação interativa para ensino de inglês desenvolvida para a EMEF Quintino Bocaiúva - Osasco.

## Como publicar no GitHub Pages

1. **GitHub Actions**: O arquivo `.github/workflows/deploy.yml` já está configurado.
2. No seu repositório no GitHub, vá em **Settings > Pages**.
3. Em **Build and deployment > Source**, selecione **GitHub Actions**.
4. Sempre que você fizer um `push` (enviar arquivos) para o branch `main`, o site será atualizado automaticamente.

## Correções de Erro 404 (Página em Branco)

- Ajustamos o `index.html` para usar caminhos relativos: `src/main.tsx` (sem a barra inicial).
- Configuramos `vite.config.ts` com `base: './'`.

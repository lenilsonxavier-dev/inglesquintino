# Inglês Legal - Teacher Leno

Aplicação interativa para ensino de inglês desenvolvida para a EMEF Quintino Bocaiúva - Osasco.

## Como publicar no GitHub Pages

1. **Configuração**: O site está configurado para o endereço `https://lenilsonxavier-dev.github.io/inglesquintino/`.
2. **GitHub Actions**: O arquivo `.github/workflows/deploy.yml` automatiza tudo.
3. No seu repositório no GitHub, vá em **Settings > Pages**.
4. Em **Build and deployment > Source**, certifique-se de que está selecionado **GitHub Actions**.

## Por que a página estava em branco? (404) Corrigido ✅

Fizemos as correções necessárias:
1. **Vite Base Path**: O `base` no `vite.config.ts` está configurado como `/inglesquintino/`.
2. **Caminhos Absolutos**: O `index.html` agora usa `/src/main.tsx`, que o Vite processa corretamente durante o build.
3. **GitHub Action**: O script de deploy foi corrigido e a dependência de cache foi removida para evitar erros de falta de `package-lock.json` (embora ele agora exista e tenha sido atualizado).

**O que você precisa fazer agora para ver o site funcionando:**
1. **Push**: Envie todas as alterações para o seu GitHub:
   ```bash
   git add .
   git commit -m "fix: final github pages deployment"
   git push
   ```
2. **Confirme no GitHub**: Vá na aba **Actions** e veja o processo de build. Ele deve agora completar com sucesso (check verde ✅).
3. **Link oficial**: Assim que o deploy terminar, acesse:
   `https://lenilsonxavier-dev.github.io/inglesquintino/`

Se ainda houver algum erro, verifique na aba **Actions** qual é a mensagem de erro específica.

# Inglês Legal - Teacher Leno

Aplicação interativa para ensino de inglês desenvolvida para a EMEF Quintino Bocaiúva - Osasco.

## Como publicar no GitHub Pages

1. **Configuração**: O site está configurado para o endereço `https://lenilsonxavier-dev.github.io/inglesquintino/`.
2. **GitHub Actions**: O arquivo `.github/workflows/deploy.yml` automatiza tudo.
3. No seu repositório no GitHub, vá em **Settings > Pages**.
4. Em **Build and deployment > Source**, certifique-se de que está selecionado **GitHub Actions**.

## Por que a página estava em branco? (404) Corrigido ✅

Fizemos duas correções cruciais:
1. **GitHub Action**: Removemos a necessidade do arquivo `package-lock.json` para o cache, o que estava causando erro no build do GitHub.
2. **Caminhos no index.html**: Alteramos o carregamento do script para `src/main.tsx` (sem a barra inicial), permitindo que o Vite entenda que deve procurar dentro da pasta `/inglesquintino/`.

**O que você precisa fazer agora:**
1. Envie (push) as novas alterações para o seu GitHub.
2. Vá na aba **Actions** e acompanhe o build. Ele deve ficar verde (com um check ✅).
3. Assim que ficar verde, o seu site em `https://lenilsonxavier-dev.github.io/inglesquintino/` deverá funcionar!

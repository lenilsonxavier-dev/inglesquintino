# Inglês Legal - Teacher Leno

Aplicação interativa para ensino de inglês desenvolvida para a EMEF Quintino Bocaiúva - Osasco.

## Como publicar no GitHub Pages

1. **Configuração**: O site está configurado para o endereço `https://lenilsonxavier-dev.github.io/inglesquintino/`.
2. **GitHub Actions**: O arquivo `.github/workflows/deploy.yml` automatiza tudo.
3. No seu repositório no GitHub, vá em **Settings > Pages**.
4. Em **Build and deployment > Source**, certifique-se de que está selecionado **GitHub Actions**.

## Por que a página está em branco? (404)

Se o erro **404** persistir, é porque a **GitHub Action falhou**. Faça o seguinte:
1. Vá na aba **Actions** no seu repositório GitHub.
2. Clique no último erro (X vermelho).
3. Veja em qual passo ele parou. Geralmente é no "Build" ou "Install dependencies".
4. Me envie o erro que aparece lá para eu corrigir o script.

*Nota: O `base` no `vite.config.ts` deve ser obrigatoriamente `/inglesquintino/`.*

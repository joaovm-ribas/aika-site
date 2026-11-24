# Site do Grupo Aika

Site estático (HTML, CSS e JavaScript puros) do Grupo de Danças Japonesas Aika 愛歌, da Associação Regional de Cultura Japonesa Sakura de Ijuí/RS.

## Estrutura

```
site-aika/
├── index.html            Página inicial
├── integrantes.html      Lista de todos os integrantes
├── galeria.html          Galeria do grupo (álbuns)
├── integrantes/
│   └── luisa-hayashi.html  Uma página por integrante (nome-sobrenome.html)
├── css/
│   └── style.css         Todo o visual (cores, fontes, layout)
├── js/
│   ├── i18n.js           Textos nos 4 idiomas (PT, EN, ES, JA)
│   └── main.js           Troca de idioma, menu do celular, vídeos
└── img/
    ├── logo.png
    ├── galeria/          Fotos da galeria do grupo (uma pasta por álbum)
    └── membros/          Uma pasta por integrante (foto de perfil + galeria)
```

## Como abrir no VS Code

1. Abra a pasta `site-aika` em **Arquivo > Abrir Pasta**.
2. Instale a extensão **Live Server** (Ritwick Dey).
3. Clique com o botão direito em `index.html` e escolha **Open with Live Server**.

## Como editar

**Textos.** Os textos ficam em dois lugares: no HTML (em português, para o Google e para quem está sem JavaScript) e no `js/i18n.js` (nos quatro idiomas). Cada texto tem uma chave em `data-i18n`, por exemplo:

```html
<p data-i18n="about_p1">O Grupo de Danças Japonesas Aika...</p>
```

Para mudar esse texto, altere `about_p1` em `pt`, `en`, `es` e `ja` no `i18n.js` e copie a versão em português para o HTML.

**Cores e fontes.** No início do `css/style.css`, em `:root`. `--vermelho` e `--ouro` são as cores da marca. O site tem dois temas, trocados pelo botão ☾/☀ no topo: o claro (padrão do CSS, com o papel de parede de sakura `img/sakura-fundo.svg`) e o escuro (o visual original), cujas cores ficam na seção "Tema escuro" do CSS. Na primeira visita, o site segue o modo claro/escuro do aparelho; depois, lembra a escolha do visitante.

**Fotos dos integrantes.** Cada integrante tem uma pasta em `img/membros/`. A foto de perfil vai dentro dela, com o mesmo nome da pasta: `img/membros/luisa-hayashi/luisa-hayashi.jpg` (ou `.jpeg`, `.png`, `.webp`; maiúsculas como `.JPG` também funcionam). Use o formato retrato (3:4), com cerca de 800 px de largura. Enquanto não houver foto, aparecem as iniciais do nome sobre o fundo vermelho. Se a foto for deitada e a pessoa não estiver no centro, ajuste o enquadramento com `style="--foco: 68% 30%"` no `<span class="membro__foto">` (em `integrantes.html`) e no `<span class="perfil__foto">` (na página da pessoa). O primeiro número move o enquadramento na horizontal (0% = esquerda, 100% = direita), e o segundo na vertical.

**Foto do grupo todo.** Na página inicial, abaixo do texto "O grupo", há um espaço para uma foto com todos juntos. Coloque o arquivo em `img/grupo.jpg` (ou `.jpeg`, `.png`, `.webp`). A foto aparece inteira, sem corte, na largura da página; uma foto deitada (paisagem) com cerca de 1600 px de largura fica melhor. Enquanto o arquivo não existir, esse espaço fica escondido.

**Fotos das coordenadoras.** A Taciana e a Maria Carmen aparecem no fim da página Integrantes, em "Coordenação". As fotos seguem o mesmo padrão dos integrantes: `img/membros/taciana-ribas/taciana-ribas.jpg` e `img/membros/maria-carmen-hayashi/maria-carmen-hayashi.jpg` (ou `.jpeg`, `.png`). As pastas já existem.

**Banner do lema.** Na seção "Nosso jeito" (不適合者のやり方) da página inicial, o banner do lema (`img/futekigosha.png`; também vale `.jpg`, `.jpeg` ou `.webp`) ocupa a metade direita da faixa, do texto até a borda da tela, e se dissolve no fundo do lado do texto. As bordas da imagem podem ser cortadas para preencher a altura; no celular, ela fica abaixo do texto, inteira. Enquanto o arquivo não existir, o espaço fica escondido.

**Galeria de cada integrante.** Além da foto de perfil, cada integrante tem uma galeria na sua página. Coloque as fotos na pasta com o nome dele, numeradas em ordem: `img/membros/luisa-hayashi/1.jpg`, `2.jpg`, `3.jpg`... (também vale `.jpeg`, `.JPG`, `.JPEG`, `.png` ou `.webp`). O site encontra as fotos sozinho, sem mexer no HTML. Não pule números: se faltar o `4`, as fotos depois dele não aparecem. Sem fotos, aparece "Mais fotos em breve". Ao clicar numa foto, ela abre ampliada, com setas para passar. Prefira fotos com até cerca de 1600 px no lado maior, para o site não ficar pesado.

**Mensagem do integrante.** Abaixo da bio, cada página pode mostrar uma caixa de citação com uma mensagem da própria pessoa. Nas páginas de quem ainda não enviou, o bloco já está pronto, mas escondido dentro de um comentário (`<!-- MENSAGEM: ... FIM -->`). Para ativar: apague a linha que começa com `<!-- MENSAGEM` e a linha `FIM -->`, troque "Texto da mensagem aqui." pela mensagem (sem aspas, elas aparecem sozinhas) e crie a chave indicada no comentário (ex.: `msg_vitor_antunes`) nos quatro idiomas do `js/i18n.js`.

**Mapa "Cidades em que já estivemos".** Fica na página inicial, depois de "Por onde passamos". A lista de cidades ao lado do mapa está no `index.html`, dentro de `<section ... id="mapa">`; o mapa e o dragão dourado são desenhados sozinhos pelo `js/mapa.js` a partir dessa lista. Para adicionar uma cidade, copie um `<li>` e troque o nome, os eventos e as coordenadas: no Google Maps, clique com o botão direito no local; o primeiro número é a latitude (`data-lat`) e o segundo a longitude (`data-lon`), com ponto e sinal de menos. `data-rotulo="e"` (ou `"w"`) escreve o nome da cidade no mapa, à direita (ou à esquerda) do ponto. O caminho do dragão é recalculado sozinho. O mapa mostra do Mato Grosso ao Uruguai; uma cidade fora dessa área (no Nordeste, por exemplo) exigiria refazer os contornos do mapa.

**Vídeos.** Em `index.html`, cada vídeo tem `data-youtube=""`. Coloque ali o código do vídeo, que é a parte depois de `v=` no link do YouTube. Por exemplo, para `youtube.com/watch?v=ABC123`, use `data-youtube="ABC123"`. O vídeo passa a tocar dentro do site.

**Contatos.** No fim de `index.html`, troque `contato@exemplo.com` e `5500000000000` (WhatsApp com DDI e DDD, só números).

**Galeria do grupo.** A página `galeria.html` (no menu, "Galeria") reúne as fotos do grupo. As fotos do álbum principal vão em `img/galeria/geral/`, numeradas como nas galerias dos integrantes: `1.jpg`, `2.jpg`, `3.jpg`... As 8 primeiras também aparecem na página inicial, com um link para a galeria completa.

Para criar um álbum de um evento:
1. Crie uma pasta, ex.: `img/galeria/festival-japao-sp-2024/`, com as fotos numeradas.
2. Em `galeria.html`, copie o bloco `<section class="galeria" ...>` (há um comentário explicando), troque o `data-pasta` pela nova pasta e o título `<h2>` pelo nome do evento. Tire o `data-i18n` do título, porque nomes de eventos não são traduzidos.

## Como adicionar um integrante

1. Copie uma página de `integrantes/` (ex.: `akemi-oba.html`) com o nome da pessoa, ex.: `integrantes/nome-sobrenome.html`.
2. No novo arquivo, troque o nome (no título e no `<h1>`), as iniciais, o caminho da foto, o ano de entrada, o ano de nascimento (linha `born`; apague a linha se não souber), a função e a chave da bio (`bio_nome_sobrenome`).
3. Em `js/i18n.js`, adicione `bio_nome_sobrenome` nos quatro idiomas. As funções (`r_danca`, `r_danca_taiko` etc.) já existem; crie uma nova só se precisar.
4. Em `integrantes.html`, copie um bloco `<a class="membro">` e ajuste o link, as iniciais, a foto, o nome e a função. Os cartões estão em ordem de entrada no grupo (e, no mesmo ano, em ordem alfabética), então quem entrou agora vai no fim da lista.
5. Em `index.html`, adicione o nome na lista `<ul class="nomes">` (e ajuste a frase `members_home`, que diz quantos integrantes são).
6. Crie a pasta `img/membros/nome-sobrenome/` e coloque nela a foto de perfil `nome-sobrenome.jpg` e as fotos da galeria (`1.jpg`, `2.jpg`...). A nova página já traz a seção da galeria se for copiada de outra; troque o `data-pasta` e o `data-nome` dela.

Para tirar alguém do site, apague a página dele e remova o cartão em `integrantes.html` e o nome em `index.html`.

O cabeçalho e o rodapé se repetem em todas as páginas. Se mudar o menu, mude em todas.

## Como publicar

O site não precisa de servidor nem de banco de dados. Opções gratuitas:

- **Netlify:** arraste a pasta `site-aika` em app.netlify.com/drop.
- **GitHub Pages:** suba a pasta num repositório e ative Pages nas configurações.

Um domínio próprio (ex.: grupoaika.com.br) é registrado no Registro.br e apontado para o serviço escolhido.

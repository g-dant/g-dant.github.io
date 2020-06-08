# Criando um Dashboard em Produção com AWS
## (Em menos de 1 semana! Veja o [Link](http://dantgcovidpage.s3-website-sa-east-1.amazonaws.com/))

Às vezes acho a área de computação meio ingrata: uma tecnologia engole a outra em um ciclo infinitamente mais rápido a cada segundo. Quando a gente sente que a sua cabeça fica confusa no meio turbilhão, uma coisa que ajuda __bastante__ é pensar: as mudanças de tecnologia __sempre__ (ou __quase sempre__) chegam para ajudar.

E existe uma explicação simples pra isso: se a tecnologia é adotada é porque, de alguma forma, ela facilitou a vida das organizações que, em um contexto de concorrência eterna, viram alguma justificativa em __romper com a cultura da tecnologia antiga__ (o que pode ser bem trabalhoso) e __mudar frameworks, métodos, linguagens e tudo o que for possível__. Ninguém faria isso se não tivesse razão não é? Sejamos pragmáticos: ideias de mudanças são sempre bem-vindas.

E um paradigma muito legal é o de páginas WEB serverless, que nos permite criar aplicações WEB inteiras e complexas sem ter a menor preocupação com nenhum tipo de infraestrutura...e o melhor: a um custo __bem econômico__. Foi procurando me aprofundar nesse mundo, que resolvi pesquisar as tecnologias que a gente tem para criar __dashboards__ e as opções foram __muitas__.

![Serverless](https://cdn3.iconfinder.com/data/icons/cloud-technology-37/64/serverless-technology-cloud-digital-storage-128.png)

Tenho meu interesse principal na parte de ciência de dados / machine learning e deep learning e, para nós, ter a capacidade de fazer um projetinho pessoal (e de preferência bem maluco e exótico) é fundamental. Para viajar nos algoritmos científicos a gente fala basicamente em __R__ e em __Python__ (às vezes em __Scala__). Então...ok, comecei a listar as possibilidades.

Antes de mostrar minha escolha final (que usa AWS + Python), vou mostrar por onde passei antes de criar o meu pequeno monitor de COVID-19.

# Ferramentas para Criação de Dashboards - Overview

Dá para a gente dividir essas ferramentas em três tipos: 

__A. As muito fáceis:__ que permitem que você crie Dashboards com o apoio de interfaces gráficas quase que instantaneamente. Tableau e Power BI são bons exemplos. São ferramentas interessantes para analistas de dados ou até mesmo para fazer análises pequenas antes de criar sistemas maiores. __Porém__ são mais focadas em visualização e não é muito simples nem rápido executar algoritmos complexos dentro dessas ferramentas.

![PowerBI](https://img.icons8.com/dusk/2x/power-bi.png)

__B. As fáceis:__ são ferramentas que pedem que se tenha uma base em programação. Elas já te dão todo o front-end pronto e a única coisa que o programador faz é dizer como o dashboard vai se organizar. A gente já consegue mais velocidade aqui __mas__ ainda assim essas ferramentas ficam lentas conforme o algoritmo cresce e a customização do front-end apresentado é __bem__ difícil. São ferramentas indicadas para analisar __amostras__ de dados de Big Data ou para rodar algoritmos complexos em __Small Data__...são exemplo delas: __Shiny__ e __Python Dash__. Dessas duas a minha predileta é a de __R__ (Shiny) pois acho que é mais completa e tem um front-end mais simples de criar e com um melhor apelo estético (além da fácil integração com o RMarkdown e com o RStudio). __Exemplos de Dashboards:__ Você pode achar exemplos na página do Shiny ([https://shiny.rstudio.com/gallery](https://shiny.rstudio.com/gallery)) ou na página do Dash ([https://dash-gallery.plotly.host/Portal/](https://dash-gallery.plotly.host/Portal/)).

__C. As Muito Difíceis (raíz):__ não é nada impossível mas é trabalhoso mexer com servidores. Você precisa de uma VPN, precisa configurar o domínio, configurar os certificados de segurança, configurar as portas, proxy reverso, front-end, escolher um servidor, configurar o back-end e...se a aplicação crescer...a gente configura tudo de novo e sofre ainda mais. Esse tipo de ferramenta é boa para grandes organizações que querem dominar toda a infraestrutura de um sistema mas __dificilmente__ um cientista de dados vai querer criar um pequeno projeto pessoal usando esse tipo de ferramenta...além disso, se nao usarmos API's e recorrermos a chamadas assíncronas (AJAX) constantemente, a escrita do código pode ser infernal

__D. E existe ainda um quarto tipo: justamente a tecnologia serverless:__ essa teria uma dificuldade __média__. Um cientista de dados mais atento pode sim trabalhar com isso, sair do mundinho de Jupyter Notebook + RStudio e colocar pequenos sistemas em produção. E é aqui que vamos focar! 

# Arquitetura Final

Vamos direto ao ponto. A arquitetura é a seguinte:

![Arquitetura AWS](https://res.cloudinary.com/practicaldev/image/fetch/s--4h0Kd-Xz--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://thepracticaldev.s3.amazonaws.com/i/0lexbp7wacyq34etri3h.png)

E se isso parece uma sopa de letrinhas, vamos explicar cada passo, começando pelo básico: não houve __nenhuma__ preocupação com infra de servidor nos módulos acima! Todos esses serviços são disponibilizados pela Amazon Web Services e vão integragir na seguinte forma:

* __Módulo S3__: O "Simple Storage Service" é usado com dois ojetivos: ele irá hospedar o HTML que vamos usar e os dados de COVID que serão lidos por nossa aplicação.

* __Módulo Lambda__: Aqui é realizado o processamento dos dados em __Python__. Algoritmos, geração de gráficos, clusterizações, Machine Learning, tudo o que for possível será realizado aqui (respeitando a capacidade máxima do AWS Lambda, que, em nosso caso, não passa nem longe de ser alcançada).

* __API Gateway__: Se comunica com a função lambda e permite que um serviço REST se comunique com as funções __Python__ por meio de endpoints (por meio de URL's simples)

* __Página Estática__: Como já comentado, a página estática do usuário também é hospedada em um S3, os gráficos são gerados pela __API Gateway__ na forma de páginas __HTML__ e essas páginas são postas como frames dentro da página estática, que chama os serviços da __API Gateway__

E mais: a página estática é uma aplicação em __Vue.js__. Com isso, temos uma single page, que irá implementar nosso aplicativo de monitoramento da COVID-19! A aplicação está em produção no [link que eu passei lá em cima e que estou passando aqui agora](http://dantgcovidpage.s3-website-sa-east-1.amazonaws.com/).

O que pretendo fazer nesse post não é explicar passo a passo __todas__ os etapas mas vou mostrar os tutoriais que segui. Vou também chamar a atençao a um passo que foi um tanto que "__hacky__" e envolveu um pequeno pulo do gato que __não__ está documentado pela AWS em seu site!

# Juntando as Peças

A ideia é dizer a sequência de etapas e associar cada uma delas a um tutorial (antes de tudo é preciso criar uma conta na AWS):

1. __Primeiro Passo__: Importar o dataset em qualquer formato (JSON, csv etc.) e colocar ele em u S3 Bucket - __Tutorial__: [https://docs.aws.amazon.com/redshift/latest/dg/tutorial-loading-data-upload-files.html](https://docs.aws.amazon.com/redshift/latest/dg/tutorial-loading-data-upload-files.html)

2. __Segundo Passo__: Planejar a arquitetura de uma função que tenha como entrada os argumentos de controle do seu dashboard e como saída um HTML Plotly com o gráfico gerado. Isso pode ser feito com a biblioteca Plotly Offline. Então, aqui precisamos de dois tutoriais: um de [como usar o recurso AWS lambda](https://docs.aws.amazon.com/lambda/latest/dg/getting-started.html) e outro sobre a biblioteca [Plotly Offline sobre geração de códigos HTML com o gráfico](https://community.plotly.com/t/proper-way-to-save-a-plot-to-html/7063). Aqui encontrei dois passos meio complicados:

| Observações |
| --- |
| __A.__ Foi preciso instalar bibliotecas no Lambda usando o recurso de Layers. Em geral, só é necessário zipar a biblioteca e inserir na layer. Porém, existem bibliotecas de Python pré compiladas em C++ que precisam ser compatíveis com a arquitetura da máquina AWS. Assim, foi preciso seguir os passos de um vídeo muito bem explicado de um indiano que encontrei no YouTube: [link](https://www.youtube.com/watch?v=zrrH9nbSPhQ)|
| __B.__ Eu envolvi a biblioteca plotly num código HTML completo para gerar uma página só com o gráfico e importar na página em um iframe. Outras maneiras de integrar a saída com o front-end poderiam ter sido feitas, isso fica a critério de cada um. |
| __C.__ É possível integrar o lambda com o S3. A gente lê os dados do passo 1 a partir da função lambda usando a biblioteca boto e um link legal que explica isso é esse: [https://stackoverflow.com/questions/33782984/reading-data-from-s3-using-lambda](https://stackoverflow.com/questions/33782984/reading-data-from-s3-using-lambda) - Pois é, às vezes acho que ver as respostas no Stack Overflow é o melhor tutorial! |

3. __Terceiro Passo__: Integrar o lambda definido no passo anterior com o API gateway. No caso, além de integrar, tive que alterar o formato da saída para um html com o gráfico a ser plotado. Esses passos foram feitos segundo esse [link](https://kennbrodhagen.net/2016/01/31/how-to-return-html-from-aws-api-gateway-lambda/). Um exemplo de frame apenas com o gráfico que foi usado no meu dashboard pode ser visto neste [link](https://gdjywuh4e1.execute-api.sa-east-1.amazonaws.com/test1?view=1).

Houve também um passo de elaboração de front-end sobre o qual não vou escrever muito por aqui mas, basicamente, foi usando __VUE CLI__ para criar uma single page application.

Terminamos por aqui. Pretendo ainda aprimorar os algoritmos do painel e, conforme eu for fazendo isso, novas postagens serão criadas (provavelmente)
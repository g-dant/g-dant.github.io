# GGPlot e Tidyverse

## Explicando a biblioteca GGPlot com curvas da pandemia COVID-19

Finalmente consegui organizar tudo para fazer um blog. Resolvi fazer isso por dois motivos: (1) para treinar programação WEB e Javascript e (2) para treinar ciência de dados, escrevendo sobre isso. A ideia nao é reinventar a roda nem ficar falando sobre coisas que a gente encontra direto nesses blogs que existem por aí, vou procurar escrever sobre coisas que tendem a mencionar menos.

Vejo muita gente falando sobre GGPLOT mas raramente a gente encontra alguma postagem que realmente explique o conceito por trás da biblioteca. Esse "GG" do início do nome vem de "Gramática dos Gráficos" e é um conceito __muito legal__ para reduzir as linhas de código na hora de gerar um gráfico ou para permitir que o programador crie plots com __muita__ liberdade e agilidade...

![GGPLOT Logo](https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQA7uIz8oyumKe0VNX9khTmyVfbuJhMmIQpTv5mqKKPrm-jbDwI&usqp=CAU)

Vou me inspirar no meu notebook do Kaggle (em inglês): [Kaggle's COVID-19 Analysis notebook](https://www.kaggle.com/guidant/covid19-evolution-transmission-spatialpatterns). Nele esses conceitos são usados o tempo todo e é muito interessante notar como em algumas situações o que queremos não é Machine Learning, nem Deep Learning...apenas a velha e clássica Análise / Visualização de dados.

# 1. Antes de Falar sobre GGPLOT...
## Um conceito bem legal e preliminar: __Tidydata__

### 1.1. TidyVerse + TidyData 

Hadley Wickham, o criador da linguagem "R", propôs o conceito de Tidydata. Um tipo de dado mais "avançado" que o dataframe e propôs um conjunto de bibliotecas que giram ao redor desse tipo novo de variável. Surge um conjunto de bibliotecas: o "Tidyverse":

![Tidyverse](https://miro.medium.com/max/4032/1*B-cwhqnFgGIbd9lWnzi_mQ.png) 

Viu só? O símbolo do __GGPLOT__ está no meio desse bando de biblioteca e isso está ligado ao fato de que para entendermos a sintaxe das função do __GGPLOT__ é precisa entender o que é __Tidy Data__...vamos lá...

Primeiro, esse tipo de dado é um tipo de tabela com mais restrições que um dataframe normal e foi criado para organizar dados tabulares de maneira mais inteligente. __Exemplo__: suponha que estamos estudando a evolução do número de mortes e casos confirmados de COVID-19. Temos uma tabela assim (os valores são meramente exemplificativos!):

| Date | China Confirmed Cases | China Recovered Cases | Italy Confirmed Cases | Italy Recovered Cases | ... |
| --- | --- | --- | --- | --- | --- |
| 01.03.2020 | 1321 | 222 | 5409 | 783 | ... |
| 02.03.2020 | 1534 | 353 | 6501 | 985 | ... |


Basicamente, esse tipo de estrutura de dados é criticada por Wickham em seu artigo do Journal of Statistical Software ([https://vita.had.co.nz/papers/tidy-data.pdf](https://vita.had.co.nz/papers/tidy-data.pdf) por dificultar a limpeza e a preparação de dados de análises, emerge o conceito de __Tidy Data__ (Dados Organizados).

### 1.2. Simplificando as Coisas

Vamos iniciar mostrando uma primeira simplificação:

| Country | Date | Confirmed Cases | Recovered Cases |
| --- | --- | --- | --- |
| China | 01.03.2020 | 1321 | 222 |
| China | 02.03.2020 | 1534 | 353 |
| Italy | 01.03.2020 | 5409 | 783 |
| Italy | 02.03.2020 | 6501 | 985 |

Percebe? Com esse novo arranjo, nós transformamos a nossa base com mais de 100 colunas em uma tabela com apenas 4. É verdade que isso aumenta, em troca, o número de linhas de nossa tabela mas de alguma forma isso já está mais próximo da disposição ótima de informações preconizada no conceito de Tidydata mas ainda podemos reduzir mais.

Podemos também representar se o número representa "caso confirmado" ou "casos de recuperação em uma coluna específica. Seguindo as regras:
* Valores serão expressos em uma coluna
* E o tipo de valor será representado em outra coluna

E então temos:

| Country | Date | Type of Feature | Value |
| --- | --- | --- | --- |
| China | 01.03.2020 | Confirmed Cases | 1321 |
| China | 02.03.2020 | Confirmed Cases | 1534 |
| Italy | 01.03.2020 | Confirmed Cases | 5049 |
| Italy | 02.03.2020 | Confirmed Cases | 6501 |
| China | 01.03.2020 | Recovered Cases | 222 |
| China | 02.03.2020 | Recovered Cases | 353 |
| Italy | 01.03.2020 | Recovered Cases | 783 |
| Italy | 02.03.2020 | Recovered Cases | 985 |

É com esse tipo de disposição que teremos uma tabela preparada para ser plotada pela biblioteca GGPLOT. Muita gente começa a estudar R partindo direto para o GGPLOT sem prestar atenção nessa primeira parte. Nas próximas seções vamos ver porque isso é importante e poupa muito tempo de análise.

# 2. A Gramática dos Gráficos
## Camadas do GGPLOT
 
A biblioteca GGPLOT é baseada em 7 "camadas" distintas. Vamos ver aluns códigos ao longo da apresentação de cada camada em problemas aplicados à análise da pandemia.

![GGPlot Layers](https://cxlabsblog.files.wordpress.com/2017/10/2017-10-24-14_36_29-visualization-layers-of-ggplot-google-docs.png?w=620)

For now, imagine that each layer will be responsible to a different part of the final plot and so, we will "overlap" them. We will start explaning the 3 most fundamental layers: the data layer, the aesthetics layer and the geometry layer alltogether.

Por hora, imagine que cada camada é responsável por uma parte diferente do plot final e elas sobrepõem para gerar aquilo que será visualizado. Iremos iniciar com as 3 camadas mais básicas e fundamentais: a camada de dados (data), a camada estética (aesthetics) e a camada de geometria (geometry) e iremos explicá-las simultaneamente.

### 2.1. Três Camadas Fundamentais: __Data__ + __Aesthetics__ + __Geometry__

Vamos apresentar essas camadas fundamentais com nosso primeiro plot: como podemos visualizar a evolução dos casos confirmados e das mortes na China e mostrá-los em um único plot? E se quisermos mostrar a curva de cada tipo de variável com uma cor diferente?

Nesse caso, precisamos responder três perguntas

* __Data Layer__: Quem é o __dado__? Suponha que temos uma tabela de "tidy data" chamada de "table_covid"
* __Aesthetics Layer__: O que queremos plotar? Quem é o eixo X? Quem é o eixo Y? Teremos diferentes cores em relação ao que?
* __Geometry Layer__: Que tipo de plot queremos? Vamos iniciar com um scatter plot simples (gráfico de pontos) mas poderíamos também gerar um gráfico de linha

Em GGPLOT, o comando para gerar nosso primeiro plot seria:
```r
ggplot(table_covid, aes(x = Date, y = Value, color = Type)) + geom_point()
```

E é nesse comando simples que podemos identificar nossas 3 camadas fundamentais:

* O primeiro argumento se refere à camada de dados
* O segundo arguento, escrito dentro da função "aes" (de aesthetics) é a camada estética
* E o terceiro argumento é a cama de geometria (e podemos ter várias camadas simultâneas, somando diferentes geometrias - é possível, por exemplo, adicionar camadas de linhas e de pontos simultaneamente)

Com isso, obtemoso seguinte plot:

![GGPLOT1](https://i.ibb.co/fC0hsxQ/ggplot-1.png)

O gráfico é simples, mas vamos incrementar isso ao longo do nosso post! Vamos supor que queremos que o tamanho do ponto varie de acordo com determinado valor de nossa tabela. Podemos, por exemplo, fazer o tamanho do ponto variar de acordo com o número de mortes e os valores de Y serão referentes ao número de casos confirmados:

```r
ggplot(table_covid %>% filter(Type == 'Confirmed Cases'), 
  aes(x = Date, y = Value, color = Type)) + 
  geom_point()
```
![GGPLOT2](https://i.ibb.co/dtLqvG2/ggplot-2.png)

E, lógico, podemos notar que pontos maiores geram valores maiores de Y o que é coerente ao fato de existir elevada correlação entre as mortes e os casos confirmados. Em outros casos nos quais a correlação não é clara, esse tipo de visualização pode fornecer muitos insights interessantes.

> O comando filter é um recurso da biblioteca "Dplyr" do Tidyverse. Essa biblioteca é usada para manipular dados rapidamente com diversas ferramentas muito interessantes:

![Dplyr](https://miro.medium.com/max/1200/1*NXRsFH_12sfj79W-P4qI0Q.png)

E se quisermos variar a cor de acordo com o país?

```r
ggplot(table_covid, aes(x = Date, y = Value, color = Country)) + 
  geom_point()
```
![GGPLOT3](https://i.ibb.co/9s6hmwB/ggplot-3.png)

Pouquíssimo foi alterado no código e é nesse tipo de flexibilidade que a utilização do Tidyverse contribui fortemente com a área de análise de dados! (note que foi necessário apenas agrupar as variáveis por país na camada estética, o que é simples e rápido).

### 2.2. A Camada __Facets__: Uma Poderosa Ferramenta para Múltiplas Visualizações

E se quiséssemos criar posta separados para cada país? Em ferramentas convencionais seria necessário gerar gráficos em um loop for repetidamente mas....não aqui! A nossa querida gramática dos gráficos propõe que isso seja feito facilmente - basta usarmos a camada "facets!:

```r
ggplot(table_covid, aes(x = Date, y = Value, color = Type)) + geom_point() +
  facet_wrap(vars(Country), ncol = 1)
```

No comando facets_wrap, o primeiro argumento representa a "categoria" que queremos dividir em diversos plots e podemos adicionar o número de colunas e linhas como argumentos para determinar o layout do grid gerado. Com o comando acima, obtemos:

![GGPLOT4](https://i.ibb.co/v3JYYJ5/ggplot-4.png)

Temos ainda o comando "facets_grid", uma versão um pouco diferente que nos permite determinar quais features são divididas ao longo do eixo X e quais features são divididas ao longo do eixo Y. Para mais informações, recomendo a documentação do [Site Oficial do GGPLOT](https://ggplot2.tidyverse.org/reference/facet_grid.html). Vamos melhorar o gráfico adicionando um plot de linha à camada de geometria:

```r
ggplot(table_covid, aes(x = Date, y = Value, color = Type, group = Type, shape = Type)) + 
  geom_point(size = 4) + 
  geom_line(linetype = "dashed") + 
  facet_wrap(vars(Country), ncol = 1)
```

O argumento "size" nos permite exibir pontos maiores e o argumento shape da camada aesthetics no auxilia a demonstrar um tipo de formato de ponto disitnto para cada tipo de feature. O linetype ligará os pontos com uma linha pontilhada. A função geom_line sempre precisa de um grupo definido na camada estética! Se houver um só grupo, é preciso selecionar uma constante qualquer como o número "1" como argumento (é uma solução meio feia, acredito que deveria existir um valor default para o argumento group):

![GGPLOT5](https://i.ibb.co/Pj7CzcH/ggplot-5.png)

Vamos agora dar uma olhada na camada de estatística.

### 2.3. A Camada "Estatística"

Vejamos agora a seguinte tabela (chamaremos ela de "df_covid"):
  
  | ObservationDate | Province.State | Country.Region | Confirmed | Deaths | Recovered |
  | --- | --- | --- | --- | --- | --- |
  | 2020-01-22 | Anhui | Mainland China| 1 | 0 | 0 | 
  | 2020-01-22 | Beijing | Mainland China | 14 | 0 | 1 |
  | 2020-01-22 | Chongqing | Mainland China | 6 | 0 | 0 |
  | 2020-01-22 | Fujian | Mainland China | 1 | 0 | 0 |
  | 2020-01-22 | Gansu | Mainland China | 0 | 0 | 0 |

É uma tabela que representa o numero de casos confirmados, mortes e recuperações por data e região em diferentes países. É possível que a gente queira saber a informação estatística sobre a dispersão dessas variáveis por país e a camadade estatística pode ser fundamental para termos condições de fazer isso rapidamente.

Podemos plotar a média e o desvio padrão para cada país e verificar a evolução dessa "dispersão" ao longo do tempo e isso também é bem fácil quando utilizamos o GGPLOT:

```r
list_countries <- c("Mainland China", "France", "Sudan", "Argentina")

ggplot(df_covid %>% filter(Country.Region %in% list_countries), 
       aes(x = ObservationDate, 
       y = Deaths / Confirmed, 
       group = Country.Region)) +
  
  facet_wrap(vars(Country.Region), ncol = 2, scales = "free") +
  geom_smooth()
```

A funçao de filtragem aqui foi usada para reduzir o número de países exibidos em nosso exemplo:

![GGPLOT6](https://i.ibb.co/wpgBJq2/ggplot-6.png)

Você pode perguntar: isso foi não um uso da tabela de geometria? A resposta é "sim" mas "com um plus": uma manipulação na camada de estatística se encontra implícita na função geom_smooth(), que aplica um modelo para calcular o valor das bandas que são exibidas nos arredores da linha (inclusive, o algoritmo de smoothing pode ser editado). 

Na verdade na verdade, toda camada de geometria tem o seu valor default! Todas as chamadas à função GGPLOT geram cada uma das 7 camadas, sempre. Porém, diversas vezes a gente só faz referência a algumas camadas e as demais assumem valores default.

![GGPLOT7](https://i.ibb.co/bRRnVt7/ggplot-7.png)

Existem ainda outras aplicações para essa camada. Ela também serve como um artifício para "especificar" ao GGPLOT o formato dos dados que estamos fornecendo como entrada. __Por Exemplo__: Suponhamos que estamos querendo fazer um histograma. Em tese, precisamos apenas de uma dimensão: um conjunto de valores e, nesse caso, o histograma conta o total de ocorrências para cada intervalo verificado. Nesse caso, a estatística da geometria geom_histogram é igual a "value" (que é o valor default do argumento "stat").

```r
geom_histogram(stat = 'count')
```

Porém, podemos fornecer pares de valores - X seria o intervalo ou a variável e Y seria a contagem. Nesse caso, estamos utilizando a estatística "stat = 'identity'.

```r
geom_histogram(stat = 'identity')
```

__Aplicando esse conceito:__ Suponhamos que temos uma tabela para um determinado país onde o nome do paciente, o dia do óbito do mesmo e o hospital no qual o paciente ficou internado são colunas:

| Patient | Deceased | Hospital | Region |
| --- | --- | --- | --- |
| John | 02.04.2020 | A | Center |
| Susan | 08.04.2020 | B | Center |
| Mary | 01.04.2020 | C | West |
| Joe | 17.04.2020 | C | West |
| Peter | 2.04.2020 | A | Center |
| Fred | 13.04.2020 | A | Center |
| Chuck | 20.04.2020 | B | Center |
| Cho | 21.04.2020 | C | West |
| Albert | 5.04.2020 | A | Center |
| Gregory | 6.04.2020 | A | Center |

Se quisermos mostrar o número de óbitos por hospital ou região, teremos duas escolhas: calculamos as contagens nós mesmos utilizando a biblioteca __dplyr__ ou utilizamos a própria estatística "count" da biblioteca __GGPLOT__: 

__Caso 1 - Usando a biblioteca GGPLOT__: 

```r
ggplot(df_hospitals, aes(x = Hospital)) + 
  geom_bar(stat = "count")
```

O que gera o seguinte resultado:

![GGPLOT8](https://i.ibb.co/HNNP6BK/ggplot-8.png)

__Um outro exemplo__: Em função de regiões, ao invés de hospitais:

![GGPLOT9](https://i.ibb.co/j37YjTx/ggplot-9.png)

__Case 2:__ Gerando as informaçoes manualmente

```r
df_hospitals_count <- df_hospitals %>% 
  group_by(Hospital) %>%
  summarise(count = n())
```
A função __group_by__ nos diz para agrupar dados por hospitais e a funçao n() utilizada como argumento em __summarise__ diz ao __GGPLOT__ para plotar a contagem de ocorrências. O agrupamento gera como resultado a tabela:

| Hospital | count |
| --- | --- |
| A | 5 |
| B | 2 |
| C | 3 |

Plotando __a partir__ das contagens que já realizamos:

```r
ggplot(df_hospitals_count, aes(x = Hospital, y = count)) +
  geom_bar(stat = "identity")
```

E então, obtemos:

![GGPLOT8](https://i.ibb.co/HNNP6BK/ggplot-8.png)

E é idêntico ao que geramos anteriormente. Vamos incrementar o plot utilizando as camadas que estudamos até aqui:

```{r}
ggplot(df_hospitals, aes(x = Hospital, y = count, fill = Hospital)) + 
  geom_bar(color = "black", stat = "identity") + 
  theme(text = element_text(size=25))
```

E voilá...

![GGPLOT9](https://i.ibb.co/FY59BGz/ggplot-10.png)

Bem melhor não acha? Nosso próximo passo é falar sobre a camada "Coordinates" (coordenadas).

### 2.3. A Camada "Coordenadas"

A camada "coordenadas" responde a mais perguntas que temos que responder quando queremos customizar nossos gráficos:
* Nossos dados serão plotados em escala normal ou logarítmica? (o default é normal)
* Usaremos coordenadas retangulares ou polares? (o default é retangular)
* Quais serão os limites exibidos nos eixos X e Y de nossa figura? (por default, isso é determinado automaticamente)


O primeiro ponto permite que plotemos gráficos logarítmicos, o segundo permite que geremos gráficos de radar e o último nos permite alterar a exibição de nossas figuras.

### 2.4. O Toque Final: A Camada "Tema"

Finalmente, quando falamos sobre camada "tema", estamos falando sobre tamanho de texto, cores de fundo e outros detalhes que são importantes quando quermeos alterar o estilo da visualização. Essa camada pode ser editada de duas formas diferentes:

__1. Editando o tema diretamente na função "theme":__ Essa função admite diversos argumentos referentes à estética do gráfico final. Vejamos alguns exemplos:

__1.A. Aumento do tamanho da fonte:__

```{r}
ggplot(...) + theme(text = element.text(size = 15))
```

__1.B. Rotação de 90 graus no texto do eixo X:__

```{r}
ggplot(...) + theme(axis.text.x = element_text(angle = 90, hjust = 1))
```

__2. Adicionando temas prontos:__ Nesse caso, os parâmetros que adicionaríamos ao tema já se encontram prontos, em conjuntos que criam diferentes temas que podem ser consultados na documentação da [página oficial](https://ggplot2.tidyverse.org/reference/ggtheme.html):

```{r}
# An example using a minimalistic theme
ggplot(...) + theme_minimal()
```

## 3. Conclusões

A sintaxe da gramática dos gráficos pode nos dar uma alta flexibilidade e agilidade na criação de gráficos. Então, ainda que a linguagem Python seja a preferida de alguns (o que faz sentido, principalmente quando queremos trabalhar com deep learning e com modelos mais complexos), eu acho que a gente é forçado a reconhecer a contribuição da linguagem __R__ nos paradigmas de análise de dados! 

A própria biblioteca de Python __Plotly__ já reconheceu isso ao criar um módulo que usa esses conceitos (a biblioteca __Plotly.express__). Além disso, em Python, podemos usar a função __GGPLOT__ diretamente por meio do módulo __plotnine__.
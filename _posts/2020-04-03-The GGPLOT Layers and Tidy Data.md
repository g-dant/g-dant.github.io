---
layout: post
author: G-Dant
---

> Using a pandemy data analysis to present basic concepts of the "Grammar of Graphics"

Hello everybody! This is my first blog post and it's part of something that I wanted to create since the last year: a personal portal with my portfolio and with a space to share my ideas with the community.

During the the COVID-19 pandemy, I could find some time to create this space (using this amazing resource of GITHUB + Jetkyll integration). As my first blog post I will speak about the Grammar of Graphics in a hands-on way, showing how we can apply it do visualize the numbers and statistics related to the pandemy of this new virus that is taking all the world and forcing all of us to think twice about our mission as humans.

A simple data analysis may be fundamental to get a first vision of the problem, which can let us acquire important insights about the nature of the problem. In my opinion, as a Data Scientist / Programmer, the "Grammar of Graphics" concepts are one of the best theories that allow us to create such analysis in a fast and consistent way.

Based on the concepts of "Grammar of Graphics", the "GGPLOT" library was created and implemented in the Tidyverse R library and in Python. It's an excellent tool and, somehow, when I see ggplot tutorials or courses over the internet, I rarely find good explanations about the theoretical "Grammar of Graphics" concepts behind this library.

![GGPLOT Logo](https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQA7uIz8oyumKe0VNX9khTmyVfbuJhMmIQpTv5mqKKPrm-jbDwI&usqp=CAU)

Let's check these concepts here in a hands-on way, where I will present examples that are present in my [Kaggle's COVID-19 Analysis notebook](https://www.kaggle.com/guidant/covid19-evolution-transmission-spatialpatterns).

# 1. Before Showing the Grammar of Graphics...
## Another great concept! __Tidydata__

### 1.1. TidyVerse + TidyData = :D

It was Hadley Wickham who purposed the concept of "Tidy Data". In R, we can see a an ensemble of packages called Tidyverse, with functions that process this kind of variable:

![Tidyverse](https://miro.medium.com/max/4032/1*B-cwhqnFgGIbd9lWnzi_mQ.png) 

Do you see? The GGPlot library symbol is among the ensemble of packages of the Tidyverse. And that's why we should firstly understand the concept of "Tidy Data"

We can implement simple tabular data structures using dataframe variables and they are available in different languages such as Python and R (you can even find Java implementations). Well, the "Tidy Data" can be seen as an "evolution" of the dataframes. It's a different philosophy where the tabular data is organized in a simple and objective way.

Suppose we are studying the evolution of the number of deaths and confirmed cases in our COVID-19 problem. We tend to receive from the data analysts a table like that __(the numbers exposed here are not real, they are just examples!)__:

| Date | China Confirmed Cases | China Recovered Cases | Italy Confirmed Cases | Italy Recovered Cases | ... |
| --- | --- | --- | --- | --- | --- |
| 01.03.2020 | 1321 | 222 | 5409 | 783 | ... |
| 02.03.2020 | 1534 | 353 | 6501 | 985 | ... |

 Well, do we really need to have a pair of columns for each country in analysis? The answer is no and it also difficults our data analysis. As we will see later, the number of lines of code that we will use to plot these numbers will be huge, thanks to a terrible data structure.
 
### 1.2. Simplifying Things

A first simplification can be achieved by creating a new column to describe the Country:

| Country | Date | Confirmed Cases | Recovered Cases |
| --- | --- | --- | --- |
| China | 01.03.2020 | 1321 | 222 |
| China | 02.03.2020 | 1534 | 353 |
| Italy | 01.03.2020 | 5409 | 783 |
| Italy | 02.03.2020 | 6501 | 985 |

Can you notice? By using this new arrangement, we transform our original dataset with more than 100 columns to a table with just 4 columns (of course we will have more rows in our new dataset version). It's somehow nearer of the Tidydata optimal disposition but there is still a problem: we have many different ways to represent the same data and it would be interesting to determine a "default" representation for each dataset.

So, let's aways take the configuration that uses the minimum number of columns - the R Tidyverse libraries are developed to minimize the number of lines for those kinds of tables and we will use the following rules:
* The values will be expressed in a "Values" column and
* The other columns will show different "classifications" for that value

And here we go:

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

We had no reduction in the number of columns at all but, if we have more features like "Confirmed Cases", "Deaths" and "Recovered") we would minimize the width of the table. This is the Tidydata and, in R, the "Tidydata" is a different variable type, where we have the type deffinition in each column (integers, strings etc.) and where we have support to specific Tidyverse features.

With this representation, we can define a "Grammar of Graphics" that allows us to represent many different analysis with a minimum number of lines and with a minimum amount of effort!

# 2. The Grammar of Graphics
## The GGPLOT Layers
 
The "Grammar of Graphics" concept, another Hadley Wickham's creation, is based in 7 different layers. We will see some real code while I present each layer and, for each case, I will show an example applied to the analysis of the COVID-19 Data Analysis problem. Here we go:

![GGPlot Layers](https://cxlabsblog.files.wordpress.com/2017/10/2017-10-24-14_36_29-visualization-layers-of-ggplot-google-docs.png?w=620)

For now, imagine that each layer will be responsible to a different part of the final plot and so, we will "overlap" them. We will start explaning the 3 most fundamental layers: the data layer, the aesthetics layer and the geometry layer alltogether.

### 2.1. Three Fundamental Layers: __Data__ + __Aesthetics__ + __Geometry__

We will show how these 3 fundamental layers work by getting our first plot: how can we see the evolution of the number confirmed cases and deaths in China and show them in a single plot? What if we want to show the curve of each feature with a different color?

In this case, we should answer 3 questions:

* __Data Layer__: Who is the __data__? Suppose it's a table with a "tidy structure" that we will call "table_covid"
* __Aesthetics Layer__: What do we want to plot? In the X axis we want to show the "Date" column, in the Y axis we want to show the the "Value" column and we want to show a different curve for each value of the column "Type of Feature"
* __Geometry Layer__: What kind of plot we want to show? We will start by showing a simple scatter plot!

In R, the "Grammar of Graphics" description of such plot would be:
```r
ggplot(table_covid, aes(x = Date, y = Value, color = Type)) + geom_point()
```
With this command, we can notice that all the three elements specified in the begining of the section are present:

* The first argument of the ggplot function is the data layer
* The second argument, wrapped by the aes function is the aesthetics layer: it's a really important layer that describes not only who are the X and Y axis but also how we segment our data in groups, colors or even point shapes in a scatter plot.
* Finally, the third argument is the geometry, represented by the function geom_point. We could also take other geometries like bar plots or line plots

And, in this case, we take the following plot:

![GGPLOT1](https://i.ibb.co/fC0hsxQ/ggplot-1.png)

To finish this section, I would like to show some other examples. Firstly, let me say that in a scatter point can vary its size according to a value of any continuous column of the data. For instance, let's represent the size of each point of the previous graphics by the the number of deaths and the Y value by the number of confirmed cases:

```r
ggplot(table_covid %>% filter(Type == 'Confirmed Cases'), aes(x = Date, y = Value, color = Type)) + geom_point()
```
![GGPLOT2](https://i.ibb.co/dtLqvG2/ggplot-2.png)

Noting that higher values tend to generate bigger points, we can see that the number of confirmed cases is correlated with the number of deaths (which is obvious but still consists in a good example).

> The "filter" command is a resource of the Dplyr library, which is great to manipulate dataframes in R. The Dplyr library is a part of the Tidyverse ecosystem.

![Dplyr](https://miro.medium.com/max/1200/1*NXRsFH_12sfj79W-P4qI0Q.png)

What if we take the first graphic and make the color vary according to the country?

```r
ggplot(table_covid, aes(x = Date, y = Value, color = Country)) + geom_point() + theme(text=element_text(size=20))
```
![GGPLOT3](https://i.ibb.co/9s6hmwB/ggplot-3.png)

Voilá. So, we can change many aspects of the plot with a huge degree of freedom thanks to  the "grammar of graphics" concept (thanks Hadley Wickham!). What about the other layers? Well, let's check them one by one. We will surely improve those plots, they are not good for the moment.

Notice that it was necessary to "group" the variables according to the country in the aesthetic layer.

### 2.2. The __Facets__ layer: A powerful tool for multiple visualizations

What if we intend to create separate plots for each country? In common plotting frameworks it would be necessary to code one plot command per plot. Sometimes it's even necessary to plot inside for loops but...with out Grammar of Graphics approach, things can become much easier. That's the purpose of the __"facets"__ layer.

```r
ggplot(table_covid, aes(x = Date, y = Value, color = Type)) + geom_point() +
  facet_wrap(vars(Country), ncol = 1)
```

In the facets_wrap command, the first argument represents the "Category" that we want to split in many plots and we can add the number of columns (ncol) or the number of rows (nrow) as arguments to determine the layout of the graphics grid. So, with the command above, we get:

![GGPLOT4](https://i.ibb.co/v3JYYJ5/ggplot-4.png)

Hmm, much better! Don't you think? With the "facets_grid" command we have a slightly different version of use of the facets layer that allow us to split the plots in many categories characterized by more than 1 feature: one feature for the X positions of the grid and another feature for the Y positions of the grid. You can check for more references about it in the [GGPLOT's official page](https://ggplot2.tidyverse.org/reference/facet_grid.html).

Let's finish by improving our plot and linking the groups by a line geometry:

```r
ggplot(table_covid, aes(x = Date, y = Value, color = Type, group = Type, shape = Type)) + geom_point(size = 4) + geom_line(linetype = "dashed") + facet_wrap(vars(Country), ncol = 1)
```

The size argument in the geom_point geometry is used to show bigger points, the shape aesthetics will use different shape points for each feature type and, finally, the groups will be linked by "dashed" line. Aways remember to specify a group before using the geom_line ggplot function!

![GGPLOT5](https://i.ibb.co/Pj7CzcH/ggplot-5.png)

So, let's check how can we improve our mini analysis showing a brief explanation about the statistics layer!

### 2.3. Use the __Statistics__ Layer when things become chaotic

Let's start working with some real data:

<div style="overflow: auto; white-space: nowrap;">
| ObservationDate | Province.State | Country.Region | Confirmed | Deaths | Recovered |
|---           |---            |---               |---       |---    |---    |
| 2020-01-22   |    Anhui      |   Mainland China |       1  |   0   |     0 |
| 2020-01-22   |   Beijing     |   Mainland China |      14  |   0   |     0 |
|2020-01-22    |  Chongqing    |  Mainland China  |       6  |   0   |     0 |
| 2020-01-22   |   Fujian      |   Mainland China |       1  |   0   |     0 |
| 2020-01-22   |   Gansu       |   Mainland China |       0  |   0   |     0 |
| 2020-01-22   |   Guangdong   |   Mainland China |      26  |   0   |     0 |
| 2020-01-22   |   Guangxi     |   Mainland China |       2  |   0   |     0 |
| 2020-01-22   |   Guizhou     |   Mainland China |       1  |   0   |     0 |
| 2020-01-22   |   Hainan      |   Mainland China |       4  |   0   |     0 |
| 2020-01-22   |   Hebei       |   Mainland China |       1  |   0   |     0 |
</div>

Much more chaotic, don't you think? Let's suppose that we want to get a simple statistical graphical analysis using the informations of the table above: suppose we want to know the main and the standard deviation of the death rate (Deaths / Confirmed) per country, considering different regions (Country.Region) and show the its evolution.

The geometry layer can offer an easy way to handle with this. We can represent many plots, one for country, using the facets layer and then we can use the ObservationDate feature as X value for the aesthetics layer. The Y axis will be represented by a simple formula: "Deaths / Confirmed" and, in this case, we will have many different points for each (X, Y) pair in each facet.

And it's in this case that the statistics layer takes a fundamental role: we can get the average and the standard deviation of each set of points and represent them graphically (other statistics like the kurtosis or the assymetry can also be represented):

```r
list_countries <- c("Mainland China", "France", "Sudan", "Argentina")

ggplot(df_covid %>% filter(Country.Region %in% list_countries), 
       aes(x = ObservationDate, 
       y = Deaths / Confirmed, 
       group = Country.Region)) +
  
  facet_wrap(vars(Country.Region), ncol = 2, scales = "free") +
  geom_smooth()
```

The filter function is used here to show just some countries, to simplifly our example. The geom_smooth is our statistics and it can be seen as an aggregation of our datapoints for a same pair of coordinates of each facet:

![GGPLOT6](https://i.ibb.co/wpgBJq2/ggplot-6.png)


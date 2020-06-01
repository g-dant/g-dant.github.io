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

So, let's check how can we improve our mini analysis showing ```{r}
df_hospitals %>% 
  group_by(Hospital) %>%
  summarise(count = n())
```a brief explanation about the statistics layer!

### 2.3. Use the __Statistics__ Layer when things become chaotic

Let's start working with some real data:

<div style="overflow: auto; white-space: nowrap;">
<br>
<table>
  <thead>
    <tr>
      <th>ObservationDate</th>
      <th>Province.State</th>
      <th>Country.Region</th>
      <th>Confirmed</th>
      <th>Deaths</th>
      <th>Recovered</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>2020-01-22</td>
      <td>Anhui</td>
      <td>Mainland China</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <td>2020-01-22</td>
      <td>Beijing</td>
      <td>Mainland China</td>
      <td>14</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <td>2020-01-22</td>
      <td>Chongqing</td>
      <td>Mainland China</td>
      <td>6</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <td>2020-01-22</td>
      <td>Fujian</td>
      <td>Mainland China</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <td>2020-01-22</td>
      <td>Gansu</td>
      <td>Mainland China</td>
      <td>0</td>
      <td>0</td>```{r}
df_hospitals %>% 
  group_by(Hospital) %>%
  summarise(count = n())
```
      <td>0</td>
    </tr>
    <tr>
      <td>2020-01-22</td>
      <td>Guangdong</td>
      <td>Mainland China</td>```{r}
df_hospitals %>% 
  group_by(Hospital) %>%
  summarise(count = n())
```
      <td>26</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <td>2020-01-22</td>
      <td>Guangxi</td>
      <td>Mainland China</td>
      <td>2</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <td>2020-01-22</td>
      <td>Guizhou</td>
      <td>Mainland China</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <td>2020-01-22</td>
      <td>Hainan</td>
      <td>Mainland China</td>
      <td>4</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <td>2020-01-22</td>
      <td>Hebei</td>
      <td>Mainland China</td>
      <td>1</td>
      <td>0</td>
      <td>0</td>
    </tr>
  </tbody>
</table>
<br>
</div>

Much more chaotic, don't you think? Let's suppose that we want to get a simple statistical graphical analysis using the informations of the table above: suppose we want to know the main and the standard deviation of the death rate (Deaths / Confirmed) per country, considering different regions (Country.Region) and show the its evolution.

The geometry layer can offer an easy way to handle with this. We can represent many plots, one for country, using the facets layer and then we can use the ObservationDate feature as X value for the aesthetics layer. The Y axis will be represented by a simple formula: "Deaths / Confirmed" and, in this case, we will have many different points for each (X, Y) pair in each facet.

And it's in this case that the statistics layer takes a fundamental role: we can get a smooth line and the standard deviation of a T-test of each set of points and represent them graphically:

```r
list_countries <- c("Mainland China", "France", "Sudan", "Argentina")

ggplot(df_covid %>% filter(Country.Region %in% list_countries), 
       aes(x = ObservationDate, 
       y = Deaths / Confirmed, 
       group = Country.Region)) +
  
  facet_wrap(vars(Country.Region), ncol = 2, scales = "free") +
  geom_smooth()
```

The filter function is theed here to show just some countries, to simplifly our example:

![GGPLOT6](https://i.ibb.co/wpgBJq2/ggplot-6.png)

You may ask me: you are using a geometry layer, where is the statstics (stats) layer? Well, it's implicit in our function. The stats layer is aways present. So, __every geom layer has its default stats value__. In the case of the geom_smooth(), the default statistics is the stats::loess smoothing function but we can use many other methods like a simple linear model ("lm") - of course, our model is not linear so we would not obtain something that makes sense using "method = 'lm'" in our function:

![GGPLOT7](https://i.ibb.co/bRRnVt7/ggplot-7.png)

The geometries need to know the stats value to understand what kind of data we are presenting. When we want to plot a bar graph and the Y values are directly in the table, we must warn the "geom_bar" function that our stats is equal to "identity" (which means: don't transform the data at all, just use the number as values - it's necessary because the default geom_bar value is "count", which works when we want to count the number of occurrences of a value and use those counts in the plot).

The default value of the geometry bar statstics is "count". In this case, the geom_bar function expects to receive a single sample vector with single occurrences. In this case, the geom_bar will count how many occurrences of each type we have and will organize it automatically in a bar plot.

__An Example:__ Suppose that we have a table for a given country where the name of the patient, the day of his / her death, the hospital where the patient was and the region of the hospital are columns:

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

With such table, if we want to show the number of deceases per Hospital or per Region, we have to have 2 choices: we can let the GGPLOT statistics layer work for us __or__ we can transform the table, obtain a table with the counts per category and then call the plot function with no count transformation. Let's check each case.

__Case 1 - Using Automatic Transformation__: In this case, we use the following command:

```r
ggplot(df_hospitals, aes(x = Hospital)) + 
  geom_bar(stat = "count")
```

In this case, we have the following plot:

![GGPLOT8](https://i.ibb.co/HNNP6BK/ggplot-8.png)

The "count" value for the stat parameter is a manifestation of the statistical layer. It's telling ggplot to count the occurrences and group them. __But__ the count statistics is already the default value for the geom_bar function. So, let's plot another example and show the barplot of the regions without specifying the statistics:

![GGPLOT9](https://i.ibb.co/j37YjTx/ggplot-9.png)

__Case 2:__ What if we __want__ to first count the values, store the new data structure in a dataframe and then plot the counts? In this case, we will need to start by using the dplyr library:

```r
df_hospitals_count <- df_hospitals %>% 
  group_by(Hospital) %>%
  summarise(count = n())
```
We obtain the dataframe:

| Hospital | count |
| --- | --- |
| A | 5 |
| B | 2 |
| C | 3 |

Now, if we want to show the same barplot we have to use the following command:

```r
ggplot(df_hospitals_count, aes(x = Hospital, y = count)) +
  geom_bar(stat = "identity")
```

And when we use 'stat = "identity"' we just want to say: I know what I want, there is no need to transform the input data. In this case, we have to determine not only the "X" value in the aesthetics, but also the "Y" value and...

![GGPLOT8](https://i.ibb.co/HNNP6BK/ggplot-8.png)

Ok! It's exactly the same plot! Let's improve the appearance of the plot using the layers that we have previously presented:

```{r}
ggplot(df_hospitals, aes(x = Hospital, y = count, fill = Hospital)) + 
  geom_bar(color = "black", stat = "identity") + 
  theme(text = element_text(size=25))
```

And voilá:

![GGPLOT9](https://i.ibb.co/FY59BGz/ggplot-10.png)

Much better! Don't you think? ;) We are ready to go! Our next step is to study the "Coordinates" layer.

### 2.3. The Coordinates Layer

The coordinates layer is where a set of important plot configurations is determined:
* Will our data be displayed in normal scale or in logarithmic scales (default: normal scale - you can even define your own scale if necessary)
* Will we use rectangular or polar coordinates (default: rectangular coordinates)
* What will be the X and Y limits of our plot? (the GGPLOT automatically determines those limits for you but you can easily change)

Let's take the previous plot and apply some coordinates transformations and show the results. Firstly, let's show our barplot in logarithmic scale:

It doesn't make much sense, but I'm just plotting it to show that...ok, it's possible. Another great use is that we can transform bar plots into radar plots by simply applying a polar coordinates transformation:

Finally, let's change the scales a little:

And that's it! We are almost done and our next step is to describe the Themes Layer, where we will give to our plot the final details.

### 2.4. The Final Touch: Theme Layer

Finally, when we talk about the "theme" layer we are talking about text size, background colors and other details that are importantto enhance the quality of our visualization. We can change the "theme layer", basically, in $2$ different ways:

#### 2.4.1. Setting specifical configurations to our ggplot, using the theme function. Here we have some examples. 

##### 2.4.1.A: Increasing the text size:
```{r}
ggplot(...) + theme(text = element.text(size = 15))
```

##### 2.4.1.B: Rotating the X axis in 90 degrees:
```{r}
ggplot(...) + theme(axis.text.x = element_text(angle = 90, hjust = 1))
```

#### 2.4.2.B: Using built-in GGPLOT themes
```{r}
# An example using a minimalistic theme
ggplot(...) + theme_minimal()
```

You can check the themes gallery in the [official webpage](https://ggplot2.tidyverse.org/reference/ggtheme.html).

## 3. Conclusions

The grammar of graphics syntax may give-us a strong margin to edit, vary and customise our graphics. That`s why, in my opinion, the ggplot approach is the best one to attack and analyse complex problems fastly. We have, surely, other famous libraries such as Plotly (which is present for both, Python and R) but it`s important to mention that even the Plotly library has a version that uses the Grammar of Graphics approach - we are talking about the [Plotly Express](library).

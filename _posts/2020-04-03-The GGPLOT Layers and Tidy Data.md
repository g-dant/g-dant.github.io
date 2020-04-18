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
## Another great concept!

It was Hadley Wickham who purposed the concept of "Tidy Data":

![Hadley Wickham](https://res.cloudinary.com/teepublic/image/private/s--k6BZ7i1I--/b_rgb:908d91,t_Heather%20Preview/c_limit,f_jpg,h_630,q_90,w_630/v1533925640/production/designs/3004827_0.jpg=10x10)

We can implement simple tabular data structures using dataframe variables and they are available in different languages such as Python and R (you can even find Java implementations). Well, the "Tidy Data" can be seen as an "evolution" of the dataframes. It's a different philosophy where the tabular data is organized in a simple and objective way:

![Tidy Data](https://www.researchgate.net/publication/332048735/figure/fig1/AS:741418188406792@1553779279709/The-wide-versus-tidy-data-format-In-the-wide-spreadsheet-like-data-format-each-column.png=10x20)

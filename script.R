if("wordcloud" %in% rownames(installed.packages())==FALSE){install.packages("wordcloud")}
if("SnowballC" %in% rownames(installed.packages())==FALSE){install.packages("SnowballC")}
if("tm" %in% rownames(installed.packages())==FALSE){install.packages("tm")}
if("jsonlite" %in% rownames(installed.packages())==FALSE){install.packages("jsonlite")}
if("curl" %in% rownames(installed.packages())==FALSE){install.packages("curl")}
library("wordcloud", lib.loc="~/R/win-library/3.3")
library("SnowballC", lib.loc="~/R/win-library/3.3")
library("tm", lib.loc="~/R/win-library/3.3")
library("jsonlite", lib.loc="~/R/win-library/3.3")
library("curl", lib.loc="~/R/win-library/3.3")
json_data <- fromJSON("https://api.mlab.com/api/1/databases/heroku_7h57wcf3/collections/wordCloud?apiKey=N4A8HYsNTSKcAVlh-orOo01hTK9kZZwT")
jsonCorpus <- Corpus(VectorSource(json_data$last_name))
jsonCorpus <- tm_map(jsonCorpus, PlainTextDocument)
jsonCorpus <- tm_map(jsonCorpus, removePunctuation)
jsonCorpus <- tm_map(jsonCorpus, removeWords, stopwords('english'))
jsonCorpus <- tm_map(jsonCorpus, stemDocument)
png(filename = 'wordcloud.png')
wordcloud(jsonCorpus, max.words = 100, random.order = FALSE)
dev.off()

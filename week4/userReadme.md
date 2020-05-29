## Mission Table

### User
|userIdx(PK)|name|password|
|------|---|---|
|1|유가희|aaaa|

### Article
|articleIdx(PK)|author|title|content|likes|
|------|---|---|----|----|
|1|유미|유미의세포들|세포들|132|


### Like
|articleId(FK)|userID(FK)|
|---|---|
|1|1|

### Comment
|articleId(FK)|userID(FK)|commentsContent|
|---|---|--------|
|1|1|다음화가 기대되네요|

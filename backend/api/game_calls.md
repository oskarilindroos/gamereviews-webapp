# Games call information

## get list of games

To get list of games use following url ending `/api/games/` and give it data in following formvalues

1. `number_of_games` give the number of games wanted per page
2. `page_number` give the page number that data is wanted on, to get corresponsive data
3. `order`the order the games are fetch in ascending `asc` or descending `desc`
4. `order_by` the parameter games are in order by like
   1. `name`
   2. `id`
   3. `first_release_date`
   4. `rating`

## get a single games data

To get a single games data and reviews use following url ending `/api/games/{igdbId}` where `{igdbId}` is the id of the game thats data is wanted

## search for games

To search for games use the url ending of `/api/games/search` and give it search values in following formvalues

1. `number_of_games` give the number of games wanted per page
2. `page_number` give the page number that data is wanted on, to get corresponsive data
3. `search_content` is where the parameters that are searched for in games are given like the name of the character, name of the game and so on

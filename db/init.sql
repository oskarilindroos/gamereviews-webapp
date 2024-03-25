-- Create game_reviews table
CREATE TABLE IF NOT EXISTS `game_reviews`(
    `id` int(36) NOT NULL AUTO_INCREMENT,
    `igdb_id` varchar(36) NOT NULL,
    `user_id`varchar(36),
    `review` text(3000) NOT NULL,
    `rating` varchar(3) NOT NULL,
    `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
    
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Create users table
CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(36) NOT NULL,
  `user_name` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(60) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* make game_reviews id to start from 100
id's below 100 are test data */
ALTER TABLE `game_reviews` AUTO_INCREMENT=100;


-- insert test data into game_reviews table
INSERT INTO `game_reviews` (`id`,`igdb_id`,`review`,`rating`) 
VALUES ('1','131913','it was ok, for a visual novel','3'),
('2','131913','not that good','2'),
('3','1025','great Zelda game','4'),
('4','1022','amazing zelda game','4.5'),
('5','119171','It earned the game of the year. No competition.','5');
INSERT INTO `game_reviews` (`id`,`igdb_id`,`review`,`rating`,`user_id`) VALUES ('6','119171',"Best game i've ever played",'5','1');
COMMIT;
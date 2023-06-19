Database name: back

Table code:

CREATE TABLE `users` (
 `u_id` int(11) NOT NULL AUTO_INCREMENT,
 `u_name` varchar(255) NOT NULL,
 `u_lastname` varchar(255) NOT NULL,
 `u_address` varchar(255) NOT NULL,
 `u_username` varchar(255) NOT NULL,
 `u_postnumber` varchar(255) NOT NULL,
 `u_city` varchar(255) NOT NULL,
 `u_password` varchar(255) NOT NULL,
 PRIMARY KEY (`u_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4

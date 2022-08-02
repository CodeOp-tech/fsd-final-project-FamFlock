SET foreign_key_checks = 0;
 
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS tripGroups;
DROP TABLE IF EXISTS users_tripGroups;
DROP TABLE IF EXISTS trips;
DROP TABLE IF EXISTS itinerary;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS messagesReactions;
DROP TABLE IF EXISTS tripAddressess;
DROP TABLE IF EXISTS lists;
DROP TABLE IF EXISTS listItems;


SET foreign_key_checks = 1;
 
CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT,
	email VARCHAR(100) NOT NULL UNIQUE,
	username VARCHAR(20) NOT NULL UNIQUE,
	password VARCHAR(200) NOT NULL,
	fullname VARCHAR(30) NOT NULL,
	picture VARCHAR(200) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE tripGroups (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(30) NOT NULL,
	PRIMARY KEY (id)
);



CREATE TABLE users_tripGroups (
	FK_users_id INT NOT NULL,
	FK_tripGroups_id INT NOT NULL
);

CREATE TABLE trips (
	id INT NOT NULL AUTO_INCREMENT,
	FK_tripGroups_id INT NOT NULL,
	startDate DATE NOT NULL,
	endDate DATE NOT NULL,
	destination VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE itinerary (
	id INT NOT NULL AUTO_INCREMENT UNIQUE,
	activity VARCHAR(255) NOT NULL,
	date DATE NOT NULL,
	location VARCHAR(255) NOT NULL,
	time TIME NOT NULL,
	FK_trips_id INT NOT NULL
);

CREATE TABLE messages (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    senderId INT NOT NULL,
	groupId INT NOT NULL,
    text VARCHAR(250) NOT NULL,
	thumbsUpCount INT,
	thumbsDownCount INT,
    dateTime DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE  lists  (
	 id  INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	 FK_trips_id  INT NOT NULL,
	 name  VARCHAR(100) NOT NULL,
	 isComplete  BOOLEAN NOT NULL
   );

CREATE TABLE  listItems  (
	 id  INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	 FK_lists_id  INT NOT NULL,
	 name  VARCHAR(200) NOT NULL,
	 isComplete  BOOLEAN NOT NULL
   );

CREATE TABLE messagesReactions (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	reaction TINYINT,
	FK_user_id INT NOT NULL,
	FK_message_id INT NOT NULL
);

CREATE TABLE tripAddressess (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(250) NOT NULL,
	latLng VARCHAR(250) NOT NULL,
	formatted_address VARCHAR(250) NOT NULL,
	FK_trips_id INT NOT NULL
);


ALTER TABLE users_tripGroups ADD FOREIGN KEY (FK_users_id) REFERENCES users(id);
ALTER TABLE users_tripGroups ADD FOREIGN KEY (FK_tripGroups_id) REFERENCES tripGroups(id);

ALTER TABLE trips ADD FOREIGN KEY (FK_tripGroups_id) REFERENCES tripGroups(id);

ALTER TABLE itinerary ADD FOREIGN KEY (FK_trips_id) REFERENCES trips(id);

ALTER TABLE messagesReactions ADD FOREIGN KEY (FK_message_id) REFERENCES messages(id);
ALTER TABLE messagesReactions ADD FOREIGN KEY (FK_user_id) REFERENCES users(id);

ALTER TABLE  lists  ADD FOREIGN KEY (FK_trips_id) REFERENCES  trips (id);
ALTER TABLE  listItems  ADD FOREIGN KEY (FK_lists_id) REFERENCES  lists (id);

ALTER TABLE tripAddressess ADD FOREIGN KEY (FK_trips_id) REFERENCES trips(id);

INSERT INTO users (
    email, username, password, fullname, picture
) VALUES
    ('example1@email.com', 'person1', '$2b$12$Gbei9VYe/mM1DGo4yQkmau0UbpFMPWJ0WV4WZrFNuJ1HZH9//kY9a', 'Person One', 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'),
    ('example2@email.com', 'person2', '$2b$12$lDWcKS5v96t60Y1PvfE0SuGfhN67QoFHQT60ZdQyhPED38LVZdgQS', 'Person Two', 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'),
    ('example3@email.com', 'person3', '$2b$12$NDASPNSQuwalJol78l0Zn.7cIPXlpsaiSZyZbXPlRGWfmR2ctTpn6', 'Person Three', 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png');

INSERT INTO  tripGroups  (
	name
) VALUES 
	('Group 1'),
	('Group 2'),
	('Group 3');

INSERT INTO users_tripGroups (
	FK_users_id, FK_tripGroups_id
) VALUES
	(1,1),
	(1,2),
	(2,1),
	(3,1),
	(1,2),
	(3,2),
	(2,3),
	(3,3);

INSERT INTO trips (
	FK_tripGroups_id, startDate, endDate, destination
) VALUES
	(1, 20220725, 20220801, 'Barcelona'),
	(2, 20220806, 20220809, 'London'),
	(2, 20220901, 20220904, 'Paris'),
	(3, 20220715, 20220724, 'Venice');

INSERT INTO itinerary (
	activity, date, location, time, FK_trips_id
) VALUES 
	('Visit to La Pedrera', 20220725, 'La Pedrera', 200000, 1),
	('Afternoon stroll', 20220728, 'Tibidabo', 110000, 1),
	('Sightseeing', 20220808, 'Big Ben', 123000, 2),
	('Football match', 20220807, 'Emirates Stadium', 140000, 2),
	('Lunch', 20220901, 'Chez du Fromage', 133000, 3),
	('Dinner', 20220903, 'Lumiere', 210000, 3),
	('Boat Tour', 20220717, 'Canale di Venezia', 120000, 4),
	('Pizza-making class', 20220720, 'Il Formaggi', 160000, 4);


INSERT INTO messages (
	senderId, groupId, text, thumbsUpCount, thumbsDownCount, dateTime
) VALUES
	
	(3, 1, "Hey", 2, 1, 20220727123806),
	(1, 1, "Hello there", 0, 0, 20220727123807),
	(2, 1, "Hi!", 0, 0, 20220727123808);

INSERT INTO messagesReactions (
	reaction, FK_user_id, FK_message_id
) VALUES 
	(1, 3, 1),
	(0, 1, 1), 
	(1, 2, 1);


INSERT INTO lists (
	FK_trips_id, name, isComplete
) VALUES
	(1, "Packing List", false);

INSERT INTO listItems (
	FK_lists_id, name, isComplete
) VALUES
	(1, "Documents", false),
	(1, "Electronics", true);

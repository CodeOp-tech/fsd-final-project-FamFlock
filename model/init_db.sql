SET foreign_key_checks = 0;
 
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS tripGroups;
DROP TABLE IF EXISTS users_tripGroups;
DROP TABLE IF EXISTS trips;
DROP TABLE IF EXISTS itinerary;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS messagesReactions;
DROP TABLE IF EXISTS tripAddresses;
DROP TABLE IF EXISTS lists;
DROP TABLE IF EXISTS listItems;
DROP TABLE IF EXISTS budget;


SET foreign_key_checks = 1;
 
CREATE TABLE users (
	id INT NOT NULL AUTO_INCREMENT,
	email VARCHAR(100) NOT NULL UNIQUE,
	username VARCHAR(20) UNIQUE,
	password VARCHAR(200),
	fullname VARCHAR(30),
	picture VARCHAR(200),
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
    text VARCHAR(1000) NOT NULL,
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

CREATE TABLE tripAddresses (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(250) NOT NULL,
	latLng VARCHAR(250) NOT NULL,
	formatted_address VARCHAR(250) NOT NULL,
	FK_trips_id INT NOT NULL
);


CREATE TABLE budget (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(250) NOT NULL,
	amount INT NOT NULL,
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

ALTER TABLE tripAddresses ADD FOREIGN KEY (FK_trips_id) REFERENCES trips(id);

ALTER TABLE budget ADD FOREIGN KEY (FK_trips_id) REFERENCES trips(id);

INSERT INTO users (
    email, username, password, fullname, picture
) VALUES
    ('ronald.clark@hotmail.co.uk ', 'ronark', '$2b$12$Gbei9VYe/mM1DGo4yQkmau0UbpFMPWJ0WV4WZrFNuJ1HZH9//kY9a', 'Ronald Clark', 'https://www.random-name-generator.com/images/faces/male-white/01.jpg?ezimgfmt=rs:148x143/rscb1/ng:webp/ngcb1'),
    ('maya@fournier.biz', 'mayalanc', '$2b$12$lDWcKS5v96t60Y1PvfE0SuGfhN67QoFHQT60ZdQyhPED38LVZdgQS', 'Maya Leblanc', 'https://www.random-name-generator.com/images/faces/female-white/44.jpg?ezimgfmt=rs:148x143/rscb1/ng:webp/ngcb1'),
    ('sebb@abeyta.es', 'sebaez', '$2b$12$NDASPNSQuwalJol78l0Zn.7cIPXlpsaiSZyZbXPlRGWfmR2ctTpn6', 'Sebastian Mendez', 'https://www.random-name-generator.com/images/faces/male-latino/16.jpg?ezimgfmt=rs:148x148/rscb1/ng:webp/ngcb1'),
	('nera.green@gmail.com','nereagreen','$2b$12$Gbei9VYe/mM1DGo4yQkmau0UbpFMPWJ0WV4WZrFNuJ1HZH9//kY9a','Nerea Green','https://randompicturegenerator.com/img/people-generator/g8ce2dca76287a17421911ed8a95a299d9759f854d35faeb700ac8e7e51d7bcffecc118f2ca569dbd6188d24faba1ef4b_640.jpg'),
	('fernandesmarisa@hotmail.com','marfernandes','$2b$12$Gbei9VYe/mM1DGo4yQkmau0UbpFMPWJ0WV4WZrFNuJ1HZH9//kY9a','Marisa Fernandes','https://randompicturegenerator.com/img/people-generator/gf3ed673c00ace4496f33e8533d0af6f2ee479f3c5c7869e7bf9c99fce726b1c69f7e1a24a13c834e6a7456695f67ac50_640.jpg'),
	('derekjames@gmail.com','derek123','$2b$12$Gbei9VYe/mM1DGo4yQkmau0UbpFMPWJ0WV4WZrFNuJ1HZH9//kY9a','Derek James','https://randomwordgenerator.com/img/picture-generator/5fe3d74b4e54b10ff3d8992cc12c30771037dbf85254794e73287ad1944f_640.jpg'),
	('andreu.fons@gmail.com','andreufons','$2b$12$Gbei9VYe/mM1DGo4yQkmau0UbpFMPWJ0WV4WZrFNuJ1HZH9//kY9a','Andreu Fons','https://randompicturegenerator.com/img/people-generator/g6cc4205deb6d91103062f27547db42c077e5d2e656577f7f55bff5f0b3400e8d6da800567006d7f567cb143afedbc5a5_640.jpg'),
	('iloradobson@gmail.com','ilora','$2b$12$Gbei9VYe/mM1DGo4yQkmau0UbpFMPWJ0WV4WZrFNuJ1HZH9//kY9a','Ilora Dobson','https://randompicturegenerator.com/img/people-generator/g5b697ab469f8775e5f7b506c021049dc9642d3e99bbc3cc7642b1d3c2382287f24cbcc37a4f00e521933c07c09e73216_640.jpg');
											

INSERT INTO  tripGroups  (
	name
) VALUES 
	('Group 1'),
	('Group 2'),
	('Group 3'),
	('Group 4');

INSERT INTO users_tripGroups (
	FK_users_id, FK_tripGroups_id
) VALUES
	(1,1),
	(1,2),
	(2,1),
	(3,1),
	(3,2),
	(2,3),
	(2,4),
	(6,3),
	(3,3),
	(4,2),
	(5,2),
	(6,2),
	(7,2),
	(8,2);

INSERT INTO trips (
	FK_tripGroups_id, startDate, endDate, destination
) VALUES
	(1, 20221025, 20221101, 'Barcelona'),
	(2, 20221106, 20221109, 'London'),
	(3, 20221201, 20221204, 'Paris'),
	(4, 20221215, 20221220, 'Venice');

INSERT INTO itinerary (
	activity, date, location, time, FK_trips_id
) VALUES 
	('Visit to La Pedrera', 20221027, 'La Pedrera', 200000, 1),
	('Afternoon stroll', 20221028, 'Tibidabo', 130000, 1),
	('Ballet Show', 20221025, 'Palau de la Musica', 190000, 1),
	('Stargazing', 20221025, 'CRAM', 220000, 1),
	('Football match', 20221026, 'Camp Nou FCB', 210000, 1),
	('Relax', 20221026, 'Parc de la Ciutadella', 150000, 1),
	('Lunch', 20221028, 'Honest Greens', 140000, 1),
	('Sightseeing', 20221108, 'Big Ben', 123000, 2),
	('Football match', 20221107, 'Emirates Stadium', 140000, 2),
	('Sunset boat trip', 20221107, 'River Thames', 190000, 2),
	('High Tea', 20221106, 'Covent Garden', 120000, 2),
	('Nerea and Marisa fly home', 20221109, 'London Heathrow Airport (LHR)', 110000, 2),
	('Derek, Andreu, and Ilora fly home', 20221109, 'London Gatwick Airport (LGW)', 140000, 2),
	('Lunch', 20221201, 'Chez du Fromage', 133000, 3),
	('Dinner', 20221203, 'Le Petit Fromage', 210000, 3),
	('Football match', 20221202, 'Parc des Princes', 210000, 3),
	('Walking', 20221202, 'Champs-Elysees', 150000, 3),
	('Sightseeing', 20221203, 'Le Tour Eiffel', 150000, 3),
	('Beret Shopping', 20221201, 'Courtois Paris', 160000, 3),
	('Maccaron Tasting', 20221202, 'Le Macaron', 130000, 3),
	('Catch our flight home!', 20221204, 'Aeroport Charles de Gaulle Paris (CDG)', 190000, 3),
	('Boat Tour', 20221017, 'Canale di Venezia', 120000, 4),
	('Museum Visit', 20221019, 'Museo di Venezia', 140000, 4),
	('Excursion to Napoli', 20221018, 'Porta di Venezia', 090000, 4),
	('Pizza-making class', 20221020, 'Il Formaggi', 160000, 4),
	('Check in and relax', 20221015, 'Hotel Giorgione', 230000, 4);



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

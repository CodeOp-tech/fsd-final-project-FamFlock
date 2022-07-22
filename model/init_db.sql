SET
    foreign_key_checks = 0;
    -- drop tables
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS stores;
DROP TABLE IF EXISTS products_stores;
DROP TABLE IF EXISTS users;

SET
    foreign_key_checks = 1;

-- create tables
CREATE TABLE products (
	ID INT NOT NULL AUTO_INCREMENT,
	productName varchar(255) NOT NULL,
    quantity INT,
	quantityUnits varchar(255),
	productImage varchar(500) NOT NULL,
	brand varchar(255),
	PRIMARY KEY (ID)
);

CREATE TABLE products_stores (
	ID INT NOT NULL AUTO_INCREMENT,
	FK_productsID INT NOT NULL,
	FK_storesID INT NOT NULL,
	productPrice INT NOT NULL, 
	PRIMARY KEY (ID)
);

CREATE TABLE users (
	ID INT NOT NULL AUTO_INCREMENT,
	username varchar(255) NOT NULL,
	email varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
	owner BOOLEAN NOT NULL,
	PRIMARY KEY (ID)
);


CREATE TABLE stores (
	ID INT NOT NULL AUTO_INCREMENT,
	storeName varchar(255) NOT NULL,
	storeAddress varchar(255) NOT NULL,
	storeCity varchar(255) NOT NULL,
	storeCountry varchar(255) NOT NULL,
	storePostalCode varchar(255),
	storeImage varchar(500) NOT NULL, 
	blackOwned TINYINT NOT NULL,
	localOwned TINYINT NOT NULL,
	FK_userID INT NOT NULL,
	PRIMARY KEY (ID)
);


ALTER TABLE products_stores ADD CONSTRAINT products_stores_fk0 FOREIGN KEY (FK_productsID) REFERENCES products(ID);

ALTER TABLE products_stores ADD CONSTRAINT products_stores_fk1 FOREIGN KEY (FK_storesID) REFERENCES stores(ID);

ALTER TABLE stores ADD CONSTRAINT stores_fk0 FOREIGN KEY (FK_userID) REFERENCES users(ID);



-- default data:
INSERT INTO products (productName, quantity, quantityUnits, productImage, brand) VALUES 
('Comb', 10, 'g', 'https://cdn.shopify.com/s/files/1/2236/8407/products/CCC-2T_800x.jpg?v=1552581024','SuperComb'), 
('Gel', 250, 'ml', 'https://m.media-amazon.com/images/I/71C3bKEcS-L._AC_SX425_.jpg','ECO Style'), 
('Beads', 50, 'g', 'https://sc04.alicdn.com/kf/Hdaa53a9673de47be967e4ddfabdec4f1R.jpg','Beadybeads'),
('Cream', 100, 'ml', 'https://mynatural.co.za/wp-content/uploads/2017/09/CurlingCream.png','My Natural Hair'),
('Castor Oil', 100, 'ml', 'https://images.hollandandbarrettimages.co.uk/productimages/HB/724/033816_A.jpg','Holland & Barret'),
('Shampoo', 250, 'ml', 'https://www.druni.es/media/catalog/product/7/0/7003143.jpg', 'Cantu' );

INSERT INTO users (username, email, password, owner) VALUES
 	('user1','user1@acme.com','$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W',1),
  	('user2','user2@acme.com','$2b$12$WZcGPyrkCvD5e8m0Qz/nFOdBryUcsp6uDlE2MDo/AjuBhPrQBCfI6',1),
    ('user3','user3@acme.com','$2b$12$tiAz4eaXlpU.CdltUVvw6udLA2BWsitk5zXM2XOm2IpAeAiFfMCdy',1),
	('user4','user4@acme.com','$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W',1); 


INSERT INTO stores (storeName, storeAddress, storeCity, storeCountry, storePostalCode, storeImage, blackOwned, localOwned, FK_userID) VALUES 
('Diva Hair Store', 'Carrer d''en Grassot, 15', 'Barcelona', 'Spain', '08025', 'https://images.bizbuysell.com/shared/listings/196/1966666/0526ea4f-423e-4f1f-b2b7-530e8f20ef6d-W496.jpg', 0, 1, 1), 
('Angel Beauty Supply', 'Carrer del Casp, 33', 'Palma de Mallorca', 'Spain', '07012', 'https://www.gannett-cdn.com/presto/2022/01/28/PPEN/5a3a282f-dd35-4bb2-bdff-ddcbaaca65dc-JoJos_Beauty_Supply-001.jpg?crop=2999,1687,x0,y381&width=660&height=372&format=pjpg&auto=webp', 1, 1, 2),
('Palacio del Afro', 'Calle de la Hada, 44', 'Malaga', 'Spain', '04040', 'https://s3-media0.fl.yelpcdn.com/bphoto/ihHkLumMeswOR_XXfeICAw/l.jpg', 1, 0, 3),
('Hairopolis', 'Calle de Naranja', 'Madrid', 'Spain', '33444', 'https://archives.rgnn.org/wp-content/uploads/2019/08/2-750x500.jpg', 1, 0, 4);

INSERT INTO products_stores (FK_productsID, FK_storesID, productPrice) VALUES (1, 1, 10), (2, 3, 5), (3, 3, 4), (1, 2, 3), (4, 2, 7), (4, 4, 10), (6, 4, 8), (5, 1, 9);


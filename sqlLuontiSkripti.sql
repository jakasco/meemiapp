DROP DATABASE IF EXISTS some;
CREATE DATABASE some;
USE some;


GRANT SELECT, INSERT, UPDATE, DELETE ON some.* TO dbuser@localhost;

drop table if exists kayttaja;
CREATE TABLE kayttaja
(
  kayttaja_id INT NOT NULL,
  kayttaja_nimi VARCHAR(50) NOT NULL,
  sahkoposti VARCHAR(50),
  salasana VARCHAR(30) NOT NULL,
  logged_in INT(2),
  ip VARCHAR(20),
  last_login INT(14),
  PRIMARY KEY (kayttaja_id)
);

drop table if exists ei_kirjautunut_kayttaja;
CREATE TABLE ei_kirjautunut_kayttaja
(
  ip VARCHAR(20)
);

drop table if exists kuvat;
CREATE TABLE kuvat
(
  kuva_id INT NOT NULL,
  kayttaja_id INT NOT NULL,
  URL VARCHAR(50),
  kuva_teksti VARCHAR(50),
  views INT,
  PRIMARY KEY (kuva_id),
  tykkaykset INT
);

drop table if exists views;
CREATE TABLE views
(
  kuva_id INT NOT NULL,
  kayttaja_id INT,
  ei_kirjautunut_kayttaja INT
);

drop table if exists tags;
CREATE TABLE tags
(
  kuva_id INT NOT NULL,
  tag_name VARCHAR(20) NOT NULL
);

drop table if exists asetukset;
CREATE TABLE asetukset
(
  kayttaja_id INT NOT NULL,
  theme VARCHAR(20)
);

drop table if exists kommentit;
CREATE TABLE kommentit
(
  kuva_id INT NOT NULL,
  kayttaja_id INT NOT NULL,
  kommentti VARCHAR(100),
  reported INT
);

drop table if exists tykkaykset;
CREATE TABLE tykkaykset
(
  kuva_id INT NOT NULL,
  kayttaja_id INT NOT NULL,
  tykkaa INT,
  ala_tykkaa INT
);

drop table if exists private_message;
CREATE TABLE private_message
(
  kayttaja_id_lahettaja INT NOT NULL,
  kayttaja_id_vastaanottaja INT NOT NULL,
  viesti VARCHAR (300)
);

drop table if exists asetukset;
CREATE TABLE asetukset
(
  kayttaja_id INT NOT NULL,
  yksityinen INT,
  theme VARCHAR(20),
  PRIMARY KEY (kayttaja_id)
);

INSERT INTO kayttaja VALUES(1, "Kassu", "", "salAsana", 0,"1.2.3", NULL);
INSERT INTO kayttaja VALUES(2, "Kassu2", "", "salAsana2", 1, "1.2.3",NULL);
INSERT INTO kayttaja VALUES(3, "joku", "", "password", 0,"1.2.3", NULL);

INSERT INTO kuvat VALUES(1, 1, "kuvateksti", 21,0);
INSERT INTO kuvat VALUES(2, 1, "kuvateksti", 15,0);
INSERT INTO kuvat VALUES(3, 2, "Kassu2:n kuva", 12,0);

INSERT INTO kommentit VALUES( 1, 1, "Kassun oma kommentti",NULL);
INSERT INTO kommentit VALUES( 1, 2, "Kassu2:n kommentti",NULL);

INSERT INTO tykkaykset VALUES( 2, 1, 1,0);

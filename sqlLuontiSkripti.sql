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

drop table if exists kuvat;
CREATE TABLE kuvat
(
  kuva_id INT NOT NULL,
  kayttaja_id INT NOT NULL,
  kuva_teksti VARCHAR(50),
  views INT,
  PRIMARY KEY (kuva_id),
  tykkaykset INT
);

drop table if exists kommentit;
CREATE TABLE kommentit
(
  kuva_id INT NOT NULL,
  kayttaja_id INT NOT NULL,
  kommentti VARCHAR(100)
);

drop table if exists tykkaykset;
CREATE TABLE tykkaykset
(
  kuva_id INT NOT NULL,
  kayttaja_id INT NOT NULL,
  tykkays INT
);


drop table if exists asetukset;
CREATE TABLE asetukset
(
  kayttaja_id INT NOT NULL,
  yksityinen BIT,
  PRIMARY KEY (kayttaja_id)
);

INSERT INTO kayttaja VALUES(1, "Kassu", "", "salAsana", 0,"1.2.3", NULL);
INSERT INTO kayttaja VALUES(2, "Kassu2", "", "salAsana2", 1, "1.2.3",NULL);
INSERT INTO kayttaja VALUES(3, "joku", "", "password", 0,"1.2.3", NULL);

INSERT INTO kuvat VALUES(1, 1, "kuvateksti", 21,0);
INSERT INTO kuvat VALUES(2, 1, "kuvateksti", 15,0);
INSERT INTO kuvat VALUES(3, 2, "Kassu2:n kuva", 12,0);

INSERT INTO kommentit VALUES( 1, 1, "Kassun oma kommentti");
INSERT INTO kommentit VALUES( 1, 2, "Kassu2:n kommentti");

INSERT INTO tykkaykset VALUES( 2, 1, 1);

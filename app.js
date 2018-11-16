var http = require('http');
var fs = require('fs');
var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
const multer  = require('multer');
const upload = multer({ dest: 'public/profiilit/' })

//Tietokannan tiedot
var connection = mysql.createConnection({

	host: 'mysql.metropolia.fi',
	user: '',
	password: '',
	database: '',

});

//Tarkastetaan saadaanko MySql yhteys
connection.connect(function(error){
	if(!!error){
			console.log("Error to connect mySQL");
	}else{
		console.log("Connected to MySQL");
	}
});

//Clientistä vastaan ottaminen
app.use(bodyParser());

//Tietokantaan päivitys sql lauseilla
var run = function(sqlString) {

	console.log("sql lause: "+sqlString);

	connection.query(sqlString, function(error, rows, fields){
		if(!!error) {
			console.log("ERROR IN THE SQL QUERY 2");
		}else{
			console.log("SUCCESFULLY ADDED INTO DATABASE!");
		}
});

}

//loggaus sisään
const login = function(tunnus,salasana) {
 //jos salasana on oikein, set 1, jos väärim set 0
	let sqlString = "UPDATE kayttaja SET logged_in = CASE WHEN salasana ='"+salasana+"'  THEN 1 ELSE 0 END WHERE kayttaja_nimi IN ('"+tunnus+"')";
	console.log(sqlString);
	connection.query(sqlString, function(error, rows, fields){
		if(!!error) {
			console.log("ERROR IN THE SQL QUERY");
		}else{
			//tarkastetaan onko salasana oikein ja tehdään tarvittavat asiat
			//let bool = checkLogin(tunnus);
		//	if(bool==1){
				console.log("LOGGED IN CHANGED TO 1");
	//		}else{
		//		console.log("WRONG PASSWORD");
	//		}
		}
});
}

//tarkasta täsmääkö loggaus
const checkLogin = function(tunnus){
		let sqlString = "SELECT logged_in FROM kayttaja WHERE kayttaja_nimi = '"+tunnus+"';";
		connection.query(sqlString, function(error, rows, fields){
			if(!!error) {
				console.log("ERROR IN THE SQL QUERY");
			}else{
				let bool = rows[0].logged_in;
				return bool;
			}
	});
}

//tarkasta onko käyttäjänimi varattu
const checkName = function(tunnus){
		let sqlString = "SELECT kayttaja_nimi FROM kayttaja WHERE kayttaja_nimi = '"+tunnus+"';";
		connection.query(sqlString, function(error, rows, fields){
			if(!!error) {
				console.log("ERROR IN THE SQL QUERY");
			}else{
				let bool = rows[0].logged_in;
				return bool;
			}
	});
}

//loggaus ulos
const logout = function(tunnus){
		let sqlString = "UPDATE kayttaja SET logged_in = 0 WHERE kayttaja_nimi IN ('"+tunnus+"')";
		console.log(sqlString);
		connection.query(sqlString, function(error, rows, fields){
			if(!!error) {
				console.log("ERROR IN THE SQL QUERY");
			}else{
				console.log("LOGGED IN CHANGED TO 0");
			}
	});
	}



//ota tietokannasta
let uusiKayttaja = function(sqlString,tunnus,salasana,ip) {
	connection.query(sqlString, function(error, rows, fields){
		if(!!error) {
			console.log("ERROR IN THE SQL QUERY");
		}else{
			//viimeisin id
			let num = rows[0].kayttaja_id;
			//lisätään 1 id lisää
			num +=1;
																			  //id, nimi, sposti, salasana, logged_in, last_login
			sqlS = "INSERT INTO kayttaja VALUES("+num+",'"+tunnus+"', '"+salasana+"', 'asd', 0,'"+ip+"' , NULL);";
			run(sqlS);
		}
});
//luodaan uusi sivu käyttäjälle
const html = newPage(tunnus);

fs.writeFile("/Users/kaspermu/Downloads/someApp-master/public/profiilit/"+tunnus+".html", html, function(err) {
if(err) {
		return console.log(err);
}
console.log("The file was saved!");
});
}

//uuden käyttäjän teko
app.get('/send', (req,resp) => {
		//viimeisin id
		let sqlString = "SELECT kayttaja_id FROM kayttaja ORDER BY kayttaja_id DESC LIMIT 1";
		uusiKayttaja(sqlString,req.query.user, req.query.pw, req.ip);
		resp.redirect('/'); //palataan etusivulle
})

const newPage = function(tunnus) {
  var header = '<style> h1{\n' +
      '    text-align: center;\n' +
      '    color: white;\n' +
      '    margin: 0;\n' +
      '    padding-top: 30px;\n' +
      '    border: 0;\n' +
      '    height: 20%;\n' +
      '}\n' +
      'h2{\n' +
      '    color: white;\n' +
      '}\n' +
      '\n' +
      'h3{\n' +
      '    padding-left: 35px;\n' +
      '}\n' +
      '.container2{\n' +
      '    text-align: center;\n' +
      '\n' +
      '}\n' +
      '#otsikko{\n' +
      '    background-color: #203A43;\n' +
      '    font-family: Arial;\n' +
      '}\n' +
      '\n' +
      '.omakuva{\n' +
      '    display: block;\n' +
      '    margin-left: 25%;\n' +
      '    margin-right: auto;\n' +
      '    width: 1200px;\n' +
      '    height: 800px;\n' +
      '\n' +
      '}\n' +
      '\n' +
      'img{\n' +
      '    width: 1200px;\n' +
      '    height: 800px;\n' +
      '\n' +
      '}\n' +
      '\n' +
      '.sivupalkki{\n' +
      '\n' +
      '\n' +
      '    height:100%;\n' +
      '    width:10%;\n' +
      '    background-color:#203A43;\n' +
      '    position:fixed!important;\n' +
      '\n' +
      '    overflow:auto;\n' +
      '\n' +
      '\n' +
      '\n' +
      '}\n' +
      '\n' +
      '.sivupalkki a {\n' +
      '\n' +
      '    padding: 8px 8px 8px 32px;\n' +
      '    text-decoration: none;\n' +
      '    font-size: 25px;\n' +
      '    color: #818181;\n' +
      '    display: block;\n' +
      '    transition: 0.3s;\n' +
      '\n' +
      '}\n' +
      '.sivupalkki a:hover {\n' +
      '    color: #f1f1f1;\n' +
      '}\n' +
      '\n' +
      '\n' +
      'body{\n' +
      '   background-image: linear-gradient(#0F2027, #203A43, #2C5364);\n' +
      '\n' +
      '    color: white;\n' +
      '    font-family: Arial;\n' +
      '    margin-top: 0;\n' +
      '    margin-left: 0;\n' +
      '    margin-right: 0;\n' +
      '\n' +
      '}\n' +
      '\n' +
      '.kommenttikentta{\n' +
      '    text-align: center;\n' +
      '    list-style-type: none;\n' +
      '    padding-right: 50%;\n' +
      '}\n' +
      'li{\n' +
      '    list-style-type: none;\n' +
      '\n' +
      '\n' +
      '}\n' +
      '#upload{\n' +
      '\n' +
      '    border-radius: 12px;\n' +
      '    background-color: #2C5364;\n' +
      '    Color: white;\n' +
      '    cursor: pointer;\n' +
      '}\n' +
      '#myBtn{\n' +
      '    position: absolute;\n' +
      '    top: 10%;\n' +
      '    left: 93%;\n' +
      '    border-radius: 12px;\n' +
      '    background-color: #2C5364;\n' +
      '    Color: white;\n' +
      '    cursor: pointer;\n' +
      '}\n' +
      '#nappi2{\n' +
      '    position: absolute;\n' +
      '    top: 10%;\n' +
      '    left: 96%;\n' +
      '    border-radius: 12px;\n' +
      '    background-color: #2C5364;\n' +
      '    Color: white;\n' +
      '    cursor: pointer;\n' +
      '}\n' +
      '\n' +
      '/* The Modal (background) */\n' +
      '.modal {\n' +
      '    display: none; /* Hidden by default */\n' +
      '    position: fixed; /* Stay in place */\n' +
      '    z-index: 1; /* Sit on top */\n' +
      '    left: 0;\n' +
      '    top: 0;\n' +
      '    width: 100%; /* Full width */\n' +
      '    height: 100%; /* Full height */\n' +
      '    overflow: auto; /* Enable scroll if needed */\n' +
      '    background-color: rgb(0,0,0); /* Fallback color */\n' +
      '    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */\n' +
      '}\n' +
      '\n' +
      '/* Modal Content/Box */\n' +
      '.modal-content {\n' +
      '    background-color: #203A43;\n' +
      '    margin: 15% auto; /* 15% from the top and centered */\n' +
      '    padding: 20px;\n' +
      '    border: 1px solid #888;\n' +
      '    width: 25%; /* Could be more or less, depending on screen size */\n' +
      '\n' +
      '}\n' +
      '\n' +
      '/* The Close Button */\n' +
      '.close {\n' +
      '    color: #aaa;\n' +
      '    float: right;\n' +
      '    font-size: 28px;\n' +
      '    font-weight: bold;\n' +
      '}\n' +
      '\n' +
      '.close:hover,\n' +
      '.close:focus {\n' +
      '    color: black;\n' +
      '    text-decoration: none;\n' +
      '    cursor: pointer;\n' +
      '}\n' +
      '#gridi{\n' +
      '    display: grid;\n' +
      '    grid-template: auto;\n' +
      '    justify-items: left;\n' +
      '}\n' +
      '\n' +
      '.container{\n' +
      '    height: 100px;\n' +
      '    width: 100%;\n' +
      '}</style>';
  //var body = '<p>'+tunnus+'</p> <br> <form method="get" action="/profileLogout" id="form"><input type = "hidden" name ="user" value="'+tunnus+'" /></form> <button type="submit" form="form" value="Submit">Logout</button>'

	let body = "<div class=\"sivupalkki\">\n" +
      "    <h3>Menu</h3>\n" +
      "    <a href=\"#\" >Front page\n" +
      "    <a href=\"#\">Profile</a>\n" +
      "    <a href=\"#\">All memes</a>\n" +
      "    <a href=\"#\">Search</a>\n" +
      "        <a href=\"#\">Settings</a>\n" +
      "        <a href=\"#\">Create a meme</a>\n" +
      "</div>\n" +
      "\n" +
      "<!-- Page Content -->\n" +
      "<div>\n" +
      "\n" +
      "    <div class=\"container\" id=\"otsikko\">\n" +
      "        <h1>Profile Page</h1>\n" +
      "\n" +
      "    </div>\n" +
      "\n" +
      "\n" +
      "\n" +
      "    <div class=\"container2\">\n" +
      "\n" +
      "        <h2>Profile name </h2>\n" +
      "        <button id=\"myBtn\">Upload </button>\n" +
      "      <form method=\"get\" action=\"/profileLogout\" id=\"form\"><input type = \"hidden\" name =\"user\" value=\"'+tunnus+'\" /></form> <button id=\"nappi2\" type=\"submit\" form=\"form\" value=\"Submit\">Logout</button>' \n" +
      "        <!-- The Modal -->\n" +
      "        <div id=\"myModal\" class=\"modal\">\n" +
      "\n" +
      "            <!-- Modal content -->\n" +
      "            <div class=\"modal-content\">\n" +
      "\n" +
      "                <span class=\"close\">&times;</span>\n" +
      "\n" +
      "                <form method=\"get\" action=\"/upload\" id=\"form2\"><div id=\"gridi\">\n" +
      "                    <div id=\"testi\">  New picture: <button id=\"upload\">Browse</button></div><br>\n" +
      "                    <div id=\"testi\">Description: <input type=\"text\"> </div> <br>\n" +
      "                    <div id=\"testi\">  Add Tags: <input type=\"text\"><button id=\"upload\">Add</button> </div><br></div>\n" +
      "                </form>\n" +
      "            </div>\n" +
      "\n" +
      "        </div>\n" +
      "    </div>\n" +
      "    <div class=\"omakuva\"> <img src=\"testi.jpg\" alt=\"koiran kuva\"></div>\n" +
      "    <div class=\"kommenttikentta\">\n" +
      "\n" +
      "    </div>\n" +
      "    <div class=\"omakuva\"> <img src=\"testi.jpg\" alt=\"koiran kuva\"></div>\n" +
      "    <div class=\"kommenttikentta\">\n" +
      "\n" +
      "    <ul>\n" +
      "        <li>asd</li>\n" +
      "        <li>asd</li>\n" +
      "        <li>asd</li>\n" +
      "    </ul>\n" +
      "\n" +
      "</div>\n" +
      "    <script src=\"main.js\"></script>\n" +
      "</body>";




	return '<!DOCTYPE html>'
       + '<html><head>' + header + '</head><body>' + body + '</body></html>';
}


//sisään loggaus
app.get('/profile', (req,resp) => {
	login(req.query.user,req.query.pw);
	console.log("Logging in...");
	resp.writeHead(200, {'Content-Type': 'text/html'});
	//Liitetään index.html tiedosto

	fs.readFile('./public/profiilit/'+req.query.user+'.html',null, function(error, data){
		if (error){
			resp.writeHead(404);
			resp.write('File not found!');
		}else {
			resp.write(data);
			console.log(req.query.user+".html found!");
		}
		resp.end();
	});
})

//ulos loggaus
app.get('/profileLogout', (req,resp) => {
	console.log(req.query);
	logout(req.query.user);
	resp.redirect('/');
})

app.get('/upload', function(req, resp){
	resp.end();
})

//Kun sivu avataan
app.get('/', function(req, resp){

	resp.writeHead(200, {'Content-Type': 'text/html'});
	//Liitetään index.html tiedosto
	fs.readFile('./index.html',null, function(error, data){
		if (error){
			resp.writeHead(404);
			resp.write('File not found!');
		}else {
			resp.write(data);
			console.log("index.html found!");
		}
		resp.end();
	});
})

app.listen(1337, function(){
	console.log("Server started on port 1337");
})

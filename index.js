'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
	res.send('Hello world, I am a chat bot')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
	if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
		res.send(req.query['hub.challenge'])
	}
	res.send('Error, wrong token')
})

/*
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "guilherme27",
  database: "uffbot"
});

con.connect(function(err) {
  if (err) throw err;
let queryMessage= con.query("SELECT  nome FROM seguranca where id=1", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});
*/


app.post('/webhook/', function (req, res) {
    let messaging_events = req.body.entry[0].messaging
    for (let i = 0; i < messaging_events.length; i++) {
	    let event = req.body.entry[0].messaging[i]
	    let sender = event.sender.id
	    if (event.message && event.message.text) {
		    let text = event.message.text
		    decideMessage(sender,text)
	    }
	    if (event.postback)
	    {
	    	let text = JSON.stringify(event.postback)
	    	decideMessage(sender,text)
	    }
    }
    res.sendStatus(200)
})

function decideMessage(sender,text1)
{
	let text = text1.toLowerCase()
	if(text.includes("oi"))
	{
		sendButtonMessage(sender,"O que voce e?","start")
	}
	else if (text.includes("aluno")) 
	{
		sendButtonMessage(sender,"Ola Aluno da engenharia ,o que quer fazer?","aluno")
	}
	else if (text.includes("materias")) 
	{
		sendTextMessage(sender,"Chora")
	}
	else if (text.includes("pergunta")) 
	{
		sendTextMessage(sender,"Chora mais")
	}
}

function sendTextMessage(sender, text) {
    let messageData = { text:text }
    sendRequest(sender,messageData)
    
}

function sendButtonMessage(sender,text,modo)
{
	let messageData;

	if(modo.includes("start"))
	{
		messageData = 
		{
			"attachment":
			{
				"type":"template",
		    	"payload":
		        {
		        	"template_type":"button",
		        	"text":text,
		        	"buttons":
		        	[
		        		{
		            		"type":"postback",
		            		"title":"Aluno",
		            		"payload":"aluno"
		          		},
		          		{
		            		"type":"postback",
		            		"title":"Monitor",
		            		"payload":"monitor"
		          		},
		          		{
		            		"type":"postback",
		            		"title":"Professor",
		            		"payload":"professor"
		          		}
		        	]
		        }
	    	}
		}
	}
	else if (modo.includes("aluno")) 
	{
		messageData = 
		{
			"attachment":
			{
				"type":"template",
		    	"payload":
		        {
		        	"template_type":"button",
		        	"text":text,
		        	"buttons":
		        	[
		        		{
		            		"type":"postback",
		            		"title":"Materias",
		            		"payload":"materias"
		          		},
		          		{
		            		"type":"postback",
		            		"title":"Pergunta",
		            		"payload":"pergunta"
		          		}
		        	]
		        }
	    	}
		}
	}
	sendRequest(sender,messageData)
}

function sendRequest(sender,messageData)
{
	request({
	    url: 'https://graph.facebook.com/v2.6/me/messages',
	    qs: {access_token:token},
	    method: 'POST',
		json: {
		    recipient: {id:sender},
			message: messageData,
		}
	}, function(error, response, body) {
		if (error) {
		    console.log('Error sending messages: ', error)
		} else if (response.body.error) {
		    console.log('Error: ', response.body.error)
	    }
    })
}


const token = "EAACROVu6xPIBAK4zZBrblkKKQOYdoFKKoUDpZBiKVug4qk5KHPelIxFqCtRb5e6WbqCI3511QOOMyummVxd8Krrm2aTdsByuISYIIy3vSKSuJFF16GMEc8OfWICApU1IaLDvZAeGiH7ZCFVwBbCv1sidcOSx2zQ3l9QjFiFnCAZDZD"

// Spin up the server
app.listen(app.get('port'), function() {
	console.log('running on port', app.get('port'))
})

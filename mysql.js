const express = require('express');
const mysql = require('mysql');

const db = mysql.createConnection({

	host:		'localhost',
	user:		'root',
	password:	'guilherme27',
	database:	'uffbot'

});

db.connect((err) => {
	if(err){
		throw err;
	}
	console.log('Mysql Connected');

});
const app = express();

//create table
app.get('/createposttable',(req,res)=>{
	let sql = 'CREATE TABLE monitor (id int not null primary key auto_increment, nome text , codigo text);';
	db.query(sql,(err,result) => {
		if(err) throw err;
		console.log(result);
		res.send('Tabela professor criada!...');
	})

})

//insert post 1
app.get('/addpost1',(req,res) => {
	
	let sql='Insert into professor(nome,codigo) values ("Ethan","321")';
	db.query(sql,(err,result)=>{
		if(err)throw(err);
		console.log(result);
		res.send('Professor inserido com sucesso');
	})
})

//select posts
app.get('/selectpost',(req,res) => {
	
	let sql='SELECT * FROM  professor;';
	db.query(sql,(err,result)=>{
		if(err)throw(err);
		console.log(result);
		res.send('SELECT FEITO');
	})
})

//select single posts
app.get('/selectsinglepost/:id',(req,res) => {
	
	let sql=`SELECT * FROM  professor where id = ${req.params.id};`;
	db.query(sql,(err,result)=>{
		if(err)throw(err);
		console.log(result);
		res.send('SELECT FEITO ' );
	})
})

//update post
app.get('/updatepost/:id',(req,res) => {
	let newTitle = 'Updated Title';
	let sql=`UPDATE professor set nome = "${newTitle}" where id = ${req.params.id};`;
	db.query(sql,(err,result)=>{
		if(err)throw(err);
		console.log(result);
		res.send('Update feito');
	})
})






app.listen('5000', ()=> {

	console.log('server started on port 5000');

});



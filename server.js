/* ======================================= */

var port = 4000;
var express = require('express');
var app = express();

app.use(express.static('./public/'));
  
var collection =null;
// Connection URL

// Use connect method to connect to the Server
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var format = require('util').format;

// Connection URL
var url = 'mongodb://ken:1234@kahana.mongohq.com:10011/grade_ken';
// Use connect method to connect to the Server



app.get('/addGrade',function(req,res){

	data={

		subject:req.query.name,
		credit:req.query.credit,
		grade:req.query.grade

	};

	collection.insert(data,function(err,result){
		if (err) throw err;
		res.send('Success');

	});

});


app.get('/getData/:_index?',function(req,res){

	var find={};

	if (req.params._index) 
	{
		
	}
	else{
		collection.find().toArray(function(err,result){
			res.send(JSON.stringify(result));
		});
	}
});

app.get('/deleteGrade/:_id',function(req,res){

	var find={};

	if (req.params._id)
		find._id = new ObjectID(req.params._id);

	console.log(find);
	collection.remove(find,function(err,result){
		if (err) res.send(err);
		 else
   		 res.send('Success');
	});
});

app.get('/editGrade/:_id',function(req,res){

	var find={};
	var newData={};
	if (req.params._id)
		find._id = new ObjectID(req.params._id);

	if (req.query.subject)
		newData.subject=req.query.subject;

	if (req.query.credit)
		newData.credit=req.query.credit;

	if (req.query.grade)
		newData.grade=req.query.grade;

	console.log(find);
	collection.update(find,{'$set' : newData} ,function(err,result){
		if (err)
			res.send(err);
		else
			res.send('Success');
	})

});

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  collection = db.collection('grade');
  console.log("Connected correctly to server");
  app.listen(port);
});
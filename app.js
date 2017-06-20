var express = require('express'),
    path=require('path'),
    bodyParser=require('body-parser'),
    cons=require('consolidate'),
    //dust=require('dustjs-healpers'),
    pg=require('pg'),
    app=express(),
    dust = require('dustjs-linkedin');
  // connect
//var connection="postgres://bloguser:OnOnna143@localhost/blogtext";
var connection="postgres://wdcizxwapncpnk:270e46134a9c3444c9fec0867d4ba6db437043800486b103dd50d58b0397095c@ec2-107-20-255-96.compute-1.amazonaws.com:5432/dec9f072ja8hip";

var client = new pg.Client(connection);
client.connect();

app.engine('dust',cons.dust);

app.set('view engine','dust');
app.set('views', __dirname+'/views');

app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.get('/', function(req,res){
pg.connect(connect, function(err, client, done){
  if(err){
    return console.error('error fetching client',err);
  }
  client.query(`SELECT * FROM blog`,function(err, result){

    if(err){
      return console.error('error running qurey', err);
    }
    res.render('index',{blog: result.rows});
      done();
    });
  });
});

app.post('/add',function(req,res){
  pg.connect(connect, function(err, client, done){
    if(err){
      return console.error('error fetching client',err);
    }
    client.query(`INSERT INTO blog(name,topic,article,comment)VALUES($1,$2,$3,$4)`,
  [req.body.name, req.body.topic,req.body.article,req.body.comment]);
  done();
  res.redirect('/');
    });
});

app.delete('/delete/:id',function(req,res){
  pg.connect(connect, function(err, client, done){
    if(err){
      return console.error('error fetching client',err);
    }
    client.query(`DELETE FROM blog WHERE id=$1`,[req.params.id]);
  done();
  res.send(200);
    });
});

app.post('/edit',function(req,res){
  pg.connect(connect, function(err, client, done){
    if(err){
      return console.error('error fetching client',err);
    }
  client.query(`UPDATE blog SET name= $1,topic=$2, article=$3, comment=$4 WHERE id=$5`,
  [req.body.name, req.body.topic,req.body.article,req.body.comment,req.body.id]);
  done();
  res.redirect('/');
    });
});
app.post('/comment',function(req,res){
  pg.connect(connect, function(err, client, done){
    if(err){
      return console.error('error fetching client',err);
    }
    client.query(`UPDATE blog SET comment= $1 WHERE id=$2`,
  [req.body.comment,req.body.id]);
  done();
  res.redirect('/');
    });
});

//server
app.listen(process.env.PORT,function(){
  console.log('Server Started on port ');
});

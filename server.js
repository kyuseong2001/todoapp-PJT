const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.use(express.urlencoded({ extended: true }));
const MongoClient = require('mongodb').MongoClient;
app.set('view engine', 'ejs');





var db;
MongoClient.connect('mongodb+srv://kyuseong2001:edward2021@todoapp.tmnhj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useUnifiedTopology: true }, function (에러, client) {
	if (에러) return console.log(에러)
	db = client.db('todoapp');

  
	});

	app.listen(8080, function () {
		console.log('listening on 8080')
	});



// 어떤사람이 /add 경로로 post요청을 하면
// DB안에서 POST라는 콜렉션을 가져와서 인서트 원을 붙이면 내가 원하는 정보를 등록해주세요

app.post('/add', function(요청, 응답){
  응답.send('전송완료');
    console.log(요청.body.date)
    console.log(요청.body.title)

  db.collection('post').insertOne( { 제목 : 요청.body.title, 날짜 : 요청.body.date } , function(){
    console.log('저장완료')
  });
});

// 어떤사람이 /로 홈페이지를 접속했을때 index.html 사이로 보내주세요
app.get('/',function(요청,응답){
    응답.sendFile(__dirname + '/index.html')
});

app.get('/write',function(요청,응답){
    응답.sendFile(__dirname + '/write.html')
});


// db에 저장된 post라는 파일(컬렉션)안에 제목이 뭐인 데이터를 꺼내주세요
// find()만하면 모든 데이터를 가져움
// 누가 list 경로로 get요청을 하면 list.ejs 파일을 보여주세요

app.get('/list',function(요청,응답){
  db.collection('post').find().toArray(function(에러,결과){
    console.log(결과);
    응답.render('list.ejs',{posts : 결과});
  });
  // 함수밖에 결과를 쓰면 안나옴
});

// 바디파서는 body 데이터의 해석을 할수있게 도와준다
// 웹서비스의 기능을 만들고싶으면 1. ui를 만들고, 서버에서 원하는 대로 정보를 처리해주는 코딩을 하면 됨

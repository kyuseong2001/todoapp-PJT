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

        db.collection('post').insertOne( {이름 : 'John', _id : 100} , function(에러, 결과){
	    console.log('저장완료'); 
	});

	app.listen(8080, function () {
		console.log('listening on 8080')
	});
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








// 위2줄은 좀전에 설치한 라이브러리를 첨부해주세요

//8080이라는 포트에서 열어주세요
// 네트워크 통신을 하기 위한 구멍이 6만개있는데 
// 나는 8080에서 사용하겠습니다.

// 터미널 창에 node server.js 로 서버를 연다

// 나는 뷰티페이지를 보고싶어서 get 요청을 한다
// url에 /를 넣는방법은 get요청한다고 한다

// 누군가가 /pet으로 방문하면 pet관련된 안내문을 띄어줘자



// 어떤사람이 /로 홈페이지를 접속했을때 index.html 사이로 보내주세요
app.get('/',function(요청,응답){
    응답.sendFile(__dirname + '/index.html')
});

app.get('/write',function(요청,응답){
    응답.sendFile(__dirname + '/write.html')
});

app.get('/list',function(요청,응답){
  응답.render('list.ejs');
});


// 바디파서는 body 데이터의 해석을 할수있게 도와준다
// 웹서비스의 기능을 만들고싶으면 1. ui를 만들고, 서버에서 원하는 대로 정보를 처리해주는 코딩을 하면 됨

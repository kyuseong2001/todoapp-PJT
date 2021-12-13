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
// Counter : 대문자 C

app.post('/add', function(요청, 응답){
  // 누군가가 폼에 입력해서 add 라는 경로로 post요청을 하면
  // add경로에서 전송완료를 표시해준다 
  응답.send('전송완료');

  // db안에 콜렉션 폴더에서 카운터라는 파일안에 이름이 게시물 갯수라는 걸 찾아준다
  db.collection('Counter').findOne({name : '게시물갯수'}, function(에러, 결과){

    // 찾아주고난 다음 토탈포스트라는 결과의 값을 총게시물갯수라는 변수에 저장해준다
    console.log(결과.totalPost);
    var 총게시물갯수 = 결과.totalPost;
    
    // 그런다음 post라는 파일안에 id는요 위에서 저장한 변수인 총게시물갯수에서 1을 더해줄거구요, 타이틀과 날짜를 저장해주세요
    db.collection('post').insertOne( { _id : (총게시물갯수 + 1), 제목 : 요청.body.title, 날짜 : 요청.body.date } , function(){
      console.log('저장완료')
      
      // 카운터라는 변수에서  이름이 게시물갯수인것을 찾아서 1씩 인크리먼트(증가)해주세요
      // 에러가 나면 에러를 콘솔창에 표시해주세요
      db.collection('Counter').updateOne({name:'게시물갯수'}, { $inc :{totalPost:1} },function (에러,결과) {
        if(에러){return console.log(에러)}
        // updateOne({어떤데이터를 입력할지},{수정할 값}
        // set은 바꿔주세요하는 뜻임, inc : 증가시켜주세요
      })
    });
    // 카운터라는 콜렉션에 있는 토탈 포스트라는 항목도 1을 증가시켜준다(게시물의 갯수를 관리)
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





//삭제 기능

app.delete('/delete',function(요청,응답){
  console.log(요청.body);
  요청.body._id = parseInt(요청.body._id);
  db.collection('post').deleteOne(요청.body, function(에러,결과){
    console.log('삭제완료');
  })
  
});
// 문자를 숫자로 변환하는 함수 parseInt
//요청.body에  담긴 게시물의 번호를 가진 글을 DB에서 찾아서 삭제해주세요
// 콘솔로그 에 한글표시할 때 ; 기입 필요

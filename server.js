
// 2강 21/12/02 두근두근 내 첫서버에서 GET 요청을 처리해보자


// 1. 서버생성 
// 서버를 오픈하기 위한 기본 문법
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(express.urlencoded({extended: true})) 


// 위2줄은 좀전에 설치한 라이브러리를 첨부해주세요
app.listen(8080,function(){
    console.log('listening on 8080')
});
//8080이라는 포트에서 열어주세요
// 네트워크 통신을 하기 위한 구멍이 6만개있는데 
// 나는 8080에서 사용하겠습니다.

// 터미널 창에 node server.js 로 서버를 연다

// 나는 뷰티페이지를 보고싶어서 get 요청을 한다
// url에 /를 넣는방법은 get요청한다고 한다

// 누군가가 /pet으로 방문하면 pet관련된 안내문을 띄어줘자


//서버끄는 방법 ctrl + c
// 서버를 하나 만든 것임

app.get('/beauty',function(요청,응답){
    응답.send('뷰티 용품사이트입니다.')
});

// 서버를 자동으로 끄고 키게 하는 라이브러리 노드몬 설치
// 터미널창에 npm install -g nodemon 
// 다음부터는 nodemon server.js 로만 치고 엔터치면 
// 내용 수정되면 자동으로 서버를 끄고 키게 만들어 줌
// 서버를 끄는 방법은 컨트롤 + c 누르면 됨


//    '/' 는 홈페이지
// 어떤사람이 /로 홈페이지를 접속했을때 index.html 사이로 보내주세요

app.get('/',function(요청,응답){
    응답.sendFile(__dirname + '/index.html')
});

app.get('/write',function(요청,응답){
    응답.sendFile(__dirname + '/write.html')
});


// 어떤사람이 /add 경로로 post요청을 하면 ?? 경로로 해주세요

app.post('/add', function(요청,응답){
    응답.send('전송완료');  
    console.log(요청.body)
});

// 바디파서는 body 데이터의 해석을 할수있게 도와준다
// /api/new-meetup
// POST /api/new-meetup
// 서버 사이드 코드를 포함하는 함수를 정의
// 이 함수들은 라우트에 요청이 들어올 때마다 트리거 됨

// /api/new-meetup
// POST /api/new-meetup
import { MongoClient } from 'mongodb';

const config = require('../../config/key');

async function handler(req, res) {
  // 1. 요청이 들어오면
  if (req.method === 'POST') {
    const data = req.body;

    // 데이터베이스에 저장
    const client = await MongoClient.connect(config.mongoURI);

    const db = client.db(); // meetups에 연결 중인 데이터베이스를 확보

    // 컬렉션은 SQL 데이터베이스에 있는 tables이고 문서는 해당 tables의 항목
    // 다시 말해, 여러 문서를 보관하고 있는 컬렉션을 가지게 되는 것
    const meetupsCollection = db.collection('meetups');

    // 2. 데이터베이스에 데이터를 저장
    // 컬렉션에 새 문서를 삽입하기 위해 구축된 query 명령 중 하나인 insertOne을 호출
    // MongoDB의 훌륭하나 점은 문서가 결국 javascript object라는 것 =>
    // const { title, image, address, description } = data;
    const result = await meetupsCollection.insertOne(data); // await -> promise 반환
    // 오류 처리 추가하여 연결이나 삽입하는데 실패하는 경우를 처리
    client.close(); // 데이터베이스 연결을 차단

    // 3. 응답 객체로 다시 응답을 보내야 함
    // 201 - 데이터가 성공적으로 삽입되었음을 나타냄
    res.status(201).json({ message: 'Meetup inserted!' });
  }
}

export default handler;

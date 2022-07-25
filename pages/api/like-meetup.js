import { MongoClient, ObjectId } from 'mongodb';

const config = require('../../config/key');

async function handler(req, res) {
  // 1. 요청이 들어오면
  if (req.method === 'POST') {
    const data = req.body;

    const client = await MongoClient.connect(config.mongoURI);

    const db = client.db(); // meetups에 연결 중인 데이터베이스를 확보

    // 컬렉션은 SQL 데이터베이스에 있는 tables이고 문서는 해당 tables의 항목
    // 다시 말해, 여러 문서를 보관하고 있는 컬렉션을 가지게 되는 것
    const meetupsCollection = db.collection('meetups');

    // 2. 데이터베이스에 데이터를 저장
    // 컬렉션에 새 문서를 삽입하기 위해 구축된 query 명령 중 하나인 insertOne을 호출
    // MongoDB의 훌륭하나 점은 문서가 결국 javascript object라는 것 =>
    const { id, likes } = data;
    const result = await meetupsCollection.updateOne(
      { _id: ObjectId(id) },
      {
        $set: { likes: likes + 1 },
        // $currentDate: { lastModified: true }
      }
    );

    // 오류 처리 추가하여 연결이나 삽입하는데 실패하는 경우를 처리
    client.close(); // 데이터베이스 연결을 차단

    res.status(201).json({ message: 'like :>' });
  }
}

export default handler;

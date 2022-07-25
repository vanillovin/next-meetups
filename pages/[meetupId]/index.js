import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';

import MeetupDetail from '../../components/meetups/MeetupDetail';

const config = require('../../config/key');

function MeetupDetails(props) {
  async function likeMeetupHandler(meetupData) {
    const response = await fetch('/api/like-meetup', {
      method: 'POST',
      body: JSON.stringify(meetupData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
  }

  return (
    <>
      <Head>
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        {...props.meetupData}
        likeMeetupHandler={likeMeetupHandler}
      />
    </>
  );
}

// getStaticProps 페이지가 빌드 프로세스 중에 미리 생성(pre generated) 됐음
// 모든 동적 세그먼트 밸류가 있는 객체를 리턴하는 역할. 이 경우엔 모든 미트업 ID
// 페이지가 프리 제너레이트 되어야 함
export async function getStaticPaths() {
  const client = await MongoClient.connect(config.mongoURI);
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  // 필터기준은없지만모든문서가추출되어야하는필드를정의하는두번째argument
  // _id:1은 ID만포함하고다른필드값은포함하지않는다는뜻
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  console.log('MeetupDetials meetups', meetups);
  client.close(); // 연결 끊기
  return {
    // paths 배열이 모든 지원되는 매개변수를 저장할지 아니면 일부만 저장할지
    fallback: false, // 404
    // 동적 페이지 버전당 객체가 하나
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
    // [
    //   {
    //     params: {
    //       meetupId: 'm1'
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: 'm2'
    //     },
    //   }
    // ]
  };
}

// better then gssp
export async function getStaticProps(context) {
  // fetch data for a single meetup
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(
    'mongodb+srv://serenity:sserenityy@cluster0.ewnzr.mongodb.net/meetups?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  client.close(); // 연결 끊기
  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
        time: selectedMeetup.time,
        likes: selectedMeetup.likes,
      },
    },
  };
}

export default MeetupDetails;

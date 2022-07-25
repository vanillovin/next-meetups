import { MongoClient } from 'mongodb';
import Head from 'next/head';

import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A First Meetup',
    image:
      'https://images.unsplash.com/photo-1553846830-8fb467fe2453?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxN3x8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    address: 'Some address 5, 12345 Some City',
    description: 'This is a first meetup!',
  },
  {
    id: 'm2',
    title: 'A Second Meetup',
    image:
      'https://images.unsplash.com/photo-1645642175546-cb74e77d35d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=60',
    address: 'Some address 10, 12345 Some City',
    description: 'This is a second meetup!',
  },
];

const config = require('../config/key');

function Home({ meetups }) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={meetups.sort((a, b) => b.time - a.time)} />
    </>
  );
}

// build time 동안에만 서버에서 실행되고 클라이언트에서 절대 실행되지 않음
// 그러므로 여기 코드는 클라이언트에게 노출되지 않음
export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(config.mongoURI);
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  // find - 기본적으로 해당 컬랙션에 모든 문서를 찾음
  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
        time: meetup.time,
      })),
    },
    revalidate: 1,
  };
}

export default Home;

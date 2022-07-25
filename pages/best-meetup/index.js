import { MongoClient } from 'mongodb';
import Head from 'next/head';

import MeetupList from '../../components/meetups/MeetupList';

const config = require('../../config/key');

function Home({ meetups }) {
  return (
    <>
      <Head>
        <title>Best Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups!"
        />
      </Head>
      <MeetupList meetups={meetups.sort((a, b) => b.likes - a.likes)} />
    </>
  );
}

export async function getStaticProps() {
  // fetch data from an API
  const client = await MongoClient.connect(config.mongoURI);
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
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
        likes: meetup.likes,
      })),
    },
    revalidate: 1,
  };
}

export default Home;

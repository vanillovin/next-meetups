import { useState } from 'react';
import SearchForm from '../SearchForm';
import MeetupItem from './MeetupItem';

function MeetupList({ meetups }) {
  const [searchValue, setSearchValue] = useState('');
  const filteredPosts = meetups.filter((post) =>
    post.title.toLowerCase().includes(searchValue.toLowerCase())
  );
  const results = searchValue ? filteredPosts : meetups;

  return (
    <>
      <SearchForm onChange={(e) => setSearchValue(e.target.value)} />
      <ul className={`list-none m-0 p-0`}>
        {results.map((meetup) => (
          <MeetupItem
            key={meetup.id}
            time={meetups.time}
            id={meetup.id}
            image={meetup.image}
            title={meetup.title}
            address={meetup.address}
          />
        ))}
      </ul>
    </>
  );
}

export default MeetupList;

import { useRef } from 'react';

import Card from '../ui/Card';
import classes from './NewMeetupForm.module.css';

function NewMeetupForm({ onAddMeetup }) {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const addressInputRef = useRef();
  const descriptionInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const meetupData = {
      time: new Date().getTime(),
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
      likes: 0,
    };

    onAddMeetup(meetupData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        {[
          ['title', titleInputRef],
          ['image', imageInputRef],
          ['address', addressInputRef],
          ['description', descriptionInputRef],
        ].map(([item, ref], i) => (
          <div key={i} className={classes.control}>
            <label htmlFor={item}>Meetup {item}</label>
            <input
              type="text"
              required
              id={item}
              ref={ref}
              defaultValue={
                item === 'image'
                  ? 'https://images.unsplash.com/photo-1621799754526-a0d52c49fad5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
                  : ''
              }
            />
          </div>
        ))}
        <button
          className={`border rounded-sm py-1 px-2 bg-stone-200 hover:bg-opacity-70 mt-3`}
          type="submit"
        >
          Add Meetup
        </button>
      </form>
    </Card>
  );
}

export default NewMeetupForm;

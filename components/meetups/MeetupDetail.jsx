// classes는 자바스크립트 객체
// import classes from './MeetupDetail.module.css';

const getDateString = (time) => new Date(time).toLocaleString();

function MeetupDetail({
  id,
  time,
  title,
  image,
  address,
  description,
  likes,
  likeMeetupHandler,
}) {
  return (
    <section className={`text-center`}>
      <img className="w-full" src={image} alt={title} />
      <h1>{title}</h1>
      <address>{address}</address>
      <p>{description}</p>
      <p>{getDateString(time)}</p>
      <button onClick={() => likeMeetupHandler({ id, likes })}>
        ♥ {likes}
      </button>
    </section>
  );
}

export default MeetupDetail;

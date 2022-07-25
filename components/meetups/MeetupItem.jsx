import Image from 'next/image';
import { useRouter } from 'next/router';

import Card from '../ui/Card';

function MeetupItem({ id, title, addresss, image }) {
  const router = useRouter();

  const showDetailHandler = () => router.push(`/${id}`);

  return (
    <li className={`my-4 mx-0`}>
      <Card>
        <div className="w-full h-80 overflow-hidden rounded-t-lg">
          <img
            className="w-full object-cover hover:scale-110 hover:transition-all"
            src={image}
            alt={title}
          />
        </div>
        <div className="text-center p-4">
          <h3 className="text-xl text-gray-800">{title}</h3>
          <address>{addresss}</address>
        </div>
        <div className="pt-2 pb-6 text-center">
          <button
            className={`cursor-pointer border py-1 px-4 rounded-2xl text-sm
                      hover:bg-gray-400 hover:transition-all hover:text-white`}
            onClick={showDetailHandler}
          >
            Show Details
          </button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;

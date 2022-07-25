import Link from 'next/link';

function MainNavigation() {
  return (
    <header
      className="py-5 px-10 text-white flex justify-between items-center
                bg-gradient-to-r from-red-200 via-yellow-100 to-indigo-200"
    >
      <div className="text-2xl font-bold">
        <Link href="/">Meetups</Link>
      </div>
      <nav>
        <ul className="flex font-bold hover:transition-opacity">
          <li className="mr-4 hover:opacity-70">
            <Link href="/best-meetup">Best Meetups</Link>
          </li>
          <li className="mr-4 hover:opacity-70">
            <Link href="/">All Meetups</Link>
          </li>
          <li className="hover:opacity-70">
            <Link href="/new-meetup">Add New Meetup</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;

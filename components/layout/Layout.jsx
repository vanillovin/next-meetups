import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';

function Layout(props) {
  return (
    <div>
      <MainNavigation />
      <main className={`my-12 mx-auto w-4/5 max-w-2xl`}>{props.children}</main>
    </div>
  );
}

export default Layout;

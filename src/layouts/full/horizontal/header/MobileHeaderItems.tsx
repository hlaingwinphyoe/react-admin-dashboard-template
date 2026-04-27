import Notifications from './Notifications';
import Profile from './Profile';

const MobileHeaderItems = () => {
  return (
    <nav className="flex-1 rounded-none bg-background px-9">
      <div className="xl:hidden block w-full">
        <div className="flex justify-center items-center">
          <Notifications />

          <Profile />
        </div>
      </div>
    </nav>
  );
};

export default MobileHeaderItems;

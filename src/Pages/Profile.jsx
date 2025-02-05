import { UserProfile } from '@clerk/clerk-react';

const Profile = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-6">
      <div className="w-full max-w-full bg-white rounded-xl shadow-lg">
        <UserProfile />
      </div>
    </div>
  );
};

export default Profile;

import { t } from 'i18next';
import ChangeEmail from './ChangeEmail/ChangeEmail';
import ChangePassword from './ChangePassword/ChangePassword';
import DeleteProfile from './DeleteProfile/DeleteProfile';


const Profile = () => {

  return (
    <div className='flex flex-col items-center'>
      <div className="w-full max-w-3xl py-10">
        <div className='w-full'>
          <h2 className="text-3xl font-bold mb-6 pl-4">{t('profile.title')}</h2>
        </div>
      
        <ChangeEmail />

        <ChangePassword />

        <DeleteProfile />

      </div>
    </div>
  )
}

export default Profile

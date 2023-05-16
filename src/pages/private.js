import withAuth from '@/components/auth/withAuth';
import { useUser } from '@/components/auth/useUser';

const Private = () => {
  const { user, logout } = useUser();
  console.log(user);

  return (
    <div >
      {
        user?.email &&
        <div>
          <div className='event-title'>Hi, <i>{user.email}</i></div>
          <div className='event-title'>Glad to see you here!</div>
          <button onClick={() => logout()}>Logout</button>
        </div> 
      }
    </div>
  )
}

export default withAuth(Private);
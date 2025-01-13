import { Outlet } from 'react-router-dom';
import Logo from '../components/Logo';

function App() {
  return (
    <>
      <header className='bg-gray-700 p-2'>
        <div className='max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center'>
          <div className='w-32'>
            <Logo />
          </div>
        </div>
      </header>
      <Outlet />
    </>
  );
}

export default App;

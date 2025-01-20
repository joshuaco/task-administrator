import { Toaster } from 'sonner';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';

function App() {
  return (
    <>
      <header className='bg-gray-700 p-2'>
        <Navbar />
      </header>

      <section className='max-w-screen-2xl mx-auto py-4 px-8'>
        <Outlet />
      </section>

      <footer className='py-5'>
        <p className='text-center'>
          &copy; {new Date().getFullYear()} UpTask. All rights reserved.
        </p>
      </footer>

      <Toaster richColors position='top-right' />
    </>
  );
}

export default App;

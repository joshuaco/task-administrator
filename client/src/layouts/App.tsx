import { AuthProvider } from '@/context/AuthContext';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from '@/components/Navbar';

function App() {
  return (
    <AuthProvider>
      <>
        <header className='bg-gray-700 p-2'>
          <Navbar />
        </header>

        <main className='max-w-screen-2xl mx-auto py-4 px-8'>
          <Outlet />
        </main>

        <footer className='py-5'>
          <p className='text-center'>
            &copy; {new Date().getFullYear()} UpTask. All rights reserved.
          </p>
        </footer>

        <Toaster richColors position='top-right' />
      </>
    </AuthProvider>
  );
}

export default App;

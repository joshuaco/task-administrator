import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateProject from '@/pages/projects/CreateProject';
import App from '@/layouts/App';
import Home from '@/pages/Home';

function router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path='/' element={<Home />} index />
          <Route path='/projects/create' element={<CreateProject />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default router;

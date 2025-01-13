import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './layouts/App';
import Home from './pages/Home';

function router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path='/' element={<Home />} index />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default router;

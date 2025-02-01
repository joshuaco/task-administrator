import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProjectDetails from '@/pages/projects/ProjectDetails';
import CreateProject from '@/pages/projects/CreateProject';
import EditProject from '@/pages/projects/EditProject';
import TasksView from '@/pages/tasks/TasksView';
import App from '@/layouts/App';
import Home from '@/pages/Home';

function router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path='/' element={<Home />} index />
          <Route path='/projects/create' element={<CreateProject />} />
          <Route path='/projects/:projectId' element={<ProjectDetails />} />
          <Route path='/projects/:projectId/edit' element={<EditProject />} />
          <Route path='/projects/:projectId/tasks' element={<TasksView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default router;

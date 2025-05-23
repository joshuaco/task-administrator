import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@/components/routes/ProtectedRoute';
import ChangePasswordView from './pages/profile/ChangePasswordView';
import ForgotPasswordView from '@/pages/auth/ForgotPasswordView';
import ResetPasswordView from '@/pages/auth/ResetPasswordView';
import ProjectDetails from '@/pages/projects/ProjectDetails';
import CreateProject from '@/pages/projects/CreateProject';
import ConfirmAccount from '@/pages/auth/ConfirmAccount';
import EditProject from '@/pages/projects/EditProject';
import ProfileView from './pages/profile/ProfileView';
import TasksView from '@/pages/tasks/TasksView';
import Register from '@/pages/auth/Register';
import NotFound from './pages/404/NotFound';
import Profile from './layouts/Profile';
import Login from '@/pages/auth/Login';
import Auth from '@/layouts/Auth';
import App from '@/layouts/App';
import Home from '@/pages/Home';

function router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <App />
            </ProtectedRoute>
          }
        >
          <Route path='/' element={<Home />} index />
          <Route path='/projects/create' element={<CreateProject />} />
          <Route path='/projects/:projectId' element={<ProjectDetails />} />
          <Route path='/projects/:projectId/edit' element={<EditProject />} />
          <Route path='/projects/:projectId/tasks' element={<TasksView />} />
          <Route element={<Profile />}>
            <Route path='/profile/password' element={<ChangePasswordView />} />
            <Route path='/profile' element={<ProfileView />} />
          </Route>
        </Route>

        <Route element={<Auth />}>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/auth/confirm-account' element={<ConfirmAccount />} />
          <Route path='/auth/reset-password' element={<ResetPasswordView />} />
          <Route
            path='/auth/forgot-password'
            element={<ForgotPasswordView />}
          />
        </Route>

        <Route element={<Auth />}>
          <Route path='/404' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default router;

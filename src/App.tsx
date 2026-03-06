import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Onboarding from './pages/Onboarding';
import ProfilePage from './pages/ProfilePage';
import AuthPage from './pages/AuthPage';
import AccountPage from './pages/AccountPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='/onboarding' element={<Onboarding />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/auth/:pathname' element={<AuthPage />} />
        <Route path='/auth/:pathname' element={<AccountPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

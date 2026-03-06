import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Onboarding from './pages/Onboarding';
import ProfilePage from './pages/ProfilePage';
import AuthPage from './pages/AuthPage';
import AccountPage from './pages/AccountPage';
import Navbar from './components/layout/Navbar';
import { NeonAuthUIProvider } from '@neondatabase/neon-js/auth/react';
import { authClient } from './lib/auth';
import AuthProvider from './context/AuthContext';

const App = () => {
  return (
    <NeonAuthUIProvider authClient={authClient} defaultTheme='dark'>
      <AuthProvider>
        <BrowserRouter>
          <div className='min-h-screen flex flex-col'>
            <Navbar />
            <main className='flex-1'>
              <Routes>
                <Route index element={<HomePage />} />
                <Route path='/onboarding' element={<Onboarding />} />
                <Route path='/profile' element={<ProfilePage />} />
                <Route path='/auth/:pathname' element={<AuthPage />} />
                <Route path='/auth/:pathname' element={<AccountPage />} />
              </Routes>
            </main>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </NeonAuthUIProvider>
  );
};

export default App;

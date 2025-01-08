import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from './pages/Layout';
import LandingPage from '@/pages/landing/index';
import SignUpPage from './pages/sign-up';
import { ModalProvider } from './contexts/ModalContext';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <ModalProvider>
          <Routes>
            {/* 네비바 포함안됨 */}
            <Route index element={<LandingPage />} />
            <Route path="/signup/*" element={<SignUpPage />} />

            {/* 네비바 포함함 */}
            <Route path="/*" element={<Layout />}>
              {/* <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} /> */}
            </Route>
          </Routes>
        </ModalProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import LandingPage from '@/pages/landing/index';
import KakaoLoginLoading from './components/landing/KakaoLoginLoading';
import SignUpPage from './pages/sign-up';
import { ModalProvider } from './contexts/ModalContext';
import HomePage from '@/pages/home';
import NotFoundPage from '@/pages/NotFound';
import Layout from '@/pages/Layout';
import MyPage from '@/pages/my-page';
import ManualMatchingRegister from '@/pages/manual-register';
import ManualMatchingDetailPage from '@/pages/manual-matching-detail';
import { ToastProvider } from '@/contexts/ToastContext';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <ToastProvider>
          <ModalProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<LandingPage />} />
                <Route
                  path="home/manual-register"
                  element={<ManualMatchingRegister />}
                />
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/kakao/callback" element={<KakaoLoginLoading />} />
                <Route path="/signup/*" element={<SignUpPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/mypage/*" element={<MyPage />} />
                <Route
                  path="home/manual-matching-detail/:id"
                  element={<ManualMatchingDetailPage />}
                />
                <Route path="/*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </ModalProvider>
        </ToastProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

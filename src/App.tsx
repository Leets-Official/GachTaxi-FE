import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import LandingPage from '@/pages/landing/index';
import KakaoLoginLoading from './components/landing/KakaoLoginLoading';
import SignUpPage from '@/pages/sign-up';
import { ModalProvider } from './contexts/ModalContext';
import HomePage from '@/pages/home';
import NotFoundPage from '@/pages/NotFound';
import Layout from '@/pages/Layout';
import MyPage from '@/pages/my-page';
import ManualMatchingRegister from '@/pages/manual-register';
import { ToastProvider } from '@/contexts/ToastContext';
import ChatPage from '@/pages/chat';
import FriendRequestPage from '@/pages/friend-request';
import NotificationPage from '@/pages/notification';
import ProtectRoute from '@/pages/ProtectRoute';
import GoogleLoginLoading from '@/components/landing/GoogleLoginLoading';
import CallTaxi from '@/pages/chat/CallTaxi';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
      <BrowserRouter>
        <ToastProvider>
          <ModalProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                {/** 로그인 불필요 라우트 */}
                <Route index element={<LandingPage />} />
                <Route path="*" element={<NotFoundPage />} />
                <Route path="/kakao/callback" element={<KakaoLoginLoading />} />
                <Route
                  path="/google/callback"
                  element={<GoogleLoginLoading />}
                />
                {/** 로그인이 필요한 라우트 */}
                <Route
                  path="home/manual-register"
                  element={
                    <ProtectRoute isPrivate>
                      <ManualMatchingRegister />
                    </ProtectRoute>
                  }
                />
                <Route
                  path="/signup/*"
                  element={
                    <ProtectRoute>
                      <SignUpPage />
                    </ProtectRoute>
                  }
                />
                <Route
                  path="/home"
                  element={
                    <ProtectRoute isPrivate>
                      <HomePage />
                    </ProtectRoute>
                  }
                />
                <Route
                  path="/mypage/*"
                  element={
                    <ProtectRoute isPrivate>
                      <MyPage />
                    </ProtectRoute>
                  }
                />
                <Route
                  path="home/friend-request"
                  element={
                    <ProtectRoute isPrivate>
                      <FriendRequestPage />
                    </ProtectRoute>
                  }
                />
                <Route
                  path="/notification"
                  element={
                    <ProtectRoute isPrivate>
                      <NotificationPage />
                    </ProtectRoute>
                  }
                />
                <Route
                  path="chat/:id"
                  element={
                    <ProtectRoute isPrivate>
                      <ChatPage />
                    </ProtectRoute>
                  }
                />
                <Route
                  path="call-taxi"
                  element={
                    <ProtectRoute isPrivate>
                      <CallTaxi />
                    </ProtectRoute>
                  }
                />
              </Route>
            </Routes>
          </ModalProvider>
        </ToastProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

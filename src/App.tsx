import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from './pages/Layout';
import SignUpPage from './pages/sign-up';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          {/* 레이아웃 라우트 */}
          <Route path="/">
            <Route index element={<Layout />} />
          </Route>
          {/* 회원가입 라우트 */}
          <Route path="/signup/*" element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;

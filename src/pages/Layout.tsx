import GoogleSocialLogin from '../components/oauth/GoogleSocialLogin';
import { GoogleOAuthProvider } from '@react-oauth/google';

const Layout = () => {
  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  return (
    <div>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <GoogleSocialLogin />
      </GoogleOAuthProvider>
    </div>
  );
};

export default Layout;

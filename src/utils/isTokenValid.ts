import { jwtDecode, JwtPayload } from 'jwt-decode';

const isTokenValid = (token: string) => {
  const decoded: JwtPayload = jwtDecode(token);
  if (decoded) {
    return true;
  } else {
    return false;
  }
};

export default isTokenValid;

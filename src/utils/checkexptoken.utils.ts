import { jwtDecode as jwtDecode2 } from "jwt-decode";
import { LOGIN_SESSION } from "../extraStorage/storageStore";

export const checkExpiredToken = (): boolean => {
  const storedData = localStorage.getItem(LOGIN_SESSION);
  if (storedData) {
    // Decode the token
    const parsedData = JSON.parse(storedData);
    const decodedToken = jwtDecode2(parsedData?.serverResponse?.data?.token);

    // Check if the token has expired
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const expirationTimestamp = decodedToken.exp;

    if (expirationTimestamp) {
      if (currentTimestamp > expirationTimestamp) {
        // The token has expired
        return true;
      } else {
        // The token is still valid
        return false;
      }
    }
  }
  return true;
};

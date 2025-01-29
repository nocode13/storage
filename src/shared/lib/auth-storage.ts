import { User } from '~/shared/api/types';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY } from '~/shared/config/local-storage';
import { getParsedItem, setItemSafely } from '~/shared/lib/local-storage';

class AuthStorageService {
  setAccessToken(token: string) {
    setItemSafely(ACCESS_TOKEN_KEY, token);
  }

  getAccessToken() {
    return <string | null>getParsedItem(ACCESS_TOKEN_KEY);
  }

  removeAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  setRefreshToken(token: string) {
    setItemSafely(REFRESH_TOKEN_KEY, token);
  }

  getRefreshToken() {
    return <string | null>getParsedItem(REFRESH_TOKEN_KEY);
  }

  removeRefreshToken() {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  }

  setUser(user: User) {
    setItemSafely(USER_KEY, user);
  }

  getUser(): User | null {
    return <User | null>getParsedItem(USER_KEY);
  }

  removeUser() {
    localStorage.removeItem(USER_KEY);
  }

  removeTokens() {
    this.removeAccessToken();
    this.removeRefreshToken();
  }
}

export const authStorageService = new AuthStorageService();

import LOCAL_STORAGE_KEYS from "@constants/localStorage";

type TCredentials = { accessToken: string };

interface IAccessTokenProps {
  setAccessToken: (token: TCredentials) => void;
  getAccessToken: () => TCredentials | null;
  clearAccessToken: () => void;
}

export const useAccessToken: IAccessTokenProps = {
  getAccessToken: () => {
    const [accessToken] = [
      localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN),
    ];

    return { accessToken } as Record<keyof TCredentials, string>;
  },
  setAccessToken: (tokens: TCredentials) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken);
  },
  clearAccessToken: () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
  },
};

import { useState, createContext, useContext, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GrimList from './pages/DiaryList/GrimListPage';
import WriteGrim from './pages/WriteDiary/WriteGrimPage';
import Main from './pages/Main/NonMemberMainPage';
import AfterLogin from './pages/Main/MemberMainPage';
import SignIn from './pages/Auth/SignIn/SignInPage';
import SignUp from './pages/Auth/SignUp/SignUpPage';
import DiarySearchList from './pages/Search/DiarySearchPage';
import PrivatePages from './pages/Auth/components/PrivatePages';
import PublicPages from './pages/Auth/components/PublicPages';
import ErrorPage from './pages/ErrorPage';
import Root from './pages/Root';
import Navbar from './components/Navbar';
import { GlobalStyle } from './theme/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme/theme';
import Introduce from './pages/Introduce';

export type ThemeType = 'blueTheme' | 'rainbowTheme' | 'originTheme';

interface ThemeContextType {
  themeType: ThemeType;
  changeThemeType: (type: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  themeType: 'originTheme',
  changeThemeType: (type: ThemeType) => {},
});

export const useThemeContext = () => {
  return useContext(ThemeContext);
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <PublicPages Component={Navbar} restricted={false} />,
        children: [
          { path: '/', element: <PublicPages Component={Main} restricted /> },
          {
            path: '/signin',
            element: <PublicPages Component={SignIn} restricted />,
          },
          {
            path: '/signup',
            element: <PublicPages Component={SignUp} restricted />,
          },
          { path: '/write', element: <PrivatePages Component={WriteGrim} /> },
          {
            path: '/introduce',
            element: <PublicPages Component={Introduce} restricted={false} />,
          },
          { path: 'main', element: <PrivatePages Component={AfterLogin} /> },
          { path: 'list', element: <PrivatePages Component={GrimList} /> },
          { path: '/search/:word', element: <DiarySearchList /> },
        ],
      },
    ],
  },
]);

function App() {
  // window.Kakao.init(import.meta.env.REACT_APP_KAKAO_KEY);
  const [themeType, setTheme] = useState<ThemeType>('originTheme');
  const changeThemeType = (type: ThemeType) => {
    setTheme(type);
  };
  useEffect(() => {
    if (sessionStorage.getItem('theme')) {
      const currentTheme = sessionStorage.getItem('theme');
      switch (currentTheme) {
        case 'BLUE': {
          changeThemeType('blueTheme');
          break;
        }
        case 'RAINBOW': {
          changeThemeType('rainbowTheme');
          break;
        }
        case 'ORIGINAL': {
          changeThemeType('originTheme');
          break;
        }
      }
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ themeType, changeThemeType }}>
      <ThemeProvider theme={theme[themeType] || theme['originTheme']}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;

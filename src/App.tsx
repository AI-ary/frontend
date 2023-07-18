import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import GrimList from './pages/DiaryList/GrimListPage';
import WriteGrim from './pages/WriteDiary/WriteGrimPage';
import Main from './pages/Main/NonMemberMainPage';
import AfterLogin from './pages/Main/MemberMainPage';
import SignIn from './pages/Auth/SignIn/SignInPage';
import SignUp from './pages/Auth/SignUp/SignUpPage';
import Manual from './pages/Manual/ManualPage';
import DiarySearchList from './pages/Search/DiarySearchPage';
import PrivatePages from './pages/Auth/components/PrivatePages';
import PublicPages from './pages/Auth/components/PublicPages';
import ErrorPage from './pages/ErrorPage';
import { createTheme, ThemeProvider } from '@material-ui/core';
import Root from './pages/Root';
import Navbar from './components/Navbar';

const theme = createTheme({
  typography: {
    fontFamily:'KyoboHand'
  }
})

const router= createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {path:'/', element:<PublicPages Component={Main} restricted/>},
      {path:'/signin', element:<PublicPages Component={SignIn} restricted/>},
      {path:'/signup', element:<PublicPages Component={SignUp} restricted/>},
      {path:'/write', element:<PrivatePages Component={WriteGrim}/>},
      {path:'/write', element:<WriteGrim />},
      {
        path:'/', element:<PrivatePages Component={Navbar} />,
        children:[
          {path:'main', element:<PrivatePages Component={AfterLogin} />},
          {path:'about', element:<PublicPages Component={Manual} restricted />},
          {path:'list', element:<PrivatePages Component={GrimList}/>},
          {path:'/search/:word', element:<DiarySearchList />}
        ]
      }
    ]
  }
])

function App() {
  // window.Kakao.init(import.meta.env.REACT_APP_KAKAO_KEY);
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
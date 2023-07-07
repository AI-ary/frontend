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
    element: <Navbar />,
    errorElement: <ErrorPage />,
    children: [
      {path:'/', element:<PublicPages Component={Main} restricted/>},
      {path:'main', element:<AfterLogin />},
      {path:'signin', element:<PublicPages Component={SignIn} restricted/>},
      {path:'signup', element:<PublicPages Component={SignUp} restricted/>},
      // {path:'/write', element:<PrivatePages Component={WriteGrim}/>},
      // {path:'/list', element:<PrivatePages Component={GrimList}/>},
      {path:'list', element:<GrimList />},
      {path:'search/:word', element:<DiarySearchList />},
      {path:'write', element:<WriteGrim />},
      {path:'about',element:<Manual />}
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
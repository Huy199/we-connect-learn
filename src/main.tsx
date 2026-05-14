import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ModalProvider from './context/ModalProvider.tsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { ThemeProvider } from '@emotion/react'
import { theme } from './configs/muiConfig.ts'
import RootLayout from './pages/RootLayout.tsx'
import LoginPage from './pages/auth/LoginPage.tsx'
import AuthLayout from './pages/auth/AuthLayout.tsx';
import { store } from './redux/store.ts';
import { Provider } from 'react-redux';
import RegisterPage from './pages/auth/RegisterPage.tsx';


const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "/login",
            element: <LoginPage />
          },
          {
            path: "/register",
            element: <RegisterPage />
          }
        ]
      }
    ]
  },
  {
    path: "/home",
    element: <>home</>
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ModalProvider>
          <RouterProvider router={router} />
        </ModalProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>,
)

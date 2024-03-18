import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from '../Pages/ErrorPage';
import RootLayout from '../Pages/RootLayout';
import FrontPage from '../Pages/FrontPage';
import SearchPage from '../Pages/SearchPage';

const router = createBrowserRouter([{
    path: '/',
    element: <RootLayout/>,
    errorElement: <ErrorPage />,
    children: [
        { index: true, element: <FrontPage /> },
        {path: '/search', element: <SearchPage />}
    ]
}]);

const AppRouterProvider = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default AppRouterProvider


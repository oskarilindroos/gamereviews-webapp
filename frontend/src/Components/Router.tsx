import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from '../Pages/ErrorPage';
import Placeholder from '../Pages/Placeholder';
import RootLayout from '../Pages/RootLayout';
import FrontPage from '../Pages/FrontPage';

const router = createBrowserRouter([{
    path: '/',
    element: <RootLayout/>,
    errorElement: <ErrorPage />,
    children: [
        { index: true, element: <FrontPage /> },
    ]
}]);

const AppRouterProvider = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default AppRouterProvider


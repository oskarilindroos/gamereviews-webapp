import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from '../Pages/ErrorPage';
import Placeholder from '../Pages/Placeholder';

const router = createBrowserRouter([{
    path: '/',
    errorElement: <ErrorPage />,
    children: [
        { index: true, element: <Placeholder /> },
    ]
}]);

const AppRouterProvider = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default AppRouterProvider


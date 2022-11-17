import Pages from '../pages';

export const ROUTES = {
    MAIN: {
        path: '/',
        element: <Pages.Main />,
        errorElement: <Pages.NotFound />
    },
    LOGIN: {
        path: '/login',
        element: <Pages.Login />,
    }
}
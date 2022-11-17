import { Routes, Route } from 'react-router-dom';
import Layout from '../layout';
import { ROUTES } from './routes';

export const Router = () => {
    return (
        <Routes>
            <Route element={<Layout.Global />}>
                {Object.values(ROUTES).map((route) => <Route {...route} />)}
            </Route>
        </Routes>
    )
}
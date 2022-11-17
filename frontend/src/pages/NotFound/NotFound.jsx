import { useRouteError } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

export const NotFound = () => {
    const error = useRouteError();
    return (
        <>
            <h1>{error.message}</h1>
            <Alert variant="danger">
                Здесь, к сожалению, ничего нет
            </Alert>
        </>
    )
}
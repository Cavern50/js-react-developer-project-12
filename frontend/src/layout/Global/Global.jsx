import GlobalComponents from './components';
import { Outlet } from "react-router-dom";
import './Global.style.css';

export const Global = () => {
    return (
        <div className="globalLayout">
            <GlobalComponents.Header />
            <div className='globalPaper'>
                <Outlet />
            </div>
            <GlobalComponents.Footer />
        </div>
    )
}
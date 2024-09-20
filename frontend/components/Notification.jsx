// Notification.jsx

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Notification({ children }) { // Destructure children
    return (
        <div>
            <ToastContainer />
            {children}
        </div>
    );
}

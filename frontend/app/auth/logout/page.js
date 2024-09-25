"use client"
import { useEffect } from 'react';


export default function Page() {


    useEffect(() => {
        // Clear local storage
        localStorage.clear();
        // Redirect to the login page
        window.location.href = '/auth/login';
    }, []);

    return (
        <div></div>
    );
}

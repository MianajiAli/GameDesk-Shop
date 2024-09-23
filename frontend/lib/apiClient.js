"use client";

import { toast } from 'react-toastify';
const apiClient = async (url, method = 'GET', body = null, token) => {
    const options = {
        method,
        headers: {
            'Authorization': `Bearer ${token}`, // Add token to headers
            'Content-Type': 'application/json',
        },
    };

    if (body) {
        options.body = JSON.stringify(body); // Stringify the body if it's provided
    }

    try {
        const response = await fetch(`http://localhost:8000${url}`, options);
        const status = { code: response.status, ok: response.ok }; // Capture the status code

        // Handle specific response statuses
        switch (status.code) {
            case 401:
                if (window.location.pathname !== '/auth/login' && window.location.pathname !== '/auth/register') {
                    // The user is not on the login or register page
                    console.log("User is not on /auth/login or /auth/register");
                    window.location.href = '/auth/login';
                }
            case 503:
                toast.error('Service Unavailable');
                return { error: 'Service Unavailable', status };
            default:
                // Try to parse the response body as JSON
                try {
                    const data = await response.json();

                    return { data, status };
                } catch (jsonError) {
                    return { error: 'Failed to parse JSON response', status };
                }
        }
    } catch (error) {
        toast.error(`Fetch Error: ${error.message}`);
        return { error: error.message, status: 'unknown' };
    }
};

export default apiClient; // Ensure this is a default export

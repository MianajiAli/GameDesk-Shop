// apiClient.js
"use client";

import { toast } from 'react-toastify';

export default async function apiClient(url, method = 'GET', body = null) {
    const token = localStorage.getItem('authToken');

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

        if (response.ok) {
            return await response.json(); // Return the response data as JSON
        } else {
            // Handle specific response statuses
            switch (response.status) {
                case 400:
                    toast.error('Bad Request');
                    return { error: 'Bad Request' };
                case 403:
                    toast.error('Forbidden');
                    return { error: 'Forbidden' };
                case 404:
                    toast.error('Not Found');
                    return { error: 'Not Found' };
                case 500:
                    toast.error('Internal Server Error');
                    return { error: 'Internal Server Error' };
                case 503:
                    toast.error('Service Unavailable');
                    return { error: 'Service Unavailable' };
                default:
                    throw new Error('Network response was not ok.');
            }
        }
    } catch (error) {
        toast.error(`Error: ${error.message}`);
        return { error: error.message };
    }
}

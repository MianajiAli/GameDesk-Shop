"use client";

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

    const response = await fetch(`http://localhost:8000${url}`, options);

    switch (response.status) {
        case 200:
            break
        case 201:
            break
        case 400:
            return { error: 'Bad Request' };
        case 403:
            return { error: 'Forbidden' };
        case 404:
            return { error: 'Not Found' };
        case 500:
            return { error: 'Internal Server Error' };
        case 503:
            return { error: 'Service Unavailable' };
        default:
            throw new Error('Network response was not ok.');
    }

    return await response.json(); // Return the response data as JSON
}

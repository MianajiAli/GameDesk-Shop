"use client";

export default async function apiClient(url) {
    const token = localStorage.getItem('authToken');

    const response = await fetch(`http://localhost:8000${url}`, {
        method: 'GET', // You can change this to 'POST', 'PUT', etc. as needed
        headers: {
            'Authorization': `Bearer ${token}`, // Add token to headers
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json(); // Return the response data as JSON
}

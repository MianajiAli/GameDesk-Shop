export default async function api(url, method = "GET", body = null, token = null) {
    let data;
    try {
        // Define the fetch options
        const options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            cache: 'no-store'
        };

        // Add body if it's not a GET request
        if (method !== 'GET' && body) {
            options.body = JSON.stringify(body);
        }

        // Add Authorization header if token is provided
        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }

        // Make the API request
        const response = await fetch(`${process.env.BACKEND_API_URL}${url}`, options);

        // Check for response status
        switch (response.status) {
            case 200:
            case 201:
                // Parse and return JSON data
                data = await response.json();
                break;
            case 400:
                return { error: 'Bad Request: The request was invalid or cannot be otherwise served.' };
            case 401:
                return { error: 'Unauthorized: Access is denied due to invalid credentials.' };
            case 403:
                return { error: 'Forbidden: You don’t have permission to access this resource.' };
            case 404:
                return { error: 'Not Found: The requested resource could not be found.' };
            case 500:
                return { error: 'Internal Server Error: The server encountered an error and could not complete your request.' };
            case 503:
                return { error: 'Service Unavailable: The server is currently unable to handle the request due to maintenance or overloading.' };
            default:
                return { error: `Unexpected Error: Received status code ${response.status}.` };
        }
    } catch (err) {
        // Catch any network errors or unexpected issues
        console.error('Fetch error:', err);
        return { error: `Fetch Error: ${err.message}. Please check your network connection or contact support.` };
    }

    // Return the parsed data
    return data;
}

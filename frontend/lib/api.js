
export default async function api(url, token) {
    let data;
    try {
        const response = await fetch(`${process.env.BACKEND_API_URL}${url}`, {
            method: 'GET',
            headers: {
                // 'Authorization': `Bearer ${token}`, // Use the passed token
                'Content-Type': 'application/json',
            },
            cache: 'no-store'
        });


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

        // If the response is ok, parse the JSON data
        data = await response.json();
    } catch (err) {
        // Log and return the error message
        console.error('Fetch error:', err);
        return { error: err.message };
    }

    // Return the parsed data
    return data;
}

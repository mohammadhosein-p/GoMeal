export async function sendHttp(url, bodyData="", method = "GET") {
    try {
        let response;
        if (method == "GET") {
            response = await fetch(`${url}?${bodyData}`)
        } else {
            response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bodyData),
            });
        }

        if (!response.ok) {
            throw new Error(`an error accured: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error: ', error.message);
    }
}

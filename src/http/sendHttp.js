export async function sendHttp(url, bodyData = "", method = "GET") {
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
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

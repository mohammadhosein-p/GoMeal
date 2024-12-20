export async function sendHttp(url, bodyData = "", method = "GET", token = "") {
    let response;
    const headers = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['authorization'] = token;
    }

    if (method == "GET") {
        response = await fetch(`${url}?${bodyData}`, {
            headers: headers
        });
    } else {
        response = await fetch(url, {
            method: method,
            headers: headers,
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
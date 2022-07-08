const request = async ({ endpoint, method, data }) => {
    switch (method) {
        case "GET":
            const response = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json()
            return result
        case "DELETE":
            await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            break;
        default:
            fetch(endpoint, {
                body: JSON.stringify(data),
                method,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            break;
    }
};

export const uuidv4 = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
});

export const getMyNotes = () => {
    return request({
        endpoint: 'http://localhost:3000/notes',
        method: 'GET',
    })
};

export const addNotes = data => {
    request({
        endpoint: 'http://localhost:3000/notes',
        method: 'POST',
        data
    });
};

export const editNote = (id, data) => {
    request({
        endpoint: `http://localhost:3000/notes/${id}`,
        method: 'PUT',
        data: data
    });
};

export const deleteNote = id => {
    request({
        endpoint: `http://localhost:3000/notes/${id}`,
        method: 'DELETE'
    });
};
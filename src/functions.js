import axios from "axios";

const customAxios = axios.create({
    baseURL: "https://notes-demo-backend.herokuapp.com",
});

customAxios.interceptors.request.use((config) => {
    config.headers["authcookie"] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmFkNTgzZGExOWMxMTZkYzZhYmYzYmUiLCJ1c2VybmFtZSI6ImFzZGFkYXNzIiwiY3JlYXRlZEF0IjoiMjAyMi0wNi0xOFQwNDo0NDo0NS42NDNaIiwidXBkYXRlZEF0IjoiMjAyMi0wNi0xOFQwNDo0NDo0NS42NDNaIiwiaWF0IjoxNjU1NTU4NjQxfQ.GrYzJUeJz6szWI2DJOyjEDptYpVvDUTXxGcdoKkoe6M";

    return config;
});

customAxios.interceptors.response.use((config) => {
    if (config.status === 401) {
        clearAuthToken();
    }
    return config;
});

export const clearAuthToken = () => localStorage.clear();
export const getAuthToken = () => localStorage.getItem("token");
export const setAuthToken = (value) => localStorage.setItem("token", value);

export const getMyNotes = () => {
    return customAxios.get("/me/notes");
};

export const addNotes = (title, content) => {
    const data = {
        title: title,
        content: content,
    };
    return customAxios.post("/notes", data);
};

export const deleteNote = (id) => {
    return customAxios.delete(`/notes/${id}`);
};

export const editNote = (noteId, data) => {
    return customAxios.put(`/notes/${noteId}`, data);
};
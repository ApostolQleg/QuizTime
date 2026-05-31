import client from "@/shared/api/apiClient.js";

export const verifySession = () => client.get("/user");

export const getUserProfile = (id) => client.get(`/user/${id}`);

export const updateUser = (data) => client.put("/user/update", data);

export const changePassword = (data) => client.post("/user/password", data);

export const getNicknameArray = () => client.get("/user/nickname");

export const deleteUser = () => client.delete("/user/delete");

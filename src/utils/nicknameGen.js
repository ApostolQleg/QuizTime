import { getNicknameArray } from "../services/user.js"

export async function nicknameAnimation() {
    try {
        const data = await getNicknameArray(); 
        const nicknames = data.nicknames; 
    
        console.log(nicknames);
    } catch (error) {
        console.error("Помилка під час отримання нікнеймів:", error);
    }
}

//src/utils/generateToken.js
export const generateToken = (userId) => {
    const random = Math.random().toString(36).substring(2);
    const timestamp = Date.now().toString();
    return `${userId}-${random}-${timestamp}`;
}
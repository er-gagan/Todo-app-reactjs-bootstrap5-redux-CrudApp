import { TOKEN } from "./types";
export const addToken = (token) => ({
    type:TOKEN,
    token,
});
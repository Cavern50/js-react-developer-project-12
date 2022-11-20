import { RestApi } from "./restApi";

class Api extends RestApi {
    constructor() {
        super();
    }

    async login({username, password}) {
        try {
            const data = await this.post('login', {
                username,
                password
            });
            return data;
        } catch (e) {
            throw e;
        }
    }
}

export const api = new Api();
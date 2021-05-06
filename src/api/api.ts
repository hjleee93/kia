import store from '@/store';
import Vue, { PluginObject } from "vue";

export default class Api {
    private baseApiUrl = process.env.VUE_APP_API_URL;

    async verifyApp() {
        let result: any;

        try {
            result = await Vue.$axios.post("api/v1/apps", {
                client_name: "KIA",
                redirect_uris: "urn:ietf:wg:oauth:2.0:oob",
                scopes: ["read", "write", "follow"].join(" ")
            })

            if (result.status >= 200 && result.status < 300) {
            } else {
                throw new Error();
            }
        } catch (err) {
            store.dispatch('logout')
        };

        return result;
    }

    async attemptLogin(email: string, password: string, instance: { client_id: any; client_secret: any; }) {
        let result: any;

        try {
            result = await Vue.$axios.post("/oauth/token", {
                client_id: instance.client_id,
                client_secret: instance.client_secret,
                grant_type: "password",
                username: email,
                password: password,
                scope: ["read", "write", "follow"].join(" "),
            })

            if (result.status >= 200 && result.status < 300) {

            } else {
                throw new Error();
            }
        }
        catch (err) {
            store.dispatch('logout')

        };
        return result

    }


    async getCurrentUser() {
        let result: any;

        try {
            result = await Vue.$axios({
                method: 'get',
                url: '/api/v1/accounts/verify_credentials'
            })
            if (result.status >= 200 && result.status < 300) {
            } else {
                throw new Error("Error");
            }
        }
        catch (err) {
            store.dispatch('logout')

        };
        return result.data
    }

    async sendFavourite(tootId: number) {
        let result: any
        try {
            result = await Vue.$axios({
                method: 'post',
                url: `/api/v1/statuses/${tootId}/favourite`,

            })
        } catch (err) {
            alert("잠시 후에 다시 시도해주세요.")
            result = err;
        };
        return result;
    }

    async sendUnfavourite(tootId: number) {
        let result: any
        try {
            result = await Vue.$axios({
                method: 'post',
                url: `/api/v1/statuses/${tootId}/unfavourite`,
            })
        } catch (err) {
            alert("잠시 후에 다시 시도해주세요.")
            result = err;
        };
        return result;
    }

    async searchHashtag(searchInput: string, offset?: number, limit?: number) {
        let result: any
        try {
            result = await Vue.$axios
                ({
                    method: 'get',
                    url: '/tags',
                    baseURL: this.baseApiUrl,
                    params: { limit: limit, offset: offset, tag: searchInput },
                })
        } catch (err) {
            alert("잠시 후에 다시 시도해주세요.")
            result = err;
        };


        return result.data
    }

    async showToot(param: object) {
        let result: any
        try {
            result = await Vue.$axios
                ({
                    method: 'get',
                    url: '/search/media',
                    baseURL: this.baseApiUrl,
                    params: Object.assign(param),
                })
        } catch (err) {
            alert("잠시 후에 다시 시도해주세요.")
            result = err;
        };
        return result.data
    }


    async getBestHashtags(gte: string, lte: string, limit?: number, offset?: number) {
        let result: any
        try {
            result = await Vue.$axios
                ({
                    method: 'get',
                    url: '/ranking/tags',
                    baseURL: this.baseApiUrl,
                    params: { gte: gte, lte: lte, limit: limit, offset: offset },
                })
        }
        catch (err) {
            alert("잠시 후에 다시 시도해주세요.")
            result = err;
        };
        return result.data
    }

    async getBestUser(gte: string, lte: string, limit?: number, offset?: number) {
        let result: any;
        try {
            result = await Vue.$axios
                ({
                    method: 'get',
                    url: '/ranking/user',
                    baseURL: this.baseApiUrl,
                    params: { gte: gte, lte: lte, limit: limit, offset: offset },
                })
        }
        catch (err) {
            alert("잠시 후에 다시 시도해주세요.")
            result = err;
        };


        return result.data
    }

    async getBestToot(gte: string, lte: string, limit?: number, offset?: number) {
        let result: any;
        try {
            result = await Vue.$axios
                ({
                    method: 'get',
                    url: '/ranking/toot',
                    baseURL: this.baseApiUrl,
                    params: { gte: gte, lte: lte, limit: limit, offset: offset, account_id: store.getters.currentUser.id },
                })
        }
        catch (err) {
            alert("잠시 후에 다시 시도해주세요.")
            result = err;
        };


        return result.data
    }

}

declare module 'vue/types/vue' {
    interface Vue {
        $api: Api,
    }

    interface VueConstructor {
        $api: Api,
    }
}

const _api = new Api();
const Plugin: PluginObject<any> = {
    install: (Vue) => {
        Vue.$api = _api;
    },
};
Plugin.install = (Vue) => {
    Vue.$api = _api;
    Object.defineProperties(Vue.prototype, {
        $api: {
            get() {
                return _api;
            },
        },
    });
};

Vue.use(Plugin);
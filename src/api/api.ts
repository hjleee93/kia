import store from '@/store';
import axios, { AxiosInstance } from 'axios'
import { result } from 'lodash';
import Vue, { PluginObject } from "vue";

export default class Api {
    private baseApiUrl = process.env.VUE_APP_API_URL;



    async verifyApp() {
        let result: any;

        await Vue.$axios.post("api/v1/apps", {
            client_name: "KIA",
            redirect_uris: "urn:ietf:wg:oauth:2.0:oob",
            scopes: ["read", "write", "follow"].join(" ")
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                result = response;
            } else {
                throw new Error();
            }
        }).catch(() => {
            store.dispatch('logout')
        });

        return result;
    }

    async attemptLogin(email: string, password: string, instance: { client_id: any; client_secret: any; }) {
        let result: any;

        await Vue.$axios.post("/oauth/token", {
            client_id: instance.client_id,
            client_secret: instance.client_secret,
            grant_type: "password",
            username: email,
            password: password,
            scope: ["read", "write", "follow"].join(" "),
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                result = response;
            } else {
                throw new Error();
            }
        }).catch(err => {
            store.dispatch('logout')

        });
        return result

    }


    async getCurrentUser() {
        let result: any;
        await Vue.$axios({
            method: 'get',
            url: '/api/v1/accounts/verify_credentials'
        }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                result = response;
            } else {
                throw new Error("Error");
            }
        }).catch(err => {
            store.dispatch('logout')

        });
        return result.data
    }

    async getTagToots(category: string, max_id?: number, limit?: number) {
        const result = await Vue.$axios({
            method: 'get',
            url: `/api/v1/timelines/tag/${category}`,
            params: { only_media: true, limit, max_id, local: true }
        })
        return result.data;
    }

    async getMediaTootsOnly(max_id?: number, limit?: number) {
        const result = await Vue.$axios({
            method: 'get',
            url: '/api/v1/timelines/public',
            params: { only_media: true, limit, max_id, local: true }

        })
        return result.data;
    }

    async getMyToots(max_id?: number,) {
        await this.getCurrentUser()
        // let userId = store.getters.currentUser.id
        const result = await Vue.$axios({
            method: 'get',
            url: `/api/v1/accounts/1/statuses`,
            params: { only_media: true, max_id }
        })
        return result.data

    }

    async sendFavourite(tootId: number) {

        const result = await Vue.$axios({
            method: 'post',
            url: `/api/v1/statuses/${tootId}/favourite`,
        })
        return result;
    }

    async sendUnfavourite(tootId: number) {

        const result = await Vue.$axios({
            method: 'post',
            url: `/api/v1/statuses/${tootId}/unfavourite`,
        })
        return result;
    }

    async searchHashtag(searchInput: string, offset?: number, limit?: number) {


        const result = await Vue.$axios
            ({
                method: 'get',
                url: '/tags',
                baseURL: this.baseApiUrl,
                params: { limit: limit, offset: offset, tag: searchInput },
            })


        return result.data
    }

    async showToot(param: object) {
        // await this.getCurrentUser()
        const result = await Vue.$axios
            ({
                method: 'get',
                url: '/search/media',
                baseURL: this.baseApiUrl,
                params: Object.assign(param),
            })
        return result.data
    }


    async getBestHashtags(gte: string, lte: string, limit?: number, offset?: number) {

        const result = await Vue.$axios
            ({
                method: 'get',
                url: '/ranking/tags',
                baseURL: this.baseApiUrl,
                params: { gte: gte, lte: lte, limit: limit, offset: offset },
            })
        return result.data
    }

    async getBestUser(gte: string, lte: string, limit?: number, offset?: number) {

        const result = await Vue.$axios
            ({
                method: 'get',
                url: '/ranking/user',
                baseURL: this.baseApiUrl,
                params: { gte: gte, lte: lte, limit: limit, offset: offset },
            })


        return result.data
    }

    async getBestToot(gte: string, lte: string, limit?: number, offset?: number) {
        const result = await Vue.$axios
            ({
                method: 'get',
                url: '/ranking/toot',
                baseURL: this.baseApiUrl,
                params: { gte: gte, lte: lte, limit: limit, offset: offset, account_id: await store.getters.currentUser.id },
            })

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
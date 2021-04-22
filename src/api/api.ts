import store from '@/store';
import axios, { AxiosInstance } from 'axios'
import Vue, { PluginObject } from "vue";

export default class Api {

    async verifyApp() {
        const result = await Vue.$axios.post("api/v1/apps", {
            client_name: "KIA",
            redirect_uris: "urn:ietf:wg:oauth:2.0:oob",
            scopes: ["read", "write", "follow"].join(" ")
        });
        return result;
    }

    async login() {
        const result = await Vue.$axios.get('oauth/token')
    }

    async getToots(max_id?: number, limit: number = 100) {
        const result = await Vue.$axios({
            method: 'get',
            url: 'api/v1/timelines/public',
            params: {
                limit,
                max_id,
                local: true,
            }
        })

        return result.data;
    }

    async getCurrentUser() {

        const response = await Vue.$axios({
            method: 'get',
            url: '/api/v1/accounts/verify_credentials'
        })
        return response.data
    }

    async getTagToots(category: string, max_id?: number, limit?: number, option?: {}) {
        const result = await Vue.$axios({
            method: 'get',
            url: `/api/v1/timelines/tag/${category}`,
            params: { only_media: true, limit, max_id, local: true }
        })
        return result.data;
    }

    async getMediaTootsOnly(max_id?: number, limit?: number, option?: {}) {
        const result = await Vue.$axios({
            method: 'get',
            url: '/api/v1/timelines/public',
            params: { only_media: true, limit, max_id, local: true }

        })
        return result.data;
    }

    async getMyToots(userId: number, max_id?: number,) {

        const result = await Vue.$axios({
            method: 'get',
            url: `/api/v1/accounts/${userId}/statuses`,
            params: { only_media: true, max_id }
        })
        return result.data

    }
    async deleteToot(tootId: number) {
        const result = await Vue.$axios({
            method: 'delete',
            url: `/api/v1/statuses/${tootId}`
        })

        return result;
    }
    async attemptLogin(email: string, password: string, instance: { client_id: any; client_secret: any; }) {


        const result = await Vue.$axios.post("/oauth/token", {
            client_id: instance.client_id,
            client_secret: instance.client_secret,
            grant_type: "password",
            username: email,
            password: password,
            scope: ["read", "write", "follow"].join(" "),
        })

        return result;
    }
    async sendFavourite(tootId: number, token: any) {

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


    async searchToot(searchInput: string) {
        const result = await Vue.$axios({
            method: 'get',
            url: '/api/v2/search/',
            params: { q: searchInput }
        })

        return result.data.statuses
    }

    async searchUser(searchInput: string) {
        const result = await Vue.$axios({
            method: 'get',
            url: '/api/v2/search/',
            params: { q: searchInput }
        })
        return result.data.accounts
    }



    async searchHashtag(searchInput: string, offset?: number, limit?: number) {

        const result = await Vue.$axios
            ({
                method: 'get',
                url: '/tags',
                baseURL: 'http://apitoot.wbcard.org',
                params: { limit: limit, offset: offset, tag: searchInput },
            })


        return result.data
    }

    async searchMedia(username?: string, max_id?: string, limit?: number, tag?: string, text?: string, order?: string, postring?: boolean) {
        console.log('searchMedia', limit)
        const result = await Vue.$axios
            ({
                method: 'get',
                url: '/search/media',
                baseURL: 'http://apitoot.wbcard.org',
                params: { limit: limit, max_id: max_id, tag: tag, username: username },
            })

        console.log('result', result)

        return result.data
    }
    async searchMediaContents(text?: string, max_id?: string, limit?: number, tag?: string, order?: string, posting?: boolean) {
        console.log('searchMedia', limit)
        const result = await Vue.$axios
            ({
                method: 'get',
                url: '/search/media',
                baseURL: 'http://apitoot.wbcard.org',
                params: { limit: limit, max_id: max_id, tag: tag, text: text },
            })

        console.log('result', result)

        return result.data
    }

    async searchMediaTag(tag?: string, max_id?: string, limit?: number, order?: string, posting?: boolean) {
        const result = await Vue.$axios
            ({
                method: 'get',
                url: '/search/media',
                baseURL: 'http://apitoot.wbcard.org',
                params: { limit: limit, max_id: max_id, tag: tag },
            })

        console.log('result', result)

        return result.data
    }

    async getBestHashtags(gte: string, lte: string, limit?: number, offset?: number) {

        const result = await Vue.$axios
            ({
                method: 'get',
                url: '/ranking/tags',
                baseURL: 'http://apitoot.wbcard.org',
                params: { gte: gte, lte: lte, limit: limit, offset: offset },
            })
        return result.data
    }

    async getBestUser(gte: string, lte: string, limit?: number, offset?: number) {

        const result = await Vue.$axios
            ({
                method: 'get',
                url: '/ranking/user',
                baseURL: 'http://apitoot.wbcard.org',
                params: { gte: gte, lte: lte, limit: limit, offset: offset },
            })


        return result.data
    }

    async getBestToot(gte: string, lte: string, limit?: number, offset?: number) {

        const result = await Vue.$axios
            ({
                method: 'get',
                url: '/ranking/toot',
                baseURL: 'http://apitoot.wbcard.org',
                params: { gte: gte, lte: lte, limit: limit, offset: offset },
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
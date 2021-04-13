import config from '@/lib/config';
import axios, { AxiosInstance } from 'axios'
import Vue, { PluginObject } from "vue";
import tempCategory from './../scripts/categoryList';

export default class Api {

    async login() {
        const result = await Vue.$axios.get('oauth/token')
    }

    async getToots(max_id?: number, limit: number = 100) {
        const result = await Vue.$axios.get('api/v1/timelines/public', {
            params: {
                limit,
                max_id,
                local: true,
            }
        });
        return result.data;
    }

    async getCategory() {
        return tempCategory;
    }
    getToken() {
        return JSON.parse(localStorage.getItem('token')!)
    }

    async getCurrentUser(token: string) {

        const userToken = token
        const response = await Vue.$axios.get('/api/v1/accounts/verify_credentials', {
            headers: { Authorization: "Bearer " + userToken },
        })
        return response.data
    }

    async getTagToots(category: string, max_id?: number, limit?: number, option?: {}) {
        const result = await Vue.$axios.get(
            "/api/v1/timelines/tag/" + category,
            {
                params: { only_media: true, limit, max_id, local: true }
            }
        );
        console.log(result.data)
        return result.data;
    }

    async getMediaTootsOnly(max_id?: number, limit?: number, option?: {}) {
        const result = await Vue.$axios.get("/api/v1/timelines/public",
            {
                params: { only_media: true, limit, max_id, local: true },
                headers: { Authorization: "Bearer " + config.token },
            }
        );
        return result.data;
    }
    async getMyToots(max_id?: number, limit?: number, userId?: number) {
        const result = await Vue.$axios.get("/api/v1/timelines/public",
            {
                params: { only_media: true, limit, max_id, local: true },
                headers: { Authorization: "Bearer " + config.token },
            }
        );

        // for (let i = 0; i < result.length; i++) {
        //     if (
        //         result[i].account.id === this.$store.getters.currentUser.id
        //     ) {
        //         console.log("123",result[i]);
        //         tempArr.push(result[i])
        //     }
        // }ZZf

        console.log(result)
        return result.data;
    }
    async deleteToot(tootId: number) {
        const result = await Vue.$axios.delete("/api/v1/statuses/" + tootId, {
            headers: { Authorization: "Bearer " + config.token },
        }
        );

        return result;
    }
    async uploadMedia(formData: FormData) {
        const result = await Vue.$axios.post("/api/v1/media", formData, {
            headers: {
                Authorization: "Bearer " + config.token,
                "Content-Type": "multipart/form-data",
            }
        }
        );

        return result;
    }

    async uploadToot(message: string, tagSelected: string, uploads: File[]) {
        //issue : 빈칸인 경우 #만 노출되는 현상 
        const result = await Vue.$axios.post("/api/v1/statuses/", {
            status: message + `\n #` + tagSelected,
            media_ids: uploads
                .slice(0, 4)
                //@ts-ignore
                .map((upload) => upload.id),
        },
            {
                headers: { Authorization: "Bearer " + config.token },
            }
        );

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
            url: `https://toot.wbcard.org/api/v1/statuses/${tootId}/favourite`,
            headers: {
                'Authorization': `Bearer ${config.token}`
            }
        })
        // post("/api/v1/statuses/" + tootId + "/favourite",
        //     {
        //         headers: { 'Authorization': 'Bearer ' + this.getToken() },

        //     })

        return result;
    }

    async sendUnfavourite(tootId: number) {


        const result = await Vue.$axios({
            method: 'post',
            url: `https://toot.wbcard.org/api/v1/statuses/${tootId}/unfavourite`,
            headers: {
                'Authorization': `Bearer ${config.token}`
            }
        })
        // .post("/api/v1/statuses/" + tootId + "/unfavourite",
        //     {
        //         headers: { 'Authorization': "Bearer " + config.token },

        //     })
        return result;
    }

    async searchHashtag(searchInput: string){
        const result = await Vue.$axios.get('/api/v2/search',
        {
            params: Object.assign({ q: searchInput }),
            headers: { Authorization: "Bearer " + config.token },
          
        });

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
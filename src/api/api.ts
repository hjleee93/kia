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

    async getCurrentUser() {
        const response = await Vue.$axios.get('/api/v1/accounts/verify_credentials', {
            headers: { Authorization: "Bearer " + config.token },
        })
        return response
    }

    async getTagToots(category: string) {
        const result = await Vue.$axios.get(
            "/api/v1/timelines/tag/" + category
        );
        return result;
    }

    async getMediaTootsOnly(limit?: number, option?: {}) {
        const result = await Vue.$axios.get("/api/v1/timelines/public",
            {
                params: Object.assign({ only_media: true, limit: limit }),
                headers: { Authorization: "Bearer " + config.token },
            }
        );
        return result;
    }
    async getMyToots(userId: number) {
        const result = await Vue.$axios.get("/api/v1/accounts/" + userId + "/statuses"
        );

        return result;
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
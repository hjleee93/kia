import axios, {AxiosInstance} from 'axios'
import Vue, {PluginObject} from "vue";

export default class Api {

    async login() {
        const result = await Vue.$axios.get( 'oauth/token' )
    }

    async getToots( max_id? : number, limit : number = 100 ) {
        const result = await Vue.$axios.get( 'api/v1/timelines/public', {
            params : {
                limit,
                max_id,
                local : true,
            }
        } );
        return result.data;
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
import Vue, {PluginObject} from 'vue';
import axios, {AxiosInstance} from "axios";
import store from './../store';

declare module 'vue/types/vue' {
    interface Vue {
        $axios: AxiosInstance,
    }

    interface VueConstructor {
        $axios: AxiosInstance
    }
}


let config = {
    baseURL: process.env.VUE_APP_BASE_API || ""
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
    function (cfg) {
        // Do something before request is sent

        if (store.getters.userToken) {
            cfg.headers.authorization = `Bearer ${store.getters.userToken}`;
        }

        return cfg;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    function (response) {
        // Do something with response data
        return response;
    },
    function (error) {
        // Do something with response error
        return Promise.reject(error);
    }
);

const Plugin: PluginObject<any> = {
    install: (Vue) => {
        Vue.$axios = _axios;
    },
};
Plugin.install = (Vue) => {
    Vue.$axios = _axios;
    Object.defineProperties(Vue.prototype, {
        $axios: {
            get() {
                return _axios;
            },
        },
    });
};

Vue.use(Plugin);
export default Plugin;

<template>
    <div>
        <h2>Log in!</h2>
        <!-- <form> -->
            <input
                type="text"
                placeholder="Your instance"
                v-model="instance"
                @focus="focusInstance"
                @blur="blurInstance"
            />
            <input type="text" v-model="email" placeholder="E-mail address" />
            <input type="password" v-model="password" placeholder="Password" />
            <!-- <button>loginTest</button> -->
            <button @click="login" style="color:white">Log in!</button>
        <!-- </form> -->
    </div>
</template>

<script>
import Modal from "@/components/Modal";
export default {
    name: "Login",
    components: {
        Modal,
    },
    data() {
        return {
            instance: "",
            email: "",
            password: "",
        };
    },
    props: ["show"],
    methods: {
        close() {
            this.$emit("close");
        },
        focusInstance() {
            this.instance = this.instance || "https://toot.wbcard.org/";
        },
        blurInstance() {
            if (this.instance.match(/^https?:\/\/$/iu)) {
                this.instance = "";
            }
        },
        login() {
            let uri = new URL(this.instance);

            
            if (this.known() === null || this.known()[uri.host] === null) {
                console.log("Login successful");
                this.registerWithInstance(uri).then(this.attemptLogin);
            } else {
                console.log("Login successful111");
                this.attemptLogin();
            }
        },
    },
    // created() {
        store = {
            in: (key, item) => {
                var storable = JSON.stringify(item);
                localStorage.setItem(key, storable);
                return storable;
            },
            out: (key) => {
                let raw = localStorage.getItem(key);
                return raw !== "undefined" ? JSON.parse(raw) : {};
            },
        };
        this.known = (val = null) => {
            if (val == null) {
                return this.store.out("known_instances");
            } else {
                return this.store.in("known_instances", val);
            }
        };
        this.registerWithInstance = (uri) => {
            var target = uri.origin;
            return this.$http
                .post(target + "/api/v1/apps", {
                    client_name: "Vuetodon",
                    redirect_uris: "http://localhost:8081/hive",
                    scopes: ["read", "write", "follow"].join(" "),
                    website: "http://valerauko.net",
                })
                .then(
                    (response) => {
                        console.log("target", target);
                        var known = this.known() || {};
                        known[uri.host] = {
                            host: uri.origin,
                            client_id: response.body.client_id,
                            client_secret: response.body.client_secret,
                        };
                        this.known(known);
                        console.log("App registration successful");
                    },
                    (response) => {
                        alert("App registration failed");
                        console.log(response);
                    }
                );
        };
        this.attemptLogin = () => {
           console.log("Login successful");
            let instance = this.known()[new URL(this.instance).host];

            this.$http
                .post(instance.host + "/oauth/token", {
                    client_id: instance.client_id,
                    client_secret: instance.client_secret,
                    grant_type: "password",
                    username: this.email,
                    password: this.password,
                    scope: ["read", "write", "follow"].join(" "),
                })
                .then(
                    (response) => {
                       console.log("Login successful");
                        this.store.in("instance", instance.host);
                        this.store.in("token", response.body.access_token);
                        this.$router.push('/sample');
                    },
                    (response) => {
                        alert("Login failed");
                        console.log(response);
                    }
                );
        };
    // },
};
</script>

<style scoped>
input {
    display: block;
    background: #111;
    border: 1px solid #999;
    border-radius: 5px;
    margin: 0.5em auto;
    padding: 1em;
    width: inherit;
    font: inherit;
    color: #fff;
}
</style>

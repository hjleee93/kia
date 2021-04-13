<template>
    <div id="content" class="login">
        <!--content(S)-->
        <div class="content">
            <div class="sec-header">
                <h1 class="small-logo">KIA Design Idea Network System</h1>
                <div class="box-line">
                    <img
                        src="images/pc/login/img_line.png"
                        srcset="
                            images/pc/login/img_line@2x.png 2x,
                            images/pc/login/img_line@3x.png 3x
                        "
                        class="line"
                    />
                    <h2 class="logo">
                        <img
                            src="images/pc/login/img_logo.png"
                            srcset="
                                images/pc/login/img_logo@2x.png 2x,
                                images/pc/login/img_logo@3x.png 3x
                            "
                        />
                    </h2>
                </div>
            </div>

            <div class="sec-form-login">
                <div class="art-field">
                    <!--default-->

                    <input type="text" hidden v-model="instance" />
                    <label
                        class="input"
                        :class="[
                            isEmailActive ? 'active' : '',
                            isLoginError ? 'error' : '',
                        ]"
                    >
                        <input
                            @focus="isEmailActive = true"
                            @blur="isEmailActive = false"
                            type="text"
                            placeholder="이메일"
                            v-model="email"
                            autocomplete="off"
                        />
                    </label>
                    <!--error-->
                    <!--
                <label class="input error">
                  <input type="text" placeholder="이메일" />
                </label>
                -->
                    <label
                        class="input"
                        :class="[
                            isPwdActive ? 'active' : '',
                            isLoginError ? 'error' : '',
                        ]"
                    >
                        <input
                            @focus="isPwdActive = true"
                            @blur="isPwdActive = false"
                            type="password"
                            placeholder="비밀번호"
                            v-model="password"
                            autocomplete="off"
                        />
                    </label>
                </div>
                <div class="art-btn">
                    <!--default-->
                    <button
                        class="btn btn-login"
                        @click="login"
                        :disabled="
                            this.email.match(emailRegExp) === null || !password
                        "
                    >
                        로그인
                    </button>

                    <!--active-->
                    <!--<button class="btn btn-login active">로그인</button>-->
                    <!--disabled-->
                    <!--<button class="btn btn-login disabled">로그인</button>-->
                    <!--disabled attribute disabled-->
                    <!--<button class="btn btn-login" disabled="disabled">로그인</button>-->
                </div>
                <!--조회시 에러일경우 에러메시지 출력-->

                <template v-if="isLoginError === true">
                    <div class="art-msg">
                        <p class="msg msg-error">
                            올바르지 않은 Email 혹은 패스워드입니다.
                        </p>
                    </div>
                </template>

                <div class="art-second-btn">
                    <a href="#" class="btn btn-link">등록하기</a>
                </div>
                <ul class="art-link-lists">
                    <li>
                        <a href="#" class="btn btn-link"
                            >비밀번호를 잊어버리셨습니까?</a
                        >
                    </li>
                    <li>
                        <a href="#" class="btn btn-link"
                            >확인 메일을 받지 못하셨습니까?</a
                        >
                    </li>
                </ul>
            </div>
        </div>
        <!--content(E)-->

        <iframe class="iframe" ref="iframe" :src="`${baseURL}about`"></iframe>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({ components: {} })
export default class Login extends Vue {

    private baseURL: string = process.env.VUE_APP_BASE_API!;

    private email: string = "";
    private password: string = "";
    private instance: string = process.env.VUE_APP_BASE_API!;
    private isLoginError: boolean = false;
    private isEmailActive: boolean = false;
    private isPwdActive: boolean = false;
    private clickedLogin: boolean = false;
    private emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;


    handleKeyDown(e: any) {
        if (e.code === "Enter" || e.keyCode === 13) {
            this.login();
        }
        
    }
    created() {
        window.addEventListener("keydown", this.handleKeyDown);
    }
    destroyed() {
        window.removeEventListener("keydown", this.handleKeyDown);
    }

    login() {
        let uri = new URL(this.instance);
        if (this.known() === null || this.known()[uri.host] === null) {
            console.log("Login successful registerWithInstance");
            this.registerWithInstance(uri).then(() => {
                this.attemptLogin(this.email, this.password);
            });
        } else {
            this.attemptLogin(this.email, this.password);
        }
    }

    private store = {
        in: (key: string, item: string) => {
            var storable = JSON.stringify(item);
            localStorage.setItem(key, storable);
            return storable;
        },
        out: (key: string) => {
            let raw: string = localStorage.getItem(key)!;
            return raw !== "undefined" ? JSON.parse(raw) : {};
        },
    };

    private known = (val = null) => {
        if (val == null) {
            return this.store.out("known_instances");
        } else {
            return this.store.in("known_instances", val!);
        }
    };

    private registerWithInstance = (uri: any) => {
        var target = uri.origin;
        //@ts-ignore
        return this.$http
            .post(target + "/api/v1/apps", {
                client_name: "Vuetodon",
                redirect_uris: "http://localhost:8081/hive",
                scopes: ["read", "write", "follow"].join(" "),
                website: "http://valerauko.net",
            })
            .then(
                //client_id가 unique 한지 확인 내가 쓴 톳 용
                (response: any) => {
                    var known = this.known() || {};
                    known[uri.host] = {
                        host: uri.origin,
                        client_id: response.data.client_id,
                        client_secret: response.data.client_secret,
                    };
                    this.known(known);
                    console.log("App registration successful");
                },
                (response: any) => {
                    alert("App registration failed");
                    console.log(response);
                }
            );
    };

    private attemptLogin = async (email: string, password: string) => {
        let instance = this.known()[new URL(this.instance).host];
        try {
            const result = await this.$api.attemptLogin(
                email,
                password,
                instance
            );

            console.log(result);

            this.store.in("instance", instance.host);
            this.store.in("token", result.data.access_token);

            (this.$refs.iframe as HTMLIFrameElement)?.contentWindow?.postMessage({
                type : 'login',
                email,
                password,
            }, '*');
            await new Promise<void>((resolve)=>{
                const onMessage = (e : MessageEvent)=>{
                    const data = e.data || {};
                    if( data.type === 'loadedPage' ) {
                        window.removeEventListener('message', onMessage);
                        resolve();
                    }
                }
                window.addEventListener('message', onMessage);
            })

            try {
                await this.updateCurrentUser(result.data.access_token);
                this.$router.push("/hive").catch(() => {});
            } catch (err) {
                console.log(err);
                this.error();
            }


        } catch (err) {
            console.log(err);
            this.error();
        }

        // //@ts-ignore
        // this.$http
        //   .post(instance.host + "/oauth/token", {
        //     client_id: instance.client_id,
        //     client_secret: instance.client_secret,
        //     grant_type: "password",
        //     username: email,
        //     password: password,
        //     scope: ["read", "write", "follow"].join(" "),
        //   })
        //   .then((response: any) => {
        //     this.store.in("instance", instance.host);
        //     //@ts-ignore
        //     this.store.in("token", response.data.access_token);
        //     this.$router.push("/hive").catch(() => {});
        //   })
        //   .catch(() => {
        //     this.error();
        //   });
    };
    error() {
        this.isLoginError = true;
    }

    async updateCurrentUser(token: string) {
        try {
            console.log("token", token);
            await this.$store.dispatch("userStatus", token);
            // const result = await this.$api.getCurrentUser(token);
        } catch (err) {
            console.log("Failed to fetch current user");
        }
    }
}
</script>

<style scoped>
.btn.btn-login:active {
    background-color: #fff !important;
    color: #000 !important;
}

.iframe {
    display: none;
}
</style>

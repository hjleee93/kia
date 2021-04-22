<template>
    <div id="content" class="login">
        <template v-if="goIframe === true">
            <Header />
        </template>
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

                    <input type="text" hidden v-model="baseURL" />
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
                    <router-link
                        @click="goIframe = true"
                        to="/mastodon/auth/sign_up"
                        class="btn btn-link"
                    >
                        등록하기</router-link
                    >
                </div>
                <ul class="art-link-lists">
                    <li>
                        <router-link
                            @click="goIframe = true"
                            to="/mastodon/auth/password/new"
                            class="btn btn-link"
                        >
                            비밀번호를 잊어버리셨습니까?
                        </router-link>
                    </li>
                    <li>
                        <router-link
                            @click="goIframe = true"
                            to="/mastodon/auth/confirmation/new"
                            class="btn btn-link"
                        >
                            확인 메일을 받지 못하셨습니까?
                        </router-link>
                    </li>
                </ul>
            </div>
            <iframe
                @load="loaded()"
                class="iframe"
                ref="iframe"
                :src="`${baseURL}about`"
            ></iframe>
        </div>
        <!--content(E)-->
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import Header from "@/components/layouts/Header.vue";

@Component({ components: { Header } })
export default class Login extends Vue {
    private baseURL: string = process.env.VUE_APP_BASE_API!;
    private isIframeLoaded: boolean = false;
    private email: string = "";
    private password: string = "";
    private isLoginError: boolean = false;
    private isEmailActive: boolean = false;
    private isPwdActive: boolean = false;
    private emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    private goIframe: boolean = false;

    handleKeyDown(e: any) {
        if (e.code === "Enter" || e.keyCode === 13) {
            this.login();
        }
    }
    loaded() {
        if (
            (this.$refs.iframe as HTMLIFrameElement).src !==
            this.baseURL + "about"
        ) {
            window.addEventListener("message", this.iframeHandler);
        }
        if (this.isIframeLoaded === false) {
            (this.$refs
                .iframe as HTMLIFrameElement)?.contentWindow?.postMessage(
                {
                    type: "logout",
                },
                "*"
            );
            this.isIframeLoaded = true;
        }
    }

    iframeHandler(e: MessageEvent) {
        if (e.data.url === `${this.baseURL}about`) {
            window.location.href = "/";
        }
    }

    async mounted() {
        this.$store.dispatch("logout");
        this.$store.commit("currCategory", "Login");
        window.addEventListener("keydown", this.handleKeyDown);
    }

    destroyed() {
        window.removeEventListener("keydown", this.handleKeyDown);
        window.removeEventListener("message", this.iframeHandler);
    }

    login() {
        this.attemptLogin(this.email, this.password);
    }

    private attemptLogin = async (email: string, password: string) => {
        const result = await this.$api.verifyApp();

        let instance = {
            host: new URL(this.baseURL).host,
            client_id: result.data.client_id,
            client_secret: result.data.client_secret,
        };
        try {
            const result = await this.$api.attemptLogin(
                email,
                password,
                instance
            );
            this.$store.commit("userToken", result.data.access_token);
            await this.updateCurrentUser(result.data.access_token);

            if (
                (this.$refs.iframe as HTMLIFrameElement).src ===
                this.baseURL + "about"
            ) {
                console.log("1");
                (this.$refs
                    .iframe as HTMLIFrameElement)?.contentWindow?.postMessage(
                    {
                        type: "login",
                        email,
                        password,
                    },
                    "*"
                );
                this.$router.push("/hive").catch(() => {});
            } else if (
                (this.$refs.iframe as HTMLIFrameElement).src ===
                this.baseURL + "auth/sign_in"
            ) {
                console.log("2");
                (this.$refs
                    .iframe as HTMLIFrameElement)?.contentWindow?.postMessage(
                    {
                        type: "login2",
                        email,
                        password,
                    },
                    "*"
                );
                this.$router.push("/hive").catch(() => {});
            }
            await new Promise<void>((resolve) => {
                const onMessage = (e: MessageEvent) => {
                    const data = e.data || {};
                    if (data.type === "loadedPage") {
                        window.removeEventListener("message", onMessage);
                        resolve();
                    }
                };
                window.addEventListener("message", onMessage);
            });
        } catch (err) {
            console.log(err);
            this.error();
        }
    };

    updateUser() {}
    error() {
        this.isLoginError = true;
    }

    async updateCurrentUser(token: string) {
        try {
            await this.$store.dispatch("userStatus", token);
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
    /* display: contents; */
    opacity: 0;
    z-index: -1 !important;
}
</style>

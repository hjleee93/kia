<template>
  <div id="content" class="login">
    <template v-if="isRegister || isMissingEmail || isLostPwd">
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
            :class="[isPwdActive ? 'active' : '', isLoginError ? 'error' : '']"
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
            :disabled="this.email.match(emailRegExp) === null || !password"
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
          <a @click="signUp" class="btn btn-link">등록하기</a>
        </div>
        <ul class="art-link-lists">
          <li>
            <a @click="findPwd" class="btn btn-link"
              >비밀번호를 잊어버리셨습니까?</a
            >
          </li>
          <li>
            <a @click="missingEmail" class="btn btn-link"
              >확인 메일을 받지 못하셨습니까?</a
            >
          </li>
        </ul>
      </div>
      <template v-if="isRegister">
        <iframe
          @load="loaded()"
          :src="`${baseURL}auth/sign_up`"
          ref="iframe"
          class="reg_iframe"
          :class="isRegister ? 'active' : ''"
        ></iframe>
      </template>
      <template v-if="isMissingEmail">
        <iframe
          @load="loaded()"
          :src="`${baseURL}auth/confirmation/new`"
          ref="iframe"
          class="reg_iframe"
          :class="isMissingEmail ? 'active' : ''"
        ></iframe>
      </template>
      <template v-if="isLostPwd">
        <iframe
          @load="loaded()"
          :src="`${baseURL}auth/password/new`"
          ref="iframe"
          class="reg_iframe"
          :class="isLostPwd ? 'active' : ''"
        ></iframe>
      </template>
      <iframe
        @load="loaded()"
        class="iframe"
        ref="iframe"
        :src="`${baseURL}about`"
        allowtransparency="true"
      ></iframe>
    </div>
    <!--content(E)-->
  </div>
</template>

<script lang="ts">
import config from "@/lib/config";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import Header from "@/components/layouts/Header.vue";
@Component({ components: { Header } })
export default class Login extends Vue {
  private isRegister: boolean = false;
  private isMissingEmail: boolean = false;
  private isLostPwd: boolean = false;
  private baseURL: string = process.env.VUE_APP_BASE_API!;
  private isIframeLoaded: boolean = false;
  private email: string = "";
  private password: string = "";
  private instance: string = process.env.VUE_APP_BASE_API!;
  private isLoginError: boolean = false;
  private isEmailActive: boolean = false;
  private isPwdActive: boolean = false;
  private clickedLogin: boolean = false;
  private emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  private componentKey: number = 0;

  handleKeyDown(e: any) {
    if (e.code === "Enter" || e.keyCode === 13) {
      this.login();
    }
  }
  async loaded() {
    console.log("123", this.$refs.iframe as HTMLIFrameElement);
    // console.log(
    //   "?",
    //   (this.$refs.iframe as HTMLIFrameElement)?.contentWindow?.location.href
    // );
    if (this.isIframeLoaded === false) {
      (this.$refs.iframe as HTMLIFrameElement)?.contentWindow?.postMessage(
        {
          type: "logout",
        },
        "*"
      );
      this.isIframeLoaded = true;
    }
  }
  async mounted() {
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

  private registerWithInstance = async (uri: any) => {
    //어플확인용
    try {
      const result = await this.$api.verifyApp();
      var known = this.known() || {};
      known[uri.host] = {
        host: uri.origin,
        client_id: result.data.client_id,
        client_secret: result.data.client_secret,
      };
      this.known(known);
      console.log("App registration successful");
    } catch (err) {
      alert("App registration failed");
      console.log(err);
    }
  };

  private attemptLogin = async (email: string, password: string) => {
    let instance = this.known()[new URL(this.instance).host];
    try {
      const result = await this.$api.attemptLogin(email, password, instance);
      this.store.in("instance", instance.host);
      this.store.in("token", result.data.access_token);

      (this.$refs.iframe as HTMLIFrameElement)?.contentWindow?.postMessage(
        {
          type: "login",
          email,
          password,
        },
        "*"
      );
      (this.$refs.iframe as HTMLIFrameElement)?.contentWindow?.postMessage(
        {
          type: "login2",
          email,
          password,
        },
        "*"
      );

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
  };
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

  findPwd() {
    this.isLostPwd = true;
    // window.location.href=`${config.instance}/auth/password/new`
  }
  missingEmail() {
    this.isMissingEmail = true;
    // window.location.href=`${config.instance}/auth/confirmation/new`
  }
  signUp() {
    this.isRegister = true;
    // window.location.href=`${config.instance}/auth/sign_up`
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
.login,
.content,
.line {
  /* z-index: 999; */
}
.reg_iframe {
  display: none;
}
.reg_iframe.active {
  height: 100%;
  width: 100%;
  position: relative;
  display: block;
}
</style>

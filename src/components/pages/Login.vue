<template>
  <div id="content" class="login">
          <!--content(S)-->
          <div class="content">
            <div class="sec-header">
              <h1 class="small-logo">KIA Design Idea Network System</h1>
              <div class="box-line">
                <img src="images/pc/login/img_line.png"
                     srcset="images/pc/login/img_line@2x.png 2x, images/pc/login/img_line@3x.png 3x"
                     class="line">
                <h2 class="logo">
                  <img src="images/pc/login/img_logo.png"
                       srcset="images/pc/login/img_logo@2x.png 2x, images/pc/login/img_logo@3x.png 3x">
                </h2>
              </div>
            </div>
            <div class="sec-form-login">
                
              <div class="art-field">
                <!--default-->
                <input
                type="text"
                hidden
                v-model="instance"
            />
                <label class="input">
                  <input type="text" placeholder="이메일" v-model="email" autocomplete="off" />
                </label>
                <!--active-->
                <!--
                <label class="input active">
                  <input type="text" placeholder="이메일" />
                </label>
                -->
                <!--error-->
                <!--
                <label class="input error">
                  <input type="text" placeholder="이메일" />
                </label>
                -->
                <label class="input">
                  <input type="password" placeholder="비밀번호" v-model="password" autocomplete="off" />
                </label>
              </div>
              <div class="art-btn">
                <!--default-->
                <button class="btn btn-login" @click="login">로그인</button>
                <!--active-->
                <!--<button class="btn btn-login active">로그인</button>-->
                <!--disabled-->
                <!--<button class="btn btn-login disabled">로그인</button>-->
                <!--disabled attribute disabled-->
                <!--<button class="btn btn-login" disabled="disabled">로그인</button>-->
              </div>
              <!--조회시 에러일경우 에러메시지 출력-->
              
              <template v-if="isLoginError===true">
                <div class="art-msg">
                    <p class="msg msg-error">올바르지 않은 Email 혹은 패스워드입니다.</p>
                </div>
              </template>
              
              <div class="art-second-btn">
                <a href="#" class="btn btn-link">등록하기</a>
              </div>
              <ul class="art-link-lists">
                <li><a href="#" class="btn btn-link">비밀번호를 잊어버리셨습니까?</a></li>
                <li><a href="#" class="btn btn-link">확인 메일을 받지 못하셨습니까?</a></li>
              </ul>
            </div>
          </div>
          <!--content(E)-->
        </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import {gnb} from "@/scripts/ui_common";
import axios from "axios";

@Component({ components: {  } })
export default class Login extends Vue{

    private email: string = "";
    private password: string = "";
    private instance: string = "https://toot.wbcard.org/";
    private isLoginError: boolean = false;
    
    login(){
        let uri = new URL(this.instance);

            if (this.known() === null || this.known()[uri.host] === null) {
                
                console.log("Login successful registerWithInstance");
                this.registerWithInstance(uri).then(()=>{
                    this.attemptLogin(this.email, this.password);
                })
            } else {
                console.log("attemptLogin");
                this.attemptLogin(this.email, this.password);
            }
    }

    // created() {
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
            
            return axios.post(target + "/api/v1/apps", {
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
                            //@ts-ignore
                            client_id: response.body.client_id,
                            //@ts-ignore
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
        private attemptLogin = (email : string, password : string) => {
            let instance = this.known()[new URL(this.instance).host];
            axios
                .post(instance.host + "/oauth/token", {
                    client_id: instance.client_id,
                    client_secret: instance.client_secret,
                    grant_type: "password",
                    username: email,
                    password: password,
                    scope: ["read", "write", "follow"].join(" "),
                })
                .then(
                    (response) => {
                        //@ts-ignore
                       console.log("Login successful", response);
                        this.store.in("instance", instance.host);
                        //@ts-ignore
                        this.store.in("token", response.data.access_token);
                        this.$router.push('/hive');
                    }
                   
                ).catch((err)=>{
                    this.error();
                });
        };
        error(){
            this.isLoginError = true;
        }
    // },

}
</script>

<style>

</style>
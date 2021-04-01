<template>
    <div id="wrap">
        <section id="container">
            <div id="content" class="login">
                <!--content(S)-->
                <div class="content">
                    <div class="sec-header">
                        <h1 class="small-logo">
                            KIA Design Idea Network System
                        </h1>
                        <div class="box-line">
                            <img
                                src="../assets/images/pc/login/img_line.png"
                                srcset="
                                    ../assets/images/pc/login/img_line@2x.png 2x,
                                    ../assets/images/pc/login/img_line@3x.png 3x
                                "
                                class="line"
                            />
                            <h2 class="logo">
                                <img
                                    src="../assets/images/pc/login/img_logo.png"
                                    srcset="
                                        ../assets/images/pc/login/img_logo@2x.png 2x,
                                        ../assets/images/pc/login/img_logo@3x.png 3x
                                    "
                                />
                            </h2>
                        </div>
                    </div>
                    <div class="sec-form-login">
                        <div class="art-field">
                            <!--default-->
                            <label class="input">
                                <input
                                    type="text"
                                    placeholder="이메일"
                                    autocomplete="off"
                                />
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
                                <input
                                    type="password"
                                    placeholder="비밀번호"
                                    autocomplete="off"
                                />
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
                        <!--
              <div class="art-msg">
                <p class="msg msg-error">올바르지 않은 Email 혹은 패스워드입니다.</p>
              </div>
              -->
                        <div class="art-second-btn">
                            <router-link to="#" class="btn btn-link">등록하기</router-link>
                        </div>
                        <ul class="art-link-lists">
                            <li>
                                <router-link to="#" class="btn btn-link"
                                    >비밀번호를 잊어버리셨습니까?</router-link
                                >
                            </li>
                            <li>
                                <router-link to="#" class="btn btn-link"
                                    >확인 메일을 받지 못하셨습니까?</router-link
                                >
                            </li>
                        </ul>
                    </div>
                </div>
                <!--content(E)-->
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Login extends Vue {
    // private email: string;
    // private password: string;

    created() {}

    mounted() {}

    login() {

    }
}
</script>

<style>
</style>

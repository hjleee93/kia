<template>
  <div class="root">
    <div class="toot-form">
      <form @submit.prevent="send" @keydown.ctrl.enter.prevent="send">
        <label for="hashtag">Hashtag</label>

        <select name="hashtag" id="hashtag" class="hashtag" v-model="selected">
          <optgroup
            v-for="lists in categoryList"
            :key="lists.idx"
            :label="lists.tags[0].name"
          >
            <option
              :value="lists.name + ' #' + tag.name"
              v-for="(tag, idx) in lists.tags"
              :key="idx"
            >
              <span> {{ tag.name }}</span>
            </option>
          </optgroup>
        </select>

        <textarea placeholder="Toot something!" v-model="message"></textarea>
        <div class="previews" v-if="uploads.length > 0">
          <div v-for="image in uploads" :key="image.id">
            <img :src="image.preview_url" />
            <button @click="unUpload(image)" class="file-btn">
              Delete
            </button>
          </div>
        </div>
        <div class="toot-form">
          <label title="Upload files" class="fileSelect" for="fileUploader"
            >파일 첨부</label
          ><button @click="send" class="file-btn">Toot!</button>
          <input
            type="file"
            multiple
            id="fileUploader"
            name="fileUploader"
            @change="onSelectFile"
            :disabled="uploads.length > 3"
          />
        </div>
      </form>
    </div>
    <!-- <div>
      
      <template v-if="statuses.length === 0">
        <div class="no-data">
          <p class="txt">검색 결과가 없습니다.</p>
        </div>
      </template>
      <div class="grid">
        <GridItemTest
          v-for="status in statuses"
          :toot="status"
          :key="status.id"
        />
      </div>
    </div> -->
    <div id="content" class="rank">
      <div class="content">
        <div class="wrap-content">
          <div class="sec-left">
            <div class="sec-toot my-toot">
              <h2 class="b-tit">내가 쓴 툿</h2>

              <div class="box-toot">
                <div class="toot-lists">
                  <div v-for="toot in tootList" :key="toot.id">
                    <div class="list">
                      <div class="box-user-info">
                        <a href="#none" class="btn btn-user">
                          <i class="icon icon-user"
                            ><img :src="toot.account.avatar" alt=""
                          /></i>
                        </a>

                        <button
                          class="toot-delete-btn"
                          @click="tootDelete(toot)"
                        >
                          삭제
                        </button>

                        <!-- <div class="dropdown" @click="active = !active">
                            <span>메뉴</span>
                            <div class="dropdown-content" :class="active ? 'active' : ''" >
                            <ul>
                                <li>수정</li>
                                <li>삭제</li>


                            </ul>
                            </div>
                        </div> -->

                        <div class="box-txt">
                          <strong class="username">{{
                            toot.account.acct
                          }}</strong>
                          <span class="date"
                            >{{ toot.created_at.split("-")[1] }}월
                            {{
                              toot.created_at.split("-")[2].substring(0, 2)
                            }}일</span
                          >
                        </div>
                      </div>
                      <div class="box-content">
                        <a
                          v-html="toot.content"
                          href="#none"
                          class="btn btn-txt"
                        >
                          <span v-if="toot.isMore" class="more">더보기</span>
                        </a>
                        <p class="hash-lists">
                          <a
                            v-for="tag in toot.tags"
                            href="#none"
                            class="btn btn-hash"
                            :key="tag.id"
                          >
                            {{ tag.tag }}
                          </a>
                        </p>
                      </div>
                      <div class="box-like">
                        <i class="icon icon-like"></i>
                        <strong class="like-num">{{ toot.likeCount }}</strong>
                      </div>
                      <div
                        v-if="toot.media_attachments.length > 0"
                        class="box-img"
                      >
                        <div
                          v-for="media in toot.media_attachments"
                          :key="media.id"
                        >
                          <img :src="media.url" alt="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Hashtag from "@/components/layouts/Hashtag.vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import config from "@/lib/config";
import categoryList from "@/scripts/categoryList";

@Component({ components: { Hashtag } })
export default class Posting extends Vue {
  @Prop() currentUser!: any;
  private message: string = "";
  private uploads: File[] = [];
  private sending!: boolean;
  private statuses: any[] = [];
  private newStatuses: any[] = [];
  private userId = this.currentUser.id;
  private tootList: any[] = [];
  private isUploadStatus!: boolean;
  private categoryList: any[] = categoryList;
  private selected: string = "";
  //   private active: boolean = false;

  async mounted() {
    await this.read();
  }

  async send() {
    if (this.sending || (!this.message.length && !this.uploads.length)) {
      return true;
    }
    this.sending = true;

    if (this.isUploadStatus === false) {
      alert("파일 업로드에 실패했습니다.");
    } else {
      try {
        const result = await this.$api.uploadToot(
          this.message,
          this.selected,
          this.uploads
        );
        this.message = "";
        this.uploads = [];
        this.sending = false;
        this.newToot(result.data);
        alert("toot upload!");
      } catch (err) {
        console.log(err);
      }
    }
  }

  async uploadOne(image: File) {
    let formData = new FormData();
    formData.append(
      "file",
      //@ts-ignore
      image instanceof File ? image : image.getAsFile()
    );
    try {
      const result = await this.$api.uploadMedia(formData);
      this.uploads.push(result.data);
      this.isUploadStatus = true;
    } catch (err) {
      this.isUploadStatus = false;
      console.log("Upload failed");
    }
  }

  onSelectFile(e: Event) {
    //@ts-ignore
    let files = e.target!.files || e.dataTransfer.files;
    if (!files.length) {
      return true;
    }
    [...files].map(this.uploadOne);
  }

  newToot(status: { id: any }) {
    this.statuses = [
      status,
      ...this.statuses
        .filter((toot) => toot.id !== status.id)
        .slice(0, config.statusLimit - 1),
    ];
  }
  // todo: current user issue
  async read() {
    const result = await this.$api.getMyToots(this.userId);
    this.tootList = result.data;
  }
  async tootDelete(toot: any) {
    if (toot.account.acct !== this.currentUser.acct) {
      console.log("Can't delete someone else's toot");
      return false;
    }
    //todo: delete try-catch 처리
    try {
      const result = await this.$api.deleteToot(toot.id);
      alert("해당 툿을 삭제햇습니다.");
    } catch (err) {
      console.log(err);
    }
  }
}
</script>

<style scoped>
textarea {
  display: block;
  background: #111;
  border: 1px solid #999;
  border-radius: 5px;
  margin: 0.5em auto;
  padding: 1em;
  width: 600px;
  font: inherit;
  color: #fff;
}
.file-btn {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background: #666;
  padding: 0 1em;
  color: #111;
}

label.fileSelect {
  color: #111;
  display: inline-block;
  cursor: pointer;
  padding: 0;
  margin: 0 0.5em;
  background: #666;
  border: 1px solid #999;
}
#fileUploader {
  display: none;
}
div.previews div {
  max-width: 10vw;
  height: 10vw;
  flex-direction: column;
  justify-content: center;
  padding: 0 1em;
  overflow: hidden;
}

div.previews div img {
  max-height: 8vw;
  max-width: 100%;
  height: auto;
}

div.previews div button {
  margin: 0.5em;
}

.toot-form {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

button:hover,
label.fileSelect:hover {
  background-color: #999;
}
.toot-delete-btn {
  float: right;
  background: #666;
  padding: 0 1em;
  color: #111;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
}
.dropdown-content.active {
  display: block;
}
.hashtag {
  background: #666;
  margin-left: 1em;
  /* padding: 0 1em; */
  color: #fff;
  padding-left: 20px;
}
</style>

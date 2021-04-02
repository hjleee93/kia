<template>
    <div>
        <form @submit.prevent="send" @keydown.ctrl.enter.prevent="send">
            <textarea
                placeholder="Toot something!"
                v-model="message"
            ></textarea>
            <div class="previews" v-if="uploads.length > 0">
                <div v-for="image in uploads">
                    <img :src="image.preview_url" />
                    <button @click="unUpload(image)">Delete</button>
                </div>
            </div>
            <div>
                <label
                    title="Upload files"
                    class="fileSelect"
                    for="fileUploader"
                /><button @click="send">Toot!</button>
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
		
		 <div class="sec-grid">
    <!--검색 결과가 없는경우-->
    <template v-if="statuses.length === 0">
      <div class="no-data">
        <p class="txt">검색 결과가 없습니다.</p>
      </div>
    </template>
    <div class="grid">
      <GridItemTest v-for="status in statuses" :toot='status' :key="status.id" />
    </div>
  </div>

        
			
         
        
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import config from "@/lib/config";
import GridItemTest from "../layouts/grid/GridItemTest.vue";

@Component({ components: {GridItemTest} })
export default class Posting extends Vue {
    private message: string = "";
    private uploads: File[] = [];
    private sending!: boolean;
    private replyToId: string = "";
	private statuses: any[] = [];
	private newStatuses: any[] =[];
	private newToot2: any[] = [];

/* api */
	private base = "https://toot.wbcard.org" + "/api/v1";
  private apiBase = this.base + "/timelines";
  private streamBase =
    this.base.replace(/^https?/i, "ws") +
    "/streaming?access_token=" +
    config.token +
    "&stream=";
   private endpoints = {
		toot: this.base + "/statuses",
        media: this.base + "/media",
    rest: {
      home: this.apiBase + "/home",
      fed: this.apiBase + "/public",
      local: this.apiBase + "/public?local=true",
    },
    stream: {
      home: this.streamBase + "user",
      fed: this.streamBase + "public",
      local: this.streamBase + "public:local",
    },
  };

mounted(){
	console.log(this.endpoints)
}

    send() {
        if (this.sending || (!this.message.length && !this.uploads.length)) {
            return true;
        }
        console.log("this.endpoints.toot", this.endpoints.toot)
        this.sending = true;
		//@ts-ignore
        this.$http
            .post(
                this.endpoints.toot,
                {
                    status: this.message,
                    media_ids: this.uploads
                        .slice(0, 4)
						//@ts-ignore
                        .map((upload) => upload.id),
                    in_reply_to_id: this.replyToId,
                },
                {
                    headers: { Authorization: "Bearer " + config.token },
                }
            )
            .then(
                (response: { data: { id: any; }; }) => {
					
                    this.message = "";
                    this.uploads = [];
                    this.sending = false;
                    //@ts-ignore
                    // this.$emit("newToot", response.data);
					
					this.newToot(response.data)
                },
                () => console.log("Request failed.")
            );
    }

    uploadOne(image: File) {
        let formData = new FormData();
        
        formData.append(
            "file",
			//@ts-ignore
            image instanceof File ? image : image.getAsFile()
        );
		//@ts-ignore
        this.$http
            .post(this.endpoints.media, formData, {
                headers: {
                    Authorization: "Bearer " + config.token,
                    "Content-Type": "multipart/form-data",
                    //@ts-ignore
                },
            })
            .then(
                (response: any) => this.uploads.push(response.data),
                () => console.log("Upload failed")
            );
    }

    onSelectFile(e: Event) {
        //@ts-ignore
        let files = e.target!.files || e.dataTransfer.files;
        if (!files.length) {
            return true;
        }
        [...files].map(this.uploadOne);
    }

	newToot (status: { id: any; }) {
      this.statuses = [
        status,
        ...this.statuses.filter(toot => toot.id !== status.id)
                        .slice(0, config.statusLimit - 1)
      ]
    }

	   

	read (howMany = config.statusLimit, option = {}) {

		//@ts-ignore
      let endpoint = this.endpoints.rest[this.timeline]

		//@ts-ignore
      return this.$http.get(endpoint, {
        params: Object.assign({ limit: 5 }, option),
        headers: { Authorization: 'Bearer ' + config.token }
      }).then((response: { bodyText: string; }) => {
        console.log('response', response)
		//@ts-ignore
        var result = JSON.parse(response.bodyText)
		console.log("result",result)
        this.newStatuses = result
      }, () => {
        console.log(endpoint + ' request failed')

      })
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

div {
    display: flex;
    justify-content: center;
    align-items: flex-start;
}

button {
    background: #666;
    padding: 0 1em;
    color: #111;
}

label.fileSelect {
    display: inline-block;
    cursor: pointer;
    /* with 2em the same as the buttons it'd be 2px bigger than the buttons? */
    height: 30.1667px;
    width: 30.1667px;
    padding: 0;
    margin: 0 0.5em;
    background: #666;
    border: 1px solid #999;
    border-radius: 1em;
    background: url("/static/icons/camera.png") center center / 75% no-repeat
        #666;
}

button:hover,
label.fileSelect:hover {
    background-color: #999;
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
</style>

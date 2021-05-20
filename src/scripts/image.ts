
import router from "@/router";
import store from "@/store";

export default {
    getImgArr(img: string) {       
        let imgArr = img.split(",");
        store.commit("sharedImg", imgArr);
        router.push("/mastodon/web/statuses/new");
    }
}
<template>
    <div class="sec-grid" >
        <!--검색 결과가 없는경우-->
        <!--<div class="no-data">
                <p class="txt">검색 결과가 없습니다.</p>
              </div>-->
        <div class="grid">
            <!-- <div > -->
            
         
            <div v-for="i in 99" :key='i' class="grid-item">
                <a href="#" class="btn btn-link">
                    <div class="box-img">
                        <img
                            :src='getImgSrc(i)'
                            alt=""
                            style="width: 100%"
                        />
                        <i class="icon icon-play"></i
                        >
                        <!--동영상인 경우-->
                    </div>
                    <div class="box-cont">
                        <p class="txt">
                            안녕하세32132132... <span>더보기</span>
                        </p>
                        <span class="nic-name">hiid0806</span>
                    </div>
                </a>
                <!--비활성-->
                <button class="btn btn-like"></button>
                <!--활성화-->
                <!--<button class="btn btn-like active"></button>-->
                <!--활성화 모션-->
                <!--<button class="btn btn-like active motion"></button>-->
            
            </div>
        <!-- </div> -->
           
            
        </div>
        
    </div>
    
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";


import {
    getDevice
} from "@/scripts/ui_common";

@Component
export default class GridItem extends Vue {    

    likeToggle() {
        var domBtnLike = Array.prototype.slice.call(document.querySelectorAll(".btn-like"));
        domBtnLike.forEach(function (btnLike) {
          btnLike.addEventListener("click", function () {
            btnLike.classList.contains("active") && btnLike.classList.remove("motion");
            btnLike.classList.toggle("active");

            setTimeout(function() {
              if (btnLike.classList.contains("active"))  {
                btnLike.classList.add("motion");
              }
            }, 0);
          }, false);
        });
      }
    // isotope() {
    //     var elem = document.querySelector(".isotope")!.querySelector(".grid");
    //     var msnry: any = null;
    //     var device: string = null!;
    //     function injection(target: string) {
    //         //isotope script 제거
    //         if (msnry) {
    //             msnry.destroy();
    //             msnry = null;
    //         }
    //         //PC 일경우
    //         if (target === "pc") {
    //             //@ts-ignore
    //             msnry = new Isotope(elem, {
    //                 masonry: {
    //                     columnWidth: ".grid-item",
    //                     itemSelector: ".grid-item",
    //                     fitWidth: true,
    //                 },
    //                 horizontal: true,
    //                 horizontalOrder: false,
    //                 transitionDuration: 0,
    //             });
    //         }
    //         //MOBILE 일경우
    //         else {
    //             //@ts-ignore
    //             msnry = new Isotope(elem, {
    //                 masonry: {
    //                     columnWidth: ".grid-item",
    //                     itemSelector: ".grid-item",
    //                 },
    //                 horizontalOrder: false,
    //                 transitionDuration: 0,
    //             });
    //         }
    //     }

    //     const init = () => {
    //         device = getDevice(); //device
    //         (document.querySelector(
    //             ".sec-grid"
    //         ) as HTMLElement)!.style.display = "none";

    //         setTimeout(function () {
    //             (document.querySelector(
    //                 ".sec-grid"
    //             ) as HTMLElement)!.style.display = "block";
    //             injection(device);
    //         }, 1000);
    //     };

    //     window.addEventListener(
    //         "resize",
    //         () => {
    //             if (
    //                 (device === "mo" && getDevice() === "pc") || //desktop
    //                 (device === "pc" && getDevice() === "mo") //mobile
    //             ) {
    //                 device = getDevice();
    //                 injection(device);
    //             }
    //         },
    //         false
    //     );

    //     init();
    // }
    mounted() {
        this.likeToggle()
        // this.isotope();
    }
    getImgSrc(idx :  number){
        
        var img = '/images/@temp/@temp_hive';
        idx = idx%3 + 1;
        
        return img + idx + '.jpg'
    }
    
    
}
</script>

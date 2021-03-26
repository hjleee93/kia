<template>
    <div id="content" class="rank">
        <!--content(S)-->
        <div class="content">
            <!--날짜 영역-->
            <div class="wrap-fixed">
                <div class="sec-fixed">
                    <!--모바일 전용 탭-->
                    <div class="sec-tab">
                        <div class="box-tab">
                            <ul class="tab-lists">
                                <!--
                        tab 개발시 안내사항
                        
                        tab.init 의 경우
                        .btn-tab.active 초기의 찾아 해당 data-target에 해당하는 content list 활성화 합니다.
                      -->
                                <!--활성화-->
                                <!--<button class="btn btn-tab active">인기 툿</button>-->
                                <!--비활성화-->
                                <!--<button class="btn btn-tab">인기 툿</button>-->
                                <li>
                                    <button
                                        data-target="sec-toot"
                                        class="btn btn-tab active"
                                        onclick="tab.click(this)"
                                    >
                                        <span>인기 툿</span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        data-target="sec-best-user"
                                        class="btn btn-tab"
                                        onclick="tab.click(this)"
                                    >
                                        <span>BEST 사용자</span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        data-target="sec-best-hash"
                                        class="btn btn-tab"
                                        onclick="tab.click(this)"
                                    >
                                        <span>BEST 해시태그</span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--
                    달력 관련하여 개발사에 전달 내용
                    
                    - 날짜 선택 완료 클릭시
                    해당 함수를 호출하기전 개발측에서 제공하는 기능을 만족한 후에
                    아래의 함수를 호출하여 layer를 종료하시면 됩니다.
                    calendar.calendarComplete();
                    
                    - 날짜의 경우 아래의 함수 활용하시면 됩니다.
                    litepicker.options.startDate - 시작 날짜
                    litepicker.options.endDate - 종료 날짜
                -->
                    <div class="sec-calendar">
                        <div class="box-layer">
                            <div class="box-calendar-form">
                                <button class="date" @click="layerOpen">
                                    <span>날짜 선택</span>
                                </button>
                            </div>
                            <div class="box-calendar">
                                <!--모바일 전용 기능(S)-->
                                <div class="m-layer-header">
                                    <button
                                        class="btn btn-m-back"
                                        onclick="calendar.layerClose()"
                                    ></button>
                                    <h2 class="b-tit">날짜 선택</h2>
                                </div>
                                <!--모바일 전용 기능(E)-->
                                <div class="date-header">
                                    <strong class="tit">시작 날짜</strong>
                                    <strong class="tit">종료 날짜</strong>
                                </div>
                                <div class="date-body">
                                    <div class="calendar-group">
                                        <input
                                            id="input-start"
                                            class="form-control"
                                            placeholder="날짜를 선택해주세요."
                                            readonly
                                        />
                                        <input
                                            id="input-end"
                                            class="form-control"
                                            placeholder="날짜를 선택해주세요."
                                            readonly
                                        />
                                    </div>
                                    <div class="box-btn">
                                        <!--비활성화-->
                                        <button
                                            class="btn btn-calendar-complete"
                                            @click="calendarComplete"
                                            disabled="disabled"
                                        >
                                            <span>날짜 선택 완료</span>
                                        </button>
                                        <!--화성화-->
                                        <!--<button class="btn btn-calendar-complete active" onclick="calendar.calendarComplete();"><span>날짜 선택 완료</span></button>-->
                                        <button
                                            class="btn btn-calendar-reset"
                                            @click="calendarReset"
                                        >
                                            <span>초기화</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="dim"></div>
                </div>
            </div>
            <!--컨텐츠 영역-->
            <div class="wrap-content">
                <div class="sec-left">
                    <!--인기 툿-->
                    <div class="sec-toot">
                        <h2 class="b-tit">인기 툿</h2>
                        <div class="box-toot">
                            <div class="toot-lists">
                                <!--이미지가 없는 케이스-->
                                <div class="list">
                                    <div class="box-user-info">
                                        <a href="#none" class="btn btn-user">
                                            <i class="icon icon-user"
                                                ><img
                                                    src="../../assets/images/@temp/@temp_rank2.jpg"
                                                    alt=""
                                            /></i>
                                        </a>
                                        <div class="box-txt">
                                            <strong class="username"
                                                >Sunny Jeong</strong
                                            >
                                            <span class="date">9월 13일</span>
                                        </div>
                                    </div>
                                    <div class="box-content">
                                        <a href="#none" class="btn btn-txt">
                                            광복절이 건국절이 아닌 이유가
                                            삼일절과도 관련이 있다. 3.1 운동을
                                            계기로 하여 한반도를 비롯하여 해외
                                            각지에서 존재하던 독립운동 구심체가
                                            통일된 민주주의 제도의 임시정부
                                            수립운이어져이어이어동으로 이어져...
                                            <span class="more">더보기</span>
                                        </a>
                                        <p class="hash-lists">
                                            <a href="#none" class="btn btn-hash"
                                                >#2020</a
                                            >
                                            <a href="#none" class="btn btn-hash"
                                                >#전시회</a
                                            >
                                            <a href="#none" class="btn btn-hash"
                                                >#하반기</a
                                            >
                                        </p>
                                    </div>
                                    <div class="box-like">
                                        <i class="icon icon-like"></i>
                                        <strong class="like-num">1,504</strong>
                                    </div>
                                    <!--
                        <div class="box-img">
                          <img src="../images/@temp/@temp_rank1.jpg" alt="" />
                        </div>
                        -->
                                </div>
                                <!--이미지가 있는 케이스-->
                                <div class="list">
                                    <div class="box-user-info">
                                        <a href="#none" class="btn btn-user">
                                            <i class="icon icon-user"
                                                ><img
                                                    src="../../assets/images/@temp/@temp_rank2.jpg"
                                                    alt=""
                                            /></i>
                                        </a>
                                        <div class="box-txt">
                                            <strong class="username"
                                                >Sunny Jeong</strong
                                            >
                                            <span class="date">9월 13일</span>
                                        </div>
                                    </div>
                                    <div class="box-content">
                                        <a href="#none" class="btn btn-txt"
                                            >2020년 하반기 전시회 사진입니다.</a
                                        >
                                        <p class="hash-lists">
                                            <a href="#none" class="btn btn-hash"
                                                >#2020</a
                                            >
                                            <a href="#none" class="btn btn-hash"
                                                >#전시회</a
                                            >
                                            <a href="#none" class="btn btn-hash"
                                                >#하반기</a
                                            >
                                        </p>
                                    </div>
                                    <div class="box-like">
                                        <i class="icon icon-like"></i>
                                        <strong class="like-num">1,504</strong>
                                    </div>
                                    <div class="box-img">
                                        <img
                                            src="../../assets/images/@temp/@temp_rank1.jpg"
                                            alt=""
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="sec-right">
                    <!--best 사용자-->
                    <div class="sec-best-user">
                        <h2 class="b-tit">BEST 사용자</h2>
                        <div class="box-best-user">
                            <ol class="best-user-lists">
                                <!-- LOOP 영역
                      <li>
                        <span class="number gold">1</span>
                        <span class="number silver">2</span>
                        <span class="number bronze">3</span>
                        <span class="number">4</span>
                        <i class="icon icon-user"><img src="" alt="" /></i>
                        <span class="username">user name</span>
                        <span class="toot">486 툿</span>
                      </li>
                      -->
                                <li>
                                    <span class="number gold">1</span>
                                    <i class="icon icon-user"
                                        ><img
                                            src="../../assets/images/@temp/@temp_rank2.jpg"
                                            alt=""
                                    /></i>
                                    <span class="username"
                                        >user name user name</span
                                    >
                                    <span class="m-toot">작성한 툿 : 486</span
                                    ><!--mobile 전용-->
                                    <span class="toot">486 툿</span
                                    ><!--desktop 전용-->
                                </li>
                                <li>
                                    <span class="number silver">2</span>
                                    <i class="icon icon-user"
                                        ><img
                                            src="../../assets/images/@temp/@temp_rank2.jpg"
                                            alt=""
                                    /></i>
                                    <span class="username">user name</span>
                                    <span class="m-toot">작성한 툿 : 486</span
                                    ><!--mobile 전용-->
                                    <span class="toot">486 툿</span
                                    ><!--desktop 전용-->
                                </li>
                                <li>
                                    <span class="number bronze">3</span>
                                    <i class="icon icon-user"
                                        ><img
                                            src="../../assets/images/@temp/@temp_rank2.jpg"
                                            alt=""
                                    /></i>
                                    <span class="username">user name</span>
                                    <span class="m-toot">작성한 툿 : 486</span
                                    ><!--mobile 전용-->
                                    <span class="toot">486 툿</span
                                    ><!--desktop 전용-->
                                </li>
                                <li>
                                    <span class="number">4</span>
                                    <span class="username">user name</span>
                                    <span class="m-toot">1,990 툿</span
                                    ><!--mobile 전용-->
                                    <span class="toot">1,990 툿</span
                                    ><!--desktop 전용-->
                                </li>
                                <li>
                                    <span class="number">5</span>
                                    <span class="username">user name</span>
                                    <span class="m-toot">0 툿</span
                                    ><!--mobile 전용-->
                                    <span class="toot">0 툿</span
                                    ><!--desktop 전용-->
                                </li>
                                <li>
                                    <span class="number">6</span>
                                    <span class="username">user name</span>
                                    <span class="m-toot">0 툿</span
                                    ><!--mobile 전용-->
                                    <span class="toot">0 툿</span
                                    ><!--desktop 전용-->
                                </li>
                                <li>
                                    <span class="number">7</span>
                                    <span class="username">user name</span>
                                    <span class="m-toot">0 툿</span
                                    ><!--mobile 전용-->
                                    <span class="toot">0 툿</span
                                    ><!--desktop 전용-->
                                </li>
                                <li>
                                    <span class="number">8</span>
                                    <span class="username">user name</span>
                                    <span class="m-toot">0 툿</span
                                    ><!--mobile 전용-->
                                    <span class="toot">0 툿</span
                                    ><!--desktop 전용-->
                                </li>
                                <li>
                                    <span class="number">9</span>
                                    <span class="username">user name</span>
                                    <span class="m-toot">0 툿</span
                                    ><!--mobile 전용-->
                                    <span class="toot">0 툿</span
                                    ><!--desktop 전용-->
                                </li>
                                <li>
                                    <span class="number">10</span>
                                    <span class="username">user name</span>
                                    <span class="m-toot">0 툿</span
                                    ><!--mobile 전용-->
                                    <span class="toot">0 툿</span
                                    ><!--desktop 전용-->
                                </li>
                            </ol>
                        </div>
                    </div>
                    <!--best 해스태그-->
                    <div class="sec-best-hash">
                        <h2 class="b-tit">BEST 사용자</h2>
                        <div class="box-best-hash">
                            <ol class="best-hash-lists">
                                <li>
                                    <span class="number">1</span>
                                    <p class="hash">
                                        <span>#</span> 해시 태그명 노출
                                    </p>
                                    <span class="toot">486 툿</span>
                                </li>
                                <li>
                                    <span class="number">2</span>
                                    <p class="hash">
                                        <span>#</span> 해시태그명노출노출노노출
                                    </p>
                                    <span class="toot">0 툿</span>
                                </li>
                                <li>
                                    <span class="number">3</span>
                                    <p class="hash">
                                        <span>#</span> 해시 태그명 노출 노출
                                        노출 노출
                                    </p>
                                    <span class="toot">0 툿</span>
                                </li>
                                <li>
                                    <span class="number">4</span>
                                    <p class="hash">
                                        <span>#</span> 해시 태그명 노출 노출
                                        노출 노출
                                    </p>
                                    <span class="toot">0 툿</span>
                                </li>
                                <li>
                                    <span class="number">5</span>
                                    <p class="hash">
                                        <span>#</span> 해시 태그명 노출 노출
                                        노출 노출
                                    </p>
                                    <span class="toot">0 툿</span>
                                </li>
                                <li>
                                    <span class="number">6</span>
                                    <p class="hash">
                                        <span>#</span> 해시 태그명 노출 노출
                                        노출 노출
                                    </p>
                                    <span class="toot">0 툿</span>
                                </li>
                                <li>
                                    <span class="number">7</span>
                                    <p class="hash">
                                        <span>#</span> 해시 태그명 노출 노출
                                        노출 노출
                                    </p>
                                    <span class="toot">0 툿</span>
                                </li>
                                <li>
                                    <span class="number">8</span>
                                    <p class="hash">
                                        <span>#</span> 해시 태그명 노출 노출
                                        노출 노출
                                    </p>
                                    <span class="toot">0 툿</span>
                                </li>
                                <li>
                                    <span class="number">9</span>
                                    <p class="hash">
                                        <span>#</span> 해시 태그명 노출 노출
                                        노출 노출
                                    </p>
                                    <span class="toot">0 툿</span>
                                </li>
                                <li>
                                    <span class="number">10</span>
                                    <p class="hash">
                                        <span>#</span> 해시 태그명 노출 노출
                                        노출 노출
                                    </p>
                                    <span class="toot">0 툿</span>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--content(E)-->
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Litepicker from "litepicker";

@Component
export default class Rank extends Vue {
    calendar: any;
    dim: any;
    gnb: any;
    tab:any;
    // //index 1부터 시작하기 위한 빈 string 적용
    monthArray = [
        "",
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    /**
     * datePicker
     * 개발쪽에서 사용하실때 두개의 props를 이용하여 값을 추출하시면 될것같습니다.
     * litepicker.options.startDate
     * litepicker.options.endDate
     *
     * calendar.getDate 에서도 start 와 end 날짜 제공합니다.
     * 다만 calendarComplete가 실행된후에 값을 저장합니다.
     */
    litepickerInit(): Litepicker {
        return new Litepicker({
            element: document.getElementById("input-start")!,
            elementEnd: document.getElementById("input-end"),
            singleMode: false,
            allowRepick: true,
            inlineMode: true,
            format: "YYYY.MM.DD",
            showTooltip: false,
            zIndex: 1,
            autoApply: true,
            autoRefresh: true,
            resetButton: true, // style로 숨겨놓음 데이터 비울때 쓰기 위함
            //UI 쪽 custom 을 위한 dom modify
            setup: (picker: any) => {
                //달력 month 영역 변경
                picker.on("render:month", (month: HTMLElement) => {
                    var monTxt = month.querySelector(".month-item-name")!
                        .innerHTML;
                    var monNum = 0;
                    this.monthArray.forEach(function (mon: string, i: any) {
                        if (monTxt.includes(mon)) {
                            monNum = i < 10 ? "0" + i : i;
                            return false;
                        }
                    });
                    month.querySelector(".month-item-name")!.innerHTML =
                        "." + monNum;
                });
                //달력 day 부분 변경
                picker.on("render:day", function (day: HTMLElement) {
                    day.innerHTML = "<span>" + day.textContent + "</span>";
                });
                //둘다 선택되면
                picker.on("selected", function (date1: string, date2: string) {
                    if (date1 && date2) {
                        (document.querySelector(
                            ".btn-calendar-complete"
                        ) as HTMLSelectElement).disabled = false;
                        document
                            .querySelector(".btn-calendar-complete")!
                            .classList.add("active");
                    }
                });
                picker.on("before:click", function (target: HTMLElement) {
                    //데이터 비울경우
                    if (target === document.querySelector(".reset-button")) {
                        (document.querySelector(
                            ".btn-calendar-complete"
                        ) as HTMLSelectElement).disabled = true;
                        document
                            .querySelector(".btn-calendar-complete")!
                            .classList.remove("active");
                    }
                });
            },
        });
    }

    mounted() {
        //@ts-ignore
        this.gnb = window.gnb();
        this.gnb.init();
        //@ts-ignore
        this.tab = window.tab();
        this.tab.init();
        //@ts-ignore
        this.dim = window.dim();
        this.dim.init();
        //@ts-ignore
        this.calendar = window.calendar();
        this.calendar.init();
        //ui_common.js 전달용
        //@ts-ignore
        window.litepicker = this.litepickerInit();

        console.log("123",this.dim.open)
    }

    layerOpen() {
        this.calendar.layerOpen();
        this.dim.open()
    }
    calendarComplete() {
        this.calendar.calendarComplete();
    }
    calendarReset(){
      this.calendar.calendarReset();
    }
}
</script>

<style>
</style>
<template>
    <div>
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
</template>


<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import litepicker from "litepicker";
import { dim, gnb, calendar, tab } from "@/scripts/ui_common";

@Component({ components: {} })
export default class Calendar extends Vue {
    private startDate!: Date;
    private endDate!: Date;

    mounted() {
        dim.init();
        gnb.init();
        calendar.init();
        tab.init();
        //@ts-ignore
        window.litepicker = this.litepickerInit();
    }
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
    litepickerInit(): litepicker {
        return new litepicker({
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

    layerOpen() {
        calendar.layerOpen();
    }
    calendarComplete() {
        calendar.calendarComplete();
        // @ts-ignore
        // this.endDate = window.litepicker.options.endDate;
        // // @ts-ignore
        // this.startDate = window.litepicker.options.startDate;

        this.getDate();
    }
    getDate() {
        //캘린더 날짜
        this.startDate = calendar.getDate().start;
        this.endDate = calendar.getDate().end;
        console.log(this.startDate, this.endDate);
    }
    calendarReset() {
        calendar.calendarReset();
    }
}
</script>

<style>
</style>
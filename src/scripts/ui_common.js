"use strict";

if (!Array.prototype.findIndex) {
    Object.defineProperty(Array.prototype, 'findIndex', {
        value: function value(predicate) {
            'use strict';

            if (this == null) {
                throw new TypeError('Array.prototype.findIndex called on null or undefined');
            }

            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }

            var list = Object(this);
            var length = list.length >>> 0;
            var thisArg = arguments[1];
            var value;

            for (var i = 0; i < length; i++) {
                value = list[i];

                if (predicate.call(thisArg, value, i, list)) {
                    return i;
                }
            }

            return -1;
        },
        enumerable: false,
        configurable: false,
        writable: false
    });
} // from:https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/remove()/remove().md


(function (arr) {
    arr.forEach(function (item) {
        if (item.hasOwnProperty('remove')) {
            return;
        }

        Object.defineProperty(item, 'remove', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function remove() {
                if (this.parentNode !== null) this.parentNode.removeChild(this);
            }
        });
    });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]); // Source: https://github.com/jserz/js_piece/blob/master/DOM/ParentNode/append()/append().md


(function (arr) {
    arr.forEach(function (item) {
        if (item.hasOwnProperty('append')) {
            return;
        }

        Object.defineProperty(item, 'append', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function append() {
                var argArr = Array.prototype.slice.call(arguments),
                    docFrag = document.createDocumentFragment();
                argArr.forEach(function (argItem) {
                    var isNode = argItem instanceof Node;
                    docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
                });
                this.appendChild(docFrag);
            }
        });
    });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);

if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
        var el = this;

        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);

        return null;
    };
} // https://tc39.github.io/ecma262/#sec-array.prototype.find


if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
        value: function value(predicate) {
            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            var o = Object(this); // 2. Let len be ? ToLength(? Get(O, "length")).

            var len = o.length >>> 0; // 3. If IsCallable(predicate) is false, throw a TypeError exception.

            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            } // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.


            var thisArg = arguments[1]; // 5. Let k be 0.

            var k = 0; // 6. Repeat, while k < len

            while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kValue be ? Get(O, Pk).
                // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                // d. If testResult is true, return kValue.
                var kValue = o[k];

                if (predicate.call(thisArg, kValue, k, o)) {
                    return kValue;
                } // e. Increase k by 1.


                k++;
            } // 7. Return undefined.


            return undefined;
        },
        configurable: true,
        writable: true
    });
}
/**
 * HIVE gnb controller
 *
 */


var Gnb = function Gnb() {

    var t = 0; //현재 scroll값

    var dir = 0; //-1 => 스크롤 위 1 => 스크롤 아래

    var device = null; // 저장된 device

    var domSecFixed = null; //.sec-fixed

    var domBoxLayer = null; //.box-layer

    var domWrapFixed = null; //.wrap-fixed

    var domHeaderFixed = null; //.header-fixed

    var eventExecuteY = 10; // scroll 10px 이동시 이벤트 발생

    var eventY = 0; //scroll 방향이 바뀐후 이동 거리

    var flagEventScroll = true; //이벤트 진행여부 flag
    //초기화

    var init = function init() {
        domHeaderFixed = document.querySelector(".header-fixed");
        domWrapFixed = document.querySelector(".wrap-fixed");
        domSecFixed = domWrapFixed && domWrapFixed.querySelector(".sec-fixed");
        domBoxLayer = domWrapFixed && domWrapFixed.querySelector(".box-layer");
        if (domWrapFixed) {
            domWrapFixed.style.height = "".concat(getSecFixedRect().height, "px");
        }

        device = getDevice();
    }; //Resize Event


    window.addEventListener("resize", function () {
        var _flag = false; //PC
        if (domSecFixed !== null) {
            if (device === "mo" && isDesktop()) {
                var _t = document.querySelector("html").scrollTop; //gnb

                domSecFixed.style.top = "".concat(Math.max(44 - _t, 0), "px");
                _flag = true;
            } //MOBILE
            else if (device === "pc" && isMobile()) {
                //gnb
                domSecFixed.style.top = 0;
                _flag = true;
            } //Common

        }
        if (_flag) {
            var _search$getDom = search.getDom(),
                searchWrap = _search$getDom.wrap;

            var _hashDropDown$getDom = hashDropDown.getDom(),
                hashWrap = _hashDropDown$getDom.wrap;

            var _tootDropDown$getDom = tootDropDown.getDom(),
                tootWrap = _tootDropDown$getDom.wrap;

            var _albumPop$getDom = albumPop.getDom(),
                albumWrap = _albumPop$getDom.wrap,
                albumWrapDepth2 = _albumPop$getDom.wrapDepth2; //resize시 강제 header open


            domHeaderFixed.classList.remove("close");
            domHeaderFixed.classList.add("open");
            domSecFixed.classList.remove("close");
            domSecFixed.classList.add("open");
            device = getDevice();
            /*search*/

            if (searchWrap) {
                if (isDesktop() && document.querySelector('.btn-m-search').classList.contains("close")) {
                    search.mobileClose();
                } else if (isMobile() && searchWrap.classList.contains("open")) {
                    search.listsClose();
                }

                searchWrap.style.display = isDesktop() ? "block" : "none";
            }
            /*albumshow*/


            if (albumWrap && albumWrap.classList.contains("open")) {
                if (isMobile() && albumWrapDepth2.classList.contains("open")) {
                    albumPop.layerCloseDepth2();
                }

                albumPop.layerClose();
            }
            /*hashDropDown*/


            if (hashWrap && hashWrap.classList.contains("open")) {
                hashDropDown.listsClose();
            }
            /*tootDropDown*/


            if (tootWrap && tootWrap.classList.contains("open")) {
                tootDropDown.listsClose();
            }
            /*height modify*/


            if (domWrapFixed) {
                domWrapFixed.style.height = "".concat(getSecFixedRect().height, "px");
            }
            /*height 0 => scroll event */


            if (isDesktop() && domSecFixed.scrollTop === 0) {
                search.info.flag = true;
            }
        }
    }, false);

    var dropDownOpenCheck = function dropDownOpenCheck() {
        var _search$getDom2 = search.getDom(),
            searchWrap = _search$getDom2.wrap;

        var _hashDropDown$getDom2 = hashDropDown.getDom(),
            hashWrap = _hashDropDown$getDom2.wrap;

        var _tootDropDown$getDom2 = tootDropDown.getDom(),
            tootWrap = _tootDropDown$getDom2.wrap;
        /*hashDropDown*/


        if (isDesktop() && hashWrap && hashWrap.classList.contains("open")) {
            hashDropDown.listsClose();
        }
        /*tootDropDown*/


        if (tootWrap && tootWrap.classList.contains("open")) {
            tootDropDown.listsClose();
        }

        if (isDesktop() && searchWrap && searchWrap.classList.contains("open")) {
            search.listsClose();
        }
    }; //Scroll Event


    window.addEventListener("scroll", function () {
        //search가 존재하고 flag 가 false면
        if (search.info.hasOwnProperty("flag")) {
            if (!search.info.flag) return false;
        }
        if (document.querySelector(".content") !== null) {

            var height = document.querySelector(".content").offsetHeight - 20;
        }
        var endPointT = Math.max(height - window.innerHeight, 0);

        var _t = Math.floor(document.querySelector("html").scrollTop);

        var _dir = _t - t >= 0 ? 1 : -1;
        /*ie 동일한 scroll 여러번 발생 버그*/


        if (_t === t) {
            return false;
        } //PC header영역을 제외한 px 정의


        if (isDesktop()) {
            // domSecFixed.style.top = `${Math.max(44 - _t, 0)}px`;
            if (domSecFixed !== null) {
                domSecFixed.style.top = "44px";
            }
            if (domHeaderFixed !== null && domSecFixed !== null) {
                if (_t <= 44 + (getSecFixedRect().height || 0)) {
                    domHeaderFixed.classList.remove("close");
                    domHeaderFixed.classList.add("open");
                    domSecFixed.classList.remove("close");
                    domSecFixed.classList.add("open");
                    return false;
                }
            } else if (isMobile()) {
                if (_t < getSecFixedRect().height || 0) {
                    domHeaderFixed.classList.remove("close");
                    domHeaderFixed.classList.add("open");
                    domSecFixed.classList.remove("close");
                    domSecFixed.classList.add("open");
                    return false;
                }
            }
        }
        /*MOBILE 위 아래 튕김 현상*/


        if (_t < 0 || _t > endPointT) {
            return false;
        }

        if (dir !== _dir) {
            eventY = _t;
            flagEventScroll = true;
        } else if (flagEventScroll && eventY - eventExecuteY > _t) {
            //위로
            if (domHeaderFixed !== null && !domSecFixed !== null) {
                domHeaderFixed.classList.remove("close");
                domHeaderFixed.classList.add("open");
                domSecFixed.classList.remove("close");
                domSecFixed.classList.add("open");
                flagEventScroll = false;
            }
        } else if (flagEventScroll && eventY + eventExecuteY < _t) {
            //아래로
            if (domHeaderFixed !== null && !domSecFixed !== null) {
                domHeaderFixed.classList.remove("open");
                domHeaderFixed.classList.add("close");
                domSecFixed.classList.remove("open");
                domSecFixed.classList.add("close");
                dropDownOpenCheck();
                flagEventScroll = false;
            }

        }

        t = _t;
        dir = _dir;
    });

    var resize = function resize() {
        domWrapFixed.style.height = "".concat(getSecFixedRect().height, "px");
    };

    return {
        init: init,
        resize: resize
    };
};
/**
 * device 체크
 * @returns {string}
 *
 * @notice
 * 1024 이상은 PC로 간주
 */


var getDevice = function getDevice() {
    return window.outerWidth >= 1024 ? "pc" : "mo";
};

var isDesktop = function isDesktop() {
    return getDevice() === "pc";
};

var isMobile = function isMobile() {
    return getDevice() === "mo";
}; // const closeLayerSearch = () => {
//   document.querySelector(".box-layer").classList.remove("open");
//   document.querySelector(".dim").classList.add("close")
//   document.querySelector(".dim").classList.remove("open");
// }


var getSecFixedRect = function getSecFixedRect() {
    var domSecFixed = document.querySelector("#container .sec-fixed");
    return domSecFixed ? domSecFixed.getBoundingClientRect() : {};
};

var wrapOverflow = function () {
    var domHtml = document.querySelector("html");

    var hidden = function hidden() {
        domHtml.style.overflow = "hidden";
    };

    var auto = function auto() {
        domHtml.style.overflow = "auto";
    };

    return {
        hidden: hidden,
        auto: auto
    };
}();
/**
 *
 * @param wrap
 * @returns {{init: init, txtClick: txtClick, btnDropdownClick: btnDropdownClick, listsClose: listsClose, getDom: (function(): {txt: null, btnLists: null, activeBtn: null, wrap: null}), destroy: destroy, listsOpen: listsOpen}}
 * @constructor
 */


var DropDown = function DropDown(wrap) {
    var domWrap = null;
    var domTxt = null;
    var domBtnLists = null;
    var domActiveBtn = null;
    var info = {};

    var init = function init() {
        domWrap = document.querySelector(wrap);

        if (domWrap) {
            domTxt = domWrap.querySelector(".txt");
            domBtnLists = Array.prototype.slice.call(domWrap.querySelectorAll(".btn-dropdown")); //현재 값 찾기

            domBtnLists.find(function (btn, i) {
                if (btn.classList.contains("active")) {
                    domActiveBtn = btn;
                    domTxt.dataset.val = btn.dataset.val || '';
                    domTxt.querySelector("span").innerHTML = btn.textContent;
                    return true;
                } else {
                    return false;
                }
            });
            info.flag = true;
        }
    };

    var getDom = function getDom() {
        return {
            wrap: domWrap,
            txt: domTxt,
            btnLists: domBtnLists,
            activeBtn: domActiveBtn
        };
    };

    var isMobileHashDropdown = function isMobileHashDropdown() {
        return wrap === ".box-hash-dropdown" && isMobile();
    };

    var listenerFun = function listenerFun(e) {
        e.stopPropagation();

        if (e.currentTarget === domWrap) {
            return false;
        } else {
            listsClose();
        }
    };

    var txtClick = function txtClick() {
        listsOpen();
    };

    var listsOpen = function listsOpen() {
        if (info.flag && domWrap
            /* && domWrap.querySelector(".lists").style.display !== "block"*/
        ) {
            // hash - mobile 일 경우
            if (isMobileHashDropdown()) {
                wrapOverflow.hidden();
                domWrap.classList.add("open");
                var div = document.createElement('div');
                div.id = "boxHashDropdownList";
                domWrap.querySelector(".lists").removeAttribute("style");
                var clone = domWrap.querySelector(".lists").cloneNode(true);
                div.append(clone);
                document.querySelector("#content").append(div);
                domWrap.querySelector(".lists").remove();
                setTimeout(function () {
                    document.querySelector("#boxHashDropdownList").classList.add("open");
                }, 300);
            } else {
                domWrap.querySelector(".lists").style.display = "block";
                setTimeout(function () {
                    domWrap.classList.add("open");
                    document.querySelector("body").addEventListener("click", listenerFun);
                    domWrap.addEventListener("click", listenerFun);
                }, 100);
            }
        }
    };

    var listCloseDesktop = function listCloseDesktop(callback) {
        document.querySelector("body").removeEventListener("click", listenerFun);
        domWrap.removeEventListener("click", listenerFun);
        domWrap.classList.remove("close");
        domWrap.querySelector(".lists").style.display = "none";
        info.flag = true;

        if (callback && typeof callback === 'function') {
            callback();
        }
    };

    var listCloseMobile = function listCloseMobile(callback) {
        domWrap.classList.remove("close");
        var lists = document.querySelector("#boxHashDropdownList .lists").cloneNode(true);

        if (wrap === ".box-hash-dropdown") {
            document.querySelector("#boxHashDropdownList").remove();
        }

        domWrap.append(lists);
        domWrap.querySelector(".lists").style.display = "none";
        info.flag = true;
        wrapOverflow.auto();

        if (callback && typeof callback === 'function') {
            callback();
        }
    };

    var listsClose = function listsClose(callback) {
        if (domWrap) {
            domWrap.classList.add("close");
            domWrap.classList.remove("open");
            info.flag = false; // hash - mobile 일 경우

            if (isMobileHashDropdown()) {
                //mobile 정상 이벤트
                if (document.querySelector("#boxHashDropdownList")) {
                    document.querySelector("#boxHashDropdownList").classList.remove("open");
                    setTimeout(function () {
                        listCloseMobile(callback);
                    }, 300);
                } //mobile resize 될때
                else {
                    listCloseDesktop(callback);
                }
            } else {
                //desktop 정상 이벤트
                if (!document.querySelector("#boxHashDropdownList")) {
                    setTimeout(function () {
                        listCloseDesktop(callback);
                    }, 300);
                } else {
                    document.querySelector("#boxHashDropdownList").classList.remove("open"); // document.querySelector("#boxHashDropdownList").remove();

                    listCloseMobile(callback);
                }
            }
        }
    };

    var btnDropdownClick = function btnDropdownClick(self, callback) {
        if (domWrap && self) {
            var _self$dataset;

            var txt = self.textContent || '';
            var val = ((_self$dataset = self.dataset) === null || _self$dataset === void 0 ? void 0 : _self$dataset.val) || '';
            domTxt.querySelector("span").innerHTML = txt;
            domTxt.dataset.val = val;

            if (document.querySelector("#boxHashDropdownList")) {
                domBtnLists = Array.prototype.slice.call(document.querySelector("#boxHashDropdownList").querySelectorAll(".btn-dropdown"));
                ;
            } else {
                domBtnLists = Array.prototype.slice.call(domWrap.querySelectorAll(".btn-dropdown"));
            }

            domBtnLists.find(function (btn) {
                if (btn.classList.contains("active")) {
                    btn.classList.remove("active");
                }
            });
            self.classList.add("active");
            listsClose(callback);
        }
    };

    var destroy = function destroy() {
        document.querySelector("body").removeEventListener("click", listenerFun);
        domWrap.removeEventListener("click", listenerFun);
        domWrap = null;
        domTxt = null;
        domBtnLists = null;
        domActiveBtn = null;
        info = {};
    };

    return {
        init: init,
        txtClick: txtClick,
        btnDropdownClick: btnDropdownClick,
        listsOpen: listsOpen,
        listsClose: listsClose,
        destroy: destroy,
        getDom: getDom
    };
};


var DropDown2 = function DropDown2(wrap) {
    var domWrap = null;
    var domTxt = null;
    var domBtnLists = null;
    var domActiveBtn = null;
    var info = {};

    var init = function init() {
        domWrap = document.querySelector(wrap);

        if (domWrap) {
            domTxt = domWrap.querySelector(".txt2");
            domBtnLists = Array.prototype.slice.call(domWrap.querySelectorAll(".btn-dropdown2")); //현재 값 찾기
            domBtnLists.find(function (btn, i) {
                if (btn.classList.contains("active")) {
                    domActiveBtn = btn;
                    domTxt.dataset.val = btn.dataset.val || '';
                    domTxt.querySelector("span").innerHTML = btn.textContent;
                    return true;
                } else {
                    return false;
                }
            });
            info.flag = true;
        }
    };

    var getDom = function getDom() {
        return {
            wrap: domWrap,
            txt: domTxt,
            btnLists: domBtnLists,
            activeBtn: domActiveBtn
        };
    };

    var isMobileHashDropdown = function isMobileHashDropdown() {
        return wrap === ".box-hash-dropdown" && isMobile();
    };

    var listenerFun = function listenerFun(e) {
        e.stopPropagation();

        if (e.currentTarget === domWrap) {
            return false;
        } else {
            listsClose();
        }
    };

    var txtClick = function txtClick() {
        listsOpen();
    };

    var listsOpen = function listsOpen() {
        if (info.flag && domWrap
            /* && domWrap.querySelector(".lists").style.display !== "block"*/
        ) {
            // hash - mobile 일 경우
            if (isMobileHashDropdown()) {
                wrapOverflow.hidden();
                domWrap.classList.add("open");
                var div = document.createElement('div');
                div.id = "boxHashDropdownList";
                domWrap.querySelector(".lists2").removeAttribute("style");
                var clone = domWrap.querySelector(".lists2").cloneNode(true);
                div.append(clone);
                document.querySelector("#content").append(div);
                domWrap.querySelector(".lists2").remove();
                setTimeout(function () {
                    document.querySelector("#boxHashDropdownList").classList.add("open");
                }, 300);
            } else {
                domWrap.querySelector(".lists2").style.display = "block";
                setTimeout(function () {
                    domWrap.classList.add("open");
                    document.querySelector("body").addEventListener("click", listenerFun);
                    domWrap.addEventListener("click", listenerFun);
                }, 100);
            }
        }
    };

    var listCloseDesktop = function listCloseDesktop(callback) {
        document.querySelector("body").removeEventListener("click", listenerFun);
        domWrap.removeEventListener("click", listenerFun);
        domWrap.classList.remove("close");
        domWrap.querySelector(".lists2").style.display = "none";
        info.flag = true;

        if (callback && typeof callback === 'function') {
            callback();
        }
    };

    var listCloseMobile = function listCloseMobile(callback) {
        domWrap.classList.remove("close");
        var lists = document.querySelector("#boxHashDropdownList .lists2").cloneNode(true);

        if (wrap === ".box-hash-dropdown") {
            document.querySelector("#boxHashDropdownList").remove();
        }

        domWrap.append(lists);
        domWrap.querySelector(".lists2").style.display = "none";
        info.flag = true;
        wrapOverflow.auto();

        if (callback && typeof callback === 'function') {
            callback();
        }
    };

    var listsClose = function listsClose(callback) {
        if (domWrap) {
            domWrap.classList.add("close");
            domWrap.classList.remove("open");
            info.flag = false; // hash - mobile 일 경우

            if (isMobileHashDropdown()) {
                //mobile 정상 이벤트
                if (document.querySelector("#boxHashDropdownList")) {
                    document.querySelector("#boxHashDropdownList").classList.remove("open");
                    setTimeout(function () {
                        listCloseMobile(callback);
                    }, 300);
                } //mobile resize 될때
                else {
                    listCloseDesktop(callback);
                }
            } else {
                //desktop 정상 이벤트
                if (!document.querySelector("#boxHashDropdownList")) {
                    setTimeout(function () {
                        listCloseDesktop(callback);
                    }, 300);
                } else {
                    document.querySelector("#boxHashDropdownList").classList.remove("open"); // document.querySelector("#boxHashDropdownList").remove();

                    listCloseMobile(callback);
                }
            }
        }
    };

    var btnDropdownClick = function btnDropdownClick(self, callback) {
        if (domWrap && self) {
            var _self$dataset;

            var txt = self.textContent || '';
            var val = ((_self$dataset = self.dataset) === null || _self$dataset === void 0 ? void 0 : _self$dataset.val) || '';
            domTxt.querySelector("span").innerHTML = txt;
            domTxt.dataset.val = val;

            if (document.querySelector("#boxHashDropdownList")) {
                domBtnLists = Array.prototype.slice.call(document.querySelector("#boxHashDropdownList").querySelectorAll(".btn-dropdown2"));
                ;
            } else {
                domBtnLists = Array.prototype.slice.call(domWrap.querySelectorAll(".btn-dropdown2"));
            }

            domBtnLists.find(function (btn) {
                if (btn.classList.contains("active")) {
                    btn.classList.remove("active");
                }
            });
            self.classList.add("active");
            listsClose(callback);
        }
    };

    var destroy = function destroy() {
        document.querySelector("body").removeEventListener("click", listenerFun);
        domWrap.removeEventListener("click", listenerFun);
        domWrap = null;
        domTxt = null;
        domBtnLists = null;
        domActiveBtn = null;
        info = {};
    };

    return {
        init: init,
        txtClick: txtClick,
        btnDropdownClick: btnDropdownClick,
        listsOpen: listsOpen,
        listsClose: listsClose,
        destroy: destroy,
        getDom: getDom
    };
};
/**
 *
 * @returns {{init: init, listsClose: listsClose, btnHistoryClick: btnHistoryClick, getDom: (function(): {btnLists: null, activeBtn: null, inp: null, searchHistory: null, wrap: null}), mobileToggle: mobileToggle, inpFocusOut: (function(): void), btnDeleteClick: btnDeleteClick, destroy: destroy, inpFocus: inpFocus, listsOpen: listsOpen, info: {}}}
 * @constructor
 */


var Search = function Search() {
    var domWrap = null;
    var domInp = null;
    var domBtnLists = null;
    var domActiveBtn = null;
    var domSearchHistory = null;
    var info = {};

    var init = function init() {
        domWrap = document.querySelector(".box-search-input");

        if (domWrap) {
            info.flag = true;
            domInp = domWrap.querySelector("input");
            domBtnLists = Array.prototype.slice.call(domWrap.querySelectorAll(".btn-search"));
            domSearchHistory = domWrap.querySelector(".box-search-history");
        }
    };

    var getDom = function getDom() {
        return {
            wrap: domWrap,
            inp: domInp,
            btnLists: domBtnLists,
            activeBtn: domActiveBtn,
            searchHistory: domSearchHistory
        };
    };

    var listenerFun = function listenerFun(e) {
        if (!e.target.closest(".box-search-input")) {
            listsClose();
        }
    };

    var domInpBlur = function domInpBlur() {
        return domInp.blur();
    };

    var listsOpen = function listsOpen() {

        //검색 한 번 하고 다시 검색하는 경우
        if (domSearchHistory !== null) {
            if (domWrap && domSearchHistory.style.display !== "block") {
                var val = domInp.value;
                info.flag = false;

                if (!val) {
                    historyListsOpen();
                }

                domWrap.classList.add("open");

                if (isDesktop()) {
                    document.querySelector("body").addEventListener("click", listenerFun);
                }

                document.querySelector(".sec-category").style.display = "none"; //PC일경우만

                document.querySelector(".wrap-fixed").style.height = "".concat(getSecFixedRect().height || 0, "px");
                setTimeout(function () {
                    info.flag = true;
                }, 300);
            }
        } else {
            dim.open()
        }
    };

    var listsClose = function listsClose() {
        if (domWrap) {
            info.flag = false; //box-search-input
            //검색 완료가 아닌경우만

            if (!document.querySelector(".btn-search").classList.contains("delete")) {
                document.querySelector(".sec-category").style.display = "block";
            }

            domWrap.classList.remove("open");
            wrapOverflow.auto();
            document.querySelector("body").removeEventListener("click", listenerFun);
            document.querySelector(".wrap-fixed").style.height = "".concat(getSecFixedRect().height || 0, "px");
            historyListsClose();
            domInp.blur();
            setTimeout(function () {
                info.flag = true;
            }, 300);
        }
    };

    var historyListsOpen = function historyListsOpen() {
        if (domWrap) {
            if (isMobile()) {
                wrapOverflow.hidden();
                document.querySelector(".search-history-lists").addEventListener("scroll", domInpBlur);
            }

            domSearchHistory.style.display = "block";
            dim.open();
        }
    };

    var historyListsClose = function historyListsClose() {
        if (domWrap) {
            //최근검색어 클릭한 경우 
            if (document.querySelector(".search-history-lists") !== null) {
                document.querySelector(".search-history-lists").removeEventListener("scroll", domInpBlur);
                domSearchHistory.style.display = "none";
                dim.close();
            } else {
                document.querySelector(".sec-category").style.display = "none";
                document.querySelector(".wrap-fixed").style.height = "".concat(getSecFixedRect().height || 0, "px");
                setTimeout(function () {
                    info.flag = true;
                }, 300);
            }
        }
    };

    var btnHistoryClick = function btnHistoryClick(self) {
        if (domWrap && self) {
            var txt = self.textContent || '';
            domInp.value = txt;
            listsClose();
        }
    };

    var btnDeleteClick = function btnDeleteClick(self) {
        if (domWrap && self) {
            self.closest("li").remove();
        }
    };

    var inpFocus = function inpFocus() {
        init();
        if (domWrap) {
            listsOpen();
        }
    };

    var inpFocusOut = function inpFocusOut() {
        return listsClose();
    }; // const inpKeyUp = (self) => {
    //   const val = self.value || "";
    //   const domBoxSearchInput = self.closest(".box-search-input");
    //   val
    //     ? domBoxSearchInput.querySelector(".btn-search").classList.add("active")
    //     : domBoxSearchInput.querySelector(".btn-search").classList.remove("active")
    // }


    var mobileToggle = function mobileToggle(self) {
        if (domWrap) {
            if (self.classList.contains("open")) {
                mobileOpen();
            } else {
                mobileClose();
            }
        }
    };

    var mobileOpen = function mobileOpen() {
        if (domWrap) {
            info.flag = false;
            domWrap.style.display = "block";
            document.querySelector(".btn-m-search").classList.remove("open");
            document.querySelector(".btn-m-search").classList.add("close");
            document.querySelector(".sec-category").style.display = "none";
            document.querySelector(".wrap-fixed").style.height = "".concat(getSecFixedRect().height || 0, "px");
            setTimeout(function () {
                info.flag = true;
            }, 300);
        }
    };

    var mobileClose = function mobileClose() {
        if (domWrap) {
            info.flag = false;

            if (domWrap.classList.contains("open")) {
                listsClose();
            }

            document.querySelector(".btn-m-search").classList.remove("close");
            document.querySelector(".btn-m-search").classList.add("open");
            domWrap.style.display = "none"; //검색 완료가 아닌경우만

            if (!document.querySelector(".btn-search").classList.contains("delete")) {
                document.querySelector(".sec-category").style.display = "block";
            }

            document.querySelector(".wrap-fixed").style.height = "".concat(getSecFixedRect().height || 0, "px");
            setTimeout(function () {
                info.flag = true;
            }, 300);
        }
    };

    var destroy = function destroy() {
        document.querySelector("body").removeEventListener("click", listsClose);
        domWrap = null;
        domInp = null;
        domBtnLists = null;
        domActiveBtn = null;
        domSearchHistory = null;
        info = {};
    };

    return {
        init: init,
        inpFocus: inpFocus,
        inpFocusOut: inpFocusOut,
        listsOpen: listsOpen,
        listsClose: listsClose,
        btnHistoryClick: btnHistoryClick,
        btnDeleteClick: btnDeleteClick,
        destroy: destroy,
        info: info,
        // mobileOpen,
        // mobileClose,
        mobileToggle: mobileToggle,
        mobileOpen: mobileOpen,
        mobileClose: mobileClose,

        /*element*/
        getDom: getDom,
        historyListsOpen: historyListsOpen,
        historyListsClose: historyListsClose
    };
};
/**
 * dimer 전용
 * @returns {{init: init, close: close, open: open}}
 * @constructor
 */


var Dim = function Dim() {
    var domDim = null;
    var timer = null;

    var init = function init() {
        domDim = document.querySelector(".dim");
    };

    var open = function open() {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        if (!domDim.classList.contains("open")) {
            domDim.classList.add("open");
        }
    };

    var close = function close() {
        if (domDim.classList.contains("open")) {
            domDim.classList.add("close");
            domDim.classList.remove("open");
            timer = setTimeout(function () {
                domDim.classList.remove("close");
            }, 300);
        }
    };

    var destroy = function destroy() {
        domDim = null;
        clearTimeout(timer);
        timer = null;
    };

    return {
        init: init,
        open: open,
        close: close,
        destroy: destroy
    };
};

var Tab = function Tab() {
    var domWrapToot = null;
    var domWrapUser = null;
    var domWrapHash = null;
    var domBtnLists = [];
    var domWrapLists = [];

    var init = function init() {
        domWrapToot = document.querySelector(".sec-toot");
        domWrapUser = document.querySelector(".sec-best-user");
        domWrapHash = document.querySelector(".sec-best-hash");
        domBtnLists = Array.prototype.slice.call(document.querySelector(".sec-tab").querySelectorAll(".btn-tab"));
        domWrapLists = [domWrapToot, domWrapUser, domWrapHash];
        domBtnLists.find(function (btn) {
            if (btn.classList.contains("active")) {
                listsOpen(btn.dataset.target);
            }
        });
    };

    var listsOpen = function listsOpen(target) {
        if (target === "sec-toot") {
            domWrapLists[0].classList.add("open");
        } else if (target === "sec-best-user") {
            domWrapLists[1].classList.add("open");
        } else {
            domWrapLists[2].classList.add("open");
        }

        window.scrollTo(0, 0);
    };

    var click = function click(self) {
        if (self.classList.contains("active")) {
            return false;
        }

        domBtnLists.find(function (btn) {
            return btn.classList.contains("active") && btn.classList.remove("active");
        });
        self.classList.add("active");
        domWrapLists.find(function (wrap) {
            return wrap.classList.contains("open") && wrap.classList.remove("open");
        });
        listsOpen(self.dataset.target);
    };

    var destroy = function destroy() {
        domWrapToot = null;
        domWrapUser = null;
        domWrapHash = null;
        domBtnLists = [];
        domWrapLists = [];
    };

    return {
        init: init,
        click: click,
        destroy: destroy
    };
};
/**
 * 달력
 * @returns {{init: init, calendarComplete: calendarComplete, layerOpen: layerOpen, calendarReset: calendarReset, destroy: destroy, getDate: (function(): {start: null, end: null}), layerClose: layerClose}}
 * @constructor
 */


var Calendar = function Calendar() {
    var domWrap = null;
    var domCalendarForm = null;
    var domCalendar = null;
    var domDate = null;
    var isCompleteDate = null;
    var isReset = null;
    var startDate = null;
    var endDate = null;

    var init = function init() {
        domWrap = document.querySelector(".sec-calendar");
        domCalendarForm = document.querySelector(".box-calendar-form");
        domCalendar = document.querySelector(".box-calendar");
        domDate = document.querySelector(".date");
        isCompleteDate = false;
    };

    var getDate = function getDate() {
        return {
            start: startDate,
            end: endDate
        };
    };

    var listenerFun = function listenerFun(e) {
        e.stopPropagation();

        if (e.currentTarget === domCalendar || e.target.closest(".date")) {
            return false;
        } else {
            layerClose();
        }
    };

    var layerOpen = function layerOpen() {
        if (domWrap) {
            if (isMobile()) {
                wrapOverflow.hidden();
            }

            domDate.classList.add("active");
            domCalendar.style.display = "block";
            setTimeout(function () {
                domCalendar.classList.add("open");
                document.querySelector("body").addEventListener("click", listenerFun);
                domCalendar.addEventListener("click", listenerFun);
            });
            dim.open();
        }
    };

    var layerClose = function layerClose() {
        document.querySelector("body").removeEventListener("click", listenerFun);
        domCalendar.removeEventListener("click", listenerFun);

        if (domWrap && litepicker) {
            if (!isCompleteDate) {
                domDate.classList.remove("active");
            }

            domCalendar.classList.remove("open");
            domCalendar.classList.add("close");
            setTimeout(function () {
                domCalendar.style.display = "none";
                domCalendar.classList.remove("close");

                if (startDate && endDate) {
                    litepicker.options.startDate = startDate;
                    litepicker.options.endDate = endDate;
                    document.querySelector(".btn-calendar-complete").disabled = false;
                    document.querySelector(".btn-calendar-complete").classList.add("active");
                    isCompleteDate = false;
                } else {
                    document.querySelector(".reset-button").click();
                    isCompleteDate = false;
                }

                wrapOverflow.auto();
            }, 300);
            dim.close();
        }
    };

    var excuteDate = function excuteDate() {
        startDate = litepicker.options.startDate;
        endDate = litepicker.options.endDate;

        if (litepicker.options.startDate && litepicker.options.endDate) {
            domDate.querySelector("span").innerHTML = "".concat(startDate.format('YYYY.MM.DD'), " ~ ").concat(endDate.format('YYYY.MM.DD'));
            isCompleteDate = true;
        } else {
            domDate.querySelector("span").innerHTML = '날짜 선택';
            isCompleteDate = false;
        }
    };

    var calendarComplete = function calendarComplete(callback) {
        excuteDate();
        layerClose();

        if (callback && typeof callback === 'function') {
            callback();
        }
    };

    var calendarReset = function calendarReset(callback) {
        if (domWrap && litepicker) {
            document.querySelector(".reset-button").click();
            calendarComplete();

            if (callback && typeof callback === 'function') {
                callback();
            }
        }
    };

    var destroy = function destroy() {
        domWrap = null;
        domCalendarForm = null;
        domCalendar = null;
        domDate = null;
        isDate = null;
        startDate = null;
        endDate = null;
    };

    return {
        init: init,
        getDate: getDate,
        layerOpen: layerOpen,
        layerClose: layerClose,
        calendarComplete: calendarComplete,
        destroy: destroy,
        calendarReset: calendarReset
    };
};
/**
 * 엘범쇼를 컨트롤 하기 위한 함수
 * @returns {{init: init, layerOpen: layerOpen, getDom: (function(): {wrap: null, wrapDepth2: null}), layerOpenDepth2: layerOpenDepth2, destroy: destroy, layerCloseDepth2: layerCloseDepth2, layerClose: layerClose}}
 * @constructor
 */


var LayerPop = function LayerPop() {
    var domWrap = null;
    var domWrapDepth2 = null;
    var openCallback = null;

    var init = function init(callback) {
        domWrap = document.querySelector("#layer");
        domWrapDepth2 = domWrap.querySelector(".layer-depth2");
        openCallback = callback;
    };

    var getDom = function getDom() {
        return {
            wrap: domWrap,
            wrapDepth2: domWrapDepth2
        };
    };

    var layerOpen = function layerOpen() {
        if (domWrap.classList.contains("close")) {
            domWrap.classList.remove("close");
        }

        wrapOverflow.hidden();
        domWrap.style.display = "block";
        setTimeout(function () {
            domWrap.classList.add("open");
            openCallback && openCallback();
        });
    };

    var layerClose = function layerClose(callback) {
        domWrap.classList.add("close");
        domWrap.classList.remove("open");
        setTimeout(function () {
            domWrap.classList.remove("close");
            domWrap.style.display = "none";
            wrapOverflow.auto();

            if (callback && typeof callback === 'function') {
                callback();
            }
        }, 300);
    };

    var layerOpenDepth2 = function layerOpenDepth2(callback) {
        if (domWrapDepth2.classList.contains("close")) {
            domWrapDepth2.classList.remove("close");
        }

        domWrapDepth2.style.display = "block";
        setTimeout(function () {
            domWrapDepth2.classList.add("open");

            if (callback && typeof callback === 'function') {
                callback();
            }
        });
    };

    var layerCloseDepth2 = function layerCloseDepth2(callback) {
        domWrapDepth2.classList.add("close");
        domWrapDepth2.classList.remove("open");
        setTimeout(function () {
            domWrapDepth2.classList.remove("close");
            domWrapDepth2.style.display = "none";

            if (callback && typeof callback === 'function') {
                callback();
            }
        }, 300);
    };

    var destroy = function destroy() {
        domWrap = null;
        domWrapDepth2 = null;
        openCallback = null;
    };

    return {
        init: init,
        layerOpen: layerOpen,
        layerClose: layerClose,
        destroy: destroy,
        layerOpenDepth2: layerOpenDepth2,
        layerCloseDepth2: layerCloseDepth2,
        getDom: getDom
    };
};

function Isotope2() {
    var elem;
    var msnry;
    var device;

    function injection(target) {
        //isotope script 제거
        if (msnry) {
            msnry.destroy();
            msnry = null;
        }
        //PC 일경우
        if (target === "pc") {
            msnry = new Isotope(elem, {
                masonry: {
                    columnWidth: ".grid-item",
                    itemSelector: ".grid-item",
                    fitWidth: true,
                },
                // 반응형
                // horizontal: true,
                // horizontalOrder: false,
                // transitionDuration: 0,
            });
        }
        //MOBILE 일경우
        else {
            msnry = new Isotope(elem, {
                masonry: {
                    columnWidth: ".grid-item",
                    itemSelector: ".grid-item",
                },
                // horizontal: true,
                // horizontalOrder: false,
                // transitionDuration: 0,
            });
        }
    }

    function init() {
        elem = document.querySelector(".hive").querySelector(".grid");
        device = getDevice(); //device

        document.querySelector(
            ".sec-grid")
            .style.display = "none";

        setTimeout(function () {
            document.querySelector(
                ".sec-grid"
            ).style.display = "block";
            injection(device);
        }, 1000);
    };


    window.addEventListener(
        "resize",
        () => {
            if (
                (device === "mo" && getDevice() === "pc") || //desktop
                (device === "pc" && getDevice() === "mo") //mobile
            ) {
                device = getDevice();
                injection(device);
            }
        },
        false
    );

    return {
        init,
        injection
    }
}

/**
 * css처리 하기위한 window height
 * resize발생 할때마다 새로 구함
 */


var appHeight = function appHeight() {
    var timer = null;

    var setHeight = function setHeight() {
        var doc = document.documentElement;
        doc.style.setProperty('--app-height', "".concat(window.innerHeight, "px"));
    };

    setHeight();
    window.addEventListener("resize", function () {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }

        timer = setTimeout(setHeight, 100);
    });
};

var tootDropDown = DropDown(".box-toot-dropdown"); //toot drop down
var tootDropDown2 = DropDown2(".box-toot-dropdown2"); //toot drop down
var hashDropDown = DropDown(".box-hash-dropdown"); //hash drop down

window.hashDropDown = hashDropDown;

var search = Search(); //search box

var dim = Dim();
var gnb = Gnb();
var tab = Tab();
var albumPop = LayerPop();
var calendar = Calendar();
var isotope = Isotope2();

export {
    dim,
    gnb,
    tab,
    calendar,
    albumPop,
    search,
    tootDropDown,
    tootDropDown2,
    hashDropDown,
    isotope,
}

export function initApp() {
    appHeight();
}

export {
    isDesktop,
    isMobile,
    getSecFixedRect,
    getDevice,
}
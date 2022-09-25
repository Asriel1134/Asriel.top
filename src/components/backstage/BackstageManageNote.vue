<script setup>
    import axios from "axios";
    import { getCurrentInstance, ref, computed } from 'vue'
    import ConfirmDialog from "./ConfirmDialog.vue"
    import { store } from '../../store.js'
    const { appContext : { config: { globalProperties } } } = getCurrentInstance()
    const classificationSelected = ref("All")
    const noteClassList = ref([])
    const noteList = ref([])
    const filteredNoteList = ref(["Init"])

    // 初始化
    getNoteList()
    getNoteClassList()

    // 类选框
    const isclassificationMenuShow = ref(false)
    document.addEventListener('click', (e)=>{
        if (e.target.className != 'classificationInput') {
            isclassificationMenuShow.value = false;
        }
    })

    function changeClassificationMenu() {
        isclassificationMenuShow.value = !isclassificationMenuShow.value
    }
    function changeClassification(className) {
        classificationSelected.value = className
        filterNoteByClass()
        pageInit()
    }
    function filterNoteByClass() {
        if (classificationSelected.value == "All") {
            filteredNoteList.value = noteList.value
        } else if (classificationSelected.value == "Star") {
            filteredNoteList.value = []
            for (let i=0; i<noteList.value.length; i++){
                if (noteList.value[i].star == 1){
                    filteredNoteList.value.push(noteList.value[i])
                }
            }
        } else {
            filteredNoteList.value = []
            for (let i=0; i<noteList.value.length; i++){
                if (noteList.value[i].className == classificationSelected.value){
                    filteredNoteList.value.push(noteList.value[i])
                }
            }
        }
    }
    function getNoteClassList() {
        axios({
            method: 'get',
            url: globalProperties.$httpUrl + "/getNoteClassListAndSum",
            headers: {
                token: store.token
            }
        }).then(res => {
            noteClassList.value = res.data
        })
    }

    // 刷新按钮
    const refreshRotateCounter = ref(0)
    const isRefreshRotate = ref(false)
    function refreshNotelist() {
        getNoteClassList()
        getNoteList()
        isRefreshRotate.value = true;
        refreshRotateCounter.value += 1;
        setTimeout(function() {
            refreshRotateCounter.value -= 1
            if (refreshRotateCounter.value == 0) {
                isRefreshRotate.value = false
            }
        }, 500);
    }
    function getNoteList() {
        axios({
            method: 'get',
            url: globalProperties.$httpUrl + "/getNoteList",
            headers: {
                token: store.token
            }
        }).then(res => {
            noteList.value = res.data
            if (filteredNoteList.value[0] == "Init"){
                filteredNoteList.value = res.data
            }
            filterNoteByClass()
            pageInit()
        })
    }

    // 翻页
    const pageUpperLimit = ref(0)
    const pageLowerLimit = ref(0)
    const pageLength = 15
    const computedNoteList = computed(() => {
        return filteredNoteList.value.slice(pageLowerLimit.value-1, pageUpperLimit.value)
    })
    function pageInit() {
        pageLowerLimit.value = 1
        pageUpperLimit.value = Math.min(pageLength, filteredNoteList.value.length)
    }
    function addPage() {
        if (pageUpperLimit.value >= filteredNoteList.value.length){
            return
        } else {
            pageLowerLimit.value = pageUpperLimit.value + 1
            pageUpperLimit.value = Math.min(pageUpperLimit.value + pageLength, filteredNoteList.value.length)
        }
    }
    function reducePage() {
        if (pageLowerLimit.value <= 1){
            return
        } else {
            pageUpperLimit.value = pageLowerLimit.value - 1
            pageLowerLimit.value = pageLowerLimit.value - pageLength
        }
    }

    // Star
    function addStar(note) {
        axios({
            method: 'post',
            url: globalProperties.$httpUrl + "/addNoteStar",
            params: {
                id : note.id
            },
            headers: {
                token: store.token
            }
        }).then(res => {
            if (res.data.data) {
                if (note.star == 0){
                    for (let i=0; i<noteList.value.length; i++) {
                        if (noteList.value[i].id == note.id) {
                            noteList.value[i].star = 1
                        }
                    }
                } else {
                    for (let i=0; i<noteList.value.length; i++) {
                        if (noteList.value[i].id == note.id) {
                            noteList.value[i].star = 0
                        }
                    }
                }
                filterNoteByClass()
            }
        })
    }

    // 删除笔记
    function deleteNoteConfirm(note) {
        confirmData.value = note
        isShowConfirmID.value = note.id
    }
    function deleteNote(note){
        closeConfirmDialog()
        axios({
            method: 'post',
            url: globalProperties.$httpUrl + "/deleteNote",
            params: {
                id : note.id,
                className: note.className
            },
            headers: {
                token: store.token
            }
        }).then(res => {
            if (res.data.data) {
                for (let i=0; i<noteList.value.length; i++) {
                    if (noteList.value[i].id == note.id) {
                        noteList.value.splice(i, 1)
                    }
                }
                filterNoteByClass()
                getNoteClassList()
                if (pageUpperLimit.value > filteredNoteList.value.length) {
                    pageUpperLimit.value -= 1
                }
            }
        })
    }

    // 下载
    function downloadNote(filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename + '.md');
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    // 确认对话框
    const isShowConfirmID = ref(-1)
    const confirmData= ref({})
    function closeConfirmDialog(){
        isShowConfirmID.value = -1
        confirmData.value = {}
    }

</script>

<template>
    <div class="backstage noteManage component">
        <div class="toolBar">
            <div class="left">
                <div class="select">
                    <div class="classificationSelecter" :class="{show: isclassificationMenuShow}" @click="changeClassificationMenu">
                        <input type="text" class="classificationInput" v-model="classificationSelected" disabled>
                        <svg @click="changeClassificationMenu" t="1663477620703" class="selectIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2812" width="12" height="12"><path d="M517.688889 796.444444c-45.511111 0-85.333333-17.066667-119.466667-51.2L73.955556 381.155556c-22.755556-22.755556-17.066667-56.888889 5.688888-79.644445 22.755556-22.755556 56.888889-17.066667 79.644445 5.688889l329.955555 364.088889c5.688889 5.688889 17.066667 11.377778 28.444445 11.377778s22.755556-5.688889 34.133333-17.066667l312.888889-364.088889c22.755556-22.755556 56.888889-28.444444 79.644445-5.688889 22.755556 22.755556 28.444444 56.888889 5.688888 79.644445L637.155556 739.555556c-28.444444 39.822222-68.266667 56.888889-119.466667 56.888888 5.688889 0 0 0 0 0z" p-id="2813" fill="#8a8a8a"></path></svg>
                    </div>
                    <div class="classificationSelecterMenu">
                        <ul v-if="isclassificationMenuShow">
                            <li v-for="(classification, index) in noteClassList" :key="index" class="classificationSelecterMenuLi" @click="changeClassification(classification.className)">
                                <a class="className">{{classification.className}}</a>
                                <a class="noteCount">{{classification.noteCount}}</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <button class="refresh" :class="{rotate: isRefreshRotate}" @click="refreshNotelist">
                    <svg t="1663513686869" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2561" width="16" height="16"><path d="M187.456 425.024a336 336 0 0 0 368.384 420.224 48 48 0 0 1 12.544 95.168 432 432 0 0 1-473.664-540.16l-57.28-15.36a12.8 12.8 0 0 1-6.272-20.928l159.168-179.456a12.8 12.8 0 0 1 22.144 5.888l48.064 235.072a12.8 12.8 0 0 1-15.808 14.912l-57.28-15.36zM836.48 599.04a336 336 0 0 0-368.384-420.224 48 48 0 1 1-12.544-95.168 432 432 0 0 1 473.664 540.16l57.28 15.36a12.8 12.8 0 0 1 6.272 20.928l-159.168 179.456a12.8 12.8 0 0 1-22.144-5.888l-48.064-235.072a12.8 12.8 0 0 1 15.808-14.912l57.28 15.36z" fill="#595959" p-id="2562"></path></svg>
                </button>
                <button>
                    <svg t="1663611318336" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2686" width="16" height="16"><path d="M952 896l-204.992-204.992q86.016-106.016 86.016-243.008 0-159.008-112.512-271.488T448.512 64t-272 112.512T64 448.512t112.512 272T448 833.024q136.992 0 242.016-84.992l204.992 204q12 12 28.512 12t28-11.488 11.488-28-11.008-28.512z m-381.984-160Q512 760.992 448 760.992q-63.008 0-120.992-24.992-56-23.008-100-66.016Q184 625.984 160 569.984q-24-58.016-24-122.016 0-63.008 24-120.992 24-56 67.008-99.008 44-44 100-68 58.016-24 120.992-24 64 0 122.016 24 56 24 99.488 67.488T736 326.944q24.992 58.016 24.992 122.016 0 63.008-24.992 120.992-23.008 56-66.016 100-44 43.008-100 66.016z" p-id="2687" fill="#515151"></path></svg>
                </button>
                <button @click="">
                    <svg t="1664039916875" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2556" width="16" height="16"><path d="M465.02 467l-0.086-309.988C464.928 132.16 485.07 112.006 509.922 112c24.852-0.006 45.006 20.134 45.012 44.988l0.086 310.012h310.21c24.852 0 45 20.148 45 45s-20.148 45-45 45H555.046l0.084 309.988c0.008 24.852-20.134 45.006-44.986 45.012-24.854 0.006-45.006-20.134-45.014-44.988l-0.084-310.012H157C132.148 557 112 536.852 112 512s20.148-45 45-45h308.02z" p-id="2557" fill="#515151"></path></svg>
                </button>
            </div>
            <div class="right">
                <button class="reducePage" @click="reducePage">
                    <svg t="1663519461169" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2524" width="12" height="12"><path d="M312.888889 995.555556c-17.066667 0-28.444444-5.688889-39.822222-17.066667-22.755556-22.755556-17.066667-56.888889 5.688889-79.644445l364.088888-329.955555c11.377778-11.377778 17.066667-22.755556 17.066667-34.133333 0-11.377778-5.688889-22.755556-17.066667-34.133334L273.066667 187.733333c-22.755556-22.755556-28.444444-56.888889-5.688889-79.644444 22.755556-22.755556 56.888889-28.444444 79.644444-5.688889l364.088889 312.888889c34.133333 28.444444 56.888889 73.955556 56.888889 119.466667s-17.066667 85.333333-51.2 119.466666l-364.088889 329.955556c-11.377778 5.688889-28.444444 11.377778-39.822222 11.377778z" p-id="2525"></path></svg>
                </button>
                <a class="pageCount">{{pageLowerLimit}}-{{pageUpperLimit}} OF {{filteredNoteList.length}}</a>
                <button class="addPage" @click="addPage">
                    <svg t="1663519461169" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2524" width="12" height="12"><path d="M312.888889 995.555556c-17.066667 0-28.444444-5.688889-39.822222-17.066667-22.755556-22.755556-17.066667-56.888889 5.688889-79.644445l364.088888-329.955555c11.377778-11.377778 17.066667-22.755556 17.066667-34.133333 0-11.377778-5.688889-22.755556-17.066667-34.133334L273.066667 187.733333c-22.755556-22.755556-28.444444-56.888889-5.688889-79.644444 22.755556-22.755556 56.888889-28.444444 79.644444-5.688889l364.088889 312.888889c34.133333 28.444444 56.888889 73.955556 56.888889 119.466667s-17.066667 85.333333-51.2 119.466666l-364.088889 329.955556c-11.377778 5.688889-28.444444 11.377778-39.822222 11.377778z" p-id="2525"></path></svg>    
                </button>
            </div>
        </div>

        <div class="noteListArea">
            <ul>
                <li v-for="(note, index) in computedNoteList" :key="index" :class="{'lastOne': index==computedNoteList.length-1}">
                    <div class="noteInfos">
                        <div class="titleAndDes">
                            <i class="fa star" :class="{'fa-star-o': note.star==0, 'fa-star': note.star==1}" aria-hidden="true" @click="addStar(note)"></i>
                            <a class="title">{{note.title}}</a>
                            <a class="description">{{note.description}}</a>
                        </div>
                        <a class="changeTime">{{note.changeTime}}</a>
                    </div>
                    <div class="controlButtons">
                        <svg @click="$emit('editNote', note)" t="1663609098243" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5628" data-spm-anchor-id="a313x.7781069.0.i2" width="20" height="20"><path d="M257.7 752c2 0 4-0.2 6-0.5L431.9 722c2-0.4 3.9-1.3 5.3-2.8l423.9-423.9c3.9-3.9 3.9-10.2 0-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2c-1.9 11.1 1.5 21.9 9.4 29.8 6.6 6.4 14.9 9.9 23.8 9.9z m67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z" p-id="5629" data-spm-anchor-id="a313x.7781069.0.i4" class="selected"></path></svg>
                        <svg @click="downloadNote(note.title, note.text)" t="1663609389142" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6703" width="20" height="20"><path d="M557 564.974l153.188-181.04c16.054-18.972 44.448-21.34 63.42-5.286 18.972 16.054 21.338 44.448 5.284 63.42L550.56 711.92a44.982 44.982 0 0 1-8.95 10.254 44.872 44.872 0 0 1-15.082 8.432A44.944 44.944 0 0 1 512 733c-16.264 0-30.512-8.628-38.42-21.556L245.65 442.068c-16.052-18.972-13.686-47.366 5.286-63.42 18.972-16.052 47.366-13.686 63.42 5.286l152.646 180.4V157c0-24.852 20.148-45 45-45s45 20.148 45 45v407.974zM823 630c0-24.852 20.148-45 45-45s45 20.148 45 45v238c0 24.87-20.176 45.026-45.046 45l-710-0.726c-24.834-0.026-44.954-20.166-44.954-45V630c0-24.852 20.148-45 45-45s45 20.148 45 45v192.32l620 0.634V630z" p-id="6704"></path></svg>
                        <svg @click="deleteNoteConfirm(note)" t="1663611049465" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2383" width="20" height="20"><path d="M608 768c-17.696 0-32-14.304-32-32L576 384c0-17.696 14.304-32 32-32s32 14.304 32 32l0 352C640 753.696 625.696 768 608 768z" p-id="2384"></path><path d="M416 768c-17.696 0-32-14.304-32-32L384 384c0-17.696 14.304-32 32-32s32 14.304 32 32l0 352C448 753.696 433.696 768 416 768z" p-id="2385"></path><path d="M928 224l-160 0L768 160c0-52.928-42.72-96-95.264-96L352 64C299.072 64 256 107.072 256 160l0 64L96 224C78.304 224 64 238.304 64 256s14.304 32 32 32l832 0c17.696 0 32-14.304 32-32S945.696 224 928 224zM320 160c0-17.632 14.368-32 32-32l320.736 0C690.272 128 704 142.048 704 160l0 64L320 224 320 160z" p-id="2386"></path><path d="M736.128 960 288.064 960c-52.928 0-96-43.072-96-96L192.064 383.52c0-17.664 14.336-32 32-32s32 14.336 32 32L256.064 864c0 17.664 14.368 32 32 32l448.064 0c17.664 0 32-14.336 32-32L768.128 384.832c0-17.664 14.304-32 32-32s32 14.336 32 32L832.128 864C832.128 916.928 789.056 960 736.128 960z" p-id="2387"></path></svg>
                        <ConfirmDialog @confirm="deleteNote" @cancel="closeConfirmDialog" :data="confirmData" :isShowConfirm="isShowConfirmID == note.id" titleText="" :content="'确定删除 ' + note.title + ' 吗？'" cancelText="取消" confirmText="确定"></ConfirmDialog>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
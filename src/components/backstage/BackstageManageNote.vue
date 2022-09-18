<script setup>
    import axios from "axios";
    import { getCurrentInstance, ref } from 'vue';
    import {store} from '../../store.js'
    const { appContext : { config: { globalProperties } } } = getCurrentInstance()
    const classificationSelected = ref("All")
    const noteClassList = ref([])
    const noteList = ref([])
    const filteredNoteList = ref(["Init"])

    // 初始化
    getNoteList()
    getNoteClassList()

    // 类选框
    let isclassificationMenuShow = ref(false)
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
    }
    function getNoteClassList() {
        axios({
            method: 'get',
            url: globalProperties.$httpUrl + "/getNoteClassList",
            headers: {
                token: store.token
            }
        }).then(res => {
            noteClassList.value = res.data
        })
    }

    // 刷新按钮
    let refreshRotateCounter = ref(0)
    let isRefreshRotate = ref(false)
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
        })
    }

    // 翻页
    function addPage() {

    }
    function reducePage() {
        
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
            </div>
            <div class="right">
                <button class="reducePage" @click="reducePage">
                    <svg t="1663519461169" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2524" width="12" height="12"><path d="M312.888889 995.555556c-17.066667 0-28.444444-5.688889-39.822222-17.066667-22.755556-22.755556-17.066667-56.888889 5.688889-79.644445l364.088888-329.955555c11.377778-11.377778 17.066667-22.755556 17.066667-34.133333 0-11.377778-5.688889-22.755556-17.066667-34.133334L273.066667 187.733333c-22.755556-22.755556-28.444444-56.888889-5.688889-79.644444 22.755556-22.755556 56.888889-28.444444 79.644444-5.688889l364.088889 312.888889c34.133333 28.444444 56.888889 73.955556 56.888889 119.466667s-17.066667 85.333333-51.2 119.466666l-364.088889 329.955556c-11.377778 5.688889-28.444444 11.377778-39.822222 11.377778z" p-id="2525"></path></svg>
                </button>
                <a class="pageCount">1-20 OF 200</a>
                <button class="addPage" @click="addPage">
                    <svg t="1663519461169" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2524" width="12" height="12"><path d="M312.888889 995.555556c-17.066667 0-28.444444-5.688889-39.822222-17.066667-22.755556-22.755556-17.066667-56.888889 5.688889-79.644445l364.088888-329.955555c11.377778-11.377778 17.066667-22.755556 17.066667-34.133333 0-11.377778-5.688889-22.755556-17.066667-34.133334L273.066667 187.733333c-22.755556-22.755556-28.444444-56.888889-5.688889-79.644444 22.755556-22.755556 56.888889-28.444444 79.644444-5.688889l364.088889 312.888889c34.133333 28.444444 56.888889 73.955556 56.888889 119.466667s-17.066667 85.333333-51.2 119.466666l-364.088889 329.955556c-11.377778 5.688889-28.444444 11.377778-39.822222 11.377778z" p-id="2525"></path></svg>
                </button>
            </div>
        </div>

        <div class="noteListArea">

        </div>
    </div>
</template>
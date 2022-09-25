<script setup>
    import axios from "axios";
    import { ref, getCurrentInstance } from 'vue'
    import { store } from '../../store.js'
    const { appContext : { config: { globalProperties } } } = getCurrentInstance()
    const props = defineProps(['note'])
    const note = ref(props.note)

    // 类选框
    const noteClassList = ref([])
    const isclassificationMenuShow = ref(false)
    const classificationSelected = ref(note.value.className)
    getNoteClassList()
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
        note.value.className = className
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

    function addStar() {
        note.value.star = note.value.star==1 ? 0 : 1
    }

    const warnMessage = ref("")
    const messageAnim = ref("")
    function updateNote() {
        axios({
            method: 'post',
            url: globalProperties.$httpUrl + "/updateNote",
            params: {
                id: note.value.id,
                title: note.value.title,
                text: note.value.text,
                description: note.value.description,
                author: note.value.author,
                className: note.value.className,
                star: note.value.star
            },
            headers: {
                token: store.token
            }
        }).then(res => {
            console.log(res.data);
            warnMessage.value = res.data.msg
            messageAnim.value = "anim"
            function resetAnim() {
                messageAnim.value=''
            }
            setTimeout(resetAnim, 200)
        })
    }
</script>

<template>
    <div class="noteEditer">
        <div class="noteInfo">
            <a class="author">Author: {{note.author}}</a>
            <div class="boxTitle">
                <a>Edit Note</a>
                <i class="fa star" :class="{'fa-star-o': note.star==0, 'fa-star': note.star==1}" aria-hidden="true" @click="addStar"></i>
            </div>
            <div class="inputBox">
                <a class="inputTitle">Title</a>
                <input class="title" type="text" v-model="note.title">
            </div>
            <div class="inputBox">
                <a class="inputTitle">Description</a>
                <input class="description" type="text" v-model="note.description">
            </div>
            <div class="inputBox">
                <a class="inputTitle">Classification</a>
                <div class="select">
                    <div class="classificationSelecter" :class="{show: isclassificationMenuShow}" @click="changeClassificationMenu">
                        <input type="text" class="classificationInput" v-model="classificationSelected" disabled>
                        <svg @click="changeClassificationMenu" t="1663477620703" class="selectIcon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2812" width="12" height="12"><path d="M517.688889 796.444444c-45.511111 0-85.333333-17.066667-119.466667-51.2L73.955556 381.155556c-22.755556-22.755556-17.066667-56.888889 5.688888-79.644445 22.755556-22.755556 56.888889-17.066667 79.644445 5.688889l329.955555 364.088889c5.688889 5.688889 17.066667 11.377778 28.444445 11.377778s22.755556-5.688889 34.133333-17.066667l312.888889-364.088889c22.755556-22.755556 56.888889-28.444444 79.644445-5.688889 22.755556 22.755556 28.444444 56.888889 5.688888 79.644445L637.155556 739.555556c-28.444444 39.822222-68.266667 56.888889-119.466667 56.888888 5.688889 0 0 0 0 0z" p-id="2813" fill="#8a8a8a"></path></svg>
                    </div>
                    <div class="classificationSelecterMenu">
                        <ul v-if="isclassificationMenuShow">
                            <li v-for="(classification, index) in noteClassList" :key="index" class="classificationSelecterMenuLi" @click="changeClassification(classification.className)">
                                <a class="className">{{classification.className}}</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <button class="addClass">
                    <svg t="1663780373337" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2552" width="16" height="16"><path d="M512 832a32 32 0 0 0 32-32v-256h256a32 32 0 0 0 0-64h-256V224a32 32 0 0 0-64 0v256H224a32 32 0 0 0 0 64h256v256a32 32 0 0 0 32 32" p-id="2553" fill="#515151"></path></svg>    
                </button>
            </div>
            <div class="submitArea">
                <button class="submit" @click="updateNote">
                    Submit
                </button>
                <button  class="cancel" @click="$emit('returnFromNoteEditer')">
                    Return
                </button>
                <a class="warnMessage" :class="messageAnim">{{warnMessage}}</a>
            </div>
        </div>
        <div class="editer">
            <v-md-editor v-model="note.text" height="725px"></v-md-editor>
        </div>
    </div>
</template>
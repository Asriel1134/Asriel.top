<script setup>
    import IndexNavbar from "./index/IndexNavbar.vue"
    import IndexSidebar from "./index/IndexSidebar.vue";
    import { ref } from 'vue'
    import axios from 'axios'

    const darkMode = ref(false)
    const sidebarMode = ref(false)
    const hitokoto = ref({
        hitokoto: "——",
        from: " ",
    })

    getHitokoto()   

    function changeDarkMode() {
        darkMode.value = !darkMode.value
    }

    let siderTimer = 0
    function changeSidebar() {
        if (!sidebarMode.value && siderTimer == 0){
            sidebarMode.value = true;
            siderTimer = 1;
        } else if (sidebarMode.value && siderTimer == 1) {
            sidebarMode.value = false;
            setTimeout(function(){
                siderTimer--;
            }, 500)
        }
    }

    function getHitokoto() {
        axios.get(
            'https://v1.hitokoto.cn/?c=c&c=d',
        ).then(res => {
            hitokoto.value.hitokoto = res.data.hitokoto
            hitokoto.value.from = res.data.from
        })
    }
</script>

<template>
    <div class="container">
        <IndexNavbar @change-sidebar="changeSidebar"/>
        <div class="titleBox">
            <span class="title">Asriel.top</span>
            <span class="hitokoto" @click="getHitokoto">{{hitokoto.hitokoto}}</span>
        </div>
        <IndexSidebar :sidebarMode="sidebarMode" @change-sidebar="changeSidebar" @change-darkMode="changeDarkMode" @get-hitokoto="getHitokoto"/>
    </div>
</template>

<style scoped>
*{
    margin: 0;
    padding: 0;
    caret-color: rgba(0,0,0,0);
    user-select: none;
}
.container {
    height: 100vh;
    width: 100%;
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("@/assets/img/home.png");
    background-position: center;
    background-size: cover;
    z-index: 0;
    display: flex;
    flex-direction: column;
}
.titleBox {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding-bottom: 11%;
    overflow: auto;
}
.title {
    color: #fff;
    font-size: calc(1em + 4vw);
    letter-spacing: .2em;
    font-weight: 700;
    padding-bottom: 1%;
}
.hitokoto {
    /* padding-left: 10%; */
    font-size: calc(0.4em + 0.7vw);
    color: rgb(219, 219, 219);
    cursor: pointer;
}
</style>
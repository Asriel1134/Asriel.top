<script setup>
    defineProps({
        sidebarMode: {
            type: Boolean,
            required: true,
        }
    })
</script>

<template>
    <transition name="sidebarBg">
        <div v-if="sidebarMode" class="sidebarBox">
            <div class="sidebar">
                <div class="avatarBox">
                    <img class="avatar" src="@/assets/img/avatar.gif" alt="Asriel" />
                </div>
                <ul class="sidebarMenu">
                    <router-link to="/project"><li>项目展示</li></router-link>
                    <router-link to="/note"><li>笔记</li></router-link>
                    <router-link to="/"><li>游戏</li></router-link>
                    <router-link to="/tool"><li>工具</li></router-link>
                    <router-link to="/"><li>留言板</li></router-link>
                </ul>
                <div class="buttonArea">
                    <i @click="$emit('change-darkMode')" class="fa fa-moon-o fa-lg button" aria-hidden="true"></i>
                    <i @click="$emit('get-hitokoto')" class="fa fa-send-o fa-lg button" aria-hidden="true" style="margin-right: 0;"></i>
                </div>
            </div>
            <div @click="$emit('change-sidebar')" class="sidebarFill"></div>
        </div>
    </transition>
</template>

<style scoped>
.sidebarFill {
    flex: 1;
}
.sidebarBox {
    position: absolute;
    height: 100vh;
    width: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
    background-color: rgb(0, 0, 0, 0.3);
    display: flex;
}
.sidebarBg-enter-active,
.sidebarBg-leave-active,
.sidebarBg-enter-active .sidebar,
.sidebarBg-leave-active .sidebar {
    transition: all .3s;
}
.sidebarBg-enter-from,
.sidebarBg-leave-to {
    background-color: rgb(0, 0, 0, 0);
}
.sidebarBg-enter-from .sidebar,
.sidebarBg-leave-to .sidebar {
    transform: translateX(-100%);
}
.sidebar {
    height: 100vh;
    width: 12%;
    min-width: 180px;
    background-color: rgb(250, 250, 250);
    display: flex;
    flex-direction: column;
    align-items: center;
}
.avatarBox {
    height: 130px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.avatar {
    margin-top: 30px;
    margin-bottom: 40px;
    width: 60px;
    border-radius: 50%;
}
.sidebarMenu {
    width: 100%;
    list-style: none;
    padding-left: 0;
}
.sidebarMenu li{
    padding-left: 13%;
    padding-top: 7%;
    padding-bottom: 7%;
    border-left: solid 3px rgb(250, 250, 250);
}
.sidebarMenu a{
    text-decoration: none;
    color: #000;
}
.sidebarMenu li:hover{
    background-color: rgba(228, 228, 228, 0.7);
    border-left: solid 3px rgb(88, 88, 88);
    cursor: pointer;
}
.buttonArea {
    margin-top: auto;
    margin-bottom: 7%;
}
.button {
    margin-right: 20px;
    cursor: pointer;
}
</style>
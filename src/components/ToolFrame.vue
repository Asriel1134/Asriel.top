<script setup>
import { ref } from 'vue'
import Navbar from './general/GeneralNavbar.vue'
import Sidebar from './general/GeneralSidebar.vue'

const sidebarMode = ref(false)

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
</script>

<template>
    <div class="container">
        <Navbar @change-sidebar="changeSidebar" title="Tool" current-page="tool"></Navbar>
        <Sidebar :sidebarMode="sidebarMode" @change-sidebar="changeSidebar"></Sidebar>
        <div style="height: 200vh;"></div>
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
    /* background-image: ; */
    background-position: center;
    background-size: cover;
    z-index: 0;
}
</style>
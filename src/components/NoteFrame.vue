<script setup>
import { ref } from 'vue'
import Navbar from './note/NoteNavbar.vue'
import Sidebar from './general/GeneralSidebar.vue'
import Side from './note/NoteSide.vue'

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
        <Navbar @change-sidebar="changeSidebar" title="Note" current-page="note"></Navbar>
        <Sidebar :sidebarMode="sidebarMode" @change-sidebar="changeSidebar"></Sidebar>
        <Side />
        <div style="height: 1500px;"></div>
    </div>
</template>

<style scoped>
*{
    margin: 0;
    padding: 0;
    /* caret-color: rgba(0,0,0,0); */
    user-select: none;
}
.container {
    width: 100%;
    background-image: linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0)), url();
    background-repeat: no-repeat;
    background-size: contain;
    z-index: 0;
}
</style>
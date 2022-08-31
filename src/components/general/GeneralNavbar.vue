<script setup>
import { ref } from 'vue'

    const props = defineProps(['title', 'currentPage'])

    const isCurrentPage = ref(['isHome', 'isProject', 'isNote', 'isTool'])
    isCurrentPage.value.isHome = props.currentPage=="home" ? true : false
    isCurrentPage.value.isProject = props.currentPage=="project" ? true : false
    isCurrentPage.value.isNote = props.currentPage=="note" ? true : false
    isCurrentPage.value.isTool = props.currentPage=="tool" ? true : false
</script>

<template>
    <div class="navbar">
        <div class="container">
            <i  @click="$emit('change-sidebar')" class="fa fa-bars fa-lg menu"  aria-hidden="true"></i>
            <a class="title">{{title}}</a>
            <div class="nav">
                <ul>
                    <li :class="{currentPage:isCurrentPage.isHome}"><router-link to="/">HOME</router-link><i></i></li>
                    <li :class="{currentPage:isCurrentPage.isProject}"><router-link to="/project">PROJECT</router-link><i></i></li>
                    <li :class="{currentPage:isCurrentPage.isNote}"><router-link to="/note">NOTE</router-link><i></i></li>
                    <li :class="{currentPage:isCurrentPage.isTool}" style="margin-right: 0;"><router-link to="/tool">TOOL</router-link><i></i></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.navbar {
    height: 48px;
    /* height: 5.5vh; */
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: rgb(255, 255, 255);
    transition: all 0.15s;
    border-bottom: solid 1px rgba(60, 60, 60, 0.12);
    position: fixed;
}
.container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1350px;
}
/* .navbar:hover {
    background-color: rgba(197, 197, 197, 0.);
    transition: all 0.15s;
} */
.title {
    margin-left: 11%;
    font-size: 110%;
    color: #000;
    overflow: hidden;
    text-overflow: ellipsis;
}
.menu {
    padding-left: 20px;
    cursor: pointer;
    font-size: 100%;
    color: #000;
    transition: color 0.5s;
}
.nav {
    padding-right: 20px;
}
.nav ul {
    display: flex;
    align-items: center;
}
.nav ul li {
    font-size: 100%;
    list-style: none;
    display: inline-block;
    margin-right: 30px;
    position: relative;
    overflow: hidden;
}
.nav ul li a {
    text-decoration: none;
    color: #000;
    transition: color 0.5s;
}
.nav ul li i {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0%;
    height: 2px;
    background-color: rgba(17, 180, 17, 0);
    border-radius: 1px;
}
.nav ul li a:hover ~ i{
    width: 100%;
    transition: all .3s ease-out;
    background-color: rgb(0, 179, 0);
}
.currentPage i {
    width: 100% !important;
    background-color: rgb(0, 179, 0) !important;
}
.currentPage a {
    width: 100% !important;
    color: rgb(0, 179, 0) !important;
}
</style>
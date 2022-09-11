<script setup>
    import {reactive } from 'vue'
    const searchText = reactive("")
</script>

<template>
    <div class="container">
        <input class="search" v-model="searchText" type="text">
        <!-- <svg t="1662472209246" class="search_icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2340"><path d="M469.333 192c153.174 0 277.334 124.16 277.334 277.333 0 68.054-24.534 130.411-65.216 178.688L846.336 818.24l-48.341 49.877L630.4 695.125a276.053 276.053 0 0 1-161.067 51.542C316.16 746.667 192 622.507 192 469.333S316.16 192 469.333 192z m0 64C351.51 256 256 351.51 256 469.333s95.51 213.334 213.333 213.334 213.334-95.51 213.334-213.334S587.157 256 469.333 256z" p-id="2341"></path></svg> -->
        <div class="search_button">搜索</div>
    </div>
</template>

<style scoped>
.search {
    width: 90%;
    border: solid 1px rgb(218, 218, 218);
    border-radius: 7px;
    margin-top: 10px;
    height: 28px;
    background-color: rgb(255, 255, 255);
    text-indent: 35px;
    font-size: 0.9em;
}
.search:focus {
    outline: rgba(0, 0, 0, 0.596) solid 1px;
}
/* .search_icon {
    position: relative;
    right: 19px;
    top: 13px;
    width: 25px;
    height: 25px;
    content: " ";
    background-image: url();
    background-size: 30px;
} */
.search_button {
    background-color: rgba(0, 179, 0, 0.747);
    border-radius: 0 7px 7px 0;
    position: absolute;
    right: 12px;
    width: 40px;
    top: 10px;
    padding: 2px 4px;
    height: 28px;
    line-height: 30px;
    text-align: center;
    font-size: 90%;
    cursor: pointer;
}
</style>
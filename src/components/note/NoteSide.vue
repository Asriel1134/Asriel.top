<script setup>
    // import NoteClassification from './NoteClassification.vue';
    // import PersonInformation from './PersonInformation.vue';
    // import NoteSearch from './NoteSearch.vue'
</script>

<template>
    <div class="noteLeftBar">
        <!-- <PersonInformation></PersonInformation> -->
        <!-- <NoteSearch></NoteSearch> -->
        <!-- <NoteClassification></NoteClassification> -->
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    background-color: rgb(247, 247, 247);
    margin-bottom: 10px;
    padding: 17px 0;
    border-radius: 5px;
}
.noteLeftBar {
    position: fixed;
    top: 55px;
    width: 280px !important;
    left: calc((100vw - 1350px)/2);
    background-color: rgb(247, 247, 247);
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
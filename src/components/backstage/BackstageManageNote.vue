<script setup>
    import { ref } from 'vue';
    const classificationSelected = ref("All")

    function changeClassification() {
        console.log(classificationSelected.value);
    }
</script>

<template>
    <div class="backstage noteManage component">
        <div class="toolBar">
            <select name="classification" v-model="classificationSelected" @change="changeClassification">
                <option value="All">All</option>
                <option value="Front-end">Front-end</option>
                <option value="Back-end">Back-end</option>
                <option value="Algorithm">Algorithm</option>
                <option value="Database">Database</option>
                <option value="Game">Game</option>
            </select>
        </div>
    </div>
</template>
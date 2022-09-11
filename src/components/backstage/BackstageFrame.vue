<script setup>
    import { ref } from 'vue'
    import BackstageSideMenuVue from './BackstageSideMenu.vue';
    import BackstageOverview from './BackstageOverview.vue';
    import BackstageManageNote from './BackstageManageNote.vue';
    import BackstageAddNote from './BackstageAddNote.vue';

    const components = {
        BackstageOverview,
        BackstageManageNote,
        BackstageAddNote
    }
    let componentName = ref("BackstageOverview")
    function changeComponent(link) {
        componentName.value = link
        console.log(componentName.value)
    }
</script>

<template>
    <BackstageSideMenuVue @change-component="changeComponent"></BackstageSideMenuVue>
    <keep-alive>
        <component class="backstage component" :is="components[componentName]"></component>
    </keep-alive>
</template>
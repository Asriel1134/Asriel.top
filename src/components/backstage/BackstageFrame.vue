<script setup>
    import { ref } from 'vue'
    import BackstageSideMenuVue from './BackstageSideMenu.vue';
    import BackstageOverview from './BackstageOverview.vue';
    import BackstageManageNote from './BackstageManageNote.vue';
    import BackstageAddNote from './BackstageAddNote.vue';
    import BackstageLogin from './BackstageLogin.vue';

    const components = {
        BackstageOverview,
        BackstageManageNote,
        BackstageAddNote,
        BackstageLogin,
    }
    let isLogin= ref(false)
    let componentName = ref("BackstageOverview")
    function changeComponent(link) {
        componentName.value = link
        console.log(componentName.value)
    }
</script>

<template>
    <BackstageLogin v-if="!isLogin" @login-success="isLogin = true"></BackstageLogin>
    <div v-else>
        <BackstageSideMenuVue @change-component="changeComponent"></BackstageSideMenuVue>
        <keep-alive>
            <component class="backstage component" :is="components[componentName]"></component>
        </keep-alive>
    </div>
</template>
<script setup>
    import { ref } from 'vue'
    import BackstageSideMenuVue from './BackstageSideMenu.vue';
    import BackstageOverview from './BackstageOverview.vue';
    import BackstageManageNote from './BackstageManageNote.vue';
    import BackstageAddNote from './BackstageAddNote.vue';
    import BackstageEditNote from './BackstageEditNote.vue';
    import BackstageLogin from './BackstageLogin.vue';

    const components = {
        BackstageOverview,
        BackstageManageNote,
        BackstageAddNote,
        BackstageEditNote,
        BackstageLogin,
    }
    const isLogin= ref(false)
    const componentName = ref("BackstageOverview")
    function changeComponent(link) {
        componentName.value = link
    }
    const editingNote = ref({})
    function editNote(note) {
        editingNote.value = note
        componentName.value = "BackstageEditNote"
    }
    function returnFromNoteEditer() {
        componentName.value = "BackstageManageNote"
    }
</script>

<template>
    <BackstageLogin v-if="!isLogin" @login-success="isLogin = true"></BackstageLogin>
    <div v-else>
        <BackstageSideMenuVue @change-component="changeComponent"></BackstageSideMenuVue>
        <component @editNote="editNote" @returnFromNoteEditer="returnFromNoteEditer" :note="editingNote" class="backstage component" :is="components[componentName]"></component>
    </div>
</template>
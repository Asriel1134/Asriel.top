<script setup>
    import { ref } from 'vue'
    import BackstageSideMenu from './BackstageSideMenu.vue';
    import BackstageOverview from './BackstageOverview.vue';
    import BackstageManageNote from './BackstageManageNote.vue';
    import BackstageAddNote from './BackstageAddNote.vue';
    import BackstageEditNote from './BackstageEditNote.vue';
    import BackstageLogin from './BackstageLogin.vue';
    import BackstageMessage from './BackstageMessage.vue';

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
    function addNote(){
        componentName.value = 'BackstageAddNote'
    }
    const message = ref('')
    const msgIsShow = ref(false)
    const msgType = ref('')
    function showMsg(msg, type){
        message.value = msg
        msgIsShow.value = true
        msgType.value = type
        console.log(msg);
        console.log(type);
        setTimeout(closeMsg, 2000)
    }
    function closeMsg() {
        msgIsShow.value = false
    }
</script>

<template>
    <BackstageLogin @msg="showMsg" v-if="!isLogin" @login-success="isLogin = true"></BackstageLogin>
    <div v-else>
        <BackstageSideMenu @change-component="changeComponent"></BackstageSideMenu>
        <component @msg="showMsg" @addNote="addNote" @editNote="editNote" @returnFromNoteEditer="returnFromNoteEditer" :note="editingNote" class="backstage component" :is="components[componentName]"></component>
    </div>
    <BackstageMessage :isShow="msgIsShow" :msg='message' :type="msgType"></BackstageMessage>
</template>
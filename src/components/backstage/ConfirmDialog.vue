<script setup>
    defineProps({
        isShowConfirm: Boolean,
        titleText: String,
        content: String,
        cancelText: String,
        confirmText: String,
        data: {}
    })
</script>

<template>
    <transition name="confirm">
        <div v-if="isShowConfirm" class="confirmDialog">
            <div class="dialogArea">
                <h3 class="confirmTitle" v-show="titleText != ''">{{ titleText }}</h3>
                <div class="confirmContent">
                    <a>{{ content }}</a>
                </div>
                <div class="button">
                    <div class="cancelButton" @click="$emit('cancel')">
                        <a class="cancel">{{ cancelText }}</a>
                    </div>
                    <div class="confirmButton" @click="$emit('confirm', data)">
                        <a class="confirm">{{ confirmText }}</a>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped>
.confirmDialog {
    position: fixed;
    display: flex;
    left: 0;
    top: 0;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.03);
    z-index: 100;
}
.dialogArea {
    user-select: none;
    margin-bottom: 100px;
    width: 280px;
    height: 160px;
    background-color: white;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    box-shadow: rgba(128, 128, 128, 0.466) 0 0 10px;
}
.confirmTitle {
    font-size: 1em;
    height: 20px;
    margin: 10px 0 5px 0;
}
.confirmContent {
    flex: 1;
    display: block;
    padding: 0 25px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.button {
    height: 45px;
    display: flex;
    width: 100%;
    border-top: rgba(0, 0, 0, 0.192) solid 1px;
}
.cancelButton {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.1s;
}
.confirmButton {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #139889;
    border-left: rgba(0, 0, 0, 0.192) solid 1px;
    transition: all 0.1s;
}
.cancelButton:hover {
    background-color: #b3b3b322;
}
.confirmButton:hover {
    background-color: #13988922;
}

.confirm-enter-active,
.confirm-leave-active {
    transition: all 0.2s ease;
}
.confirm-enter-from,
.confirm-leave-to {
    transform: translateY(-30px);
    opacity: 0;
}
</style>
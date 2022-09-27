<script setup>
    defineProps(['msg', 'type', 'isShow'])
</script>

<template>
    <transition>
    <div class="msgBox" :class="type" v-if="isShow">
        <a class="msg">{{msg}}</a>
    </div>
    </transition>
</template>

<style scoped>
.msgBox {
    user-select: none;
    text-decoration: none;
    position: fixed;
    top: 70px;
    height: 30px;
    line-height: 30px;
    left: calc(100vw/2 - 50px);
    background-color: #ffffff;
    padding: 3px 15px;
    border-radius: 10px;
    box-shadow: #c2c2c2 0 3px 10px;
}
.msgBox.warn {
    color: #f7ae30;
}
.msgBox.error {
    color: red;
}
.v-enter-active,
.v-leave-active {
    transition: all 0.3s ease;
}
.v-enter-from,
.v-leave-to {
    transform: translateY(-30px);
    opacity: 0;
}
</style>
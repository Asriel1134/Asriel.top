<script setup>
    import axios from "axios";
    import { getCurrentInstance, ref } from "vue"
    import {store} from '../../store.js'
    const { appContext : { config: { globalProperties } } } = getCurrentInstance()
    const emit = defineEmits(['login-success'])
    let warnMessage = ref("")
    const username = ref("")
    const password = ref("")

    function login() {
        if(username.value==""){
            warnMessage.value = "Username is NULL"
        }
        else if(password.value==""){
            warnMessage.value = "Password is NULL"
        }
        else {
            warnMessage.value = ""
            axios({
                method: 'post',
                url: globalProperties.$httpUrl + "/backstage/login",
                params: {
                    username: username.value,
                    password: password.value
                }
            }).then(res => {
                if (res.data.code == 1) {
                    warnMessage.value = res.data.msg
                }
                if (res.data.code == 0) {
                    store.setToken(res.data.data.token)
                    emit("login-success")
                }
                console.log(store.token);
            })
        }
    }
</script>

<template>
    <div class="backstage login">
        <div class="loginBox">
            <div class="table">
                <a>Welcome to Asriel.top</a>
                <div class="inputBox">
                    <input type="text" required v-model="username">
                    <label>Username</label>
                </div>
                <div class="inputBox">
                    <input type="password" required v-model="password">
                    <label>Password</label>
                </div>
                <a class="warnMessage">{{warnMessage}}</a>
                <div class="button" @click="login"><a>Login</a></div>
            </div>
            <img src="@/assets/img/02.jpeg" alt="">
        </div>
    </div>
</template>
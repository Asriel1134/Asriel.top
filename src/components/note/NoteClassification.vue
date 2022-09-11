<script setup>
    const claasificationList = {"后端": 5, "前端": 6, "算法": 7, "SQL": 8, "运维": 9, "游戏": 10}

</script>

<template>
    <div class="container">
        <lu>
            <li v-for="(value, key) in claasificationList" :key="key">
                <a class="key">{{key}}</a>  <a class="value">{{value}}</a>
            </li>
        </lu>
    </div>  
</template>

<style scoped>
lu {
    margin-top: 10px;
    list-style: none;
}

</style>
<template>
    <div class="navbar">
        <i  @click="$emit('change-sidebar')" class="fa fa-bars fa-lg menu"  aria-hidden="true"></i>
        <div class="nav">
            <ul>
                <li><router-link to="/project">PROJECT</router-link><i></i></li>
                <li><router-link to="/note">NOTE</router-link><i></i></li>
                <li style="margin-right: 0;"><router-link to="/tool">TOOL</router-link><i></i></li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
.navbar {
    min-height: 60px;
    height: 10vh;
    margin: 0 5%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.menu {
    cursor: pointer;
    font-size: 120%;
    color: #fff;
    transition: color 0.5s;
}
.nav ul {
    display: flex;
    align-items: center;
}
.nav ul li {
    font-size: 120%;
    list-style: none;
    display: inline-block;
    margin-right: 30px;
    position: relative;
    overflow: hidden;
}
.nav ul li a {
    text-decoration: none;
    color: #fff;
    transition: color 0.5s;
}
.nav ul li i {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0%;
    height: 2px;
    background-color: rgba(17, 180, 17, 0);
    border-radius: 1px;
}
.nav ul li a:hover ~ i{
    width: 100%;
    transition: all .3s ease-out;
    background-color: rgb(0, 179, 0);
}

@media screen and (max-width: 350px) {
    .nav ul {
        visibility: hidden;
    }
}
</style>
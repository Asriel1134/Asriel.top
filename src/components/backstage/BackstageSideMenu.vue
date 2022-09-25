<script setup>
    import {reactive} from 'vue'
    const emit = defineEmits(['change-component'])
    const menuList = reactive({
        '总览': {
            'display': true,
            'link': 'BackstageOverview',
            'icon': 'fa-tasks',
            'hasSubmenu': false,
        },
        '笔记': {
            'display': false,
            'link': 'BackstageManageNote',
            'icon': 'fa-file-text',
            'hasSubmenu': false,
        },
        '项目': {
            'display': false,
            'link': '',
            'icon': 'fa-magnet',
            'hasSubmenu': true,
            'submenu': {
                
            }
        },
        '工具': {
            'display': false,
            'link': '',
            'icon': 'fa-wrench',
            'hasSubmenu': true,
            'submenu': {
                'PNG To ICO': {
                    'display': false,
                    'link': '',
                }
            }
        },
        '设置': {
            'display': false,
            'link': '',
            'icon': 'fa-cogs ',
            'hasSubmenu': true,
            'submenu': {
                
            }
        }
    })

    function clickMenu(menuName) {
        for (const menuNameTemp in menuList) {
            menuList[menuNameTemp].display = false;
        }
        menuList[menuName].display = true
        if (!menuList[menuName].hasSubmenu){
            for (const menuNameTemp in menuList) {
                for (const submenuNameTemp in menuList[menuNameTemp].submenu)
                menuList[menuNameTemp].submenu[submenuNameTemp].display = false;
            }
            emit('change-component', menuList[menuName].link)
        }
    }
    function clickSubmenu(menuName, submenuName) {
        for (const menuNameTemp in menuList) {
            for (const submenuNameTemp in menuList[menuNameTemp].submenu)
            menuList[menuNameTemp].submenu[submenuNameTemp].display = false;
        }
        menuList[menuName].submenu[submenuName].display = true;
        emit('change-component', menuList[menuName].submenu[submenuName].link)
    }
</script>

<template>
    <div class="backstage sideMenu">
        <div class="backstage logo">
            <img src="@/assets/img/avatar.gif" alt="Asriel.top">
            <a>Asriel.top</a>
        </div>
        <ul>
            <li v-for="(menuInfo, menuName) in menuList" :key="menuName" @click="clickMenu(menuName)">
                <div class="option" :class="{choosen: menuInfo.display}">
                    <i class="fa" :class="menuInfo.icon" aria-hidden="true"></i>
                    <a>{{menuName}}</a>
                </div>
                <transition name="openMenu">
                    <ul v-if="menuInfo.hasSubmenu && menuInfo.display">
                        <li v-for="(submenuInfo, submenuName) in menuInfo.submenu" :key="submenuName" @click="clickSubmenu(menuName, submenuName)" :class="{choosen: submenuInfo.display}">
                            <a>{{submenuName}}</a>
                        </li>
                    </ul>
                </transition>
            </li>
        </ul>
        <a class="foot">@Copyright</a>
    </div>
</template>
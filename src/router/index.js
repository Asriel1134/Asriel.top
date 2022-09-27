import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [{
    path: '/', 
    name: 'Home',
    component:()=>import('../components/IndexFrame.vue'),
    meta: {
        title: 'Home | Asriel',
    }
},{
    path: '/project',
    name: 'Project',
    component:()=>import('../components/ProjectFrame.vue'),
    meta: {
        title: 'Project | Asriel',
    }
},{
    path: '/note',
    name: 'Note',
    component:()=>import('../components/NoteFrame.vue'),
    meta: {
        title: 'Note | Asriel',
    }
},{
    path: '/tool',
    name: 'Tool',
    component:()=>import('../components/ToolFrame.vue'),
    meta: {
        title: 'Tool | Asriel',
    }
},{
    path: '/admin',
    name: 'Admin',
    component:()=>import('../components/backstage/BackstageFrame.vue'),
    meta: {
        title: 'Admin | Asriel',
    }
}]

const router = createRouter({
    history: createWebHashHistory(),
    // history: createWebHistory(),
    routes
})

router.afterEach((to) => {
    if (to.meta.title) {
      document.title = to.meta.title;
    }
  });

export default router;
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import ResumeEditor from '../views/ResumeEditor.vue';
import Setting from '../views/Setting.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/editor',
    name: 'ResumeEditor',
    component: ResumeEditor
  },
  {
    path: '/setting',
    name: 'Setting',
    component: Setting
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
import { createRouter, createWebHistory } from 'vue-router'
import Announcement from '../views/Announcement.vue'
import AnnouncementDetail from '../views/AnnouncementDetail.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Announcement',
            component: Announcement
        },
        {
            path: '/detail/:id',
            name: 'AnnouncementDetail',
            component: AnnouncementDetail
        }
    ]
})
export default router
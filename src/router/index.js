import { createRouter, createWebHistory } from 'vue-router'
import Announcement from '../views/Announcement.vue'
import AnnouncementDetail from '../views/AnnouncementDetail.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/admin/announcement',
            name: 'Announcement',
            component: Announcement
        },
        {
            path: '/admin/announcement/:id',
            name: 'AnnouncementDetail',
            component: AnnouncementDetail
        }
    ]
})
export default router
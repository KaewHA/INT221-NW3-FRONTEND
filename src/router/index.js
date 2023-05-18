import { createRouter, createWebHistory } from 'vue-router'
import AnnouncementDetail from '../views/AnnouncementDetail.vue'
import createapp from '../views/create.vue'
import indexinit from '../views/indexinit.vue'
import EditAnnouncement from '../views/EditAnnouncement.vue'
import AnnouncementTable from '../views/AnnouncementTable.vue'
import AddAnnouncement from '../views/AddAnnouncement.vue'
import deleteannouncement from '../views/deleteannocement.vue'
import userview from '../views/userview.vue'
import UserViewDetail from '../views/UserViewDetail.vue'
import show from '../views/paginashow.vue'
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Start',
            component: createapp
        },
        {
            path: '/index.html',
            name: 'Startwithindex',
            component: indexinit
        },
        {
            path: '/admin/announcement',
            name: 'Announcement',
            component: AnnouncementTable
        },
        {
            path: '/admin/announcement/:id',
            name: 'AnnouncementDetail',
            component: AnnouncementDetail
        },
        {
            path: '/admin/announcement/add',
            name: 'AddAnnouncement',
            component: AddAnnouncement
        },
        {
            path: '/admin/announcement/:id/delete',
            name: 'deleteannouncement',
            component: deleteannouncement
        },
        {
            path: '/announcement',
            name: 'userview',
            component: userview
        },
        {
            path: '/announcement/:id',
            name: 'UserViewDetail',
            component: UserViewDetail
        },
        {
            path: '/ui/announcement/',
            name: 'userview PAGE',
            component: show
        },
        {
            path: '/admin/announcement/:id/edit',
            name: 'EditAnnouncement',
            component: EditAnnouncement
        }
    ]
})
export default router
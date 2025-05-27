import { createRouter, createWebHistory } from 'vue-router'
import App from "../App.vue"
import CreateView from '@/views/CreateView.vue'
import NoteView from '@/views/NoteView.vue'
import RosterView from '@/views/RosterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/tekken',
      name: 'tekkenRoster',
      component: RosterView,
    },
    {
      path: '/new/:character',
      name: 'new',
      component: CreateView,
    },
    {
      path: '/note/:id',
      name: 'noteView',
      component: NoteView
    }
  ],
})

export default router

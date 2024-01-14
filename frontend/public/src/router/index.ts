import { createWebHistory, createRouter } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import CalendarView from '@/views/CalendarView.vue';
import TaskDetailsView from '@/views/TaskDetailsView.vue';
import TaskOverview from '@/views/TaskOverview.vue';
import TaskForm from '@/components/tasks/TaskForm.vue';

const routes: Array<RouteRecordRaw> = [
    { path: '/', component: TaskOverview },
    { path: '/calendar', component: CalendarView },
    { path: '/task/:id', component: TaskDetailsView, name: 'TaskDetailsView' },
    { path: '/add-task', component: TaskForm, name: 'AddTask' },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

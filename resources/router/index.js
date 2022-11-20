
import { createRouter, createWebHistory } from 'vue-router'
import Home from 'Components/Home.vue'
import Register from 'Components/Register.vue'
import Login from 'Components/Login.vue'
import Logout from 'Components/Logout.vue'
import TodoNotes from 'Components/TodoNotes.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/register",
      name: "Register",
      component: Register,
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
    },
    {
      path: "/logout",
      name: "Logout",
      component: Logout,
    },
    {
      path: "/todonotes",
      name: "TodoNotes",
      component: TodoNotes,
    },
  ],
});

export default router;

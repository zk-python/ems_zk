import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/Login";
import Register from "../components/Register";
import Show from "../components/Show";
import AddEmp from "../components/AddEmp";
import Update from "../components/Update";

Vue.use(Router)

export default new Router({
  routes: [
    {path: "/login", component:Login},
    {path: "/register", component: Register},
    {path: "/show", component: Show},
    {path: "/add", component: AddEmp},
    {path: "/update", component: Update},
    {path: "/", redirect: "/login"},
    {path: "/*", redirect: "/login"},
  ]
})

import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";


import CiudadIndex from "./components/CiudadIndex.vue";
import CiudadDetails from "./components/CiudadDetails.vue";

import ArquitectoIndex from "./components/ArquitectoIndex.vue";
import ArquitectoDetails from "./components/ArquitectoDetails.vue";

import EdificioIndex from "./components/EdificioIndex.vue";
import EdificioDetails from "./components/EdificioDetails.vue";

const routes = [
  { path: "/", component: Home },

  // ciudades
  { path: "/ciudad", component: CiudadIndex },
  { path: "/ciudad/show/:id", 
    component: CiudadDetails, props: {show:true} },
  { path: "/ciudad/edit/:id", 
    component: CiudadDetails, props: {edit:true} },
  { path: "/ciudad/create", 
    component: CiudadDetails, props: {create:true} },
  { path: "/ciudad/delete/:id", 
    component: CiudadDetails, props: {delete:true} },

  // arquitectos
  { path: "/arquitecto", component: ArquitectoIndex },
  { path: "/arquitecto/show/:id", 
    component: ArquitectoDetails, props: {show:true} },
  { path: "/arquitecto/edit/:id", 
    component: ArquitectoDetails, props: {edit:true} },
  { path: "/arquitecto/create", 
    component: ArquitectoDetails, props: {create:true} },
  { path: "/arquitecto/delete/:id", 
    component: ArquitectoDetails, props: {delete:true} },

  // edificios
  { path: "/edificio", component: EdificioIndex },
  { path: "/edificio/show/:id", 
    component: EdificioDetails, props: {show:true} },
  { path: "/edificio/edit/:id", 
    component: EdificioDetails, props: {edit:true} },
  { path: "/edificio/create", 
    component: EdificioDetails, props: {create:true} },
  { path: "/edificio/delete/:id", 
    component: EdificioDetails, props: {delete:true} },
];

const history = createWebHistory();

const router = createRouter({
  history,
  routes,
});

export default router;
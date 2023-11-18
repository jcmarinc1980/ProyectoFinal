<template>
<div id="app" class="container">
  <div class="row"  style="margin-top: 15px">
    <router-link class="three columns button button-primary" 
      to="/">Home</router-link>
    <router-link class="three columns button button-primary" 
      to="/ciudad">Ciudades</router-link>
    <router-link class="three columns button button-primary" 
      to="/edificio">Edificios</router-link>
    <router-link class="three columns button button-primary" 
      to="/arquitecto">Arquitectos</router-link>
  </div>
 <router-view />
  <div class="row">
    <button disabled="disabled" class="twelve columns button-primary">
      Protecto 2 - Mijail Diaz Bengoa - Juan Marin Cascante
    </button>
  </div>
</div>
</template>

<script>
export default {
  name: "App",
};
</script>

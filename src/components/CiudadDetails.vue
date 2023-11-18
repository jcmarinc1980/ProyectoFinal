<template>
  <div class="row">
    <div class="eleven column" style="margin-top: 5%">
      <h2>{{ title }}</h2>
      <form>
        <div class="row">
          <div class="six columns">
            <label for="nombreInput">Nombre</label>
            <input class="u-full-width" type="text" v-model="ciudad.nombre">
          </div>
          <div class="six columns">
            <label for="paisInput">Pais</label>
            <input class="u-full-width" type="text" v-model="ciudad.pais">
          </div>
        </div>
        <div class="row">
          <div class="six columns">
            <label for="poblacionInput">Poblacion</label>
            <input class="u-full-width" type="text" v-model="ciudad.poblacion">
          </div>
          <div class="six columns">
            <label for="superficieInput">superficie</label>
            <input class="u-full-width" type="text" v-model="ciudad.superficie">
          </div>
        </div>
        <div class="row">
          <router-link class="button button-primary" to="/ciudad">Back</router-link>
          <a v-if='edit' class="button button-primary" style="float: right" v-on:click="updateCiudad(ciudad._id)">Update</a>
          <a v-if='create' class="button button-primary" style="float: right" v-on:click="createCiudad()">Create</a>
        </div>
      </form>
    </div>
    <div v-if='show'>
      <h2>Lista de edificios en esta ciudad</h2>
    <ul>
      <li v-for="edificio in edificios" :key="edificio._id">
        <router-link  :to="'/edificio/show/'+edificio._id">{{ edificio.nombre }}</router-link>
      </li>
    </ul>
  </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'

export default {
  name: "Ciudad Details",
  props: ['create', 'edit', 'show'],
  data() {
    return {
      title: "Ciudad Data",
      ciudad: {},
      edificios: []
    }
  },
  mounted() {
    const route = useRoute()
    if (route.params.id != null)
      this.findCiudad(route.params.id),
      this.allEdificios(route.params.id);
    else {
      this.ciudad = {
        '_id': Math.floor(Math.random() * 100000000), 
        'nombre': '', 
        'pais': '',
        'poblacion': '', 
        'superficie': ''
      };
    }

  },
  methods: {
    findCiudad: function (id) {
      fetch(this.url + '/.netlify/functions/ciudadFind/' + id,
        { headers: { 'Accept': 'application/json' } })
        .then((response) => response.json())
        .then((items) => {
          this.ciudad = items[0];
        })
    },
    allEdificios: function(id) {
      fetch(this.url + '/.netlify/functions/FindAllCiudadEdificio/'+ id,
        { headers: { 'Accept': 'application/json' } })
        .then((response) => response.json())
        .then((items) => {
          this.edificios = items;
        })
    },
    
    updateCiudad: function (id) {
      
      fetch(this.url + '/.netlify/functions/ciudadUpdate/' + id,
        {
          headers: { 'Content-Type': 'application/json' },
          method: 'PUT',
          body: JSON.stringify(this.ciudad)
        })
        .then((data) => {
          this.$router.push('/ciudad');
        }
        )
    },
    createCiudad: function () {
      
      fetch(this.url + '/.netlify/functions/ciudadInsert',
        {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify(this.ciudad)
        })
        .then((data) => {
          this.$router.push('/ciudad');
        }
        )
    }
  }
};
</script>
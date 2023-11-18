
<template>
  <div class="row">
    <div class="eleven column" style="margin-top: 5%">
      <h2>{{ title }}</h2>
      <form>
        <div class="row">
          <div class="six columns">
            <label for="nombreInput">Nombre</label>
            <input class="u-full-width" type="text" v-model="arquitecto.nombre">
          </div>
          <div class="six columns">
            <label for="fecha_nacimientoInput">Fecha Nacimiento</label>
            <input class="u-full-width" type="text" v-model="arquitecto.fecha_nacimiento">
          </div>
        </div>
        <div class="row">
          <div class="six columns">
            <label for="nacionalidadInput">nacionalidad</label>
            <input class="u-full-width" type="text" v-model="arquitecto.nacionalidad">
          </div>
          <div class="six columns">
            <label for="educacionInput">Educacion</label>
            <input class="u-full-width" type="text" v-model="arquitecto.educacion">
          </div>
        </div>
        <div class="row">
          <router-link class="button button-primary" to="/arquitecto">Back</router-link>
          <a v-if='edit' class="button button-primary" style="float: right" v-on:click="updateArquitecto(arquitecto._id)">Update</a>
          <a v-if='create' class="button button-primary" style="float: right" v-on:click="createArquitecto()">Create</a>
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
  name: "Arquitecto Details",
  props: ['create', 'edit', 'show'],
  data() {
    return {
      title: "Arquitecto Data",
      arquitecto: {},
      edificios: []
    }
  },
  mounted() {
    
    const route = useRoute()
    if (route.params.id != null)
      this.findArquitecto(route.params.id),
      this.allEdificios(route.params.id);
    else {
      this.arquitecto = {
        '_id': Math.floor(Math.random() * 100000000), 
        'nombre': '', 
        'fecha_nacimiento': '',
        'nacionalidad': '', 
        'educacion': ''
      };
    }

  },
  methods: {
    findArquitecto: function (id) {
      fetch(this.url + '/.netlify/functions/arquitectoFind/' + id,
        { headers: { 'Accept': 'application/json' } })
        .then((response) => response.json())
        .then((items) => {
          this.arquitecto = items[0];
        })
    },
    allEdificios: function(id) {
      fetch(this.url + '/.netlify/functions/FindAllArquitectoEdificio/'+ id,
        { headers: { 'Accept': 'application/json' } })
        .then((response) => response.json())
        .then((items) => {
          this.edificios = items;
        })
    },
    updateArquitecto: function (id) {
      fetch(this.url + '/.netlify/functions/arquitectoUpdate/' + id,
        {
          headers: { 'Content-Type': 'application/json' },
          method: 'PUT',
          body: JSON.stringify(this.arquitecto)
        })
        .then((data) => {
          this.$router.push('/arquitecto');
        }
        )
    },
    createArquitecto: function () {

      fetch(this.url + '/.netlify/functions/arquitectoInsert',
        {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify(this.arquitecto)
        })
        .then((data) => {
          this.$router.push('/arquitecto');
        }
        )
    },
  }
};
</script>

<template>
  <div class="row">
    <div class="eleven column" style="margin-top: 5%">
      <h2>{{ title }}</h2>
      <form>
        <div class="row">
          <div class="six columns">
            <label for="nombreInput">Nombre</label>
            <input class="u-full-width" type="text" v-model="edificio.nombre">
          </div>
          <div class="six columns">
            <label for="ciudadSelect">Ciudad</label>
            <select class="u-full-width" v-model="edificio.ciudad_id">
              <option v-for="ciudad in ciudades" :key="ciudad._id" :value="ciudad._id">{{ ciudad.nombre }}</option>
            </select>
            <input type="hidden" v-model="edificio.ciudad">
          </div>
        </div>
        <div class="row">
          <div class="six columns">
            <label for="arquitectoSelect">Arquitecto</label>
            <select class="u-full-width" v-model="edificio.arquitecto_id">
              <option v-for="arquitecto in arquitectos" :key="arquitecto._id" :value="arquitecto._id">{{ arquitecto.nombre}}</option>
            </select>
            <input type="hidden" v-model="edificio.arquitecto">
          </div>
          <div class="six columns">
            <label for="pisosInput">Pisos</label>
            <input class="u-full-width" type="number" v-model="edificio.pisos">
          </div>
        </div>
        <div class="row">
          <div class="six columns">
            <label for="alturaInput">Altura</label>
            <input class="u-full-width" type="number" v-model="edificio.altura">
          </div>
          <div class="six columns">
            <label for="fecha_construccionInput">Fecha de Construccion</label>
            <input class="u-full-width" type="text" v-model="edificio.fecha_construccion">
          </div>
        </div>
        <div class="row">
          <div class="six columns">
            <label for="costeInput">Coste</label>
            <input class="u-full-width" type="text" v-model="edificio.coste">
          </div>
        </div>
        <div class="row">
          <router-link class="button button-primary" to="/edificio">Back</router-link>
          <a v-if='edit' class="button button-primary" style="float: right" v-on:click="updateEdificio(edificio._id)">Update</a>
          <a v-if='create' class="button button-primary" style="float: right" v-on:click="createEdificio()">Create</a>
        </div>
      </form>
    </div>
    <div v-if='show' class="row">
          <div class="six columns">
            <h5>Ver arquitecto</h5>
        <router-link  :to="'/arquitecto/show/'+edificio.arquitecto_id">{{ edificio.arquitecto }}</router-link> 
          </div>
          <div class="six columns">
             <h5>Ver ciudad</h5>
        <router-link  :to="'/ciudad/show/'+edificio.ciudad_id">{{ edificio.ciudad }}</router-link>
          </div>
          
  </div><hr>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'

export default {
  name: "Edificio Details",
  props: ['create', 'edit', 'show'],
  data() {
    return {
      title: "Edificio Data",
      edificio: {},
      arquitectos: [],
      ciudades: []
    }
  },
  mounted() {
    this.allArquitectos()
    this.allCiudades()
    const route = useRoute()
    if (route.params.id != null)
      this.findEdificio(route.params.id);
    else {
      this.edificio = {
        '_id': Math.floor(Math.random() * 100000000), 
        'nombre': '', 
        'altura': 0,
        'fecha_construccion': '',
        'coste': '',
        'pisos': 0, 
        'ciudad': '', 'ciudad_id': 0,
        'arquitecto': '', 'arquitecto_id': 0
      };
    }

  },
  methods: {
    findEdificio: function (id) {
      fetch(this.url + '/.netlify/functions/edificioFind/' + id,
        { headers: { 'Accept': 'application/json' } })
        .then((response) => response.json())
        .then((items) => {
          this.edificio = items[0];
        })
    },
    allArquitectos() {
      fetch(this.url + '/.netlify/functions/arquitectoFindAll',
        { headers: { 'Accept': 'application/json' } })
        .then((response) => response.json())
        .then((items) => {
          this.arquitectos = items;
        })
    },
    allCiudades() {
      fetch(this.url + '/.netlify/functions/ciudadFindAll',
        { headers: { 'Accept': 'application/json' } })
        .then((response) => response.json())
        .then((items) => {
          this.ciudades = items;
        })
    },
    updateEdificio: function (id) {
      // Obtén el nombre del autor seleccionado
      const selectedCiudad = this.ciudades.find(ciudad => ciudad._id === this.edificio.ciudad_id);
      if (selectedCiudad) {
        this.edificio.ciudad = selectedCiudad.nombre; 
      }
      const selectedArquitecto = this.arquitectos.find(arquitecto => arquitecto._id === this.edificio.arquitecto_id);
      if (selectedArquitecto) {
        this.edificio.arquitecto = selectedArquitecto.nombre;
      }
      fetch(this.url + '/.netlify/functions/edificioUpdate/' + id,
        {
          headers: { 'Content-Type': 'application/json' },
          method: 'PUT',
          body: JSON.stringify(this.edificio)
        })
        .then((data) => {
          this.$router.push('/edificio');
        }
        )
    },
    createEdificio: function () {
      // Obtén el nombre del autor seleccionado
      const selectedCiudad = this.ciudades.find(ciudad => ciudad._id === this.edificio.ciudad_id);
      if (selectedCiudad) {
        this.edificio.ciudad = selectedCiudad.nombre; 
      }
      const selectedArquitecto = this.arquitectos.find(arquitecto => arquitecto._id === this.edificio.arquitecto_id);
      if (selectedArquitecto) {
        this.edificio.arquitecto = selectedArquitecto.nombre;
      }

      fetch(this.url + '/.netlify/functions/edificioInsert',
        {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          body: JSON.stringify(this.edificio)
        })
        .then((data) => {
          this.$router.push('/edificio');
        }
        )
    }
  }
};
</script>
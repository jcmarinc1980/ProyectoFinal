<template>
  <div class="row">
   <div style="margin-top: 5%">
    <div class="row">
          <div class="six columns">
            <h2>{{title}}</h2>
          </div>
          <div class="six columns">

         <router-link class="button button-primary" 
       to="/ciudad/create">New</router-link>
          </div>
        </div>
     <table><thead>
       <tr>
         <th>Nombre</th>
        <th>Pais</th>
        <th>Poblacion</th>
        <th>Superficie</th>
        <th class="text-center">Actions</th>
	   </tr>
       </thead><tbody>
       <tr v-for='ciudad in ciudades'>
       <td>{{ciudad.nombre}}</td>
       <td>{{ciudad.pais}}</td>
       <td>{{ciudad.poblacion}}</td>
       <td>{{ciudad.superficie}}</td>
       <td>
       <router-link class="button"
         :to="'/ciudad/show/'+ciudad.id">Show</router-link>
       &nbsp;
       <router-link class="button"
         :to="'/ciudad/edit/'+ciudad.id">Edit</router-link>
       &nbsp;
       <a class="button"
         v-on:click="deleteCiudad(ciudad.id)">Erase</a>
       </td>
       </tr></tbody>
     </table>

   </div>
  </div>
</template>

<script>
	
export default {
  name: "Ciudad Index",
  data() {
    return {
      title: 'Ciudad List',
      ciudades: [],
      recargado: false,
    };
  },
  mounted() {
    this.allCiudades()
  },
  methods: {
    allCiudades() {
      fetch(this.url+'/.netlify/functions/ciudadFindAll',
        { headers: {'Accept': 'application/json'}})
        .then((response) => response.json())
        .then((items) => {
          this.ciudades = items;
        })
     },

     deleteCiudad(id) {
       fetch(this.url+'/.netlify/functions/ciudadDelete/'+id,
         { headers: {'Content-Type': 'application/json'},
           method: 'DELETE'})
          .then((items) => {
            this.allCiudades();
          }
        )
     }
  }
};
</script>

<template>
  <div class="row">
   <div style="margin-top: 5%">
    <div class="row">
          <div class="six columns">
            <h2>{{title}}</h2>
          </div>
          <div class="six columns">
            <a class="button"
         v-on:click="ejecutarTasks()">Actualizar tabla</a>
         &nbsp;
         <router-link class="button button-primary" 
       to="/edificio/create">New</router-link>
          </div>
        </div>
     <table><thead>
       <tr>
         <th>Nombre</th>
        <th>Altura</th>
        <th>Fecha de Construccion</th>
        <th>Coste</th>
        <th>Pisos</th>
        <th>Ciudad</th>
        <th>Arquitecto</th>
        <th class="text-center">Actions</th>
	   </tr>
       </thead><tbody>
       <tr v-for='edificio in edificios'>
       <td>{{edificio.nombre}}</td>
       <td>{{edificio.altura}}</td>
       <td>{{edificio.fecha_construccion}}</td>
       <td>{{edificio.coste}}</td>
       <td>{{edificio.pisos}}</td>
       <td>{{edificio.ciudad}}</td>
       <td>{{edificio.arquitecto}}</td>
       <td>
       <router-link class="button"
         :to="'/edificio/show/'+edificio._id">Show</router-link>
       &nbsp;
       <router-link class="button"
         :to="'/edificio/edit/'+edificio._id">Edit</router-link>
       &nbsp;
       <a class="button"
         v-on:click="deleteEdificio(edificio._id)">Erase</a>
       </td>
       </tr></tbody>
     </table>
     
   </div>
  </div>
</template>

<script>
	
export default {
  name: "Edificio Index",
  data() {
    return {
      title: 'Edificio List',
      edificios: [],
      recargado: false,
    };
  },
  mounted() {
    this.allEdificios()
  },
  methods: {
    allEdificios() {
      fetch(this.url+'/.netlify/functions/edificioFindAll',
        { headers: {'Accept': 'application/json'}})
        .then((response) => response.json())
        .then((items) => {
          this.edificios = items;
        })
     },
     ejecutarTasks() {
      if (!this.recargado) { // Verificar si no se ha recargado aún
        fetch(this.url + '/.netlify/functions/edificiosTasks', {
          headers: { 'Accept': 'application/json' },
          method: 'GET',
        }).then(() => {
          this.recargado = true; // Marcar como recargado
          window.location.href = '/'
        });
      }
     },
     deleteEdificio(id) {
       fetch(this.url+'/.netlify/functions/edificioDelete/'+id,
         { headers: {'Content-Type': 'application/json'},
           method: 'DELETE'})
          .then((items) => {
            this.allEdificios();
          }
        )
     }
  }
};
</script>
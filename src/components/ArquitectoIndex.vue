
<template>
  <div class="row">
   <div style="margin-top: 5%">
    <div class="row">
          <div class="six columns">
            <h2>{{title}}</h2>
          </div>
          <div class="six columns">
            
         
         <router-link class="button button-primary" 
       to="/arquitecto/create">New</router-link>
          </div>
        </div>
     
     <table><thead>
       <tr>
         <th>Nombre</th>
        <th>Fecha Nacimiento</th>
        <th>Nacionalidad</th>
        <th>Educacion</th>
        <th class="text-center">Actions</th>
	   </tr>
       </thead><tbody>
       <tr v-for='arquitecto in arquitectos'>
        <td>{{arquitecto.nombre}}</td>
       <td>{{arquitecto.fecha_nacimiento}}</td>
       <td>{{arquitecto.nacionalidad}}</td>
       <td>{{arquitecto.educacion}}</td>
       <td>
       <router-link class="button"
         :to="'/arquitecto/show/'+arquitecto.id">Show</router-link>
       &nbsp;
       <router-link class="button"
         :to="'/arquitecto/edit/'+arquitecto.id">Edit</router-link>
       &nbsp;
       <a class="button"
         v-on:click="deleteArquitecto(arquitecto.id)">Erase</a>
       </td>
       </tr></tbody>
     </table>

   </div>
  </div>
</template>

<script>
	
export default {
  name: "Arquitecto Index",
  data() {
    return {
      title: 'Arquitecto List',
      arquitectos: [],
      recargado: false,
    };
  },
  mounted() {
    this.allArquitectos()
  },
  methods: {
    allArquitectos() {
      fetch(this.url+'/.netlify/functions/arquitectoFindAll',
        { headers: {'Accept': 'application/json'}})
        .then((response) => response.json())
        .then((items) => {
          this.arquitectos = items;
        })
     },
     
     deleteArquitecto(id) {
       fetch(this.url+'/.netlify/functions/arquitectoDelete/'+id,
         { headers: {'Content-Type': 'application/json'},
           method: 'DELETE'})
          .then((items) => {
            this.allArquitectos();
          }
        )
     }
  }
};
</script>
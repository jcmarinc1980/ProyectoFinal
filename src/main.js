import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import './assets/css/normalize.css';
import './assets/css/skeleton.css';

const app = createApp(App);
  
app.config.globalProperties.url = 'https://marvelous-queijadas-452369.netlify.app';
//https://bookstore-mongo.netlify.app
app.use(router).mount("#app");

document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('ejecutarFuncion');
    
    button.addEventListener('click', async function () {
        try {
            // Aquí puedes llamar a tu función de RabbitMQ
            const response = await fetch('https://marvelous-queijadas-452369.netlify.app/.netlify/functions/ciudadesTasks');
            console.log('response:', response);
            if (response.ok) {
                const result = await response.text();
                alert('Función RabbitMQ ejecutada correctamente');
                console.log('Resultado:', result);
            } else {
                alert('Error al ejecutar la función RabbitMQ');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
<template>
  <div>
   {{ productos }}
    
   <button @click="login">Login</button>

   <button @click="logout">Logout</button>
   <ClientOnly>
    {{ userData }}
   </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { readItems } from '@directus/sdk';
import type { Directus } from './types/Directus';


const directus: Directus = useNuxtApp().$directus;

const {data:productos,error} = await useAsyncData('productos', ()=>{
  return directus.request(readItems('Productos',{
    fields: ['Nombre', 'Categoria'],
    
  }))
},{
  // transform: (data: any) => data[0].Nombre
})


const user = 'oscar@paric.io',
      password = 'Soccus2024';

const auth = useAuth();
const {userData} = storeToRefs(auth);

const login = async () => {
  await auth.login(user, password);
}

const logout = async () => {
  await auth.logout();
}


</script>
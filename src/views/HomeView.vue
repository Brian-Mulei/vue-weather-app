<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input type="text"
       @input="getSearchResults"
       v-model="searchQuery" 
       placeholder="Search for a City"
       class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"/>
       <ul 
       v-if="mapboxResults"
       class="absolue bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]">
          
       <p v-if="searchError">Something went wrong please try again</p>
       <p v-if="!searchError && mapboxResults.length ===0">Nothing Found</p>

      <template v-else>
        <li v-for="searchResult in mapboxResults" :key="searchResult.id" class="py-2 cursor-pointer" 
        @click="previewCity(searchResult)" >
            {{ searchResult.place_name }}
            </li>
        
      </template>
     


       </ul>
    </div>
  </main>
</template>
<script setup>
 import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router =useRouter();

const APIKEY = "pk.eyJ1IjoibXVrc2hpIiwiYSI6ImNsajJnZnh0eDFibGMzZnM5OXN2amxkejgifQ.1PLnUp1RmFwbH8F7ngH-tA"
const searchQuery = ref("");
const queryTimeout = ref(null);
const mapboxResults = ref(null);
const searchError =ref(null);


const previewCity=(searchResult) =>{
console.log(searchResult);
const [city, state] = searchResult.place_name.split(",");
router.push({
  name:"cityView",
  params:{state: state.replaceAll(" ",""), city:city},
  query:{
    lat: searchResult.geometry.coordinates[1],
    lng: searchResult.geometry.coordinates[0],
    preview:true

  },
});
};



const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(
    async () => {
      if (searchQuery.value !== "") {
        try{
          const result = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${APIKEY}&types=place`);

mapboxResults.value=result.data.features
        }
        catch{
            searchError.value =true;
        }
       
      return;
      }
      mapboxResults.value =null;
    }, 300
  );
};
</script>
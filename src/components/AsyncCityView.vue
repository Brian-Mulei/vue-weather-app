<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- Banner >
    <div v-if="route.query.preview" class="text-white p-4 bg-weather-secondary w-full text-center">
      <p>
        You are currently previewing this city, click the "+"
        icon to start tracking this city.
      </p>
    </div-->
    <!-- Weather Overview -->
    <div class="flex flex-col items-center text-white py-12">
      <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
      <p class="text-sm mb-12">
        {{
          new Date(currentWeather.dt).toLocaleDateString(
            "en-us",
            {
              weekday: "short",
              day: "2-digit",
              month: "long",
            }
          )
        }}
        {{
          new Date(currentWeather.dt).toLocaleTimeString(
            "en-us",
            {
              timeStyle: "short",
            }
          )
        }}
      </p>
      <p class="text-8xl mb-8">
        {{ Math.round(currentWeather.main.temp) }}&deg;
      </p>
      <p>
        Feels like
        {{ Math.round(currentWeather.main.feels_like) }} &deg;
      </p>
      <p class="capitalize">
        {{ currentWeather.weather[0].description }}
      </p>
      <img class="w-[150px] h-auto" :src="`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`
        " alt="" />
    </div>

    <hr class="border-white border-opacity-10 border w-full" />

   
    <hr class="border-white border-opacity-10 border w-full" />

    <!-- Weekly Weather -->
    <div class="max-w-screen-md w-full py-12">
      <div class="mx-8 text-white">
        <h2 class="mb-4">5 Day Forecast</h2>
        <div v-for="day in weatherData.list" :key="day.dt" class="flex items-center">
          <p class="flex-1">
            {{
              new Date(day.dt_txt).toLocaleDateString(
                "en-us",
                {
                  weekday: "long",
                }
              )

            }}
            {{ new Date(day.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
          </p>
          <img class="w-[50px] h-[50px] object-cover" :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`
            " alt="" />
          <div class="flex gap-2 flex-1 justify-end">
            <p>H: {{ Math.round(day.main.temp_max) }}</p>
            <p>L: {{ Math.round(day.main.temp_min) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${route.query.lat}&lon=${route.query.lng}&appid=${import.meta.env.VITE_APP_API_KEY}&units=metric`
    );



    return weatherData.data;
  } catch (err) {
    console.log(err);
  }
};

const getCurrentWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${route.query.lat}&lon=${route.query.lng}&appid=${import.meta.env.VITE_APP_API_KEY}&units=metric`
    );



    return weatherData.data;
  } catch (err) {
    console.log(err);
  }
};

const weatherData = await getWeatherData();

const currentWeather = await getCurrentWeatherData();


</script>
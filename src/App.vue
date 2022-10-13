<template>
  <div id="app">
    <Chart />
  </div>
</template>

<script>
import Chart from './components/Chart.vue';
export default {
  name: 'App',
  components: {  Chart },
  
}
</script>

<style>
html,
body {
    /* background-color: #000; */
    margin: 0;
    padding: 0;
    overflow: hidden;
}
</style>

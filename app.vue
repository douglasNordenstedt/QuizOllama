<template>
  <div id="app" class="min-h-screen flex flex-col">
    <Navbar class="pr-5 pl-5 pt-4 pb-2 bg-myTwo text-myFour text-2xl lg:pr-20 lg:pl-40" />
    <NuxtPage class="flex-grow bg-myOne lg:pr-40 lg:pl-40" />
    <Footer />
  </div>
</template>

<script>

  export default defineComponent({
   
  });
</script>

<style>
body{
  font-family:  Chakra Petch, Roboto, sans-serif;
  font-weight: bolder;
  font-size: 20px;
  color: #EEEEEE;
  background-color: #00ADB5;
}
</style>
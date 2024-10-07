<template>
  <div id="app" class="min-h-screen flex flex-col">
    <Navbar class="pt-4 pb-2 pr-8 bg-myTwo text-myFour text-2xl lg:pl-40" />
    <NuxtPage class="flex-grow pr-40 bg-myOne lg:pl-40" />
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
}
</style>
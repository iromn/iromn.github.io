<template>
  <div class="home">
    <LandingPage msg="Coming Soon"/>
    <img class="status" alt="Under Dev" src="../assets/under_dev.jpg">
  </div>
</template>

<script>
// @ is an alias to /src
import LandingPage from '@/components/LandingPage.vue'

export default {
  name: 'HomeView',
  components: {
    LandingPage
  }
}
</script>
<style scoped>
  .status{
    width: 100%;
  }
</style>

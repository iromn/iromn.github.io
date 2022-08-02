<template>
  <div class="home">
    <LandingPage msg="Coming Soon"/>
    <img alt="Vue logo" src="../assets/under_dev.jpg">
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

<template>
  <div id="app" class="header">
    <div id="nav" class="navbar navbar-light bg-light navbar-expand-lg">
      <router-link class="navbar-brand" to="/">Calculator</router-link>
      <router-link class="navbar-brand" to="/list">Lender List</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["initLenders"])
  },
  mounted() {
    this.initLenders();
  }
};
</script>

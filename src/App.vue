<template>
  <div
    id="app"
  >
    <div
      id="nav"
      class="navbar navbar-light bg-light navbar-expand-lg"
    >
      <router-link
        class="navbar-brand"
        to="/"
      >
        Calculator
      </router-link>
      <router-link
        class="navbar-brand"
        to="/list"
      >
        Lenders
      </router-link>
    </div>
    <div class="container">
      <router-view />
    </div>
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

<style>
body{
  background-color: #f3f3f3 !important;
}
.btn-primary {
    background-color: #7100da !important; 
    color: #fff;
    min-width: 200px;
    border-radius: 5rem !important;
    cursor: pointer;
}
a.icon, span.icon{
    display: inline-block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 50%;
    margin: 0px 5px;
    text-align: center;
    background-color: #f3f3f3;
    color: #7100da;
}
a.icon:hover, span.icon:hover, span.icon.save:hover, span.icon.cancel:hover{
  background-color: #333;
  color: #FFF;
}
span.icon.save{
  color: #28a745;
}
span.icon.cancel{
  color: #dc3545;
}
.navbar.navbar-light{
  background-color: #7100da !important;
  color: #FFF;
  box-shadow: 0px 0px 10px 0px #888;
}
a.navbar-brand{
  color: #FFF !important;
}
</style>

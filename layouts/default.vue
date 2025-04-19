<template>
  <v-app>
    <nav-bar />
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import navBar from "../components/navBar";

export default {
  components: {
    navBar
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Contrail+One&family=Montserrat:wght@300;400;500&display=swap");

h1 {
  font-family: "Contrail One";
  font-size: 30px;
  font-weight: normal;
  color: #fff;
}

h2 {
  font-weight: 500;
  font-size: 20px;
}

* {
  font-family: "Montserrat";
  font-family: 14px;
}
</style>
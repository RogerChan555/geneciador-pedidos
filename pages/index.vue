<template>
  <v-container>
    <v-row justify="space-between" class="mb-5 pb-5 ml-2 mr-2">
      <h2>PEDIDOS</h2>
      <v-btn
        color="info"
        :to="{ name: 'createUpdateOrder', query:{action: 'create'}}"
      >Novo Pedido</v-btn>
    </v-row>
    <table-order />
  </v-container>
</template>

<script>
import filterOrder from "../components/filterOrder";
import tableOrder from "../components/tableOrder";

import { loadingOrder } from "../services/order";

export default {
  components: {
    filterOrder,
    tableOrder
  }
};
</script>

<style>
</style>
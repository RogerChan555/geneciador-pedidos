<template>
  <v-container>
    <h2
      class="mb-5 pb-5"
    >{{ action === 'create' ? 'CADASTRAR PEDIDO' : 'ATUALIZAR PEDIDO'}}</h2>
    <v-form class="mt-5 formOrder" ref="formOrder">
      <v-row>
        <v-col cols="12" lg="8">
          <v-text-field
            label="Cliente"
            v-model="order.client"
            :rules="requiredRules"
            filled
            dense
            background-color="#FFF4FE"
          />
        </v-col>
        <v-col cols="12" lg="3">
          <v-text-field
            label="Telefone"
            v-model="order.phone"
            :rules="requiredRules"
            filled
            dense
            background-color="#FFF4FE"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="8">
          <v-text-field
            label="Rua"
            v-model="order.streetAddress"
            background-color="#FFF4FE"
            filled
            dense
          />
        </v-col>
        <v-col cols="4" lg="1">
          <v-text-field
            label="Nº"
            type="number"
            v-model="order.numberAddress"
            background-color="#FFF4FE"
            filled
            dense
          />
        </v-col>
        <v-col cols="8" lg="3">
          <v-text-field
            label="Bairro"
            v-model="order.districtAddress"
            background-color="#FFF4FE"
            filled
            dense
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="3">
          <input-date label="Entrega" @date="val => order.deliveryDate = val" />
        </v-col>
        <v-col cols="12" lg="3">
          <v-select
            :items="deliveryForm"
            v-model="order.deliveryType"
            label="Forma de entrega"
            background-color="#FFF4FE"
            :rules="requiredRules"
            filled
            dense
          />
        </v-col>
        <v-col cols="12" lg="3">
          <v-text-field
            label="Frete"
            v-model="order.deliveryFee"
            type="number"
            prefix="R$"
            background-color="#FFF4FE"
            filled
            dense
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" lg="3">
          <v-select
            :items="paymentForm"
            v-model="order.payment"
            label="Forma de pagamento"
            background-color="#FFF4FE"
            :rules="requiredRules"
            filled
            dense
          />
        </v-col>
        <v-col cols="12" lg="3">
          <v-text-field
            label="Valor unitário"
            v-model="order.unitValue"
            type="number"
            prefix="R$"
            background-color="#FFF4FE"
            :rules="requiredRules"
            filled
            dense
          />
        </v-col>
      </v-row>
      <v-row class="align-baseline">
        <v-col cols="12" lg="9">
          <v-text-field
            label="Pedido"
            v-model="orderInput"
            background-color="#FFF4FE"
            filled
            dense
          />
        </v-col>
        <v-col>
          <v-btn color="success" @click="addOrderItem">Adicionar</v-btn>
        </v-col>
      </v-row>
      <v-row class="align-baseline mt-4" v-for="(order, i) in order.order" :key="i">
        <v-col cols="12" lg="9" class="pa-0 pl-3 pr-3">
          <v-list-item style="background-color:#f5f5f5">
            <v-list-item-content>
              <v-list-item-title class="d-flex flex-nowrap">
                <div class="mr-4">{{ i + 1 }}</div>
                <div class="ml-4">{{ order }}</div>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-col>
        <v-col class="pa-0 pl-3 mt-4">
          <v-btn color="red" class="white--text" @click="removeOrderItem(i)">Remover</v-btn>
        </v-col>
      </v-row>
      <v-row class="mt-5 mb-5">
        <v-btn color="#222b4a" class="white--text mr-4 ml-auto" to="/">Voltar</v-btn>
        <v-btn color="#222b4a" class="white--text mr-4" @click="submit">Salvar</v-btn>
      </v-row>
    </v-form>
  </v-container>
</template>

<script src="./script.js" />
<style src="./style.scss" lang="scss"/>
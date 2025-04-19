<template>
  <v-container>
    <v-row justify="space-between" class="mb-5 pb-5 ml-2 mr-2">
      <h2>CUSTOS</h2>
      <v-btn color="info" @click="dialogEditCreate = true, costCurrent.action = 'create'">Novo Custo</v-btn>
    </v-row>
    <v-data-table
      :headers="headersTable"
      :items="costData"
      mobile-breakpoint="0"
      item-key="_id"
      class="elevation-1"
    >
      <template v-slot:item.total="{item}">{{ formatValue(item.total) }}</template>
      <template v-slot:item.date="{item}">{{ formatDate(item.date) }}</template>
      <template v-slot:item.delete="{item}">
        <v-icon @click="confirmDelete = true, costCurrent = item">mdi-delete</v-icon>
      </template>
      <template v-slot:item.edit="{item}">
        <v-icon
          @click="dialogEditCreate = true, costCurrent = item, costCurrent.action = 'update'"
        >mdi-pencil</v-icon>
      </template>

      <template v-slot:body.append>
        <tr style="background-color:#f5f5f5">
          <td />
          <td />
          <td class="font-weight-medium">Total</td>
          <td
            class="error--text font-weight-medium"
          >{{ formatValue(costData.reduce((acc, { total }) => acc + total, 0)) }}</td>
          <td />
        </tr>
      </template>
    </v-data-table>
    <!-- modal confirmar excluir -->
    <modal-confirm
      :modalConfirm="confirmDelete"
      @value="val => confirmDelete = val"
      @confirm="deleteCostEvent()"
      msg="Tem certeza que deseja excluir o custo?"
    />
    <!-- modal edit -->
    <v-dialog v-model="dialogEditCreate" max-width="280px">
      <v-card>
        <v-card-title>{{ costCurrent.action === 'create' ? 'Registrar custo' : 'Editar Custo'}}</v-card-title>
        <v-card-text>
          <v-form ref="formCost">
            <input-date :date="costCurrent.date" @date="val => costCurrent.date = val" />
            <v-text-field label="Descrição" v-model="costCurrent.description" :rules="requiredRules" />
            <v-text-field
              type="number"
              label=""
              prefix="R$"
              v-model="costCurrent.total"
              :rules="requiredRules"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogEditCreate = false">Cancelar</v-btn>
          <v-btn color="green darken-1" text @click="() =>  saveCost() ">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script src="./script.js" />
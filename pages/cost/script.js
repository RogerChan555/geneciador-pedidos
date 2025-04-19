import {
  loadingCost,
  deleteCost,
  updateCost,
  createCost
} from '../../services/cost'

import inputDate from '../../components/inputDate'
import modalConfirm from '../../components/modalConfirm'

export default {
  components: {
    modalConfirm,
    inputDate
  },
  data() {
    return {
      requiredRules: [
        v => !!v || 'Preenchimento obrigatório'
      ],
      costCurrent: {},
      costData: [],
      headersTable: [{
        value: 'edit'
      }, {
        text: 'Data',
        value: 'date'
      }, {
        text: 'Descrição',
        value: 'description'
      }, {
        text: 'Total',
        value: 'total'
      }, {
        value: 'delete'
      }],
      dialogEditCreate: false,
      confirmDelete: false
    }
  },
  methods: {
    async loadCost() {
      try {
        await loadingCost().then(res => this.costData = res.data.cost)
      } catch (error) {
        throw error
      }
    },
    async deleteCostEvent() {
      try {
        await deleteCost(this.costCurrent._id).then(() => this.loadCost())
      } catch (error) {
        throw error
      }
    },
    async saveCost() {
      if (this.$refs.formCost.validate()) {
        this.dialogEditCreate = false
        if (this.costCurrent.action === 'update') {
          try {
            return await updateCost(this.costCurrent).then(() => this.costCurrent = {})
          } catch (error) {
            throw error
          }
        }
        try {
          return await createCost(this.costCurrent).then(() => this.costCurrent = {}, this.costData.push(this.costCurrent))
        } catch (error) {
          throw error
        }
      }


    },

    formatDate(dateTime) {
      if (!dateTime) return null

      const [date, time] = dateTime.split('T')
      const [year, month, day] = date.split('-')

      return `${day}/${month}/${year}`
    },
    formatValue(value) {
      const formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2
      })

      return formatter.format(value)
    },
  },
  watch: {
    dialogEditCreate: function (val) {
      if (!val) this.costCurrent = {}
    }
  },
  mounted() {
    this.loadCost()
  }
}

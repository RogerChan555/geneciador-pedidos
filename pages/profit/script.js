import {
  loadingOrder
} from '../../services/order'
import {
  loadingCost
} from '../../services/cost'

export default {
  data() {
    return {
      totalFinance: 0,
      totalRecipe: 0,
      totalCost: 0,
      tableFinanceProfit: [],
      tableRecipeProfit: [],
      headers: [{
        text: '',
        value: 'description'
      }, {
        text: '',
        value: 'total'
      }]
    }
  },
  methods: {
    async init() {
      await this.loadCost()
      await this.loadOrder()

      this.tableFinanceProfit = [{
        description: 'Financeiro',
        total: this.totalFinance
      }, {
        description: 'Custos',
        total: this.totalCost
      }]

      this.tableRecipeProfit = [{
        description: 'Receita',
        total: this.totalRecipe
      }, {
        description: 'Custos',
        total: this.totalCost
      }]
    },
    async loadCost() {
      try {
        await loadingCost().then(res => {
          this.totalCost = res.data.cost.reduce((acc, {
            total
          }) => acc + parseFloat(total), 0)
        })
      } catch (error) {
        throw error
      }
    },
    async loadOrder() {
      try {
        await loadingOrder().then(res => {
          this.totalFinance = res.data.order.reduce((acc, {
            unitValue,
            order,
            deliveryFee,
            paymentStatus
          }) => acc + parseFloat(`${ paymentStatus ? order.length * unitValue + deliveryFee : 0 }`), 0)

          this.totalRecipe = res.data.order.reduce((acc, {
            unitValue,
            order,
            deliveryFee
          }) => acc + parseFloat(order.length * unitValue + deliveryFee), 0)
        })
      } catch (error) {
        throw error
      }
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
  mounted() {
    this.init()
  }
}

import {
  loadingOrder,
  updateOrder
} from '../../services/order'

export default {
  data() {
    return {
      financeData: [],
      headersTable: [{
        text: 'Data',
        value: 'date'
      }, {
        text: 'Cliente',
        value: 'client'
      }, {
        text: 'Status',
        value: 'paymentStatus'
      }, {
        text: 'Pagamento',
        value: 'payment'
      }, {
        text: 'Total',
        value: 'total'
      }, ]
    }
  },
  methods: {
    async takePaymentStatus(item) {
  
      try {
        const data = {
          _id: item._id,
          paymentStatus: item.paymentStatus
        }
        await updateOrder(data)
        
      } catch (error) {
        throw error
      }
    },
    async loadOrders() {
      try {
        await loadingOrder().then(res => {
          res.data.order.map((item, i) => {
            this.financeData.push({
              total: this.formatValue(item.unitValue * item.order.length + item.deliveryFee),
              date: this.formatDate(item.deliveryDate),
              ...item
            });
          });
        });
      } catch (error) {
        throw error;
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
    formatDate(dateTime) {
      if (!dateTime) return null

      const [date, time] = dateTime.split('T')
      const [year, month, day] = date.split('-')

      return `${day}/${month}/${year}`
    }
  },
  mounted() {
    this.loadOrders()
  }
}

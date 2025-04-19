import inputDate from '../../components/inputDate'

import {
  createOrder,
  loadingOrderId,
  updateOrder
} from '../../services/order'

export default {
  components: {
    inputDate
  },
  data() {
    return {
      action: '',
      requiredRules: [
        v => !!v || 'Preenchimento obrigatório'
      ],
      orderInput: '',
      order: {
        client: '',
        phone: '',
        streetAddress: '',
        numberAddress: '',
        districtAddress: '',
        deliveryDate: new Date().toISOString().substr(0, 10),
        deliveryType: '',
        deliveryFee: 0,
        payment: '',
        unitValue: 0,
        order: []
      },
      deliveryForm: ['Retirar', 'Entregar'],
      paymentForm: ['Cartão de crédito', 'Cartão de débito', 'Dinheiro']
    }
  },
  methods: {
    async submit() {

      if (this.$refs.formOrder.validate() && this.order.order.length > 0) {
        if (this.action === 'create') {
          try {
            return await createOrder(this.order).then(() => {
              this.$router.push({
                path: "/"
              })
            })
          } catch (error) {
            throw error
          }
        }

        try {
          return await updateOrder(this.order).then(() => {
            this.$router.push({
              path: "/"
            })
          })
        } catch (error) {
          throw error
        }
      }



    },
    async loadOrderUpdate(id) {
      try {
        await loadingOrderId(id).then(res => this.order = res.data.order)
      } catch (error) {

      }
    },
    addOrderItem() {
      if (this.orderInput.length) this.order.order.push(this.orderInput)
    },
    removeOrderItem(idx) {
      this.order.order.splice(idx, 1)
    }
  },
  mounted() {
    this.action = this.$route.query.action

    if (!this.action) this.loadOrderUpdate(this.$route.query.id)
  }
}

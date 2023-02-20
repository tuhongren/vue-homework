Object.keys(VeeValidateRules).forEach(rule => {
  if (rule !== 'default') {
    VeeValidate.defineRule(rule, VeeValidateRules[rule]);
  }
});

// 讀取外部的資源
VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');

// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});

const url = 'https://vue3-course-api.hexschool.io/' ;
const pathName = 'rainj' ;

const productModal = {
  props:['tempProduct','addToCart'],
  template:'#userProductModal',
  data(){
    return {
      modal:{},
      qty:1,
    }
  },
  methods:{
    openModal(){
      this.modal.show();
    },
    hideModal(){
      this.modal.hide();
    }
  },
  mounted(){
    this.modal = new bootstrap.Modal(this.$refs.modal);
  },
}

const app = Vue.createApp({
  data(){
    return {
      products:{},
      tempProduct:{},
      productId:'',
      cart:{},
      loadingItem:'',
      form:{
        user:{
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: ''
      },
    }
  },
  components:{
    productModal,
  },
  methods:{
    getProductList(){
      axios.get(`${url}v2/api/${pathName}/products/all`)
        .then(res => {
          this.products = res.data.products;
        }) ;
    },
    getProduct(id){
      this.loadingItem = id;
      axios.get(`${url}v2/api/${pathName}/product/${id}`)
        .then(res => {
          this.tempProduct = res.data.product;
          this.loadingItem = '';
          this.$refs.productModal.openModal();
        }) ;
    },
    addToCart(product_id,qty = 1){
      const data = {
        product_id,
        qty
      };
      this.loadingItem = product_id;
      axios.post(`${url}v2/api/${pathName}/cart`,{data})
        .then(res => {
          this.$refs.productModal.hideModal();
          this.loadingItem = '';
          this.getCart();
        }) ;
    },
    getCart(){
      axios.get(`${url}v2/api/${pathName}/cart`)
        .then(res => {
          this.cart = res.data.data;
        }) ;
    },
    updateCartItem(item){
      const data = {
        product_id : item.product.id,
        qty : item.qty
      }
      this.loadingItem = item.id;
      axios.put(`${url}v2/api/${pathName}/cart/${item.id}`,{ data })
        .then(res => {
          this.loadingItem = '';
          this.getCart();
        }) ;
    },
    deleteCartItem(item){
      this.loadingItem = item.id;
      axios.delete(`${url}v2/api/${pathName}/cart/${item.id}`)
        .then(res => {
          this.loadingItem = '';
          this.getCart();
        }) ;
    },
    deleteCart(){
      axios.delete(`${url}v2/api/${pathName}/carts`)
        .then(res => {
          this.getCart();
        }) ;
    },
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/
      return phoneNumber.test(value) ? true : '需要正確的電話號碼'
    },
    createOrder(){
      let data = this.form;
      axios.post(`${url}v2/api/${pathName}/order`,{data})
        .then(res => {
          alert(res.data.message);
          this.form.user = {
            name: '',
            email: '',
            tel: '',
            address: ''
          };
          this.form.message = '';
          this.getCart();
        })
        .catch(err => {
          alert(err.data.message);
        }) ;
    },
  },
  mounted(){
    this.getProductList();
    this.getCart();
  },
});

app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);

app.mount('#app');
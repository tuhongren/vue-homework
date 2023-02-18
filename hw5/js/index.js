import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const url = 'https://vue3-course-api.hexschool.io/' ;
const pathName = 'rainj' ;

const productModal = {
  props:['id','addToCart','openModal'],
  template:'#userProductModal',
  data(){
    return {
      tempProduct:{},
      modal:{},
      qty:1,
    }
  },
  watch:{
    id(){
      console.log('------',this.id)
      axios.get(`${url}v2/api/${pathName}/product/${this.id}`)
        .then(res => {
          this.tempProduct = res.data.product;
          this.modal.show();
        }) ;
    }
  },
  methods:{
    hideModal(){
      this.modal.hide();
    }
  },
  mounted(){
    this.modal = new bootstrap.Modal(this.$refs.modal);
    this.$refs.modal.addEventListener('hidden.bs.modal', function (event) {
      // console.log('ID[',id)
      console.log(event)
      console.log('ID----[',event.id)
      this.openModal('');
    });
  },
}

const app = createApp({
  data(){
    return {
      products:{},
      productId:'',
      cart:{},
      loadingItem:'',
    }
  },
  components:{
    productModal,
  },
  methods:{
    init(){
      axios.get(`${url}v2/api/${pathName}/products/all`)
        .then(res => {
          this.products = res.data.products;
        }) ;
    },
    openModal(Id){
      console.log('OuterID',Id)
      this.productId = Id ;
    },
    addToCart(product_id,qty = 1){
      const data = {
        product_id,
        qty
      };
      axios.post(`${url}v2/api/${pathName}/cart`,{data})
        .then(res => {
          this.$refs.productModal.hideModal();
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
  },
  mounted(){
    this.init();
    this.getCart();
  },
});

app.mount('#app');
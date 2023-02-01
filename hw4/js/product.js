import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import productModal from './../components/productModal.js' ;
import deleteProductModal from './../components/delProductModal.js' ;
import pagination from './../components/page.js' ;
let openProductModal = '';
let delProductModal = '';

createApp({
  data(){
    return {
      url:"https://vue3-course-api.hexschool.io/",
      pathName:'rainj',
      productList:[],
      getType:'',
      tmpProduct:{
        imagesUrl:[],
      },
      page:{},
    }
  },
  components:{
    productModal,
    deleteProductModal,
    pagination,
  },
  mounted(){
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)RainJToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
    this.checkToken();

    openProductModal  = new bootstrap.Modal(document.getElementById('productModal'));
    delProductModal  = new bootstrap.Modal(document.getElementById('delProductModal'));
  },
  methods:{
    checkToken(){
      axios.post(`${this.url}v2/api/user/check`)
        .then(res => {
          this.getProducts(1);
        })
        .catch(err =>{
          alert(err.data.message);
          window.location = "index.html";
        });
    },
    getProducts(page = 1){ //預設參數
      axios.get(`${this.url}v2/api/${this.pathName}/admin/products?page=${page}`)
        .then(res => {
          this.productList = res.data.products;
          this.page = res.data.pagination;
        })
        .catch(err =>{
          alert(err.data.message);
        });
    },
    openModal(type,product){
      this.getType = type ;
      if(this.getType === 'new') {
        this.tmpProduct = {
          imagesUrl:[],
        }
        openProductModal.show();
      } else if(this.getType === 'edit'){
        this.tmpProduct = {...product}
        openProductModal.show();
      } else {
        this.tmpProduct = {...product}
        delProductModal.show();
      }
    },
    updateModal(product){
      if(this.getType === 'new') {
        axios.post(`${this.url}v2/api/${this.pathName}/admin/product`,{data:product})
          .then(res => {
            this.getProducts(1);
            openProductModal.hide();
          })
          .catch(err =>{
            alert(err.data.message);
          });
      } else {
        axios.put(`${this.url}v2/api/${this.pathName}/admin/product/${this.tmpProduct.id}`,{data:this.tmpProduct})
          .then(res => {
            this.getProducts(1);
            openProductModal.hide();
          })
          .catch(err =>{
            alert(err.data.message);
          });
      }
    },
    deleteModal(){
      axios.delete(`${this.url}v2/api/${this.pathName}/admin/product/${this.tmpProduct.id}`)
        .then(res => {
          delProductModal.hide();
          this.getProducts(1);
        })
        .catch(err =>{
          alert(err.data.message);
        });
    },
    uploadImages(type){
      if(type === 'new'){
        this.tmpProduct.imagesUrl.push('');
      } else if(type === 'delete'){
        this.tmpProduct.imagesUrl.pop();
      }
    },
  },
}).mount('#app');
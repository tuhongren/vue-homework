import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
  data(){
    return{
      url:"https://vue3-course-api.hexschool.io/",
      user: {
        username:"",
        password:""
      }
    }
  },
  methods:{
    login(){
      axios.post(`${this.url}v2/admin/signin`,this.user)
        .then(res => {
          const {expired,token} = res.data;
          document.cookie = `RainJToken=${token};expires=${new Date(expired)}`;
          window.location = "product.html"; 
        })
        .catch(err =>{
          alert(`${err.data.error.message}`)
        });
    }
  }
}).mount('#app');

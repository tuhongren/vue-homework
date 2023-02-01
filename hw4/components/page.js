export default {
  props:['pages','getProducts'],
  template: `
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{disabled: !pages.has_pre}">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li v-for="page in pages.total_pages" :key="page+'page'" class="page-item" :class="{active: page === pages.current_page }">
        <a class="page-link" href="#"  @click="getProducts(page)">{{page}}</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" :class="{disabled: !pages.has_next}" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>`
} ;

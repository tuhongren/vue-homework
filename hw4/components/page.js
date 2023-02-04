export default {
  props:['pages'],
  template: `
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{disabled: !pages.has_pre}">
        <a class="page-link" href="#" @click.prevent="$emit('change-page',(pages.current_page-1))" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li v-for="page in pages.total_pages" :key="page+'page'" class="page-item" :class="{'active page-disabled': page === pages.current_page}"  > 
        <a class="page-link" href="#"  @click.prevent="$emit('change-page',page)">{{page}}</a>
      </li>
      <li class="page-item" :class="{'disabled': !pages.has_next}">
        <a class="page-link" href="#" @click.prevent="$emit('change-page',(pages.current_page+1))" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>`
} ;

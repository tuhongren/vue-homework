export default {
  props:['getType','tmpProduct','updateModal','uploadImages'],
  template: `
  <div class="modal-content border-0">
    <div class="modal-header bg-dark text-white">
      <h5 id="productModalLabel" class="modal-title">
        <span v-if="getType === 'new'">新增產品</span>
        <span v-else>編輯產品</span>
      </h5>
      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
      <div class="row">
        <div class="col-sm-4">
          <div class="mb-3">
            <label for="imageUrl" class="form-label">主要圖片</label>
            <input v-model="tmpProduct.imageUrl" type="text" class="form-control mb-2" placeholder="請輸入圖片連結">
            <img class="img-fluid" :src="tmpProduct.imageUrl">
          </div>
          <h3 class="mb-3">多圖新增</h3>
          <template v-if="Array.isArray(tmpProduct.imagesUrl)">
            <div class="mb-1" v-for="(image, index) in tmpProduct.imagesUrl" :key="index">
              <div class="mb-3">
                <label for="imageUrl" class="form-label">圖片網址</label>
                <input v-model="tmpProduct.imagesUrl[index]" type="text" class="form-control"
                  placeholder="請輸入圖片連結">
              </div>
              <img class="img-fluid" :src="image">
            </div>
            <div v-if="!tmpProduct.imagesUrl.length || tmpProduct.imagesUrl[tmpProduct.imagesUrl-1]">
              <button class="btn btn-outline-primary btn-sm d-block w-100"
                @click.prevent="uploadImages('new')">
                新增圖片
              </button>
            </div>
            <div v-else>
              <button class="btn btn-outline-danger btn-sm d-block w-100" @click.prevent="uploadImages('delete')">
                刪除圖片
              </button>
            </div>
          </template>
          <div v-else>
            <button class="btn btn-outline-primary btn-sm d-block w-100" @click.prevent="uploadImages(getType)">
              新增圖片
            </button>
          </div>
        </div>
        <div class="col-sm-8">
          <div class="mb-3">
            <label for="title" class="form-label">標題</label>
            <input id="title" type="text" class="form-control" placeholder="請輸入標題" v-model="tmpProduct.title">
          </div>
          <div class="row">
            <div class="mb-3 col-md-6">
              <label for="category" class="form-label">分類</label>
              <input id="category" type="text" class="form-control" placeholder="請輸入分類" v-model="tmpProduct.category">
            </div>
            <div class="mb-3 col-md-6">
              <label for="price" class="form-label">單位</label>
              <input id="unit" type="text" class="form-control" placeholder="請輸入單位" v-model="tmpProduct.unit">
            </div>
          </div>
          <div class="row">
            <div class="mb-3 col-md-6">
              <label for="origin_price" class="form-label">原價</label>
              <input id="origin_price" type="number" min="0" class="form-control" placeholder="請輸入原價" v-model.number="tmpProduct.origin_price">
            </div>
            <div class="mb-3 col-md-6">
              <label for="price" class="form-label">售價</label>
              <input id="price" type="number" min="0" class="form-control" placeholder="請輸入售價" v-model.number="tmpProduct.price">
            </div>
          </div>
          <hr>
          <div class="mb-3">
            <label for="description" class="form-label">產品描述</label>
            <textarea id="description" type="text" class="form-control" placeholder="請輸入產品描述" v-model="tmpProduct.description"></textarea>
          </div>
          <div class="mb-3">
            <label for="content" class="form-label">說明內容</label>
            <textarea id="description" type="text" class="form-control" placeholder="請輸入說明內容" v-model="tmpProduct.content"></textarea>
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input id="is_enabled" class="form-check-input" type="checkbox" :true-value="1" :false-value="0" v-model="tmpProduct.is_enabled">
              <label class="form-check-label" for="is_enabled">是否啟用</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
        取消
      </button>
      <button type="button" class="btn btn-primary" @click.prevent="updateModal(tmpProduct)">
        確認
      </button>
    </div>
  </div>`
} ;

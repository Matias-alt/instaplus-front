<template>
  <el-col v-for="pub in publications" :key="pub.id" :span="6">
    <el-card :body-style="{ padding: '0px' }">
      <img :src="pub.images[0]" class="image"/>
      <div style="padding: 10px">
        <h6>{{ pub.title }}</h6>
        <el-row class="countdown">
          <el-countdown title="Tiempo restante para que se publique en Instagram" :value="pub.countdown" />
        </el-row>
      </div>
    </el-card>

    <el-dialog
      v-model="deleteDialog.visible"
      title=" ¿Estas seguro que deseas eliminar esta publicación?"
      width="30%"
      center
      :close-on-click-modal="false"
      :show-close="false"
    >
      <template #footer>
        <el-button @click="cancelDelete">Cancel</el-button>
        <el-button type="primary" @click="deletePublication">
          Confirm
        </el-button>
      </template>
    </el-dialog>
  </el-col>
</template>
  
<script>
import InstaplusApi from '../services/apiService'
import { ElNotification, ElLoading } from 'element-plus'

export default {
  name: 'Publications',
  data() {
    return {
      publications: [],
      deleteDialog: {
        visible: false,
        id: null
      },
      loadingInstance: ''
    };
  },
  mounted() {
    this.getPublications();
  },
  methods: {
    async getPublications() {
      InstaplusApi.get_publications().then((response) => {
        if(response.data.length > 0) {
          response.data.forEach(element => {
            element.publicationDate = new Date(element.publicationDate)
            element.countdown =  new Date(element.publicationDate)
          });

          const currentDate = new Date();
          const filteredData = response.data.filter(pub => pub.publicationDate > currentDate);

          filteredData.sort((a, b) => b.publicationDate - a.publicationDate);

          while (filteredData.length > 4) {
            filteredData.pop()
          }

          this.publications = filteredData;
        } else {
          this.publications = [];
          ElNotification({ title: 'Error', message: 'No se encontraron publicaciones', type: 'error' });
        };
      }).catch((error) => {
        ElNotification({ title: 'Error', message: error, type: 'error' });
      });
    },

    async handleDeletePublication(id) {
      this.deleteDialog.visible = true;
      this.deleteDialog.id = id;
    },

    async cancelDelete() {
      this.deleteDialog.visible = false;
      this.deleteDialog.id = null;
    },

    async deletePublication() {
      this.startLoading();

      InstaplusApi.delete_publication(this.deleteDialog.id).then((response) => {
        setTimeout(() => {
          this.deleteDialog.visible = false;
          this.getPublications();
          this.stopLoading();
        }, 500);
      }).catch((error) => {
        ElNotification({ title: 'Error', message: error, type: 'error' });
        this.stopLoading();
      });
    },

    async startLoading() {
      this.loadingInstance = ElLoading.service({ fullscreen: true })
    },

    async stopLoading() {
      this.loadingInstance.close();
    },
  }
};
</script>

<style>
.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.countdown {
  margin-top: 13px;
}

.image {
  width: 100%;
  display: block;
}
</style>
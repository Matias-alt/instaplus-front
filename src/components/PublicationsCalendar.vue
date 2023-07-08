<template>
  <el-row style="margin-bottom: 20px;">
    <el-select v-model="publicationType" style="margin: 0 20px 0 50px;" placeholder="Tipo de publicación">
      <el-option label="Publicadas" value="published"></el-option>
      <el-option label="Por publicar" value="noPublished"></el-option>
    </el-select>
    <el-button @click="filterPublications" type="primary">
      <el-icon style="margin-right: 5px;"><Search /></el-icon> FILTRAR 
    </el-button>
  </el-row>
  
  <el-timeline>
    <ul class="infinite-list" style="overflow: auto">
      <el-timeline-item  v-for="pub in publications" :key="pub.id" v-infinite-scroll="4" placement="top" >
        <el-card>
          <el-row :gutter="20">
            <el-col :span="6">
              <img :src="pub.images[0]" class="image"/>
            </el-col>

            <el-col :span="12" class="margin">
              <h3>Titulo: {{ pub.title }}</h3>
              <h4>Fecha de publicación: {{ pub.publicationDate }}</h4>
            </el-col>

            <el-col :span="6">
              <el-button-group class="margin">
                <el-button @click="handleUpdatePublication(pub.id)">
                  <el-icon><Edit /></el-icon></el-button>
                <el-button @click="handleDeletePublication(pub.id)">
                  <el-icon><Delete /></el-icon>
                </el-button>
              </el-button-group>
            </el-col>
          </el-row>
          
        </el-card>
      </el-timeline-item>
    </ul>
  </el-timeline>

  <el-dialog
    v-model="deleteDialog.visible"
    title="La publicacíon se eliminara de forma permanente"
    width="30%"
    center
    :close-on-click-modal="false"
    :show-close="false"
  >
    <template #footer>
      <el-button @click="cancelDelete">Cancelar</el-button>
      <el-button type="primary" @click="deletePublication">
        Confirmar
      </el-button>
    </template>
  </el-dialog>

  <el-dialog
    v-model="updateDialog.visible"
    title="Editar publicación"
    width="45%"
    center
    :close-on-click-modal="false"
    :show-close="false"
  >
    <el-form
      label-position="top"
      label-width="100px"
      :model="updatePublicationForm"
    >
      <el-form-item label="Título">
        <el-input v-model="updatePublicationForm.title" type="text"/>
      </el-form-item>
      <el-form-item label="Descripción">
        <el-input v-model="updatePublicationForm.description" type="textarea"/>
      </el-form-item>
      <el-form-item label="Fecha de publicación">
        <el-date-picker
        v-model="updatePublicationForm.publicationDate"
        type="datetime"
        placeholder="Seleciona una fecha"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button @click="cancelUpdate">Cancelar</el-button>
      <el-button type="primary" @click="updatePublication">
        Confirmar
      </el-button>
    </template>
  </el-dialog>
</template>

<script>
import InstaplusApi from '../services/apiService'
import { ElNotification, ElLoading } from 'element-plus'

export default {
name: 'PublicationsCalendar',
data() {
  return {
    publications: [],
    deleteDialog: {
      visible: false,
      id: null
    },
    updateDialog: {
      visible: false,
      id: null
    },
    updatePublicationForm: {
      id: '',
      title: '',
      description: '',
      publicationDate: '',
    },
    loadingInstance: '',
    publicationType: '',
  };
},
mounted() {
  this.getPublications();
},
methods: {
  filterPublications() {
    if(this.publicationType === 'published'){
      InstaplusApi.get_publications().then((response) => {
        if(response.data.length > 0) {
          response.data.forEach(element => {
            element.publicationDate = new Date(element.publicationDate)
          });

          const currentDate = new Date();

          const filteredData = response.data.filter(pub => pub.publicationDate <= currentDate);

          filteredData.sort((a, b) => b.publicationDate - a.publicationDate);

          filteredData.forEach(element => {
            const year = element.publicationDate.getFullYear().toString().slice(-2);
            const month = ('0' + (element.publicationDate.getMonth() + 1)).slice(-2);
            const day = ('0' + element.publicationDate.getDate()).slice(-2);
            const hours = ('0' + element.publicationDate.getHours()).slice(-2);
            const minutes = ('0' + element.publicationDate.getMinutes()).slice(-2);

            const formattedDate = `${year}/${month}/${day} ${hours}:${minutes}hrs`
            element.publicationDate = formattedDate
          });

          this.publications = filteredData;
        } else {
          this.publications = [];
          ElNotification({ title: 'Info', message: 'No se encontraron publicaciones', type: 'error' });
        };
      }).catch((error) => {
        ElNotification({ title: 'Error', message: error, type: 'error' });
      });
    } else if(this.publicationType === 'noPublished'){
      InstaplusApi.get_publications().then((response) => {
        if(response.data.length > 0) {
          response.data.forEach(element => {
            element.publicationDate = new Date(element.publicationDate)
          });

          const currentDate = new Date();

          const filteredData = response.data.filter(pub => pub.publicationDate > currentDate);

          filteredData.sort((a, b) => b.publicationDate - a.publicationDate);

          filteredData.forEach(element => {
            const year = element.publicationDate.getFullYear().toString().slice(-2);
            const month = ('0' + (element.publicationDate.getMonth() + 1)).slice(-2);
            const day = ('0' + element.publicationDate.getDate()).slice(-2);
            const hours = ('0' + element.publicationDate.getHours()).slice(-2);
            const minutes = ('0' + element.publicationDate.getMinutes()).slice(-2);

            const formattedDate = `${year}/${month}/${day} ${hours}:${minutes}hrs`
            element.publicationDate = formattedDate
          });

          this.publications = filteredData;
        } else {
          this.publications = [];
          ElNotification({ title: 'Info', message: 'No se encontraron publicaciones', type: 'error' });
        };
      }).catch((error) => {
        ElNotification({ title: 'Error', message: error, type: 'error' });
      });
    }
  },
  async getPublications() {
    InstaplusApi.get_publications().then((response) => {
      if(response.data.length > 0) {
        response.data.forEach(element => {
          element.publicationDate = new Date(element.publicationDate)
        });

        response.data.sort((a, b) => b.publicationDate - a.publicationDate);

        response.data.forEach(element => {
          const year = element.publicationDate.getFullYear().toString().slice(-2);
          const month = ('0' + (element.publicationDate.getMonth() + 1)).slice(-2);
          const day = ('0' + element.publicationDate.getDate()).slice(-2);
          const hours = ('0' + element.publicationDate.getHours()).slice(-2);
          const minutes = ('0' + element.publicationDate.getMinutes()).slice(-2);

          const formattedDate = `${year}/${month}/${day} ${hours}:${minutes}hrs`
          element.publicationDate = formattedDate
        });

        this.publications = response.data;
      } else {
      this.publications = [];
      ElNotification({ title: 'Info', message: 'No se encontraron publicaciones', type: 'error' });
      };
    }).catch((error) => {
        ElNotification({ title: 'Error', message: error, type: 'error' });
    });
  },
  async handleDeletePublication(id) {
    this.deleteDialog.visible = true;
    this.deleteDialog.id = id;
  },

  async handleUpdatePublication(id) {
    InstaplusApi.get_publication(id).then((response) => {
      this.updatePublicationForm.title = response.data[0].title
      this.updatePublicationForm.description = response.data[0].description
      this.updatePublicationForm.publicationDate = response.data[0].publicationDate

      this.updateDialog.visible = true;
      this.updatePublicationForm.id = id;
    }).catch((error) => {
      ElNotification({ title: 'Error', message: error, type: 'error' });
      this.stopLoading();
    });
  },

  async cancelDelete() {
   this.deleteDialog.visible = false;
    this.deleteDialog.id = null;
  },

  async cancelUpdate() {
   this.updateDialog.visible = false;
    this.updateDialog.id = null;
  },

  async updatePublication() {
    this.startLoading();
    InstaplusApi.update_publication(this.updatePublicationForm).then((response) => {
      setTimeout(() => {
        this.updateDialog.visible = false;
        this.getPublications();
        this.stopLoading();
      }, 500);
    }).catch((error) => {
      ElNotification({ title: 'Error', message: error, type: 'error' });
      this.stopLoading();
    });
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
  .infinite-list {
  height: 400px;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
.el-timeline-item .el-card{
  width: 60%;
}
.margin{
  margin-top: 25px;
}
.image{
  width: 100%;
  display: block;
}
</style>
<template>
  <main>
    <Header></Header>

    <el-row :gutter="50">
      <el-col :span="24">
        <el-tabs
          v-model="categories"
          class="category-tabs"
          @tab-click="handleClick"
          type="border-card"
          stretch="true"
        >
          <el-tab-pane label="PUBLICACIONES" name="publications">
            <el-tabs
              v-model="publicationSubCategories"
              class="sub-category-tabs"
              @tab-click="handleClick"
              tabPosition="left"
            >
              <el-tab-pane class="sub-tab" name="sub-scheduled-pub">
                <template #label><el-icon class="sub-tab-icon"><Clock /></el-icon></template>
                <h6>PUBLICACIONES AGENDADAS</h6>
                <el-divider />
                <el-row :gutter="20">

                  <el-col v-for="pub in publications" :key="pub" :span="6">
                    <el-card :body-style="{ padding: '0px' }">
                      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image"/>
                      <div style="padding: 10px">
                        <h6>Tips para adelgazar</h6>
                        <div class="bottom">
                          <el-button-group class="ml-4">
                            <el-button><el-icon><View /></el-icon></el-button>
                            <el-button><el-icon><Edit /></el-icon></el-button>
                            <el-button><el-icon><Delete /></el-icon></el-button>
                          </el-button-group>
                          <el-button type="warning">24:59:31</el-button>
                        </div>
                      </div>
                    </el-card>
                  </el-col>

                </el-row>
              </el-tab-pane>
              <el-tab-pane class="sub-tab" name="sub-new-pub" >
                <template #label><el-icon><Plus /></el-icon></template>
                <h6>NUEVA PUBLICACION</h6>

                <el-form
                  label-position="top"
                  label-width="100px"
                  :model="createPublicationForm"
                >
                  <el-form-item label="Titulo">
                    <el-input v-model="createPublicationForm.title" type="text"/>
                  </el-form-item>
                  <el-form-item label="Descripción">
                    <el-input v-model="createPublicationForm.description" type="textarea"/>
                  </el-form-item>
                  <el-form-item label="Fecha de publicación">
                    <el-date-picker
                    v-model="createPublicationForm.publicationDate"
                    type="datetime"
                    placeholder="Seleciona una fecha"
                    />
                  </el-form-item>
                  <el-form-item label="Descripción">
                    <el-upload
                      ref="upload"
                      v-model:file-list="createPublicationForm.images"
                      :multiple="true"
                      action="http://localhost:3000/api/publications/upload"
                      list-type="picture-card"
                      :on-preview="handlePictureCardPreview"
                      :on-remove="handleRemove"
                    >
                      <el-icon><Plus /></el-icon>
                    </el-upload>
                  </el-form-item>
                  <el-row>
                    <el-button  @click="createPublication" type="primary">Crear</el-button>
                  </el-row>
                </el-form>

                <el-divider />
              </el-tab-pane>
              <el-tab-pane class="sub-tab" name="sub-saving-pub">
                <template #label><el-icon><Star /></el-icon></template>
                <h6>FAVORITOS</h6>
                <el-divider />
              </el-tab-pane>
              <el-tab-pane class="sub-tab" name="sub-calendar-pub">
                <template #label><el-icon><Calendar /></el-icon></template>
                <h6>CALENDARIO</h6>
                <el-divider />
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="HISTORIAS" name="histories">HISTORIAS</el-tab-pane>
          <el-tab-pane label="REELS" name="reels">REELS</el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </main>
</template>

<script lang="ts" setup>
  import InstaplusApi from '../services/apiService'
  import Header from '../components/Header.vue'
  import { reactive, ref } from 'vue'
  import { ElNotification, TabsPaneContext, UploadProps } from 'element-plus'

  const categories = ref('publications')
  const publicationSubCategories =  ref('sub-scheduled-pub')
  const historiesSubCategories =  ref('sub-scheduled-pub')
  const reelsSubCategories =  ref('sub-scheduled-pub')

  const createPublicationForm = reactive({title: '', description: '', publicationDate: '', images: []});

  const handleClick = (tab: TabsPaneContext, event: Event) => {}
  const dialogImageUrl = ref('')
  const dialogVisible = ref(false)
  const handleRemove: UploadProps['onRemove'] = () => {}
  const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url!
    dialogVisible.value = true
  }

  let publications = [];

  function getPublications() {
    InstaplusApi.get_publications().then((response) => {
      if(response.data.length > 0) {
        console.log(response.data);
        publications = response.data
      } else {
        ElNotification({ title: 'Error', message: 'No se encontraron publicaciones', type: 'error' });
      };
    }).catch((error) => {
      ElNotification({ title: 'Error', message: error, type: 'error' });
    });
  }

  function createPublication() {
    if (!validForm()) { return }

    const formData = new FormData();
    createPublicationForm.images.forEach((file) => {      
      formData.append('file', file.raw);
    });

    formData.append('title', createPublicationForm.title);
    formData.append('description', createPublicationForm.description);
    formData.append('publicationDate', createPublicationForm.publicationDate);

    InstaplusApi.create_publication(formData).then((response) => {
      if(response.data) {

      } else {
        ElNotification({ title: 'Error', message: 'No se pudo crear la publicacion', type: 'error' });
      };
    }).catch((error) => {
      ElNotification({ title: 'Error', message: error, type: 'error' });
    });
  }

  function validForm() {
    if (createPublicationForm.title === '' || createPublicationForm.description === '',
    createPublicationForm.publicationDate === '') {
      ElNotification({
        title: 'Error', message: 'Debe completar todos los campos para crear una publicación', type: 'error'
      });
      return false;
    };

    return true;
  };

  getPublications();

  
</script>

<style>
.category-tabs > .el-tabs__content {
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.sub-tab {
  padding: 0 20px;
}
.el-tabs__item {
  font-size: 20px;
}

.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  display: block;
}

</style>

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
                <h6>ALERTAS DE PUBLICACIONES</h6>
                <el-divider />
                <el-row :gutter="20">

                  <Publications></Publications>

                </el-row>
              </el-tab-pane>
              <el-tab-pane class="sub-tab" name="sub-new-pub" >
                <template #label><el-icon><Plus /></el-icon></template>
                <h6>NUEVA PUBLICACIÓN</h6>
                <el-divider />
                <el-form
                  label-position="top"
                  label-width="100px"
                  :model="createPublicationForm"
                >
                  <el-form-item label="Título">
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
                    <el-button @click="createPublication" type="primary">Crear</el-button>
                  </el-row>
                </el-form>

                <el-divider />
              </el-tab-pane>

              <el-tab-pane class="sub-tab" name="sub-calendar-pub">
                <template #label><el-icon><Calendar /></el-icon></template>
                <h6>PUBLICACIONES AGENDADAS</h6>
                <el-divider />
                <PublicationsCalendar></PublicationsCalendar>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane disabled="true" label="HISTORIAS" name="histories">HISTORIAS</el-tab-pane>
          <el-tab-pane disabled="true" label="REELS" name="reels">REELS</el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </main>
</template>

<script lang="ts" setup>
  import InstaplusApi from '../services/apiService'
  import Header from '../components/Header.vue'
  import Publications from '../components/Publications.vue'
  import PublicationsCalendar from '../components/PublicationsCalendar.vue'
  import { reactive, ref } from 'vue'
  import { ElNotification, TabsPaneContext, UploadProps } from 'element-plus'

  const categories = ref('publications')
  const publicationSubCategories =  ref('sub-scheduled-pub')

  const createPublicationForm = reactive({title: '', description: '', publicationDate: '', images: []});

  const handleClick = (tab: TabsPaneContext, event: Event) => {}
  const dialogImageUrl = ref('')
  const dialogVisible = ref(false)
  const handleRemove: UploadProps['onRemove'] = () => {}
  const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url!
    dialogVisible.value = true
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
        ElNotification({ title: 'Genial!', message: 'Publicacion creada exitosamente', type: 'success' });
        createPublicationForm.title = '';
        createPublicationForm.description = '';
        createPublicationForm.publicationDate = '';
        createPublicationForm.images = [];
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

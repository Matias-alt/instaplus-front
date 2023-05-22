<template>
  <div>
    <el-row>
      <img class="logo-cont" src="../assets/img/LogoMakr-4jcthR.png" alt="">
    </el-row>
        
    <h2 class="title">Crea una cuenta en instaplus y comienza a crear! </h2>

    <el-row :gutter="50">
      <el-col :span="24">
        <el-card class="box-card form-container">
          <el-form label-position="top" label-width="100px" :model="loginForm">
            <el-form-item label="Nombre">
              <el-input v-model="loginForm.name"/>
            </el-form-item>
            <el-form-item label="Apellido">
              <el-input v-model="loginForm.name"/>
            </el-form-item>
            <el-form-item label="País">
              <el-input v-model="loginForm.name"/>
            </el-form-item>
            <el-form-item label="Fecha de nacimiento">
              <el-input v-model="loginForm.region"/>
            </el-form-item>
            <el-form-item label="Contraseña">
              <el-input v-model="loginForm.name"/>
            </el-form-item>
            <el-form-item label="Repetir Contraseña">
              <el-input v-model="loginForm.region"/>
            </el-form-item>
            
            <el-row>
              <el-button type="primary">Crear cuenta</el-button>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const labelPosition = ref('right')

const loginForm = reactive({
  name: '',
  region: '',
  type: '',
})
</script>

<style scoped>
.title {
  text-align: center;
  margin-bottom: 30px;
}
.logo-cont {
  margin: 50px auto;
  width: 20%!important;
}
.form-container {
  width: 100%;
  margin: 0 auto 50px auto;
}

@media (min-width: 1024px) {
 .form-container {
    width: 40%;
  }
}
</style>

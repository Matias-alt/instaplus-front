<template>
  <div>
    <el-row>
      <img class="logo-cont" src="../assets/img/LogoMakr-4jcthR.png" alt="">
    </el-row>
        
    <h2 class="title">Crea una cuenta en instaplus</h2>

    <el-row :gutter="50">
      <el-col :span="24">
        <el-card class="box-card form-container">
          <el-form label-position="top" label-width="100px" :model="signUpForm">
            <el-form-item label="Nombre">
              <el-input v-model="signUpForm.name"/>
            </el-form-item>
            <el-form-item label="Apellido">
              <el-input v-model="signUpForm.lastName"/>
            </el-form-item>
            <el-form-item label="Correo electrónico">
              <el-input v-model="signUpForm.email"/>
            </el-form-item>
            <el-form-item label="Fecha de nacimiento">
              <el-date-picker
                v-model="signUpForm.birthDate"
                type="date"
                placeholder="Seleccione una Fecha"
                :size="size"
              />
            </el-form-item>
            <el-form-item label="Contraseña">
              <el-input v-model="signUpForm.password"/>
            </el-form-item>
            <el-form-item label="Repetir Contraseña">
              <el-input v-model="signUpForm.repeatPassword"/>
            </el-form-item>
            
            <el-row>
              <el-button @click="createUser" type="primary">Crear cuenta</el-button>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
  import InstaplusApi from '../services/apiService'
  import router from "@/router";

  import { ElNotification, ElLoading } from 'element-plus'
  import moment from 'moment'
  import { reactive } from 'vue'

  const signUpForm = reactive({
    name: '',
    lastName: '',
    email: '',
    birthDate: '',
    password: '',
    repeatPassword: ''
  })

  let loadingInstance = '';

  function createUser() {
    if (!validForm()) { return }

    if (!validPassword()) { return }

    startLoading();

    signUpForm.birthday = moment(signUpForm.birthday).format('YYYY-MM-DD');

    InstaplusApi.create_user(signUpForm).then((response) => {
      if(response.data.state) {
        setTimeout(() => {
          router.push({name: 'login'});
          stopLoading();
        }, 1000);
      } else {
        ElNotification({title: 'Error', message: 'Ya existe un usuario con esos datos', type: 'error'});
        stopLoading();
      }
    }).catch((error) => {
      ElNotification({title: 'Error', message: error, type: 'error'});
      stopLoading();
    });
  };

  function startLoading() {
    loadingInstance = ElLoading.service({ fullscreen: true })
  };

  function stopLoading() {
    loadingInstance.close();
  };

  function validForm() {
    if (signUpForm.name === ''|| signUpForm.lastName === '' || signUpForm.email === ''|| 
    signUpForm.password === '' ) {
      ElNotification({
        title: 'Error', message: 'Debe llenar los campos para registrarse', type: 'error'
      });

      return false;
    };

    return true;
  };

  function validPassword() {
    if (signUpForm.password !== signUpForm.repeatPassword) {
      
      ElNotification({title: 'Error', message: 'Las contraseñas deben ser iguales', type: 'error'});

      return false;
    };

    if (signUpForm.password.length < 10) {
      
      ElNotification({title: 'Error', message: 'La contraseña debe tener minimo 10 caracteres', type: 'error'});

      return false;
    };

    return true;
  };
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

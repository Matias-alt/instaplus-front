<template>
  <div>
    <el-row>
      <img class="logo-cont" src="../assets/img/LogoMakr-4jcthR.png" alt="">
    </el-row>

    <h2 class="title">Accede a tu cuenta de instaplus</h2>

    <el-row :gutter="50">
      <el-col :span="24">
        <el-card class="box-card form-container">
          <el-form
            label-position="top"
            label-width="100px"
            :model="loginForm"
          >
            <el-form-item label="Email">
              <el-input v-model="loginForm.email" />
            </el-form-item>
            <el-form-item label="Contraseña">
              <el-input v-model="loginForm.password" type="password" />
            </el-form-item>

            <el-row class="logo">
              <el-button
                :key="warningt"
                :type="warning"
                link
              >¿Has olvidado tu contraseña?</el-button>
            </el-row>

            <el-row>
              <el-button @click="loginUser" type="primary">Iniciar sesion</el-button>
              <el-button  @click="signUpRedirect" type="primary">Registrarse</el-button>
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

  import { ElNotification } from 'element-plus'
  import { reactive } from 'vue'

  const loginForm = reactive({ email: '', password: '' });

  function loginUser() {
    if (!validForm()) { return }

    InstaplusApi.login_user(loginForm).then((response) => {
      if(response.data) {
        router.push({name: 'home'});
      } else {
        ElNotification({
          title: 'Error', message: 'Email o contraseña incorrectos', type: 'error'
        });
      }
    }).catch((error) => {
      ElNotification({
        title: 'Error', message: error, type: 'error'
      });
    });
  };

  function signUpRedirect() {
    router.push({name: 'signup'});
  };

  function validForm() {
    if (loginForm.email === ''|| loginForm.password === '' ) {
      ElNotification({
        title: 'Error', message: 'Debe llenar los campos para iniciar sesión', type: 'error'
      });
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
.logo {
  margin: 20px 0px;
}
.form-container {
  width: 100%;
}

@media (min-width: 1024px) {
 .form-container {
    width: 40%;
    margin: 0 auto;
  }
}
</style>

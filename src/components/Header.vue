<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      :ellipsis="false"
      @select="handleSelect"
    >
      <el-menu-item index="0">
        <img  style="margin-bottom: 15px;" class="logo-cont" src="../assets/img/LogoMakr-4jcthR.png" alt="">
      </el-menu-item>
      
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Header',
  // Otras opciones y lógica del componente
}
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
.logo-cont{
  width: 100%;
  margin-top: 10px;
}
</style>
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
        <img class="logo-cont" src="../assets/img/LogoMakr-4jcthR.png" alt="">
      </el-menu-item>
      <div class="flex-grow" />
      <el-sub-menu index="2">
        <template #title>Menu</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
        <el-sub-menu index="2-4">
          <template #title>item four</template>
          <el-menu-item index="2-4-1">item one</el-menu-item>
          <el-menu-item index="2-4-2">item two</el-menu-item>
          <el-menu-item index="2-4-3">item three</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
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
<!-- filepath: /src/views/Home.vue -->
<template>
  <div class="home">
    <h1>欢迎使用智能简历生成器</h1>
    <router-link to="/editor">开始编辑简历</router-link>
    <div class="features">
      <h2>产品功能介绍</h2>
      <p>我们的智能简历生成器可以帮助你快速生成专业的简历。</p>
      <p>只需输入你的信息，点击生成按钮，即可获得一份精美的简历。</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
};
</script>

<style scoped>
.home {
  text-align: center;
  padding: 20px;
  margin-left: 20px; /* 调整位置以适应侧边栏 */
  height: 100%; /* 调整高度以适应侧边栏 */
}
.features {
  margin-top: 20px;
  text-align: left;
}
</style>
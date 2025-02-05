<template>
  <div id="app">
    <div :class="['sidebar', { 'sidebar-hidden': isSidebarHidden }]">
      <button @click="toggleSidebar" class="toggle-button">
        <img v-if="isSidebarHidden" src="/src/assets/images/expand.svg" alt="展开" />
        <img v-else src="/src/assets/images/flod.svg" alt="隐藏" />
      </button>
      <nav>
        <router-link to="/">
          <img src="/src/assets/images/home.svg" alt="首页" />
          <span v-if="!isSidebarHidden">首页</span>
        </router-link>
        <router-link to="/editor">
          <img src="/src/assets/images/editor.svg" alt="简历编辑器" />
          <span v-if="!isSidebarHidden">简历编辑器</span>
        </router-link>
      </nav>
    </div>
    <div :class="['content', { 'content-expanded': isSidebarHidden }]">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isSidebarHidden: false
    };
  },
  methods: {
    toggleSidebar() {
      this.isSidebarHidden = !this.isSidebarHidden;
    }
  }
};
</script>

<style>
/* 关闭四周的白边 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  display: flex;
  height: 100vh;
  width: 100vw;
}

.sidebar {
  background-color: #35495e;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 200px;
  transition: width 0.3s;
}

.sidebar-hidden {
  width: 50px;
}

.toggle-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-bottom: 10px;
}

.toggle-button img {
  width: 24px;
  height: 24px;
}

nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

nav a {
  display: flex;
  align-items: center;
  color: white;
  text-decoration: none;
  padding: 10px 20px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

nav a:hover {
  background-color: #41b883;
}

nav img {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

.content {
  flex: 1;
  padding: 5px;
  transition: margin-left 0.3s;
}

.content-expanded {
  margin-left: 50px;
}
</style>
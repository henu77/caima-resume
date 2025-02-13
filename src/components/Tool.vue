<template>
    <div class="tool" @mouseover="showTooltip" @mouseleave="hideTooltip" @click="handleClick">
      <img :src="icon" alt="tool icon" class="icon" />
      <span v-if="tooltipVisible" class="tooltip">{{ description }}</span>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Tool',
    props: {
      icon: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      onClick: {
        type: Function,
        required: false
      }
    },
    data() {
      return {
        tooltipVisible: false
      };
    },
    methods: {
      showTooltip() {
        this.tooltipVisible = true;
      },
      hideTooltip() {
        this.tooltipVisible = false;
      },
      handleClick() {
        if (this.onClick) {
          this.onClick();
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .tool {
    position: relative;
    cursor: pointer;
    margin: 0 2px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .icon {
    width: 26px;
    height: 26px;
    transition: transform 0.3s, filter 0.3s;
  }
  
  /* .tool:hover {
    background-color: #f0f0f0;
  } */
  
  .tooltip {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #a3a3a3;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    white-space: nowrap;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 5px;
    z-index: 10;
  }
  </style>
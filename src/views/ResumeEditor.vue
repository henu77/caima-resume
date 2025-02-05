<!-- filepath: /src/views/ResumeEditor.vue -->
<template>
  <div class="editor">
    <div class="content">
      <div class="resume-preview">
        <h2>实时简历展示</h2>
        <div v-html="generatedResume" class="resume-content"></div>
      </div>
      <div class="ai-chat">
        <h2>与AI智能体对话</h2>
        <div class="chat-window">
          <div class="messages">
            <div v-for="message in messages" :key="message.id" :class="['message', message.sender]">
              {{ message.text }}
            </div>
          </div>
          <div class="input-area"> 
            <textarea v-model="resumeText" @keydown="handleKeydown"></textarea>
            <button @click="sendMessage">发送</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ResumeEditor',
  data() {
    return {
      resumeText: '',
      generatedResume: '',
      messages: []
    };
  },
  methods: {
    async generateResume() {
      try {
        const response = await axios.post('YOUR_API_ENDPOINT', { text: this.resumeText });
        this.generatedResume = response.data.html;
      } catch (error) {
        console.error('Error generating resume:', error);
      }
    },
    sendMessage() {
      if (this.resumeText.trim() !== '') {
        this.messages.push({ id: Date.now(), text: this.resumeText, sender: 'user' });
        this.resumeText = '';
        // Simulate AI response
        setTimeout(() => {
          this.messages.push({ id: Date.now(), text: 'AI response', sender: 'ai' });
        }, 1000);
      }
    },
    handleKeydown(event) {
      if (event.key === 'Enter' && !event.shiftKey && !event.ctrlKey) {
        event.preventDefault();
        this.sendMessage();
      } else if (event.key === 'Enter' && (event.shiftKey || event.ctrlKey)) {
        event.preventDefault();
        this.resumeText += '\n';
      }
    }
  }
};
</script>

<style scoped>
.editor {
  text-align: center;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  height: 100%;
  /* 调整高度以适应侧边栏 */
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.content {
  display: flex;
  gap: 20px;
  flex: 1;
  overflow: hidden;
}

.resume-preview,
.ai-chat {
  flex: 1;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.resume-content {
  white-space: pre-wrap;
  text-align: left;
  height: 100%;
  overflow-y: auto;
}

.chat-window {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 400px; /* 确保最小高度 */
}

.messages {
  flex: 1; /* 让消息区占据剩余空间 */
  overflow-y: auto;
  margin-bottom: 10px;
  max-height: calc(100% - 110px); /* 保证输入区域不被压缩 */
}

.input-area {

  flex-shrink: 0;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
  padding: 10px 0; /* 给输入区域留些空间 */
  margin-bottom: 10px;
}

textarea {
  flex: 1;
  height: 100px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
}

button {
  margin-left: 10px;
  padding: 10px 20px;
  background-color: #41b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #35495e;
}


.message {
  padding: 10px;
  margin: 5px 0;
  border-radius: 4px;
}

.message.user {
  background-color: #d1e7dd;
  align-self: flex-end;
}

.message.ai {
  background-color: #f8d7da;
  align-self: flex-start;
}
</style>
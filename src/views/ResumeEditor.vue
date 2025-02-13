<template>
  <div class="editor">
    <div class="content">
      <!-- 左侧简历预览区域 -->
      <div class="resume-preview">
        <h2>实时简历展示</h2>
        <iframe ref="resumeIframe" class="resume-content"></iframe>
      </div>

      <!-- 右侧AI聊天与工具栏 -->
      <div class="ai-chat">
        <h2>与AI智能体对话</h2>
        <div class="chat-window">
          <div class="messages">
            <div v-for="message in messages" :key="message.id" :class="['message', message.sender]">
              {{ message.text }}
            </div>
          </div>

          <!-- 工具栏 -->
          <div class="toolbar">
            <Tool icon="/src/assets/images/change-model.svg" description="切换模型" @click="toggleModelSelector" />
            <Tool icon="/src/assets/images/change-template.svg" description="更换模板" @click="toggleTemplateSelector" />
            <Tool icon="/src/assets/images/download.svg" description="下载PDF" @click="downloadPDF" />
          </div>

          <!-- 输入区 -->
          <div class="input-area">
            <textarea v-model="resumeText" @keydown="handleKeydown" placeholder="请输入简历信息..."></textarea>
            <button @click="sendMessage">发送</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 模型选择框 -->
    <div v-if="isModelSelectorVisible" class="modal" @click.self="closeModelSelector">
      <div class="modal-content">
        <h3>选择模型</h3>
        <div>
          <label for="platform-select">选择平台:</label>
          <select id="platform-select" v-model="selectedPlatform">
            <option v-for="platform in platforms" :key="platform.name" :value="platform.name">{{ platform.name }}</option>
          </select>
        </div>
        <div>
          <label for="model-select">选择模型:</label>
          <select id="model-select" v-model="modelConfig.model">
            <option v-for="model in availableModels" :key="model.name" :value="model.name">{{ model.name }}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 模板选择框 -->
    <div v-if="isTemplateSelectorVisible" class="modal" @click.self="closeTemplateSelector">
      <div class="modal-content">
        <h3>选择模板</h3>
        <div v-for="(template, index) in availableTemplates" :key="index" class="template-option"
          @click="selectTemplate(template)">
          <img :src="template.preview" alt="Template Preview" />
          <span>{{ template.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { callModelAPI } from '../api/ai/index';
import Tool from '../components/Tool.vue';
import { platforms } from '../config';

export default {
  name: 'ResumeEditor',
  components: {
    Tool
  },
  data() {
    return {
      resumeText: '',
      htmlResumeContent: '',
      messages: [],
      modelConfig: {
        provider: 'baidu',
        model: 'deepseek-r1',
      },
      resumeTemplate: '',
      platforms,
      selectedPlatform: '百度千帆',
      availableModels: [],
      availableTemplates: [
        { name: 'Template 1', preview: '/src/assets/images/template1-preview.jpg' },
        { name: 'Template 2', preview: '/src/assets/images/template2-preview.jpg' },
        { name: 'Template 3', preview: '/src/assets/images/template3-preview.jpg' }
      ],
      isModelSelectorVisible: false,
      isTemplateSelectorVisible: false,
    };
  },
  mounted() {
    this.loadTemplate();
    this.updateAvailableModels();
    window.addEventListener('keydown', this.handleEscKey);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleEscKey);
  },
  watch: {
    selectedPlatform(newPlatform) {
      this.updateAvailableModels();
    },
    htmlResumeContent(newContent) {
      this.updateIframeContent(newContent);
    }
  },
  methods: {
    handleEscKey(event) {
      if (event.key === 'Escape') {
        if (this.isModelSelectorVisible) {
          this.closeModelSelector();
        }
        if (this.isTemplateSelectorVisible) {
          this.closeTemplateSelector();
        }
      }
    },
    updateAvailableModels() {
      const platform = this.platforms.find(p => p.name === this.selectedPlatform);
      if (platform) {
        this.availableModels = platform.models;
        this.modelConfig.model = platform.models[0].name;
      }
    },
    async loadTemplate() {
      try {
        const response = await axios.get('/src/assets/template.html');
        this.resumeTemplate = response.data;
        this.htmlResumeContent = this.resumeTemplate;
      } catch (error) {
        console.error('加载模板失败:', error);
      }
    },
    async sendMessage() {
      if (this.resumeText.trim() !== '') {
        const userMessage = {
          id: Date.now(),
          text: this.resumeText,
          sender: 'user'
        };
        this.messages.push(userMessage);

        try {
          const apiMessages = [
            { role: 'system', content: "你需要参考我给你提供的简历模板生成我的简历，简历模板如下：" + this.resumeTemplate + "\n\n 请你根据我提供的信息替换模板中的内容，并且给我替换后的HTML代码。" },
            { role: 'user', content: this.resumeText }
          ];

          await callModelAPI({
            provider: this.modelConfig.provider,
            model: this.modelConfig.model,
            messages: apiMessages,
            stream: true,
            onStream: (content) => {
              const aiMessage = this.messages.find(msg => msg.sender === 'ai');
              if (aiMessage) {
                aiMessage.text += content;
              } else {
                this.messages.push({
                  id: Date.now(),
                  text: content,
                  sender: 'ai'
                });
              }
            }
          });

          const regex = /```html([\s\S]*?)```/;
          const response = this.messages[this.messages.length - 1].text;
          const match = response.match(regex);
          if (match) {
            const htmlCode = match[1].trim();
            this.htmlResumeContent = htmlCode;
          } else {
            console.log("未找到HTML代码块");
          }
        } catch (error) {
          console.error('AI 调用失败:', error);
          this.messages.push({
            id: Date.now(),
            text: '抱歉，处理您的请求时出现错误。',
            sender: 'ai'
          });
        }
        this.resumeText = '';
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
    },
    downloadPDF() {
      const iframe = this.$refs.resumeIframe;
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      doc.open();
      doc.write(this.htmlResumeContent);
      doc.close();
      doc.body.style.margin = '0';
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    },
    updateIframeContent(content) {
      const iframe = this.$refs.resumeIframe;
      const doc = iframe.contentDocument || iframe.contentWindow.document;

      doc.open();
      doc.write(content);
      doc.close();
    },
    toggleModelSelector() {
      this.isModelSelectorVisible = !this.isModelSelectorVisible;
    },
    closeModelSelector() {
      this.isModelSelectorVisible = false;
    },
    selectModel(model) {
      this.modelConfig.model = model.name;
      this.isModelSelectorVisible = false;
    },
    toggleTemplateSelector() {
      this.isTemplateSelectorVisible = !this.isTemplateSelectorVisible;
    },
    closeTemplateSelector() {
      this.isTemplateSelectorVisible = false;
    },
    selectTemplate(template) {
      // 假设模板是通过文件路径或预定义的HTML代码进行加载
      this.resumeTemplate = template.name; // 更新为选择的模板
      this.htmlResumeContent = this.resumeTemplate;
      this.isTemplateSelectorVisible = false;
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
  width: 100%;
  height: 100%;
  border: none;
}

.chat-window {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 400px;
}

.messages {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 10px;
  max-height: calc(100% - 110px);
}

.input-area {
  flex-shrink: 0;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
  padding: 10px 0;
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

.toolbar {
  display: flex;
  gap: 10px;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 3px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.toolbar .tool {
  cursor: pointer;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.model-option,
.template-option {
  padding: 10px;
  margin: 5px 0;
  cursor: pointer;
}

.template-option img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
</style>

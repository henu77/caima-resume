<template>
    <div class="settings">
        <section>
            <h2>系统配置</h2>
            <div class="form-group">
                <label for="bailian-api-key">阿里百炼 API 密钥:</label>
                <input type="text" id="bailian-api-key" v-model="localBailianApiKey" />
            </div>
            <div class="form-group">
                <label for="qianfan-api-key">百度千帆 API 密钥:</label>
                <input type="text" id="qianfan-api-key" v-model="localQianfanApiKey" />
            </div>
            <div class="form-group">
                <label for="zhipu-api-key">智谱AI API 密钥:</label>
                <input type="text" id="zhipuApiKey" v-model="localZhipuApiKey" />
            </div>
        </section>
        <section>
            <h2>用户信息</h2>
            <div class="form-group">
                <label for="name">姓名:</label>
                <input type="text" id="name" v-model="localUserName" />
            </div>
            <div class="form-group">
                <label for="phone">电话:</label>
                <input type="text" id="phone" v-model="localUserPhone" />
            </div>
            <div class="form-group">
                <label for="email">邮箱:</label>
                <input type="email" id="email" v-model="localUserEmail" />
            </div>
            <div class="form-group">
                <label for="age">年龄:</label>
                <input type="number" id="age" v-model="localUserAge" />
            </div>
        </section>
        <button @click="saveSettings">保存设置</button>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    data() {
        return {
            localBailianApiKey: '',
            localQianfanApiKey: '',
            localZhipuApiKey: '',
            localUserName: '',
            localUserPhone: '',
            localUserEmail: '',
            localUserAge: null
        };
    },
    computed: {
        ...mapState([
            'bailianApiKey',
            'qianfanApiKey',
            'zhipuApiKey',
            'userName',
            'userPhone',
            'userEmail',
            'userAge'
        ])
    },
    methods: {
        ...mapActions([
            'updateBailianApiKey',
            'updateQianfanApiKey',
            'updateZhipuApiKey',
            'updateUserName',
            'updateUserPhone',
            'updateUserEmail',
            'updateUserAge'
        ]),
        saveSettings() {
            this.updateBailianApiKey(this.localBailianApiKey);
            this.updateQianfanApiKey(this.localQianfanApiKey);
            this.updateZhipuApiKey(this.localZhipuApiKey);
            this.updateUserName(this.localUserName);
            this.updateUserPhone(this.localUserPhone);
            this.updateUserEmail(this.localUserEmail);
            this.updateUserAge(this.localUserAge);
        },
        loadSettings() {
            this.localBailianApiKey = this.bailianApiKey;
            this.localQianfanApiKey = this.qianfanApiKey;
            this.localZhipuApiKey = this.zhipuApiKey;
            this.localUserName = this.userName;
            this.localUserPhone = this.userPhone;
            this.localUserEmail = this.userEmail;
            this.localUserAge = this.userAge;
        }
    },
    created() {
        this.loadSettings();
    }
};
</script>

<style scoped>
.settings {
    padding: 20px;
    max-width: 900px;
    margin: 0 0;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.settings h2 {
    margin-bottom: 20px;
    color: #333;
    font-size: 20px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #555;
}

.form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
}

button {
    padding: 12px 24px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #0056b3;
}
</style>
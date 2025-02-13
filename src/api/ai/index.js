import axios from "axios";
import OpenAI from "openai";
import store from "/src/store"; // 引入 Vuex store

/**
 * 通用调用入口
 * @param {Object} params
 * @param {String} params.provider - 平台名称，如 openai/azure/baidu/ali 等
 * @param {String} params.model - 模型名称，如 gpt-3.5-turbo
 * @param {String} params.messages - 用户输入的内容
 * @param {Object} params.options - 其他可选参数
 * @param {Function} params.onStream - 流式调用的回调函数
 * @returns {Promise<string>} - 返回模型生成的文本
 */
export async function callModelAPI({
  provider,
  model,
  messages,
  options,
  stream,
  onStream,
}) {
  switch (provider) {
    case "zhipu":
      return callZhipuAPI(model, messages, options, stream, onStream);
    case "baidu":
      return callBaiduAPI(model, messages, options, stream, onStream);
    case "ali":
      return callAliyunAPI(model, messages, options, stream, onStream);
    default:
      throw new Error(`暂未支持 ${provider} 平台`);
  }
}

/**
 * 调用 智谱AI API（示例）
 * 智谱AI提供免费的 GLM-4-Flash 和 GLM-4V-Flash 模型，可以用于对话生成和图像生成
 * https://www.bigmodel.cn/dev/api/thirdparty-frame/openai-sdk
 */
async function callZhipuAPI(model, messages, options, stream, onStream) {
  try {
    const openai = new OpenAI({
      apiKey: store.getters.zhipuApiKey, // 从 Vuex store 获取密钥
      dangerouslyAllowBrowser: true,
      baseURL: "https://open.bigmodel.cn/api/paas/v4/",
    });
    const completion = await openai.chat.completions.create({
      model: model,
      messages: messages,
      stream: stream,
    });
    // 流式调用
    for await (const part of completion) {
      if (onStream) onStream(part.choices[0].delta.content);
    }
    console.log("智谱AI调用成功:", completion);

    if (stream === false) {
      return completion.choices[0].message.content;
    }
  } catch (error) {
    console.error("智谱AI调用失败:", error);
    throw error;
  }
}

/**
 * 调用百度 ERNIE 文心一言等服务（示例）
 * 具体请参考百度智能云的相关文档 https://cloud.baidu.com/doc/WENXINWORKSHOP/s/2m3fihw8s
 */
async function callBaiduAPI(model, messages, options, stream, onStream) {
  try {
    const openai = new OpenAI({
      apiKey: store.getters.qianfanApiKey, // 从 Vuex store 获取密钥
      dangerouslyAllowBrowser: true,
      baseURL: "https://qianfan.baidubce.com/v2",
    });
    const completion = await openai.chat.completions.create({
      model: model,
      messages: messages,
      stream: stream,
    });
    for await (const part of completion) {
      if (onStream) onStream(part.choices[0].delta.content);
    }
    if (stream === false) {
      return completion.choices[0].message.content;
    }
  } catch (error) {
    console.error("百度智能云调用失败:", error);
    throw error;
  }
}

/**
 * 调用阿里云百炼 API（示例）
 * 具体请参考阿里云相关文档 https://bailian.console.aliyun.com/detail/deepseek-r1?accounttraceid=89b933ee4a5d497e827a9b59832bef6ffxow#/model-market/detail/deepseek-r1?tabKey=sdk
 * 当前可免费使用的模型有：deepseek-r1-distill-qwen-1.5b、deepseek-r1-distill-qwen-7b、deepseek-r1-distill-qwen-14b、deepseek-r1-distill-qwen-32b、deepseek-r1-distill-llama-8b、deepseek-r1-distill-llama-70b、deepseek-r1、deepseek-v3
 */
async function callAliyunAPI(model, messages, options, stream, onStream) {
  try {
    const openai = new OpenAI({
      apiKey: store.getters.bailianApiKey, // 从 Vuex store 获取密钥
      dangerouslyAllowBrowser: true,
      baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
    });
    const completion = await openai.chat.completions.create({
      model: model,
      messages: messages,
      stream: stream,
    });
    for await (const part of completion) {
      if (part.choices && part.choices[0] && part.choices[0].delta) {
        if (onStream) onStream(part.choices[0].delta.content);
      }
    }
    if (stream === false) {
      return completion.choices[0].message.content;
    }
  } catch (error) {
    console.error("阿里云调用失败:", error);
    throw error;
  }
}
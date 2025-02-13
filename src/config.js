export const platforms = [
    {
      name: '智谱AI',
      url: 'https://www.bigmodel.cn/',
      docUrl: 'https://www.bigmodel.cn/dev/welcome',
      apiKeyUrl: 'https://www.bigmodel.cn/usercenter/proj-mgmt/apikeys',
      models: [
        { name: 'GLM-4-Flash', free: true },
        { name: 'GLM-4V-Flash', free: true }
      ]
    },
    {
      name: '阿里百炼',
      url: 'https://bailian.console.aliyun.com/',
      docUrl: 'https://help.aliyun.com/zh/model-studio/getting-started/what-is-model-studio',
      apiKeyUrl: 'https://help.aliyun.com/zh/model-studio/developer-reference/get-api-key?spm=0.0.0.i1',
      models: [
        { name: 'deepseek-r1' },
        { name: 'deepseek-v3' },
        { name: 'deepseek-r1-distill-qwen-7b' },
        { name: 'deepseek-r1-distill-qwen-14b' },
        { name: 'deepseek-r1-distill-qwen-32b' },
        { name: 'deepseek-r1-distill-llama-8b', freeUntil: '2025-02-25' },
        { name: 'deepseek-r1-distill-llama-70b', freeUntil: '2025-02-25' }
      ]
    },
    {
      name: '百度千帆',
      url: 'https://console.bce.baidu.com/',
      docUrl: 'https://cloud.baidu.com/doc/WENXINWORKSHOP/index.html',
      apiKeyUrl: 'https://cloud.baidu.com/doc/WENXINWORKSHOP/s/Um2wxbaps',
      models: [
        { name: 'ERNIE-Speed-128K', free: true },
        { name: 'ERNIE-Speed-8K', free: true },
        { name: 'ERNIE-Lite-8K', free: true },
        { name: 'ERNIE-Tiny-8K', free: true },
        { name: 'deepseek-r1', freeUntil: '2025-02-19' },
        { name: 'deepseek-v3', freeUntil: '2025-02-19' }
      ]
    },
]
## 简介
羽山数据API服务现已全面兼容MCP协议，打造数据服务MCP Server。usensedata-mcp-server-query-china-company项目为企业类数据查询服务server，用户可通过简单配置快速通过LLM使用羽山数据企业类数据服务。依赖MCP Typescript SDK，可在支持MCP协议的智能体助手中快速接入。

## 工具列表
- **[企业二要素核验](https://www.yushanshuju.com/ords/datatech/api/apidoc/COM030)** - 对法定代表人姓名和企业名称这两个要素进行核验。返回0表示二者一致，返回1表示二者不一致。。
- **[企业模糊查询](https://www.yushanshuju.com/ords/datatech/api/apidoc/PBB020)** - 通过企业名称关键词，查询并返回企业模糊信息。
- **[企业基本信息查询](https://www.yushanshuju.com/ords/datatech/api/apidoc/PBB021)** - 通过企业名称、统一信用代码，查询并返回企业名称、法人、注册资本等基础资料，了解企业概况。
- **[公司对外投资查询](https://www.yushanshuju.com/ords/datatech/api/apidoc/COM045)** - 通过企业名称，可获取企业投资金额，占股比、股东类型等信息。
- **[企业变更记录查询](https://www.yushanshuju.com/ords/datatech/api/apidoc/PBB031)** - 通过企业名称，查询企业变更记录内容。
- **[企业软件著作权信息](https://www.yushanshuju.com/ords/datatech/api/apidoc/COM137)** - 通过企业名称，返回企业软件著作权登记注册信息。
- **[企业商标列表查询](https://www.yushanshuju.com/ords/datatech/api/apidoc/COM140)** - 通过企业名称，获取企业商标列表信息，包括商标名称，企业名称、状态。
- **[企业法院涉诉信息](https://www.yushanshuju.com/ords/datatech/api/apidoc/PBB183)** - 通过企业名称，获取目标企业法院涉诉信息。
- **[企业经营异常](https://www.yushanshuju.com/ords/datatech/api/apidoc/PBB055)** - 通过企业名称，查询对相应企业经营异常信息。

## 环境

### 获取Usense UserID和Key
请联系羽山数据获取用户账号与密钥
[羽山数据](https://www.yushanshuju.com/)

### 安装node.js
当在终端中能成功获取版本号即安装成功，mac须用brew安装
```
node -v
npm -v
```

### 安装依赖
```
npm install
```

### typescript打包
```
npm run build
```

### 更新版本
先登录npm账号，须在package.json中更新版本号
```
npm login
npm publish --access public
```

### 配置mcp server config
macos/linux
```
"mcpServers": {
  "usense-corp": {
    "command": "npx",
    "args": [
      "-y",
      "usensedata-mcp-server-query-china-company"
    ],
    "env": {
      "USENSEDATA_API_KEY": "your_api_key",
      "USENSEDATA_API_USERID": "your_api_userid"
    }
  }
}
```
windows
```
"mcpServers": {
  "usense-corp": {
    "command": "cmd",
    "args": [
      "/c",
      "npx",
      "-y",
      "usensedata-mcp-server-query-china-company"
    ],
    "env": {
      "USENSEDATA_API_KEY": "your_api_key",
      "USENSEDATA_API_USERID": "your_api_userid"
    }
  }
}
```

## 简介
羽山数据API服务现已全面兼容MCP协议，打造数据服务MCP Server。usensedata-mcp-server-query-china-company项目为企业类数据查询服务server，用户可通过简单配置快速通过LLM使用羽山数据企业类数据服务。依赖MCP Typescript SDK，可在支持MCP协议的智能体助手中快速接入。

## 工具列表
待定

## 环境

### 获取Usense UserID和Key
请联系羽山数据获取用户账号与密钥

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

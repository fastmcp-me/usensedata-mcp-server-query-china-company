#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import crypto from "crypto";
import fetch from "node-fetch";

// Environment variables
const apiKey = process.env.USENSEDATA_API_KEY || "your_default_key";
const apiUserId = process.env.USENSEDATA_API_USERID || "your_default_userid";

// Initialize MCP server
const server = new McpServer({
  name: "usensedata_query_china_company",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

// AES encryption and decryption functions
const algorithm = 'aes-256-ecb';

// AES 加密函数
function encrypt(plaintext: string, key: string): string {
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'utf8'), null);
  cipher.setAutoPadding(true);
  let encrypted = cipher.update(plaintext, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
}

// AES 解密函数
function decrypt(encryptedText: string, key: string): string {
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'utf8'), null);
  decipher.setAutoPadding(true);
  let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// TypeScript 类型注解
interface RequestData {
  [key: string]: string | number; // 可根据实际的请求数据结构进行更细化的类型定义
}

// Function to call the Yushan API
async function yushantwo(requestData: RequestData, prodId: string): Promise<string> {
  const url = "***";
  const reqTime = Date.now();
  const requestSN = Array.from({ length: 32 }, () => "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678"[Math.floor(Math.random() * 58)]).join("");

  const requestBody = JSON.stringify({
    prod_id: prodId,
    req_data: requestData,
    req_time: reqTime,
    request_sn: requestSN,
  });
  
  // 加密请求数据
  const encryptedRequest = encrypt(requestBody, apiKey);

  const headers = {
    AES_KEY: apiKey,
    ACCT_ID: apiUserId,
    ENCODE: "AES256",
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: encryptedRequest,
    });

    const responseText = await response.text();
    
    // 解密返回数据
    const decryptedString = decrypt(responseText, apiKey);
    return decryptedString;
  } catch (e) {
    console.error("Error:", e);
    return "error";
  }
}

server.tool(
  "verify_company_name_and_president",
  "Verification of the two elements of the legal representative's name and company full name. Return 0 to indicate consistency, and return 1 to indicate inconsistency. Please use the fuzzy query tool to obtain the company full name before calling this tool.",
  {
    operName: z.string().describe("representative's name"),
    entName: z.string().describe("company full name"),
  },
  async ({ operName, entName }) => {
    const requestData = {
      operName: operName,
      entName: entName,
    };
    const prodId = "COM030";
    const data = await yushantwo(requestData, prodId);
    return {
      content: [
        {
          type: "text",
          text: data,
        },
      ],
    };
  }
);

server.tool(
  "fuzzy_query_company",
  "Fuzzy search through company name keywords to return a list of enterprise information. Use this tool to retrieve the company's full name before calling other tools that require it.",
  {
    keyWord: z.string().describe("company name keywords"),
  },
  async ({ keyWord }) => {
    const requestData = {
      keyWord: keyWord,
      skip: "20",
    };
    const prodId = "PBB020";
    const data = await yushantwo(requestData, prodId);
    return {
      content: [
        {
          type: "text",
          text: data,
        },
      ],
    };
  }
);

server.tool(
  "query_company_basic_info",
  "Query and return basic information such as company name, legal representative, and registered capital by company full name to understand the company overview. Please use the fuzzy query tool to obtain the company full name before calling this tool.",
  {
    entname: z.string().describe("company full name"),
  },
  async ({entname}) => {
    const requestData = {
      entname: entname
    };
    const prodId = "PBB021";
    const data = await yushantwo(requestData, prodId);
    return {
      content: [
        {
          type: "text",
          text: data,
        },
      ],
    };
  }
);

server.tool(
  "query_company_overseas_investments",
  "Query external investment information, such as the amount, shareholding ratio, shareholder type, etc., by the company's full name. Please use the fuzzy query tool to obtain the company full name before calling this tool.",
  {
    entName: z.string().describe("company full name"),
  },
  async ({entName}) => {
    const requestData = {
      entName: entName
    };
    const prodId = "COM045";
    const data = await yushantwo(requestData, prodId);
    return {
      content: [
        {
          type: "text",
          text: data,
        },
      ],
    };
  }
);

server.tool(
  "query_company_change_records",
  "Query the change records of an company by its full name.",
  {
    entName: z.string().describe("company full name"),
  },
  async ({entName}) => {
    const requestData = {
      entName: entName
    };
    const prodId = "PBB031";
    const data = await yushantwo(requestData, prodId);
    return {
      content: [
        {
          type: "text",
          text: data,
        },
      ],
    };
  }
);

server.tool(
  "query_company_software_copyright_info",
  "Query the registration information of an company's software copyrights by its full name. Please use the fuzzy query tool to obtain the company full name before calling this tool.",
  {
    entName: z.string().describe("company full name"),
  },
  async ({entName}) => {
    const requestData = {
      entName: entName,
      skip: "0"
    };
    const prodId = "COM137";
    const data = await yushantwo(requestData, prodId);
    return {
      content: [
        {
          type: "text",
          text: data,
        },
      ],
    };
  }
);

server.tool(
  "query_company_trademark_list",
  "Obtain the list of an company's trademarks, including trademark names, company names, and statuses, by its full name. Please use the fuzzy query tool to obtain the company full name before calling this tool.",
  {
    entName: z.string().describe("company full name"),
  },
  async ({entName}) => {
    const requestData = {
      entName: entName
    };
    const prodId = "COM140";
    const data = await yushantwo(requestData, prodId);
    return {
      content: [
        {
          type: "text",
          text: data,
        },
      ],
    };
  }
);

server.tool(
  "query_company_court_litigation_related_info",
  "Obtain the litigation - related information of a target company in court by its full name. Please use the fuzzy query tool to obtain the company full name before calling this tool.",
  {
    name: z.string().describe("company full name"),
  },
  async ({name}) => {
    const requestData = {
      name: name,
      dataType: "satparty,fdaparty,epbparty,qtsparty,xzhmd,pbcparty,news,cpws,ktgg,zxgg,shixin,fygg,ajlc,bgt,zcdj,zccf,jyyc,job"
    };
    const prodId = "PBB183";
    const data = await yushantwo(requestData, prodId);
    return {
      content: [
        {
          type: "text",
          text: data,
        },
      ],
    };
  }
);

server.tool(
  "query_company_abnormal_business_operation",
  "Query the abnormal business operation information of an company by its full name. Please use the fuzzy query tool to obtain the company full name before calling this tool.",
  {
    keyWord: z.string().describe("company full name")
  },
  async ({keyWord}) => {
    const requestData = {
      keyWord: keyWord
    };
    const prodId = "PBB055";
    const data = await yushantwo(requestData, prodId);
    return {
      content: [
        {
          type: "text",
          text: data,
        },
      ],
    };
  }
);

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Yushan MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
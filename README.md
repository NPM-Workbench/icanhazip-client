![banner](https://github.com/user-attachments/assets/c68adc2f-21df-42de-87b7-61439e5d56db)
# Icanhazip Client
A lightweight JavaScript/TypeScript client for retrieving public IP information using the icanhazip service. This package is **ESM-only** and works in modern browsers and Node.js 18+ environments that support the Fetch API.


### Installation:
```console
npm install icanhazip-client
```
Note: If you are using Node.js, ensure your project supports ES modules.


### Basic Usage:
Responses are returned as objects instead of plain text to provide a consistent, extensible API that works well with TypeScript.

1. Fetch your IPv4 address
```javascript
import { getIPV4 } from "icanhazip-client";
const result = await getIPV4();
console.log(result);
// { ipv4: "8.8.8.8" }
```

2. Fetch your IPv6 address
```javascript
import { getIPV6 } from "icanhazip-client";
const result = await getIPV6();
console.log(result);
// { ipv6: "2001:4860:4860::8888" }
```

3. Fetch connection trace information
```javascript
import { getIPTrace } from "icanhazip-client";
const trace = await getIPTrace();
console.log(trace);
/*
{
  ip: "8.8.8.8",
  loc: "IN",
  tls: "TLSv1.3",
  http: "h2",
  ...
}
*/
```

4. Error Handling Example
```javascript
try {
  const ip = await getIPV4();
  console.log(ip);
} catch (error) {
  console.error("Failed to fetch IP information", error);
}
```

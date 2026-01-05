/* app imports */
import type { IPTraceRes } from "../types/index.ts";

/* module */
async function getFullTrace(): Promise<IPTraceRes> {
  /* no fetch */
  if (typeof fetch !== "function") {
    throw new Error("[Bad]: Global Fetch Not Available");
  } else {
    /* fetch */
    const URL = "https://icanhazip.com/cdn-cgi/trace";
    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error("[Bad]: getIPV4 Fetch Error");
    } else {
      /* get */
      const prelim = (await response.text()).trim();
      const lines = prelim.split("\n");

      /* iterate and set */
      const ipData: IPTraceRes = {};
      for (const line of lines) {
        const [key, value] = line.split("=");
        if (!key || value === undefined) {
          continue;
        } else {
          ipData[key.trim()] = value.trim();
        }
      }

      /* end */
      return ipData;
    }
  }
}

/* exports */
export { getFullTrace };

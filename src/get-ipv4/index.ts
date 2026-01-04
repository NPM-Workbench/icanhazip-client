/* app imports */
import type { IPV4Res } from "../types/index.ts";

/* module */
async function getIPV4(): Promise<IPV4Res> {
  /* no fetch */
  if (typeof fetch !== "function") {
    throw new Error("[Bad]: Global Fetch Not Available");
  } else {
    const URL = "https://ipv4.icanhazip.com/";
    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error("[Bad]: getIPV4 Fetch Error");
    } else {
      const ipv4 = (await response.text()).trim();
      return { ipv4 };
    }
  }
}

/* exports */
export { getIPV4 };

/* app imports */
import type { IPV6Res } from "../types/index.ts";

/* module */
async function getIPV6(): Promise<IPV6Res> {
  /* no fetch */
  if (typeof fetch !== "function") {
    throw new Error("[Bad]: Global Fetch Not Available");
  } else {
    const URL = "https://ipv6.icanhazip.com/";
    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error("[Bad]: getIPV6 Fetch Error");
    } else {
      const ipv6 = (await response.text()).trim();
      return { ipv6 };
    }
  }
}

/* exports */
export { getIPV6 };

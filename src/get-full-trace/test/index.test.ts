/// <reference types="jest" />
import { getFullTrace } from "../index.js";

/* restore mocks after each test */
afterEach(() => {
  jest.restoreAllMocks();
});

describe("getFullTrace", () => {
  const originalFetch = (global as any).fetch;

  afterEach(() => {
    if (originalFetch) (global as any).fetch = originalFetch;
    else delete (global as any).fetch;
    jest.restoreAllMocks();
  });

  /* #1 */
  test("throws when global fetch is unavailable", async () => {
    delete (global as any).fetch;

    await expect(getFullTrace()).rejects.toThrow(
      "[Bad]: Global Fetch Not Available"
    );
  });

  /* #2 */
  test("throws when fetch response is not ok", async () => {
    const mockResponse = {
      ok: false,
      text: jest.fn().mockResolvedValue("")
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(getFullTrace()).rejects.toThrow("[Bad]: getIPV4 Fetch Error");
  });

  /* #3 */
  test("returns parsed trace data", async () => {
    const trace = [
      "ip=1.2.3.4",
      "loc=US",
      "tls=TLSv1.3",
      "http=http/2",
      "sni=plaintext"
    ].join("\n");

    const mockResponse = {
      ok: true,
      text: jest.fn().mockResolvedValue(trace)
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(getFullTrace()).resolves.toEqual({
      ip: "1.2.3.4",
      loc: "US",
      tls: "TLSv1.3",
      http: "http/2",
      sni: "plaintext"
    });
  });

  /* #4 */
  test("ignores malformed lines", async () => {
    const trace = ["ip=1.2.3.4", "badline", "loc=US", "=noval", "k="]
      .join("\n");

    const mockResponse = {
      ok: true,
      text: jest.fn().mockResolvedValue(trace)
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    const res = await getFullTrace();
    expect(res).toEqual({ ip: "1.2.3.4", loc: "US", k: "" });
  });

  /* #5 */
  test("targets the trace endpoint", async () => {
    const mockResponse = {
      ok: true,
      text: jest.fn().mockResolvedValue("ip=1.2.3.4")
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await getFullTrace();
    expect((global as any).fetch).toHaveBeenCalledWith(
      "https://icanhazip.com/cdn-cgi/trace"
    );
  });
});

/// <reference types="jest" />
import { getIPV6 } from "../index.js";

/* restore mocks after each test */
afterEach(() => {
  jest.restoreAllMocks();
});

describe("getIPV6", () => {
  const originalFetch = (global as any).fetch;

  afterEach(() => {
    if (originalFetch) (global as any).fetch = originalFetch;
    else delete (global as any).fetch;
    jest.restoreAllMocks();
  });

  /* #1 */
  test("throws when global fetch is unavailable", async () => {
    delete (global as any).fetch;

    await expect(getIPV6()).rejects.toThrow("[Bad]: Global Fetch Not Available");
  });

  /* #2 */
  test("throws when fetch response is not ok", async () => {
    const mockResponse = {
      ok: false,
      text: jest.fn().mockResolvedValue("2001:db8::1")
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(getIPV6()).rejects.toThrow("[Bad]: getIPV6 Fetch Error");
  });

  /* #3 */
  test("returns trimmed ipv6 string", async () => {
    const mockResponse = {
      ok: true,
      text: jest.fn().mockResolvedValue("2001:db8::1\n")
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(getIPV6()).resolves.toEqual({ ipv6: "2001:db8::1" });
  });

  /* #4 */
  test("targets the ipv6 endpoint", async () => {
    const mockResponse = {
      ok: true,
      text: jest.fn().mockResolvedValue("2001:db8::1")
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await getIPV6();
    expect((global as any).fetch).toHaveBeenCalledWith(
      "https://ipv6.icanhazip.com/"
    );
  });
});

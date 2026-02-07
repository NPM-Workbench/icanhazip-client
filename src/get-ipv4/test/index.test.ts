/// <reference types="jest" />
import { getIPV4 } from '../index.js';

describe('getIPV4', () => {
  const originalFetch = (global as any).fetch;

  afterEach(() => {
    if (originalFetch) (global as any).fetch = originalFetch;
    else delete (global as any).fetch;
    jest.restoreAllMocks();
  });

  /* #1 */
  test('throws when global fetch is unavailable', async () => {
    delete (global as any).fetch;

    await expect(getIPV4()).rejects.toThrow(
      '[Bad]: Global Fetch Not Available',
    );
  });

  /* #2 */
  test('throws when fetch response is not ok', async () => {
    const mockResponse = {
      ok: false,
      text: jest.fn().mockResolvedValue('1.2.3.4'),
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(getIPV4()).rejects.toThrow('[Bad]: getIPV4 Fetch Error');
  });

  /* #3 */
  test('returns trimmed ipv4 string', async () => {
    const mockResponse = {
      ok: true,
      text: jest.fn().mockResolvedValue('1.2.3.4\n'),
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await expect(getIPV4()).resolves.toEqual({ ipv4: '1.2.3.4' });
  });

  /* #4 */
  test('targets the ipv4 endpoint', async () => {
    const mockResponse = {
      ok: true,
      text: jest.fn().mockResolvedValue('1.2.3.4'),
    };
    (global as any).fetch = jest.fn().mockResolvedValue(mockResponse);

    await getIPV4();
    expect((global as any).fetch).toHaveBeenCalledWith(
      'https://ipv4.icanhazip.com/',
    );
  });
});

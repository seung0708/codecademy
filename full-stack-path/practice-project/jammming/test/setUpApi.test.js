import assert from 'assert'; 

export const mockToken = 'mock-token-12345';

export const setupFetch = () => {
  const originalFetch = global.fetch;
  
  beforeEach(() => {
    global.fetch = async () => ({
      ok: true,
      json: async () => ({ tracks: { items: [] } })
    });
  });

  after(() => {
    global.fetch = originalFetch;
  });
};
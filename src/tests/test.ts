const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const mock = new MockAdapter(axios);

// Dies ist der Code, den wir testen werden
async function getData() {
  try {
    const response = await axios.get('http://test.com');
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// Hier beginnen unsere Tests
describe('getData', () => {
  it('returns data when axios request succeeds', async () => {
    const data = { data: 'test' };
    mock.onGet('http://test.com').reply(200, data);

    const result = await getData();
    expect(result).toEqual(data);
  });

  it('throws error when axios request fails', async () => {
    mock.onGet('http://test.com').networkError();

    await expect(getData()).rejects.toThrow('Network Error');
  });
});
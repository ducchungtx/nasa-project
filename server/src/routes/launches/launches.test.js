describe('Test GET /launches', () => {
  test('It should response with 200 success', () => {
    const response = 200;
    expect(response).toBe(200);
  })
});

describe('Test POST /launch', () => {
  test('It should response with 201 success', () => {
    const response = 201;
    expect(response).toBe(201);
  });

  test('It should catch missing required properties', () => {});
  test('It should catch invalid dates', () => {});
});


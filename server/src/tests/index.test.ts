import { describe, it, expect } from 'vitest';
import server from '../server';
import request from 'supertest';

describe('test', () => {
  it('should return 200', async () => {
    const response = await request(server).get('/api/projects');
    expect(response.status).toBe(200);
  });
});

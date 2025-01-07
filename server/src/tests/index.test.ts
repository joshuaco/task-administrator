import { describe, it, expect, afterAll, beforeAll } from 'vitest';
import ProjectModel from '../models/Project';
import mongoose from 'mongoose';
import server from '../server';
import supertest from 'supertest';

const request = supertest(server);

describe('CREATE Projects', () => {
  beforeAll(async () => {
    await ProjectModel.deleteMany({});
  });

  it('should create a project', async () => {
    const response = await request.post('/api/projects').send({
      projectName: 'Test Project',
      clientName: 'Test Client',
      description: 'Test Description'
    });

    expect(response.status).toBe(201);
    expect(response.body.data.projectName).toBe('Test Project');
  });
});

describe('GET Projects', () => {
  it('should get all projects', async () => {
    const response = await request.get('/api/projects');
    expect(response.status).toBe(200);
    expect(response.body.projects.length).toBe(1);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

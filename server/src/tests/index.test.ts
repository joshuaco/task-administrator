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

  it('should not create a project without a required field', async () => {
    const response = await request.post('/api/projects').send({
      clientName: 'Test Client',
      description: 'Test Description'
    });
    expect(response.status).toBe(400);
    expect(response.body.error).includes('Project name is required');
  });
});

describe('GET Projects', () => {
  it('should get all projects', async () => {
    const response = await request.get('/api/projects');
    expect(response.status).toBe(200);
    expect(response.body.projects.length).toBe(1);
  });

  it('should get a project by id', async () => {
    const response = await request.get('/api/projects');
    const project = response.body.projects[0];
    const response2 = await request.get(`/api/projects/${project._id}`);
    expect(response2.status).toBe(200);
    expect(response2.body.project.projectName).toBe(project.projectName);
  });

  it('should return status 400 by invalid id', async () => {
    const response = await request.get('/api/projects/invalid-id');
    expect(response.status).toBe(400);
    expect(response.body.error).includes('Invalid ID');
  });

  it('should return status 404 by valid id but no project found', async () => {
    const response = await request.get(
      '/api/projects/677d22f0c8d072f45ba7b340'
    );
    expect(response.status).toBe(404);
    expect(response.body.error).includes('Project not found');
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

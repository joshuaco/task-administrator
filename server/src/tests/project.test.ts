import { describe, it, expect, afterAll, beforeAll, beforeEach } from 'vitest';
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

describe('UPDATE Projects', () => {
  beforeAll(async () => {
    await ProjectModel.deleteMany({});
  });
  it('should update a project', async () => {
    const project = await ProjectModel.create({
      projectName: 'Test Project for Update',
      clientName: 'Test Client for Update',
      description: 'Test Description for Update'
    });

    const response = await request.put(`/api/projects/${project._id}`).send({
      projectName: 'Updated Project Name',
      clientName: 'Updated Client Name',
      description: 'Updated Description'
    });

    expect(response.status).toBe(200);
    expect(response.body.project.projectName).toBe('Updated Project Name');
  });

  it('should not update a project without a required field', async () => {
    const project = await ProjectModel.create({
      projectName: 'Test Project for Update',
      clientName: 'Test Client for Update',
      description: 'Test Description for Update'
    });

    const response = await request.put(`/api/projects/${project._id}`).send({
      clientName: 'Updated Client Name',
      description: 'Updated Description'
    });
    expect(response.status).toBe(400);
    expect(response.body.error).includes('Project name is required');
  });

  it('should return status 400 by invalid id', async () => {
    const response = await request.put('/api/projects/invalid-id').send({
      projectName: 'Updated Project Name',
      clientName: 'Updated Client Name',
      description: 'Updated Description'
    });
    expect(response.status).toBe(400);
    expect(response.body.error).includes('Invalid ID');
  });
});

describe('DELETE Projects', () => {
  beforeEach(async () => {
    await ProjectModel.deleteMany({});
    await ProjectModel.create({
      projectName: 'Test Project for Delete',
      clientName: 'Test Client for Delete',
      description: 'Test Description for Delete'
    });
  });

  it('should delete a project', async () => {
    const project = await ProjectModel.findOne({});
    const response = await request.delete(`/api/projects/${project._id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Project deleted successfully');
  });

  it('should return status 400 by invalid id', async () => {
    const response = await request.delete('/api/projects/invalid-id');
    expect(response.status).toBe(400);
    expect(response.body.error).includes('Invalid ID');
  });

  it('should return status 404 by valid id but no project found', async () => {
    const project = await ProjectModel.findOne({});
    const projectID = project._id;
    await request.delete(`/api/projects/${project._id}`);

    const response2 = await request.get(`/api/projects/${projectID}`);
    expect(response2.status).toBe(404);
    expect(response2.body.error).includes('Project not found');
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

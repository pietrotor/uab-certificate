import express from 'express';
import mongoose from 'mongoose';
import { professionsRoute } from '../routes';
import supertest from 'supertest';
import { connect, closeDatabase, clearDatabase } from './setup';
import { IProfession, Profession } from '../models';

const app = express();
app.use(express.json());
app.use('/api', professionsRoute());

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await closeDatabase();
});

afterEach(async () => {
  await clearDatabase();
});

describe('Pruebas Unitarias para Recetas', () => {
  //1er test : GET
  it('should create & save a profession successfully', async () => {
    const validProfession: Partial<IProfession> = {
      title: 'Software Engineer',
      internalTitle: 'SWE',
      last: '2023',
      level: 'Senior',
      code: 'SE123',
      status: true,
      businessId: new mongoose.Types.ObjectId(),
      createdBy: new mongoose.Types.ObjectId(),
      deleted: false,
    };

    const savedProfession = await new Profession(validProfession).save();
    expect(savedProfession._id).toBeDefined();
    expect(savedProfession.title).toBe(validProfession.title);
    expect(savedProfession.internalTitle).toBe(validProfession.internalTitle);
    expect(savedProfession.last).toBe(validProfession.last);
    expect(savedProfession.level).toBe(validProfession.level);
    expect(savedProfession.code).toBe(validProfession.code);
  });
});

import { getDb } from '../db';
import { ObjectId } from 'mongodb';

// ── Video Service ───────────────────────────────────────────

export const videoService = {
  async findAll() {
    const db = await getDb();
    return db.collection('videos').find({}).sort({ order: 1 }).toArray();
  },

  async create(data: { title: string; youtubeUrl: string; order?: number }) {
    const db = await getDb();
    const col = db.collection('videos');
    const count = await col.countDocuments();
    const result = await col.insertOne({
      ...data,
      order: data.order ?? count + 1,
      createdAt: new Date(),
    });
    return { _id: result.insertedId, ...data };
  },

  async update(id: string, data: { title: string; youtubeUrl: string; order?: number }) {
    const db = await getDb();
    await db
      .collection('videos')
      .updateOne({ _id: new ObjectId(id) }, { $set: data });
    return { success: true };
  },

  async delete(id: string) {
    const db = await getDb();
    await db.collection('videos').deleteOne({ _id: new ObjectId(id) });
    return { success: true };
  },
};

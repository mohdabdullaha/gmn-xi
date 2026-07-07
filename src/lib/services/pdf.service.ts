import { getDb } from '../db';
import { ObjectId } from 'mongodb';

// ── Generic PDF/Document Collection Service ─────────────────

function createCollectionService(collectionName: string) {
  return {
    async findAll() {
      const db = await getDb();
      return db.collection(collectionName).find({}).sort({ order: 1 }).toArray();
    },

    async create(data: { title: string; desc?: string; fileUrl?: string; order?: number }) {
      const db = await getDb();
      const col = db.collection(collectionName);
      const count = await col.countDocuments();
      const result = await col.insertOne({
        title: data.title,
        desc: data.desc || '',
        fileUrl: data.fileUrl || '',
        order: data.order ?? count + 1,
        createdAt: new Date(),
      });
      return { _id: result.insertedId, ...data };
    },

    async update(id: string, data: { title?: string; desc?: string; fileUrl?: string; order?: number }) {
      const db = await getDb();
      await db
        .collection(collectionName)
        .updateOne({ _id: new ObjectId(id) }, { $set: data });
      return { success: true };
    },

    async delete(id: string) {
      const db = await getDb();
      await db.collection(collectionName).deleteOne({ _id: new ObjectId(id) });
      return { success: true };
    },
  };
}


export const infographicService = createCollectionService('infographics');

import { getDb } from '../db';
import { ObjectId } from 'mongodb';

// ── Inquiry Service ─────────────────────────────────────────

export const inquiryService = {
  async create(data: { name: string; email: string; message: string }) {
    const db = await getDb();
    await db.collection('inquiries').insertOne({
      ...data,
      read: false,
      createdAt: new Date(),
    });
    return { success: true, message: 'Inquiry submitted successfully' };
  },

  async findAll() {
    const db = await getDb();
    return db.collection('inquiries').find({}).sort({ createdAt: -1 }).toArray();
  },

  async markAsRead(id: string) {
    const db = await getDb();
    await db
      .collection('inquiries')
      .updateOne({ _id: new ObjectId(id) }, { $set: { read: true } });
    return { success: true };
  },

  async delete(id: string) {
    const db = await getDb();
    await db.collection('inquiries').deleteOne({ _id: new ObjectId(id) });
    return { success: true };
  },
};

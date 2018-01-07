import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';

export const EntrySchema = new mongoose.Schema({
  fid         : String,
  name        : String,

  lat         : Number,
  lon         : Number,

  rawIndex    : Schema.Types.Mixed
});


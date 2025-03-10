import mongoose, { Document, ObjectId } from 'mongoose';

export type NoteType = Document & {
  content: string;
  createdBy: ObjectId;
  task: ObjectId;
};

export type NoteParams = {
  noteID: mongoose.Types.ObjectId;
};

const NoteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true
    },
    task: {
      type: mongoose.Types.ObjectId,
      ref: 'Task',
      required: true
    }
  },
  { timestamps: true }
);

const Note = mongoose.model<NoteType>('Note', NoteSchema);

export default Note;

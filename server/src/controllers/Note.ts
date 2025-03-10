import type { Request, Response } from 'express';
import NoteModel, { NoteType, NoteParams } from '../models/Note';

class Note {
  static createNote = async (req: Request<{}, {}, NoteType>, res: Response) => {
    const { content } = req.body;
    const note = new NoteModel({ content });

    note.createdBy = req.user.id;
    note.task = req.task.id;
    req.task.notes.push(note.id);

    try {
      await Promise.allSettled([note.save(), req.task.save()]);
      res.status(201).json({ message: 'Note created successfully' });
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Server error, please contact with support.' });
    }
  };

  static getTaskNotes = async (req: Request, res: Response) => {
    try {
      const notes = await NoteModel.find({ task: req.task.id });
      res.json({ notes });
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Server error, please contact with support.' });
    }
  };

  static deleteNote = async (req: Request<NoteParams>, res: Response) => {
    const { noteID } = req.params;
    const note = await NoteModel.findById(noteID);

    if (!note) {
      res.status(404).json({ error: 'Note not found' });
      return;
    }
    if (note.createdBy.toString() !== req.user.id) {
      res.status(401).json({ error: 'Invalid action' });
      return;
    }

    try {
      await Promise.allSettled([
        req.task.updateOne({ $pull: { notes: note.id } }),
        note.deleteOne()
      ]);
      res.json({ message: 'Note deleted successfully' });
    } catch (error) {
      res.status(400).json({ error: 'Unknown error' });
      return;
    }
  };
}

export default Note;

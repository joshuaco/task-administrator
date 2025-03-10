import { Router } from 'express';
import NoteController from '../controllers/Note';
import { handleErrors, noteContentValidator } from '../middlewares/validators';

const router = Router();

router.post(
  '/notes',
  noteContentValidator(),
  handleErrors,
  NoteController.createNote
);

router.get('/notes', NoteController.getTaskNotes);
router.delete('/notes/:noteID', NoteController.deleteNote);

export default router;

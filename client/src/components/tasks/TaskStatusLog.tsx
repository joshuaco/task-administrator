import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuthContext } from '@/hooks/context/useAuthContext';
import { useDeleteNote } from '@/hooks/notes/useDeleteNote';
import { History, MessageSquare, Trash2 } from 'lucide-react';
import { taskStatus } from '@/utils/status';
import { TaskActivity } from '@/types';
import TaskNoteForm from './TaskNoteForm';

interface TaskStatusLogProps {
  activities?: TaskActivity[];
}

function TaskStatusLog({ activities }: TaskStatusLogProps) {
  const { user } = useAuthContext();
  const { mutate: deleteNote, projectId, taskId } = useDeleteNote();
  const [showNoteForm, setShowNoteForm] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [activities]);

  const canDelete = useCallback(
    (creatorId: string) => {
      if (!user) return false;
      return user._id === creatorId;
    },
    [user]
  );

  const handleDelete = (noteId: string) => {
    deleteNote({ projectId, taskId, noteId });
  };

  if (user)
    return (
      <div className='space-y-3'>
        <div className='flex justify-between items-center'>
          <h4
            className={`font-medium text-sm text-gray-700 flex items-center 
        bg-white ${showNoteForm ? 'pt-2' : 'py-2'}`}
          >
            <History className='h-5 w-5 mr-2' />
            Activity History
          </h4>
          {!showNoteForm && (
            <button
              className='inline-flex items-center px-3 py-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none'
              onClick={() => setShowNoteForm(true)}
            >
              + Add Note
            </button>
          )}
        </div>

        {showNoteForm && (
          <div className='bg-gray-50 rounded-lg p-4'>
            <TaskNoteForm onclose={() => setShowNoteForm(false)} />
          </div>
        )}
        {activities && (
          <div className='max-h-56 overflow-y-auto pr-2' ref={containerRef}>
            <div className='space-y-3'>
              {activities.length === 0 ? (
                <p className='text-sm text-gray-500'>
                  No activity recorded yet.
                </p>
              ) : (
                <ul className='relative'>
                  <div className='absolute top-0 bottom-0 left-2 w-0.5 bg-gray-200' />
                  {activities.map((activity) => (
                    <li key={activity._id} className='relative pl-8 pb-4'>
                      <div
                        className={`absolute left-0 top-4 w-4 h-4 rounded-full bg-white border-2 ${
                          activity.status
                            ? 'border-indigo-500'
                            : 'border-green-500'
                        }`}
                      />
                      <div className='bg-gray-50 rounded-lg p-3'>
                        {activity.status ? (
                          <p className='text-sm text-gray-600'>
                            <span className='font-medium text-gray-900'>
                              {activity.user.name}
                            </span>
                            {' changed status to '}
                            <span className='font-medium'>
                              {taskStatus[activity.status]}
                            </span>
                          </p>
                        ) : (
                          <>
                            <div className='flex justify-between items-center'>
                              <div>
                                <div className='flex items-center mb-1'>
                                  <MessageSquare className='h-4 w-4 text-green-500 mr-2' />
                                  <p className='font-medium text-sm text-gray-900'>
                                    {activity.user.name}
                                    <span className='text-gray-600 font-normal'>
                                      {' '}
                                      added a note
                                    </span>
                                  </p>
                                </div>
                                <p className='text-sm text-gray-600 whitespace-pre-wrap'>
                                  {activity.note?.content}
                                </p>
                              </div>
                              {canDelete(activity.user._id) && (
                                <button
                                  className='text-red-500'
                                  onClick={() => {
                                    handleDelete(activity.note!._id);
                                  }}
                                >
                                  <Trash2 className='h-4 w-4' />
                                </button>
                              )}
                            </div>
                          </>
                        )}

                        <p className='text-xs text-gray-500 mt-1'>
                          {new Date(activity.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    );
}

export default TaskStatusLog;

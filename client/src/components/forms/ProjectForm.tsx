import { useForm } from 'react-hook-form';
import { ProjectFormData } from '@/types';
import ErrorText from './ErrorText';
import { createProject } from '@/api/project';

function ProjectForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ProjectFormData>();

  const handleFormSubmit = (data: ProjectFormData) => {
    createProject(data);
  };

  return (
    <>
      <form
        className='max-w-3xl mx-auto flex flex-col gap-3'
        onSubmit={handleSubmit(handleFormSubmit)}
        noValidate
      >
        <div className='mb-2 space-y-2'>
          <label htmlFor='projectName' className='text-sm uppercase font-bold'>
            Project Name
          </label>
          <input
            id='projectName'
            className='w-full p-3 border border-gray-200 outline-gray-500'
            type='text'
            placeholder='Project Name'
            {...register('projectName', {
              required: 'The project name is required'
            })}
          />
          {errors.projectName && (
            <ErrorText>{errors.projectName.message}</ErrorText>
          )}
        </div>

        <div className='mb-2 space-y-2'>
          <label htmlFor='clientName' className='text-sm uppercase font-bold'>
            Client Name
          </label>
          <input
            id='clientName'
            className='w-full p-3 border border-gray-200 outline-gray-500'
            type='text'
            placeholder='Client Name'
            {...register('clientName', {
              required: 'The client name is required'
            })}
          />
          {errors.clientName && (
            <ErrorText>{errors.clientName.message}</ErrorText>
          )}
        </div>

        <div className='mb-2 space-y-2'>
          <label htmlFor='description' className='text-sm uppercase font-bold'>
            Description
          </label>
          <textarea
            id='description'
            className='w-full p-3 border border-gray-200 outline-gray-500 resize-none'
            placeholder='Project Description'
            {...register('description', {
              required: 'The project description is required'
            })}
          />
          {errors.description && (
            <ErrorText>{errors.description.message}</ErrorText>
          )}
        </div>
        <input
          className=' bg-fuchsia-600 hover:bg-fuchsia-700 p-3 font-semibold text-white text-lg rounded-xl transition-colors w-full sm:w-1/2 self-center'
          type='submit'
          value='Create Project'
        />
      </form>
    </>
  );
}

export default ProjectForm;

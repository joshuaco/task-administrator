function ProjectSkeleton() {
  return (
    <div className='bg-white rounded-lg shadow-md p-6 animate-pulse'>
      <div className='flex justify-between items-start'>
        <div className='flex-1'>
          <div className='h-6 bg-gray-200 rounded w-3/4 mb-2'></div>
          <div className='h-5 bg-gray-200 rounded w-1/4'></div>
        </div>
        <div className='h-8 w-8 bg-gray-200 rounded-full'></div>
      </div>
      <div className='mt-4 space-y-3'>
        <div className='h-4 bg-gray-200 rounded w-full'></div>
        <div className='h-4 bg-gray-200 rounded w-5/6'></div>
      </div>
      <div className='mt-4 flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <div className='flex items-center'>
            <div className='h-5 w-5 bg-gray-200 rounded mr-1'></div>
            <div className='h-4 w-4 bg-gray-200 rounded'></div>
          </div>
          <div className='flex items-center'>
            <div className='h-5 w-5 bg-gray-200 rounded mr-1'></div>
            <div className='h-4 w-4 bg-gray-200 rounded'></div>
          </div>
        </div>
        <div className='flex items-center'>
          <div className='h-5 w-5 bg-gray-200 rounded mr-1'></div>
          <div className='h-4 w-16 bg-gray-200 rounded'></div>
        </div>
      </div>
    </div>
  );
}

export default ProjectSkeleton;

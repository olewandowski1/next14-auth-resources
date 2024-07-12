import { FaExclamation } from 'react-icons/fa';

type FormErrorProps = {
  message?: string;
};

const FormError: React.FC<FormErrorProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive'>
      <FaExclamation className='h-4 w-4' />
      <p className='text-md font-semibold'> {message} </p>
    </div>
  );
};

export default FormError;

import { FaCheckCircle } from 'react-icons/fa';

type FormSuccessProps = {
  message?: string;
};

const FormSuccess: React.FC<FormSuccessProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className='bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500'>
      <FaCheckCircle className='h-4 w-4' />
      <p className='text-md font-semibold'> {message} </p>
    </div>
  );
};

export default FormSuccess;

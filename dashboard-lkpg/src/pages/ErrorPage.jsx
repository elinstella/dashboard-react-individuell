import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='text-3xl font-bold flex justify-center mt-20'>
        Error 404 Sidan kan ej hittas, prova att gå tillbaka igen 🤣{' '}
      </h1>
      <button className='flex justify-center w-100 text-2xl mt-15 bg-amber-600 hover:bg-amber-300 hover:scale-105 active:bg-amber-700 active:scale-95 transition-all duration-500 p-4 rounded-3xl'>
        <Link to='/'>Tillbaka till startsidan</Link>
      </button>
    </div>
  );
}

export default ErrorPage;

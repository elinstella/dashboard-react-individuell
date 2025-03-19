import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='text-3xl font-bold flex justify-center mt-20 ml-3'>
          Error 404: Sidan kunde ej hittas.🤣
        </h1>
        <h2 className='text-2xl font-bold flex justify-center mt-3 ml-3'>
          {' '}
          Testa uppdatera sidan igen eller gå tillbaka till startsidan{' '}
        </h2>
        <button className='flex justify-center w-100 text-2xl mt-15 text-white bg-primary hover:bg-tertiary hover:scale-105 active:bg-secondary active:scale-95 transition-all duration-500 p-4 rounded-3xl'>
          <Link to='/'>Tillbaka till startsidan</Link>
        </button>
      </div>
    </>
  );
}

export default ErrorPage;

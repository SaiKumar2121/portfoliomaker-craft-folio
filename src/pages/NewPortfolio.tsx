
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { createNewPortfolio } from '@/lib/storage';

const NewPortfolio = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const templateId = searchParams.get('template') || 'modern';

  useEffect(() => {
    const newPortfolio = createNewPortfolio(templateId);
    navigate(`/edit/${newPortfolio.id}`);
  }, [navigate, templateId]);

  return (
    <div className='min-h-screen flex flex-col'>
      <Header />

      <main className='flex-1 container mx-auto max-w-6xl py-12 px-6'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold text-gray-900'>Creating your portfolio...</h1>
          <p className='text-gray-600 mt-2'>Please wait while we set up your new portfolio.</p>
        </div>
      </main>

      <footer className='bg-white border-t py-8'>
        <div className='container mx-auto text-center text-gray-500'>
          <p>© {new Date().getFullYear()} CraftFolio. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default NewPortfolio;

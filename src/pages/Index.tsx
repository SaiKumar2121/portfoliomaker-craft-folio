
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { AuthModal } from '@/components/auth/AuthModal';

const Index = () => {
  const [user, setUser] = useState(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className='min-h-screen flex flex-col'>
      <Header />

      <main className='flex-1'>
        {/* Hero Section */}
        <section className='py-20 px-6 bg-gradient-to-r from-brand-50 to-white'>
          <div className='container mx-auto max-w-6xl flex flex-col-reverse md:flex-row items-center gap-12'>
            <div className='md:w-1/2 space-y-6'>
              <h1 className='text-4xl md:text-6xl font-bold text-gray-900'>Create Your Professional Portfolio</h1>
              <p className='text-xl text-gray-600'>
                Design, customize, and export your portfolio in minutes with CraftFolio's intuitive builder.
              </p>
              <div className='flex flex-wrap gap-4'>
                <Button
                  size='lg'
                  className='gap-2'
                  onClick={() => {
                    if (user) {
                      window.location.href = '/new';
                    } else {
                      setShowAuthModal(true);
                    }
                  }}
                >
                  Create Portfolio
                </Button>

                <Button asChild size='lg' variant='outline' className='gap-2'>
                  <Link to='/templates'>Browse Templates</Link>
                </Button>
              </div>
            </div>
            <div className='md:w-1/2'>
              <img
                src='https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1074&auto=format&fit=crop'
                alt='Portfolio preview'
                className='w-full rounded-lg shadow-lg'
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className='py-20 px-6 bg-white'>
          <div className='container mx-auto max-w-6xl'>
            <div className='text-center mb-12'>
              <h2 className='text-3xl font-bold text-gray-900'>Why Choose CraftFolio?</h2>
              <p className='mt-4 text-xl text-gray-600 max-w-2xl mx-auto'>
                The easiest way to create a stunning portfolio that showcases your skills and projects.
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              <div className='bg-gray-50 p-8 rounded-lg text-center'>
                <div className='w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-8 h-8'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42' />
                  </svg>
                </div>
                <h3 className='text-xl font-bold mb-2'>Beautiful Templates</h3>
                <p className='text-gray-600'>
                  Choose from our collection of professionally designed templates to match your style.
                </p>
              </div>

              <div className='bg-gray-50 p-8 rounded-lg text-center'>
                <div className='w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-8 h-8'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75' />
                  </svg>
                </div>
                <h3 className='text-xl font-bold mb-2'>Easy Customization</h3>
                <p className='text-gray-600'>
                  Personalize every aspect of your portfolio with our intuitive editor.
                </p>
              </div>

              <div className='bg-gray-50 p-8 rounded-lg text-center'>
                <div className='w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-8 h-8'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3' />
                  </svg>
                </div>
                <h3 className='text-xl font-bold mb-2'>Export as PDF</h3>
                <p className='text-gray-600'>
                  Download your portfolio as a PDF to share with potential clients or employers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className='py-20 px-6 bg-brand-50'>
          <div className='container mx-auto max-w-6xl text-center'>
            <h2 className='text-3xl font-bold text-gray-900 mb-6'>Ready to create your portfolio?</h2>
            <p className='text-xl text-gray-600 mb-8 max-w-2xl mx-auto'>
              Get started with CraftFolio today and showcase your work to the world.
            </p>
            <Button
              size='lg'
              className='gap-2'
              onClick={() => {
                if (user) {
                  window.location.href = '/new';
                } else {
                  setShowAuthModal(true);
                }
              }}
            >
              Create Portfolio
            </Button>
          </div>
        </section>
      </main>

      <footer className='bg-white border-t py-8'>
        <div className='container mx-auto text-center text-gray-500'>
          <p>© {new Date().getFullYear()} CraftFolio. All rights reserved.</p>
        </div>
      </footer>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>

  );
};

export default Index;

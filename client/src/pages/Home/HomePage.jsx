import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  Dashboard,
  Header,
  HotEvent,
  Footer,
  BestDeals,
  Brands,
  Categories,
  FeaturedProducts,
  Loader,
  UserReviews,
} from '../../components';
import Newsletter from '../../components/General/Newsletter';

const HomePage = () => {
  const { isLoading: productsLoading } = useSelector((state) => state.products);
  const { isLoading: eventsLoading } = useSelector((state) => state.events);

  const isPageLoading = productsLoading || eventsLoading;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <Dashboard />
      <Categories />
      {isPageLoading ? (
        <div className='w-full min-h-screen flex items-center justify-center'>
          <Loader />
        </div>
      ) : (
        <div>
          <BestDeals />
          <HotEvent />
          <FeaturedProducts />
        </div>
      )}
      <Brands />
      <UserReviews />
      <Newsletter />
      <Footer />
    </>
  );
};

export default HomePage;

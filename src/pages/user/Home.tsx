import AllBlogs from '@/components/Home/AllBlogs';
import { Hero } from '@/components/Home/Hero';
import RecentBlogs from '@/components/Home/RecentBlogs';
import { Page } from '@/components/Page';

 const Home = () => {
  return (
    <Page>
      <Hero />
      <RecentBlogs />
      <AllBlogs />
    </Page>
  );
};

export default Home;
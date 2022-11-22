import { Home } from "@/components/pages/Home";

const HomePage = async () => {
  // @ts-expect-error server component
  return <Home />;
};

export default HomePage;

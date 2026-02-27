import Background from '../components/Background';
import HomeButton from '../components/icons/HomeButton';

export default function NotFound() {
  return (
    <Background>
      <HomeButton />
      <div className="flex flex-col justify-center items-center min-h-screen w-full">
        <h1 className="font-bold mb-8 text-7xl text-[#212B27] dark:text-[#212B27]  ">404</h1>
        <p className="font-semibold">The page you are looking for is not found.</p>
      </div>
    </Background>
  );
}

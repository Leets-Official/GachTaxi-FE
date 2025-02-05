import TaxiLoading from './TaxiLoading';

const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-darkBlack text-white">
      <p className="text-header font-bold absolute top-[20%]">로딩 중...</p>
      <TaxiLoading />
    </div>
  );
};

export default LoadingScreen;

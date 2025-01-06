//slide 구현이 되었을때, 공통으로 사용이 될 경우를 대비해서 일단 구현만
// interface HeaderProps {
//   tite: string;
//   subtitle: string;
// }

const Header = () => {
  return (
    <div className="text-left ml-8 mt-[20%]">
      <h1 className="text-[60px] font-bold leading-[1.3]">
        Gachi <br /> Taxi
      </h1>
      <p className="text-[20px] mt-[13%] mb-[20%] leading-[1.5]">
        가천대학교 <br /> 택시 동승 서비스
      </p>
    </div>
  );
};

export default Header;

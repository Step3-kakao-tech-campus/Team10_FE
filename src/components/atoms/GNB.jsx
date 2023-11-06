import { Link, useLocation, useNavigate } from "react-router-dom";
import Image from "./Image";
import Logo from "/logo.svg";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";

/**
 * GNB 컴포넌트
 *
 * 사장님 사이트에서 전역적으로 상단에 표시되는 네비게이션 바입니다.
 *
 * @todo 로그아웃 버튼 클릭 시 로그아웃 처리\
 */

const GNB = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.auth.user);

  const menus = [
    {
      label: "매출관리",
      path: "/sales",
    },
    {
      label: "매장관리",
      path: "/manage",
    },
  ];

  return (
    <nav className="border-b border-gray-300">
      <div className="bg-white">
        <div className="w-[1280px] flex items-center justify-between mx-auto px-4">
          <section className="flex items-center gap-4">
            <Link to="/">
              <Image src={Logo} alt="뽀득뽀득 사장님 페이지 로고" />
            </Link>

            {menus.map((menu, index) => (
              <Link
                className={`text-xl p-8 ${
                  location.pathname === menu.path
                    ? "border-b-8 border-primary text-primary"
                    : "border-b-8 border-white"
                } `}
                key={index}
                to={menu.path}>
                {menu.label}
              </Link>
            ))}
          </section>

          <section className="flex gap-6">
            <div className="text-right">
              <div className="text-xl">{userName} 사장님</div>
              <Button
                className="text-gray-500"
                onClick={() => {
                  dispatch(logout());
                  navigate("/login");
                }}>
                로그아웃
              </Button>
            </div>
            <Button
              style="cta"
              onClick={() => {
                navigate("/register");
              }}>
              입점하기
            </Button>
          </section>
        </div>
      </div>
    </nav>
  );
};

export default GNB;

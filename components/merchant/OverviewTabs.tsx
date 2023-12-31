import { useEffect, useState } from "react";
import Overview from "./Overview";
import Display from "./Display";
import Transaction from "./Transaction";
import Link from "next/link";
import { useRouter } from "next/router";
import Icon from "../Icon";

const ActiveLink = ({ children, href, className }: any) => {
  const router = useRouter();
  return (
    <Link
      href={{ pathname: href?.pathname, query: href?.query }}
      scroll={true}
      className={`${
        router.pathname === href?.pathname
          ? "border-primary font-bold mb-3 md:mb-0 text-primary"
          : "text-gray-500 hover:text-gray-700 border-transparent"
      } ${className} block py-4 text-base border-b-4 rounded focus:outline-none whitespace-no-wrap`}>
      {children}
    </Link>
  );
};

const Tabs = (props: any) => {
  const primary =
    "flex flex-col md:flex-row overflow-x-auto scrollbar-none bg-white shadow-card rounded px-4 transform transition-all duration-300";
  const underline =
    "flex flex-col md:flex-row overflow-x-auto scrollbar-none shadow ronded px-4 transform transition-all duration-300";
  let { variant, menus, domainGroup, complaint } = props;
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  const [activeComponent, setActiveComponent] = useState<string>("");
  const [isActive, setIsActive] = useState(false);

  variant = primary;

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  const handleClick = (componentName: string) => {
    setActiveComponent(componentName);
  };

  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, []);

  // console.log(isMobile, 'mobile')

  return (
    <div className="w-full mx-auto text-gray-5">
      <div className="flex w-full md:hidden items-center justify-between bg-white px-6 py-4">
        {complaint == true ? (
          <h3 className="uppercase text-base font-bold text-primary pl-5">
            Menu
          </h3>
        ) : (
          <h3 className="uppercase text-base font-bold text-primary">Menu</h3>
        )}
        {/* <!-- Hamburger Toggle BTN --> */}
        <button
          aria-controls="header"
          aria-expanded={isMobile}
          onClick={(e) => {
            e.stopPropagation();
            setIsMobile(!isMobile);
          }}
          className="z-99999 block rounded-lg border p-1.5 shadow-sm border-primary bg-primary">
          <span className="relative block h-5.5 w-5.5 cursor-pointer">
            <span className="du-block absolute right-0 h-full w-full">
              <span
                className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm delay-[0] duration-200 ease-in-out bg-white ${
                  !isMobile && "!w-full delay-300"
                }`}></span>
              <span
                className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm delay-150 duration-200 ease-in-out bg-white ${
                  !isMobile && "delay-400 !w-full"
                }`}></span>
              <span
                className={`relative top-0 left-0 my-1 block h-0.5 w-0 rounded-sm delay-200 duration-200 ease-in-out bg-white ${
                  !isMobile && "!w-full delay-500"
                }`}></span>
            </span>
            <span className="absolute right-0 h-full w-full rotate-45">
              <span
                className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm delay-300 duration-200 ease-in-out bg-white ${
                  !isMobile && "!h-0 !delay-[0]"
                }`}></span>
              <span
                className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm duration-200 ease-in-out bg-white ${
                  !isMobile && "!h-0 !delay-200"
                }`}></span>
            </span>
          </span>
        </button>
        {/* <!-- Hamburger Toggle BTN --> */}
      </div>
      <div className="w-full flex flex-col">
        <div
          className={`${variant} ${
            isMobile ? "-translate-y-full scale-0" : "translate-y-1 scale-100"
          }`}
          style={{ boxShadow: "inset 0 -2px 0 #edf2f7" }}>
          {!isMobile && (
            <div className="w-full flex flex-col space-y-3">
              <ul className="flex flex-row w-full items-center">
                <li
                  onClick={() => handleClick("Overview")}
                  className={`${
                    activeComponent === "Overview"
                      ? "border-primary font-bold mb-3 md:mb-0 text-primary"
                      : "text-gray-500 hover:text-gray-700 border-transparent"
                  } mx-2 block py-4 cursor-pointer text-base border-b-4 rounded focus:outline-none whitespace-no-wrap`}>
                  <span>Overview</span>
                </li>
                <li
                  onClick={() => handleClick("Display")}
                  className={`${
                    activeComponent === "Display"
                      ? "border-primary font-bold mb-3 md:mb-0 text-primary"
                      : "text-gray-500 hover:text-gray-700 border-transparent"
                  } mx-2 block py-4 cursor-pointer text-base border-b-4 rounded focus:outline-none whitespace-no-wrap`}>
                  <span>Menu Display</span>
                </li>
                <li
                  onClick={() => handleClick("Transaction")}
                  className={`${
                    activeComponent === "Transaction"
                      ? "border-primary font-bold mb-3 md:mb-0 text-primary"
                      : "text-gray-500 hover:text-gray-700 border-transparent"
                  } mx-2 block py-4 cursor-pointer text-base border-b-4 rounded focus:outline-none whitespace-no-wrap`}>
                  <span>Transaction History</span>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div className="mt-2">
          {activeComponent === "Overview" && <Overview />}
          {activeComponent === "Display" && <Display />}
          {activeComponent === "Transaction" && <Transaction />}
        </div>
      </div>
    </div>
  );
};

export default Tabs;

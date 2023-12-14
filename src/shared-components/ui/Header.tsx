import React from "react";
import { HeaderConfig as HeaderType } from "../../interfaces/index";
import headerConfig from "../../config/HeaderConfig";
import Icon from "../../lib/svg";
import { noOperation } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { hideHamburgerMenu, showHamburgerMenu } from "../../redux/common";
import { RootState } from "../../redux/types";
import Button from "./Button";
import Link from "next/link";

type HeaderProps = {
  header?: HeaderType;
};

const Header = ({ header = headerConfig }: HeaderProps): JSX.Element => {
  const { headerStyle, leftDiv, rightDiv } = header;
  const dispatch = useDispatch();
  const { hamburger }: any = useSelector(
    (state: any): RootState => state.common
  );

  return (
    <>
      <header
        className={`${headerStyle || "border-b-2 border-light "} ${
          hamburger ? "my-0 relative" : "my-4"
        }`}
      >
        {leftDiv && (
          <div className={`${leftDiv.leftDivStyle} flex items-center`}>
            <Icon
              type="hamburger-icon"
              className="block mr-4 md:hidden"
              onClick={() => !hamburger && dispatch<any>(showHamburgerMenu())}
            />
            <a className="inline-block" href={leftDiv.icon.link}>
              <Icon type={leftDiv.icon.type} />
            </a>
          </div>
        )}
        {rightDiv && (
          <div
            className={`${
              hamburger
                ? "absolute top-0 h-screen bg-white hamburger"
                : "hidden"
            } md:h-auto md:relative md:flex md:flex-wrap md:items-center z-10`}
          >
            <Icon
              type="cross-icon"
              className={`${
                hamburger ? "block ml-2 mt-2" : "hidden"
              } md:hidden`}
              onClick={() => hamburger && dispatch<any>(hideHamburgerMenu())}
            />
            {Object.keys(rightDiv.navbar)?.map((links) => {
              return (
                  <div className="links mr-4 relative cursor-pointer">
                    <div className="flex items-center">
                      <Button variant="link">{links}</Button>
                      <Icon type="chevron-down" className="ml-1" width="10" />
                    </div>
                    <div className="links-list left-0">
                      {rightDiv.navbar[links].map((ele) => {
                        return (
                          <div className="pt-2">
                             <Link href={ele.link}>
                            <a
                              role="button"
                              // href={ele.link}
                              tabIndex={0}
                              onKeyDown={noOperation}
                              className="item"
                            >
                              {ele.linkLabel}
                            </a>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </div>
              );
            })}
          </div>
        )}
      </header>
      <style jsx>{`
        .links {
          padding: 8px 20px;
          border-radius: 4px;
        }
        .links:hover {
          background-color: #3dd6c4;
          padding: 8px 20px;
        }
        .links-list {
          display: none;
          min-width: 100%;
          padding:12px 8px;
          box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.2);
          overflow: auto;
          width:200%;
          position:absolute;
        }
        .links:hover .links-list {
          display: block;
        }
        .item{
          border-bottom:1px solid #aaa;
        }
        .item:hover{
          color: #3dd6c4;
          border-bottom:1px solid #3dd6c4;
        }
        @media screen and (max-width: 768px) {
          .hamburger {
            box-shadow: 6px 0px 18px rgba(0, 0, 0, 0.25);
          }
          .links:hover {
            background-color: #fff;
            padding: 8px 20px;
          }
          .links-list {
            max-width: 100%;
            padding:12px 8px;
            box-shadow: 0px 0px 0px 0px rgba(0,0,0,0.2);
            overflow: auto;
            position:static;
          }
        }
  
      `}</style>
    </>
  );
};

export default Header;

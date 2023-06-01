import React from "react";
import Header from "./Header";

  
const Layout = ({ children }:any) => {
  return (
    <div style={{backgroundColor:"white"}}>
      <Header />
      {children}
  
    </div>
  );
};
  
export default Layout;
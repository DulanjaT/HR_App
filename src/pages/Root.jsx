import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

const Root = () => {
  return (
    <div>
      <Header />
      <main style={{ paddingBottom: "20px" }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Root;

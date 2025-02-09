import "./App.css";
// import EmployeeList from "./components/EmployeeList/EmployeeList";
// import Header from "./components/Header/Header";
// import Footer from "./components/Footer/Footer";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/appRoutes.jsx";

function App() {
  return <RouterProvider router={router} />;
  // return (
  //   <>
  //     <Header />
  //     <main>
  //       <EmployeeList />
  //     </main>
  //     <Footer />
  //   </>
  // );
}

export default App;

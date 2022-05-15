import "./App.css";
import "./reset.css";
import MainPage from "../src/shared/pages/mainPage/mainPage";
import LoginedPage from "../src/shared/pages/loginedPage/loginedPage";

function App() {
  return (
    <div className="App">
      {/* <MainPage /> */}
      <LoginedPage />
    </div>
  );
}

export default App;

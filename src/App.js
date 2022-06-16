import "./reset.css";
import "./assets/fonts/font.scss";
import "./App.css";
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

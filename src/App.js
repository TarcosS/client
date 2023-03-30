import './App.css';
import ControllerComponent from './Components/ControllerComponent'
import MainPage from './Components/MainPageController';
import { Routes, Route } from "react-router-dom";
import { TikTokIOConnection } from './connection'

window.localStorage.setItem("firstArtan", 0)
window.localStorage.setItem("secondArtan", 0)
window.localStorage.setItem("thirstArtan", 0)
window.localStorage.setItem("fourthArtan", 0)
// window.localStorage.removeItem("firstLabel")
// window.localStorage.removeItem("secondLabel")
// window.localStorage.removeItem("thirstLabel")
// window.localStorage.removeItem("fourthLabel")

function App() {
  const connection = new TikTokIOConnection('http://localhost:2800');
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage connection={connection} />} />
        <Route path="/control" element={<ControllerComponent connection={connection}  />} />
      </Routes>     
    </div>
  );
}
export default App;

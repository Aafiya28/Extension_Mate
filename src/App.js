import { useEffect } from 'react';
import './App.css';
import { useBrowser } from "./context/browser-context";
import { images } from "./db/images";
import { Home } from "./pages/home/Home";
import { Task } from "./pages/Task/Task";

const index = Math.floor(Math.random() * images.length);
const bgImage = images[index].image;

function App() {
  // Select a random background image

  // Get the name and dispatcher from context
  const { name, browserDispatch } = useBrowser();

  // Log the current name (could be useful for debugging)
  // console.log(name);

  useEffect(() => {
    // Get the name from localStorage
    const userName = localStorage.getItem("name");
    // Dispatch an action to set the name in the context
    browserDispatch({
      type: "NAME",
      payload:userName
    });
  }, [browserDispatch]);

  return (
    <div className="app" style={{ backgroundImage: `url("${bgImage}")` }}>
      {name ? <Task /> : <Home />}
      {/* <Home/> */}
    </div>
  );
}

export default App;

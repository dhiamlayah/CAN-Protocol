import Inputs from "./components/Inputs";
import Result from "./components/Result";

function App() {
  return (
    <div  className=" pt-5" style={{ minHeight:"100vh" , backgroundColor:'darkgray'}} >
      <Inputs/>
      <Result/>
    </div>
  );
}

export default App;
//* Header
import AppRoutes from "./AppRoputes";

//* CSS
import "./App.css";

function App() {
  return (
    <>
      <div className="fixed inset-0 flex justify-center">
        <div
          className="absolute opacity-50 bg-green bg-shape bg-blur"
          style={{ left: "-5rem", top: "10rem" }}
        ></div>
        <div
          className="absolute opacity-70 bg-yellow bg-shape bg-blur"
          style={{ right: "5rem", top: "5rem" }}
        ></div>
        <div
          className="absolute opacity-70 bg-blue bg-shape bg-blur"
          style={{ right: "15rem", top: "25rem" }}
        ></div>
      </div>

      <div
        className="App flex flex-column justify-center backdrop-filter"
        style={{ padding: "10rem 5rem" }}
      >
        <AppRoutes />
      </div>

      <div
        className="final-page fixed"
        style={{ width: "100%", height: "5rem", bottom: "0" }}
      ></div>
    </>
  );
}

export default App;

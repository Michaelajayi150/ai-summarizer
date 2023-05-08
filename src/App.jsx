import Demostration from "./components/demostration";
import Header from "./components/header";

function App() {
  return (
    <main className="w-[90%] max-w-screen-md mx-auto">
      <section>
        <div className="gradient" />
      </section>

      <section>
        <Header />
        <Demostration />
      </section>
    </main>
  );
}

export default App;

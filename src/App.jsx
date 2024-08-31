import { HeaderPage } from "./components/header/header";
import { SideNav } from "./components/sidenav/sidenav";
import { TaskPage } from "./components/taskpage/taskpage";

function App() {
  return (
    <div>
      <HeaderPage />
      <SideNav />
      <TaskPage />
    </div>
  );
}

export default App;

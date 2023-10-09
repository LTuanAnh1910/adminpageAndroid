import { Routes, Route } from "react-router-dom";

import ManagerPost from "./containers/ManagerPost";
import ManagerUser from "./containers/ManagerUser";
import Home from "./containers/Home";
import ManagerGroups from "./containers/ManagerGroups";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="user" element={<ManagerUser />} />
          <Route path="post" element={<ManagerPost />} />
          <Route path="groups" element={<ManagerGroups />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

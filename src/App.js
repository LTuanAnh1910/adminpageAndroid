import { Routes, Route } from "react-router-dom";

import ManagerPost from "./containers/ManagerProducts";
import ManagerUser from "./containers/ManagerUser";
import Home from "./containers/Home";
import ManagerGroups from "./containers/ManagerOrders";
import Charts from "./containers/Charts";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="user" element={<ManagerUser />} />
          <Route path="post" element={<ManagerPost />} />
          <Route path="groups" element={<ManagerGroups />} />
          <Route path="charts" element={<Charts />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

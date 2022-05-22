import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Chart from "./routes/Chart";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Price from "./routes/Price";

export interface RoutersProps {
  isDark: boolean;
  toggleDark: () => void;
}
function Router({ isDark, toggleDark }: RoutersProps) {
  const { coinId } = useParams();
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Coins isDark={isDark} toggleDark={toggleDark} />}
        />
        <Route
          path="/:coinId"
          element={<Coin isDark={isDark} toggleDark={toggleDark} />}
        >
          <Route path="price" element={<Price />} />
          <Route path="chart" element={<Chart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

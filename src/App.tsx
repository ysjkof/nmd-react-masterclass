import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
import Variants from "./components/1_variants";
import Gestures from "./components/2_Gestures";
import MotionValues from "./components/3_motion_values";
import SVGAnim from "./components/4_svg_animation";
import AnimaPresence from "./components/5_animate_presence";
import Slider from "./components/6_slider";
import LayoutAnimation from "./components/7_layout_animation";
import AnimateSharedLayout from "./components/8_animate_shared-layout";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const SelectBtns = styled.div`
  position: fixed;
  top: 50px;
  button {
    padding: 10px 16px;
    margin: 0 10px;
    &:hover {
      font-weight: 600;
    }
  }
`;

function App() {
  const [id, setId] = useState<null | string>(null);
  const [select, setSelect] = useState(0);

  return (
    <Wrapper>
      <SelectBtns>
        {[
          "Variants",
          "Gestures",
          "MotionValues",
          "SVGAnim",
          "AnimaPresence",
          "Slider",
          "LayoutAnimation",
          "AnimateSharedLayout",
        ].map((n, idx) => (
          <button onClick={() => setSelect(idx)}>{n}</button>
        ))}
      </SelectBtns>
      {[
        <Variants />,
        <Gestures />,
        <MotionValues />,
        <SVGAnim />,
        <AnimaPresence />,
        <Slider />,
        <LayoutAnimation />,
        <AnimateSharedLayout />,
      ].find((_, index) => index === select)}
    </Wrapper>
  );
}
export default App;

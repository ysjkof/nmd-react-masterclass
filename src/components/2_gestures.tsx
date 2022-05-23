import { motion, Variants } from "framer-motion";
import { useRef } from "react";
import styled from "styled-components";

const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.4);
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants: Variants = {
  hover: { rotateZ: 90 },
  click: { borderRadius: "100px" },
  drag: { backgroundColor: "rgb(46, 204, 113)", transition: { duration: 2 } },
};

function Gestures() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);
  return (
    <BiggerBox ref={biggerBoxRef}>
      <Box
        drag
        // drag="x" 드래그 방향 제한
        dragSnapToOrigin // 드래그를 놓을 때 원점으로 돌아간다
        dragElastic={0.5}
        dragConstraints={biggerBoxRef} // 드래그 가능한 위치 설정
        // dragConstraints={{ left: 0, right: 300 }} position을 직접 설정
        variants={boxVariants}
        whileHover="hover"
        whileTap="click"
      />
    </BiggerBox>
  );
}

export default Gestures;

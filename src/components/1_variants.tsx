import { motion, Variants as VariantsType } from "framer-motion";
import styled from "styled-components";

// framer-motion은 element를 모두 <motion.div></motion.div> 이런 식으로 써야 한다.
const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
  background-color: white;
  height: 70px;
  width: 70px;
  place-self: center;
  border-radius: 35px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants: VariantsType = {
  start: {
    opacity: 0,
    scale: 0.5,
  },
  end: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      duration: 0.5,
      bounce: 0.5,
      delayChildren: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const circleVariants: VariantsType = {
  start: {
    opacity: 0,
    y: 10,
  },
  end: {
    opacity: 1,
    y: 0,
  },
};

function Variants() {
  return (
    <Box variants={boxVariants} initial="start" animate="end">
      {/* 부모 요소에 variants, initial, animate가 있고 자식 요소에 initial, animiate가 없다면 자동으로 전달한다 */}
      <Circle variants={circleVariants} />
      <Circle variants={circleVariants} />
      <Circle variants={circleVariants} />
      <Circle variants={circleVariants} />
    </Box>
  );
}

export default Variants;

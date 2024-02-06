import styled, { keyframes } from "styled-components";

export default function Loader({ size, styles }) {
  return (
    <SpinnerContainer>
      <Spinner size={size} styles={styles} />
    </SpinnerContainer>
  );
}

const spin = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform: rotate(360deg);
}
`;

const Spinner = styled.div`
  width: ${(props) => (props.size === "large" ? "20px" : "10px")};
  height: ${(props) => (props.size === "large" ? "20px" : "10px")};
  border: ${(props) =>
    props.size === "large"
      ? `5px solid ${props?.styles?.border}`
      : `3px solid ${props?.styles?.border}`};
  border-top: ${(props) =>
    props.size === "large" ? "5px solid" : "3px solid"};
  border-top-color: ${({ styles }) => styles?.loaderColor};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: 5px;
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

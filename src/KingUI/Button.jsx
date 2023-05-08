const PrimaryButton = styled.button`
  color: #ffffff;
  padding: 8px 32px;
  border: none;
  border-radius: 100px;
  background: linear-gradient(
    125deg,
    rgb(4, 18, 255) 0%,
    rgb(158, 0, 255) 100%
  );
`;

const TextButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(27, 27, 24);
  background-color: transparent;
  height: 48px;
  border: none;

  &:hover {
    color: rgb(0, 0, 0);
  }
`;

if (props.variant === "text") {
  return (
    <TextButton onClick={props.onClick}>
      {props.text || "Text Button"}
    </TextButton>
  );
}

return (
  <PrimaryButton onClick={props.onClick}>
    {props.text || "Primary Button"}
  </PrimaryButton>
);

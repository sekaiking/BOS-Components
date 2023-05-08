const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(27, 27, 24);
  background-color: rgb(243, 243, 242);
  border-radius: 100px;
  height: 45px;
  width: 45px;
  border: none;
  margin: 0;

  &:hover {
    color: rgb(0, 0, 0);
    background-color: rgb(246, 246, 245);
  }
`;

return (
  <IconButton onClick={props.onClick}>{props.icon || "?"}</IconButton>
);

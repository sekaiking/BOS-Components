const TinyHeader = styled.h4`
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.2;
  color: #6c757d;
  margin-top: 0.5rem;
`;

const BigHeader = styled.h1`
  font-size: 1.7rem;
  font-weight: 600;
  line-height: 1.2;
  color: #343a40;
  margin-top: 0.5rem;
`;

const ImportantText = styled.span`
  font-size: 1.25rem;
  gap: 4px;
`;

const Label = styled.span`
  font-size: 0.8rem;
  font-weight: 500;
  padding: 4px 8px;
  height: 1.6rem;
  border-radius: 3px;
  margin: 2px 8px 8px 0;
  background-color: #e9ecef;
  color: #212529;
  display: inline-block;
`;

if (props.variant === "tinyHeader") {
  return <TinyHeader>{props.text}</TinyHeader>;
}

if (props.variant === "bigHeader") {
  return <BigHeader>{props.text}</BigHeader>;
}

if (props.variant === "importantText") {
  return <ImportantText>{props.text}</ImportantText>;
}

if (props.variant === "label") {
  return <Label>{props.text}</Label>;
}

return <span>{props.text}</span>;

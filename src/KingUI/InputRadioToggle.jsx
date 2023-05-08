const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;

  button {
    all: unset;
  }

  .ToggleGroupRoot {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .ToggleGroupItem {
    background-color: white;
    width: 18px;
    height: 18px;
    border-radius: 5px;
    border: 1px solid #2416bd;
    transition: 0.2s ease-in-out;
  }
  .ToggleGroupItem:hover {
    background-color: #2416bd40;
  }
  .ToggleGroupItem:focus {
    background-color: #2416bd40;
  }

  .ToggleGroupItem[data-state='on'] .ToggleGroupIndicator {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: relative;
  }
  .ToggleGroupItem[data-state='on']  .ToggleGroupIndicator::after {
    content: "";
    display: block;
    width: 11px;
    height: 11px;
    border-radius: 3px;
    background-color: #2416bd;
  }

  .Label {
    color: black;
    font-size: 15px;
    line-height: 1;
    padding-left: 15px;
    cursor: pointer;
    text-transform: capitalize;
  }
`;
return (
  <FilterContainer>
    <ToggleGroup.Root
      className="ToggleGroupRoot"
      aria-label="View density"
      defaultValue={props.defaultValue}
      onValueChange={(value) => {
        props.onChange(value);
      }}
      value={props.value}
      type={props.type || "multiple"}
    >
      {props.options.map((status) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <ToggleGroup.Item
            className="ToggleGroupItem"
            value={status}
            id={"bsf" + status}
          >
            <div className="ToggleGroupIndicator"></div>
          </ToggleGroup.Item>
          <label className="Label" htmlFor={"bsf" + status}>
            {status}
          </label>
        </div>
      ))}
    </ToggleGroup.Root>
  </FilterContainer>
);

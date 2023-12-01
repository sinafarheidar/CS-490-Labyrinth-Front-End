import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

type DropdownProps = {
  title: string;
  dropdownOptions: {
    displayTitle: string;
    value: string;
  }[];
  handleChange: (selectedOption: string) => void;
};

export const Dropdown = ({
  title,
  dropdownOptions,
  handleChange,
}: DropdownProps) => {
  const [selected, setSelected] = React.useState("");

  const handleSelectedOption = (event: SelectChangeEvent) => {
    handleChange(event.target.value as string);
    setSelected(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }} data-testid="dropdown">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          data-testid="dropdown-select"
          value={selected}
          label={title}
          onChange={handleSelectedOption}
        >
          {dropdownOptions.map((option) => (
            <MenuItem
              value={option.value}
              key={option.value}
              data-testid={`menu-item-${option.value}`}
            >
              {option.displayTitle}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

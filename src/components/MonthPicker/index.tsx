import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";

const months = [
  { label: "January", value: 1 },
  { label: "February", value: 2 },
  { label: "March", value: 3 },
  { label: "April", value: 4 },
  { label: "May", value: 5 },
  { label: "June", value: 6 },
  { label: "July", value: 7 },
  { label: "August", value: 8 },
  { label: "September", value: 9 },
  { label: "October", value: 10 },
  { label: "November", value: 11 },
  { label: "December", value: 12 },
];

type MonthPicker = {
  name: string;
  disabled?: boolean;
  handleChange?: () => void;
};

const MothPicker: React.FC<MonthPicker> = (props) => {
  const { name, disabled = false, handleChange } = props;
  const { control } = useFormContext();

  return (
    <FormControl fullWidth sx={{ m: 1 }} size="small">
      <InputLabel id="month-picker-label">Month</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            onChange={(e) => {
              field.onChange(e.target.value);
              if (typeof handleChange === "function") {
                handleChange();
              }
            }}
            value={field.value ?? ""}
            labelId="month-selector"
            disabled={disabled}
            variant="outlined"
            label="Month"
            name={name}
          >
            {months?.map(d => (
              <MenuItem key={d.label} value={d?.value}>{d?.label}</MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
};

export default MothPicker;

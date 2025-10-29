/* eslint-disable react-hooks-extra/no-direct-set-state-in-use-effect, react-hooks/exhaustive-deps, react/no-array-index-key */
"use client";
import type { TextFieldProps } from "@mui/material";

import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  Popper,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";

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

function getDaysInMonth(month: number) {
  const year = 2024; // static year
  return new Date(year, month, 0).getDate();
}

type MonthDayInputPickerProps = {
  name: string;
  label: string;
  sx?: TextFieldProps["sx"];
};

const MonthDayInputPicker: React.FC<MonthDayInputPickerProps> = ({
  name,
  label,
  sx,
}) => {
  const { control, setValue } = useFormContext();
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  const month = useWatch({ name: `${name}.month`, control });
  const day = useWatch({ name: `${name}.day`, control });

  const [selectedMonth, setSelectedMonth] = useState<number>(
    month || new Date().getMonth() + 1,
  );
  const [selectedDay, setSelectedDay] = useState<number | null>(day || null);

  const formatted = React.useMemo(() => {
    const monthLabel = months.find(m => m.value === month)?.label;
    return month && day ? `${monthLabel} ${day}` : "";
  }, [month, day]);

  const handleClickOutside = (e: MouseEvent) => {
    const popper = document.getElementById(`popper-${name}`);
    if (popper && !popper.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (month && day) {
      setOpen(false);
    }
  }, [month, day]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const daysInMonth = getDaysInMonth(selectedMonth);

  return (
    <>
      <FormControl fullWidth size="small" sx={{ ...sx, mt: 1 }}>
        <InputLabel>{label}</InputLabel>
        <OutlinedInput
          readOnly
          value={formatted}
          onClick={() => setOpen(true)}
          inputRef={anchorRef}
          label={label}
        />
      </FormControl>

      <Popper
        id={`popper-${name}`}
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-start"
        sx={{ zIndex: 1300 }}
      >
        <Box
          id={`popper-${name}`}
          sx={{
            p: 2,
            bgcolor: "background.paper",
            boxShadow: 3,
            borderRadius: 1,
            width: 260,
          }}
        >
          {/* Month Navigation */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography
              onClick={() => {
                const prev = selectedMonth - 1 < 1 ? 12 : selectedMonth - 1;
                setSelectedMonth(prev);
                setValue(`${name}.month`, prev);
                setValue(`${name}.day`, ""); // reset day
              }}
              sx={{
                cursor: "pointer",
                fontWeight: 700,
                pl: 1,
              }}
            >
              {"<"}
            </Typography>
            <Typography fontWeight="bold">
              {months.find(m => m.value === selectedMonth)?.label}
            </Typography>
            <Typography
              onClick={() => {
                const next = selectedMonth + 1 > 12 ? 1 : selectedMonth + 1;
                setSelectedMonth(next);
                setValue(`${name}.month`, next);
                setValue(`${name}.day`, ""); // reset day
              }}
              sx={{
                cursor: "pointer",
                fontWeight: 700,
                pr: 1,
              }}
            >
              {">"}
            </Typography>
          </Box>

          {/* Calendar Headers */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              mb: 1,
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "13px",
            }}
          >
            {["S", "M", "T", "W", "TH", "F", "S"].map((d, i) => (
              <Box key={`${d}-${i}`}>{d}</Box>
            ))}
          </Box>

          {/* Calendar Days */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "4px",
              textAlign: "center",
            }}
          >
            {(() => {
              const date = new Date(2024, selectedMonth - 1, 1);
              const startDay = date.getDay(); // Sunday = 0

              const dayBoxes = [];

              for (let i = 0; i < startDay; i++) {
                dayBoxes.push(<Box key={`blank-${i}`} />);
              }

              for (let i = 1; i <= daysInMonth; i++) {
                const isSelected
                  = selectedMonth === month && i === selectedDay;

                dayBoxes.push(
                  <Box
                    key={i}
                    sx={{
                      "borderRadius": "50%",
                      "backgroundColor": isSelected ? "#1976d2" : "transparent",
                      "color": isSelected ? "#fff" : "#000",
                      "cursor": "pointer",
                      "&:hover": {
                        backgroundColor: isSelected ? "#1565c0" : "#eee",
                      },
                      "height": 32,
                      "lineHeight": "32px",
                    }}
                    onClick={() => {
                      setSelectedDay(i);
                      setValue(`${name}.month`, selectedMonth);
                      setValue(`${name}.day`, i);
                      setOpen(false);
                    }}
                  >
                    {i}
                  </Box>,
                );
              }

              return dayBoxes;
            })()}
          </Box>
        </Box>
      </Popper>
    </>
  );
};

export default MonthDayInputPicker;

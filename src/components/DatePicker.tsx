import React, { useEffect, useRef, useState } from "react";
import { DateRangePicker } from "react-date-range";
import format from "date-fns/format";
import { addDays } from "date-fns";
const DatePickerComponent = ({
  setRange,
}: {
  setRange: (range: any) => void;
}) => {
  // date state

  const [tempRange, setTempRange] = useState<any>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  // open close
  const [open, setOpen] = useState(false);

  // get the target element to toggle
  const refOne = useRef<any>(null);

  useEffect(() => {
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  // hide dropdown on ESC press
  const hideOnEscape = (e: any) => {
    // console.log(e.key)
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // Hide dropdown on outside click
  const hideOnClickOutside = (e: any) => {
    // console.log(refOne.current)
    // console.log(e.target)
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  return (
    <div className="calendarWrap ">
      <input
        value={`${format(tempRange[0].startDate, "dd/MM/yyyy")} to ${format(
          tempRange[0].endDate,
          "dd/MM/yyyy"
        )}`}
        readOnly
        className="inputBox"
        onClick={() => setOpen((open) => !open)}
      />

      <div ref={refOne}>
        {open && (
          <DateRangePicker
            onChange={(item: any) => {
              setRange([item.selection]);
              setTempRange([item.selection]);
            }}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={tempRange}
            months={2}
            direction="horizontal"
            className="calendarElement my-custom-date-range-picker "
            color="#1E1E1E"
          />
        )}
      </div>
    </div>
  );
};

export default DatePickerComponent;

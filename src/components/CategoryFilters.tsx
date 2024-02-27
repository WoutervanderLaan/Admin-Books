"use client";

import { useState } from "react";
import Filter from "./Filter";
import Overlay from "./Overlay";
import Button from "./Button";

const CategoryFilters = () => {
  const [areFiltersOpen, setAreFiltersOpen] = useState(false);

  return (
    <>
      <Button
        className="h-fit self-center"
        onClick={() => setAreFiltersOpen(true)}
      >
        Filters
      </Button>
      {areFiltersOpen && (
        <Overlay onClose={() => setAreFiltersOpen(false)}>
          <div className="flex flex-col pr-10 gap-2 overflow-y-auto">
            {Array.from({ length: 10 }).map((category, i) => (
              <Filter
                key={i}
                category={"test"}
                checkHandler={(e) => console.log(e)}
              />
            ))}
          </div>
        </Overlay>
      )}
    </>
  );
};

export default CategoryFilters;

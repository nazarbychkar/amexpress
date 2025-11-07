"use client";
import { useState } from "react";
import Filter from "@/components/Filter";
// useQuery

export default function Category() {
  const [cars, setCars] = useState([]);

  return (
    <section>
      <Filter />

      <div>Main</div>
    </section>
  );
}

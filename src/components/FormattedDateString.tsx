"use client";

import { useEffect, useState } from "react";

export const FormattedDateString = ({ date }: { date: Date }) => {
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  useEffect(
    () => setFormattedDate(new Date(date).toLocaleDateString("en-US")),
    [date],
  );

  return <>{formattedDate}</>;
};

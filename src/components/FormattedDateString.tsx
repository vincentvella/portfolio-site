"use client";

import { useEffect, useState } from "react";

export const FormattedDateString = ({ date }: { date: string }) => {
  const [formattedDate, setFormattedDate] = useState<string | null>(null);

  useEffect(
    // eslint-disable-next-line react-hooks/set-state-in-effect
    () => setFormattedDate(new Date(date).toLocaleDateString("en-US")),
    [date],
  );

  return <>{formattedDate}</>;
};

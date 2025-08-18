"use client";

import { BannerTitles } from "@/app/components/banner/banner";
import { useState } from "react";

export const TodaysSpecial: React.FC = () => {
  const [todaysSpecial] = useState<string>(getDailySpecial());
  return (
    <BannerTitles
      title={todaysSpecial}
      pretitle={isOpen() ? "Today's Special" : undefined}
    />
  );
};

const isOpen = () => new Date().getDay() !== 0 && new Date().getDay() !== 6;

const getDailySpecial = () => {
  const today = new Date().getDay();

  switch (today) {
    case 0:
    case 6:
    default: {
      return "closed today :(";
    }
    case 1: {
      return "Mac 'n cheese";
    }
    case 2: {
      return "Creamy potato soup";
    }
    case 3: {
      return "Chicken stew";
    }
    case 4: {
      return "Boston clam chowder soup";
    }
    case 5: {
      return "Chili";
    }
  }
};

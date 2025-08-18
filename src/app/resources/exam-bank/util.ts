// e.g. 1219 => Fall 2021
export const termNumberToString = (term: number) => {
  const yearsSince1900 = Math.floor(term / 10);
  const month = term % 10;

  const year = 1900 + yearsSince1900;
  switch (month) {
    case 1: {
      return `Winter ${year}`;
    }
    case 5: {
      return `Spring ${year}`;
    }
    case 9: {
      return `Fall ${year}`;
    }
    default: {
      return `Term ${term}`;
    }
  }
};

// october 2025 => 1259
export const currentTerm = () => {
  const yearsSince1900 = new Date().getFullYear() - 1900;
  const month = new Date().getMonth() + 1; // UW indexes by 1

  const term = Math.floor(month / 4) + 1;

  return yearsSince1900 * 10 + term;
};

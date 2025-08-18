// e.g. 1219 => Fall 2021
export const TermNumberToString = (term: number) => {
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

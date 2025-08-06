import Link from "next/link";
import "./budgets-table.scss";

export type Budget = {
  year: number;
  term: "Winter" | "Spring" | "Fall";
  path: string;
};

export const BudgetsTable: React.FC<{ budgets: Budget[] }> = ({ budgets }) => {
  const budgetsByYear = Object.groupBy(budgets, ({ year }) => year);

  return (
    <table className="budgets-table table">
      <tbody>
        {Object.entries(budgetsByYear)
          .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
          .map(([year, budgets]) => {
            const winter = budgets?.find(({ term }) => term == "Winter");
            const spring = budgets?.find(({ term }) => term == "Spring");
            const fall = budgets?.find(({ term }) => term == "Fall");

            return (
              <tr key={year}>
                <td className="budget-year">{year}</td>
                {[winter, spring, fall].map((budget) => {
                  if (!budget) {
                    return null;
                  }

                  return (
                    <td className="budget-cell" key={budget.path}>
                      <Link href={budget.path}>
                        <div className="budget">
                          {budget.term} {year}
                        </div>
                      </Link>
                    </td>
                  );
                })}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

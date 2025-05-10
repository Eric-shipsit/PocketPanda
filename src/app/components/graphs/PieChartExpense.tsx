import React, {useMemo, useState} from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';

interface PieChartItem {
  category: string;
  amount: number;
}

interface PieChartExpenseProps {
  expenses: PieChartItem[];
  colors?: string[];
}


export default function PieChartExpense({
  expenses = [],
  colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'],
}: PieChartExpenseProps) {
  // Aggregate amounts by category
  const data = useMemo(() => {
    const map: Record<string, number> = {};
    expenses.forEach(({ category, amount }) => {
      map[category] = (map[category] || 0) + amount;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [expenses]);
  // const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState([] as string[]);
  const handleSliceClick = (category: string) => {
    console.log('Clicked ', category);
  };
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" aspect={1}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius="60%"
            label
            onClick={(entry) => {
              setSelectedCategory([entry.name]);
              console.log(selectedCategory);
            }}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="bottom"
            height={36}
            onClick={(entry) => {
              var myList = selectedCategory;
              const category = String(entry.value)
              if (selectedCategory.includes(category)) {
                const index = myList.indexOf(category);
                if (index > -1) { // only splice array when item is found
                  myList.splice(index, 1); // 2nd parameter means remove one item only
                }
              } else {
                myList.push(category);
              }
              setSelectedCategory(myList);
              console.log(selectedCategory);
            }}
            formatter={(value, entry) => {
              const isSelected = selectedCategory === entry.value;
              return (
                <span
                  style={{
                    color: isSelected ? '#ccc' : '#000',
                    cursor: 'pointer',
                  }}
                >
                  {value}
                </span>
              );
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

import { getUniqueValues } from "../getUniqueValues";

describe("Возвращает уникальные значения", () => {
  interface TestItem {
    id: number;
    name: string;
    category: string;
  }

  const items: TestItem[] = [
    { id: 1, name: "Item 1", category: "Category A" },
    { id: 2, name: "Item 2", category: "Category B" },
    { id: 3, name: "Item 3", category: "Category A" },
    { id: 4, name: "Item 4", category: "Category C" },
    { id: 5, name: "Item 5", category: "Category B" },
  ];

  test('по полю "category"', () => {
    const result = getUniqueValues(items, "category");
    expect(result).toEqual(["Category A", "Category B", "Category C"]);
  });

  test('по полю "name"', () => {
    const result = getUniqueValues(items, "name");
    expect(result).toEqual(["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"]);
  });
});

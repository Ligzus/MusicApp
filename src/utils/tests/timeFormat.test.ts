import { formatDuration } from "../timeFormat";

describe("Функция форматирования времени", () => {
  it("Правильно форматирует число в строку", () => {
    const result = formatDuration(6);
    expect(result).toBe("0:06");
  });

  it("Правильно форматирует 0 в 0:00", () => {
    const result = formatDuration(0);
    expect(result).toBe("0:00");
  });
});

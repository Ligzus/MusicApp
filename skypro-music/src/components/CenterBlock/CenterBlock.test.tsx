import { render, screen, waitFor } from "@testing-library/react";
import CenterBlock from "./CenterBlock";
import "@testing-library/jest-dom";

// Mock функции и данных
jest.mock("../../api/tracks", () => ({
  getTracks: jest.fn(() => Promise.resolve({ data: [] })),
}));

test("CenterBlock рендерится корректно", async () => {
  // Рендерим компонент и ожидаем его асинхронное поведение
  const { asFragment } = render(await CenterBlock());

  // Используем waitFor для ожидания завершения всех асинхронных операций
  await waitFor(() => {
    expect(screen.getByText("Треки")).toBeInTheDocument();
  });

  // Проверяем снимок
  expect(asFragment()).toMatchSnapshot();
});

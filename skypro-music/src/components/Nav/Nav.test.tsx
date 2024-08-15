import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Nav from './Nav';

// Мокируем useRouter из next/navigation
jest.mock('next/navigation', () => ({
    useRouter: () => ({
        push: jest.fn(), // Мокируем метод push
    }),
}));

// Мокируем хук useAppSelector
jest.mock('../../hooks', () => ({
    useAppSelector: jest.fn().mockReturnValue({ username: 'testUser' }),
    useAppDispatch: () => jest.fn(),
}));

describe('Nav', () => {
    it('должен отрендерить логотип', () => {
        render(<Nav />);
        const logo = screen.getByAltText('logo');
        expect(logo).toBeInTheDocument();
    });

    it('закрыт до клика на бургер меню', () => {
        render(<Nav />);
        expect(screen.queryByText('Главное')).not.toBeInTheDocument();
    });  
});

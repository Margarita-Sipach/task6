import { ButtonHTMLAttributes } from 'react';
import cls from './style.module.scss';

export enum ButtonTheme{
	none = 'none',
	outlined = 'outlined'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
	onClick: () => void
	theme: ButtonTheme
}

export const Button = (props: ButtonProps) => {
    const { children, onClick, theme = ButtonTheme.none } = props;

    return (
        <button
            type="button"
            onClick={onClick}
            className={`${cls.button} ${cls[theme]}`}
        >
            {children}
        </button>
    );
};

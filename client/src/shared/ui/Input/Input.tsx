import React, {
    FC, InputHTMLAttributes, memo,
} from 'react';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps {
  value?: string | number;
  onChange?: (value: string) => void;
}

export const Input: FC<InputProps> = memo((props: InputProps) => {
    const {
        value,
        onChange,
        ...otherProps
    } = props;

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    return (
        <input
            onChange={changeHandler}
            value={value}
            {...otherProps}
        />
    );
});

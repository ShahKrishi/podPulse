import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import React from 'react';

interface CustomButtonProps {
    backgroundColor?: string;
    fontColor?: string;
    font?: string;
    size?: string;
    borderRadius?: string;
    variant?: 'text' | 'outlined' | 'contained';
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children?: React.ReactNode;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
}

const CustomButton = styled(
    ({ backgroundColor, fontColor, font, size, borderRadius, ...rest }: CustomButtonProps) => (
        <Button {...rest} />
    ),
    {
        shouldForwardProp: (prop: string) =>
            !['backgroundColor', 'fontColor', 'font', 'size', 'borderRadius'].includes(prop),
    }
)<CustomButtonProps>(({ backgroundColor, fontColor, font, size, borderRadius }) => ({
    backgroundColor: backgroundColor || '#fff',
    color: fontColor || '#000',
    fontFamily: font || 'inherit',
    fontSize: size || '1rem',
    borderRadius: borderRadius || '8px',
    textTransform: 'none',
    '&:hover': {
        backgroundColor: backgroundColor || '#eee',
    },
}));

export default CustomButton;

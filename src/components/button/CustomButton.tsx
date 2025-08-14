import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

interface CustomButtonProps {
    backgroundColor?: string;
    fontColor?: string;
    font?: string;
    size?: string;
    borderRadius?: string;
}

const CustomButton = styled(Button, {
    shouldForwardProp: (prop: string) =>
        !['backgroundColor', 'fontColor', 'font', 'size', 'borderRadius'].includes(prop),
})<CustomButtonProps>(({ backgroundColor, fontColor, font, size, borderRadius }) => ({
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

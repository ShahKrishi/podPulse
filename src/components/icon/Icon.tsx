import React from 'react';

export type IconProps = {
    name: string;
    size?: number;
    className?: string;
    onClick?: () => void;
};

const Icon: React.FC<IconProps> = ({
    name,
    size = 24,
    onClick,
}) => {
    return (
        <img
            src={name}
            style={{ fontSize: size }}
            onClick={onClick}
        />
    );
};

export default Icon;

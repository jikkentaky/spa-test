import { FC } from 'react';

import { CustomButton } from '@/components/ui/custom-button';
import { CloseIcon } from '@/components/ui/icons/close-icon';

import styles from './styles.module.scss';
import clsx from 'clsx';

type Props = {
    onClick: () => void;
    className?: string;
};

export const CloseButton: FC<Props> = ({ onClick, className }) => {
    return (
        <CustomButton onClick={onClick} className={clsx(styles['close-button'], className)}>
            <CloseIcon />
        </CustomButton>
    );
};

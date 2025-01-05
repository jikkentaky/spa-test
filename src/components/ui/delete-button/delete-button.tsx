import { FC } from 'react';

import { CustomButton } from '@/components/ui/custom-button';
import { BucketIcon } from '@/components/ui/icons/bucket-icon';

import styles from './styles.module.scss';

type Props = {
    onClick?: () => void;
};

export const DeleteButton: FC<Props> = ({ onClick }) => {
    return (
        <CustomButton type='button' onClick={onClick} className={styles['delete-button']}>
            <BucketIcon />
        </CustomButton>
    );
};

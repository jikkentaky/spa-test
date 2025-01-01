'use client';

import Image from 'next/image';
import userAvatar from '../../../../../public/images/user-avatar.webp';
import { SettingsIcon } from '@/components/ui/icons/settings';
import { CustomButton } from '@/components/ui/custom-button/custom-button';
import styles from './styles.module.scss';

export const UserSettings = () => {
    return (
        <>
            <div className={styles['user-bar']}>
                <Image
                    src={userAvatar}
                    alt="user avatar"
                    width={120}
                    height={120}
                    priority
                    className={styles['user-bar__avatar']}
                />

                <CustomButton
                    type="button"
                    className={styles['user-bar__settings-button']}
                >

                    <SettingsIcon width={20} height={20} className={styles['user-bar__settings-icon']} />
                </CustomButton>
            </div>
        </>
    );
};

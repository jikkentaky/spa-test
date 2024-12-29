'use client';

import { useEffect, useState } from 'react';
import { Loader } from '@/components/ui/loader/loader';
import ClockIcon from '@/components/ui/icons/clock-icon';
import styles from './styles.module.scss';

export const TimeDisplay = () => {
    const [currentTime, setCurrentTime] = useState<Date | null>(null);

    useEffect(() => {
        setCurrentTime(new Date());

        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className={styles['time-display']}>
            {currentTime ? (
                <>
                    <ClockIcon />
                    <p className={styles['time-display__time']} suppressHydrationWarning>
                        {formatTime(currentTime)}
                    </p>
                </>
            ) : (
                <Loader />
            )}
        </div>
    );
};

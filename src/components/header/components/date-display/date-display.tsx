'use client';

import { useEffect, useState } from 'react';
import { Loader } from '@/components/ui/loader/loader';
import styles from './styles.module.scss';
import { useLocale } from 'use-intl';

export const DateDisplay = () => {
    const [currentDate, setCurrentDate] = useState<Date | null>(null);
    const locale = useLocale();

    useEffect(() => {
        setCurrentDate(new Date());
    }, []);

    const formatDate = (date: Date): { dayOfWeek: string; dateString: string } => {
        const options: Intl.DateTimeFormatOptions = { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleDateString(`${locale.toLowerCase()}-${locale.toUpperCase()}`, options);

        const [dayOfWeek, dateString] = formattedDate.split(', ');

        const capitalizedDayOfWeek = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);

        return {
            dayOfWeek: capitalizedDayOfWeek,
            dateString,
        };
    };

    if (!currentDate) {
        return <Loader />;
    }

    const { dayOfWeek, dateString } = formatDate(currentDate);

    return (
        <div className={styles['date-display']}>
            <p className={styles['date-display__day-of-week']}>{dayOfWeek}</p>

            <p className={styles['date-display__date-string']}>{dateString}</p>
        </div>
    );
};

'use client';

import { Card } from '@/components/card';
import { useAppSelector } from '@/libs/store/hooks';

import styles from './styles.module.scss';
import { useTranslations } from 'next-intl';

const Dashboard = () => {
    const t = useTranslations('Dashboard');
    const activeSessions = useAppSelector((state) => state.user.activeSessions);
    const handleCardClick = () => {
        alert('More details coming soon!');
    };

    return (
        <div className={styles.dashboard}>
            <h1 className={styles.dashboard__header}>{t('title')}</h1>

            <div className={styles.dashboard__grid}>
                <Card
                    title={t('cards.totalUsers')}
                    content='1,234'
                    footer={t('cards.viewDetails')}
                    onClick={handleCardClick}
                />

                <Card
                    title={t('cards.revenue')}
                    content='$12,345'
                    footer={t('cards.viewDetails')}
                    onClick={handleCardClick}
                />

                <Card
                    title={t('cards.activeSessions')}
                    content={activeSessions.toString()}
                    footer={t('cards.viewDetails')}
                    onClick={handleCardClick}
                />

                <Card
                    title={t('cards.newSignups')}
                    content='78'
                    footer={t('cards.viewDetails')}
                    onClick={handleCardClick}
                />
            </div>
        </div>
    );
};

export default Dashboard;

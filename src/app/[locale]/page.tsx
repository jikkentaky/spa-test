import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/language-swithcer';

const HomePage = () => {
    const t = useTranslations('HomePage');

    return (
        <div>
            <h1>{t('title')}</h1>
            <LanguageSwitcher />
        </div>
    );
};

export default HomePage;

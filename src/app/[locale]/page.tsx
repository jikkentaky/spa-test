import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/ui/language-swithcer/language-swithcer';
import { register } from '@/actions/user-controller';
import CustomInput from '@/components/ui/custom-input/custom-input';
import CustomButton from '@/components/ui/custom-button/custom-button';

const HomePage = () => {
    const t = useTranslations('HomePage');

    return (
        <div>
            <h1>{t('title')}</h1>
            <LanguageSwitcher />

            <CustomInput />

            <CustomButton>
                button
            </CustomButton>

            {/*<button onClick={register}>click</button>*/}
        </div>
    );
};

export default HomePage;

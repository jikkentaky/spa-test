import { useEffect } from 'react';

import { useTranslations } from 'next-intl';
import { toast } from 'react-hot-toast';

export const useErrorHandler = (error: string, isPending: boolean) => {
    const t = useTranslations('Auth');

    useEffect(() => {
        if (error && !isPending) {
            toast.error(t(error));
        }
    }, [error, isPending, t]);
};

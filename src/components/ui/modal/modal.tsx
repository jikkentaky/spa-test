import { FC, ReactNode } from 'react';

import { CloseButton } from '@/components/ui/close-button';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';

import styles from './styles.module.scss';

type Props = {
    children: ReactNode;
    onClose: () => void;
    showMenu: boolean;
};

export const Modal: FC<Props> = ({ children, onClose, showMenu }) => {
    return (
        <Dialog open={showMenu} onClose={onClose} className={styles.modal}>
            <DialogBackdrop className={styles['modal__backdrop']} />

            <div className={styles['modal__container']}>
                <DialogPanel className={styles['modal__panel']}>
                    <CloseButton onClick={onClose} className={styles['modal__close-btn']} />

                    {children}
                </DialogPanel>
            </div>
        </Dialog>
    );
};

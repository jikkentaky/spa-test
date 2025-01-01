"use client";

import { ComponentType, useActionState } from "react";
import { login, signUp } from "@/actions/user-controller";
import { AuthMode } from '@/types/types';

type WithAuthActionProps = {
    mode: AuthMode;
};

export const withAuthAction = <T extends object>(
    WrappedComponent: ComponentType<T>
)=> {
    return function AuthActionWrapper(props: WithAuthActionProps) {
        const { mode, ...rest } = props;

        const [error, action, isPending] = useActionState(
            mode === "login" ? login : signUp,
            null
        );

        return (
            <WrappedComponent
                {...(rest as T)}
                action={action}
                error={error}
                isPending={isPending}
                mode={mode}
            />
        );
    };
}

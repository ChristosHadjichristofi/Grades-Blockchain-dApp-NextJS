import { useWeb3React } from "@web3-react/core";
import { useRouter } from 'next/router';

export default function WithAuth(WrappedComponent) {
    return (props) => {
        const { active } = useWeb3React();
        if (typeof window !== "undefined") {
            const Router = useRouter();

            if (!active) {
                Router.replace("/");
                return null;
            }

            return <WrappedComponent {...props} />;
        }
        return null;
    };
}
import { useWeb3React } from "@web3-react/core";
import { useRouter } from 'next/router';
import toast from "react-hot-toast";

export default function WithAuth(WrappedComponent) {
    return (props) => {
        const { active } = useWeb3React();
        if (typeof window !== "undefined") {
            const Router = useRouter();

            if (!active) {
                Router.replace("/");
                toast.error("Please login with MetaMask to continue!");
                return null;
            }

            return <WrappedComponent {...props} />;
        }
        return null;
    };
}
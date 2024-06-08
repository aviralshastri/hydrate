
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
import "./global.css";

const App = ({ Component, pageProps }) => {
    const router = useRouter();
    return (
        <div key={router.pathname}>
            <SessionProvider session={pageProps.session}>
                <Component {...pageProps} />
            </SessionProvider>
        </div>
    );
};

export default App;

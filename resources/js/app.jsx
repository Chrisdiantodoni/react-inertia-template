import "./bootstrap";
import "../css/app.css";
import "simplebar-react/dist/simplebar.min.css";
import "flatpickr/dist/themes/light.css";
import "react-toastify/dist/ReactToastify.css";
import "../assets/scss/app.scss";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const pages = import.meta.glob("./pages/**/*.jsx", { eager: true });
        let page = pages[`./pages/${name}.jsx`];
        page.default.layout = name.startsWith("dashboard/")
            ? undefined
            : (page) => <Layout children={page} />;
        return page;

        // resolvePageComponent(
        //     `./Pages/${name}.jsx`,
        // ),
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <Provider store={store}>
                <BrowserRouter>
                    <App {...props} />
                </BrowserRouter>
            </Provider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Card from "@/components/ui/Card";
import Flasher from "@/components/ui/Flasher";
import Layout from "@/layout/Layout";
import { Head, usePage } from "@inertiajs/react";

export default function Dashboard() {
    const { auth } = usePage().props;
    return (
        <Card title={"Dashboard"}>
            <Head title="Dashboard" />
            <div className="text-base">Hallo {auth?.user?.name}</div>
        </Card>
    );
}

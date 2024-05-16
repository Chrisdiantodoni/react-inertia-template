import Card from "@/components/ui/Card";
import DatePicker from "@/components/ui/DatePicker";
import FormGroup from "@/components/ui/FormGroup";
import Textarea from "@/components/ui/Textarea";
import Textinput from "@/components/ui/Textinput";
import { Head, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { parseNumber } from "@/utils/NumberFormatter";
import Fileinput from "@/components/ui/Fileinput";
import Select from "@/components/ui/Select";
import ReactSelect from "@/pages/forms/select/ReactSelect";
import SelectDealer from "@/components/ui/Master/SelectDealer";

const AddDeposit = () => {
    const {
        control,
        register,
        setValue,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            date_published: new Date(),
            full_name: "",
            cash_nominal: "0",
            transfer_nominal: "0",
            expenditure: "0",
            total_deposit: "0",
            notes: "",
        },
    });

    const [dealerUser, setDealerUser] = useState([]);

    const { auth } = usePage().props;
    useEffect(() => {
        setValue("full_name", auth?.user?.name);
        setValue("roles", auth?.user?.roles[0]?.name);
        setDealerUser(auth?.user?.dealer_users);
    }, [auth]);

    const [depositImages, setDepositImages] = useState([]);

    const handleUploadDepositImages = (e) => {
        const files = e.target.files;
        const filesArray = Array.from(files).map((file) => file);
        setDepositImages(filesArray);
    };

    useEffect(() => {
        totalDeposit();
    }, [watch("cash_nominal"), watch("expenditure")]);

    console.log(auth);

    const totalDeposit = () => {
        const cashValue = watch("cash_nominal") || "0";
        const expenditureValue = watch("expenditure") || "0";
        // Calculate total deposit by adding cash and transfer values and subtracting expenditure
        const total_deposit =
            parseNumber(cashValue) - parseNumber(expenditureValue);
        setValue("total_deposit", total_deposit);
        return total_deposit; // Return rounded to 2 decimal places
    };

    return (
        <Card title={"Counter Service Deposit"}>
            <Head title="Add Deposit" />
            <div className="grid grid-cols-12 gap-10">
                <div className="col-span-12 lg:col-span-4 space-y-2">
                    <Controller
                        name="date_published"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <DatePicker
                                onChange={onChange}
                                value={value}
                                label={"Pilih Tanggal"}
                            />
                        )}
                    />
                </div>
                <div className="col-span-12 lg:col-span-4 space-y-2">
                    <Textinput
                        register={register}
                        name="full_name"
                        placeholder="Full Name"
                        disabled
                        label={"Nama Lengkap"}
                    />
                </div>
                <div className="col-span-12 lg:col-span-4 space-y-2">
                    <Textinput
                        register={register}
                        name="roles"
                        placeholder="Full Name"
                        disabled
                        label={"Bagian"}
                    />
                </div>
                <div className="col-span-12 lg:col-span-4 space-y-2">
                    <Textinput
                        isMask={true}
                        control={control}
                        register={register}
                        name="cash_nominal"
                        placeholder="0,00"
                        options={{
                            numeral: true,
                            numeralThousandsGroupStyle: "thousand",
                        }}
                        label={"Jumlah Setoran (Tunai)"}
                    />
                </div>
                <div className="col-span-12 lg:col-span-4 space-y-2">
                    <Textinput
                        isMask={true}
                        control={control}
                        register={register}
                        name="transfer_nominal"
                        placeholder="0,00"
                        options={{ numeral: true }}
                        label={"Jumlah Setoran (Transfer)"}
                    />
                </div>

                <div className="col-span-12 lg:col-span-4 space-y-2">
                    <Textinput
                        register={register}
                        name="expenditure"
                        placeholder="0,00"
                        isMask={true}
                        control={control}
                        options={{ numeral: true }}
                        label={"Nominal Pengeluaran"}
                    />
                </div>
                <div className="col-span-12 lg:col-span-4 space-y-2">
                    <Textinput
                        register={register}
                        name="total_deposit"
                        value={totalDeposit()}
                        placeholder="0,00"
                        control={control}
                        isMask={true}
                        options={{ numeral: true }}
                        disabled={true}
                        label={"Total Disetor"}
                    />
                </div>

                <div className="col-span-12 lg:col-span-4 space-y-2">
                    {dealerUser?.length === 1 ? (
                        <Textinput
                            register={register}
                            name="roles"
                            placeholder="Full Name"
                            disabled
                            label={"Dealer"}
                        />
                    ) : (
                        <Controller
                            name="dealer_code"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <SelectDealer
                                    label={"Pilih Dealer"}
                                    options={dealerUser.map((item) => ({
                                        label: item?.dealers?.dealer_name,
                                        value: item,
                                    }))}
                                    onChange={onChange}
                                    value={value}
                                />
                            )}
                        />
                    )}
                </div>
                <div className="col-span-12">
                    <Fileinput
                        label="Upload Bukti Setoran (optional)"
                        preview={true}
                        name={"bukti_setoran"}
                        multiple={true}
                        selectedFiles={depositImages}
                        onChange={handleUploadDepositImages}
                        accept=".pdf,.jpg,.jpeg,.png"
                    />
                </div>
                <div className="col-span-12 space-y-2">
                    <Textarea
                        cols={3}
                        register={register}
                        name={"notes"}
                        label={"Keterangan"}
                        className="min-h-20"
                    />
                </div>
            </div>
        </Card>
    );
};

export default AddDeposit;

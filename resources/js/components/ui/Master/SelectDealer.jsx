import Select from "react-select";

const styles = {
    option: (provided, state) => ({
        ...provided,
        fontSize: "14px",
    }),
    input: (base) => ({
        ...base,
        "input:focus": {
            boxShadow: "none",
        },
    }),
};
export default function SelectDealer({ value, onChange, options, label }) {
    return (
        <div className="w-full">
            {label && <label className="form-label">{label}</label>}
            <Select
                className="react-select"
                classNamePrefix="select"
                isClearable={true}
                placeholder="Dealer"
                onChange={onChange}
                value={value}
                options={options}
                styles={styles}
            />
        </div>
    );
}

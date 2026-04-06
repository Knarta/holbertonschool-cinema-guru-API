import './general.css';

function SelectInput({ label, options = [], className = '', value, setValue }) {
    const handleSelect = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className={`input-group ${className}`.trim()}>
            {label ? <label className="input-label">{label}</label> : null}
            <div className="input-wrapper">
                <select value={value} onChange={handleSelect}>
                    {options.map((option) => {
                        if (typeof option === 'object' && option !== null) {
                            const optionValue = option.value ?? option.label ?? '';
                            const optionLabel = option.label ?? String(optionValue);
                            return (
                                <option key={optionValue} value={optionValue}>
                                    {optionLabel}
                                </option>
                            );
                        }

                        return (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
}

export default SelectInput;

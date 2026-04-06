import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './general.css';

function Input({
    label,
    type,
    className = '',
    value,
    setValue,
    icon = null,
    inputAttributes = {},
}) {
    const handleInput = (event) => {
        setValue(event.target.value);
    };

    return (
        <div className={`input-group input-component ${className}`.trim()}>
            {label ? <label className="input-label input-component-label">{label}</label> : null}
            <div className="input-wrapper input-component-wrapper">
                {icon ? <FontAwesomeIcon icon={icon} className="input-icon" /> : null}
                <input
                    className="input-component-field"
                    type={type}
                    value={value}
                    onChange={handleInput}
                    {...inputAttributes}
                />
            </div>
        </div>
    );
}

export default Input;

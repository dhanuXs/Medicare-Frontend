import { useState } from "react";

function Email(props) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div style={{ position: "relative" }}>
            {/* Floating Label */}
            <label
                htmlFor={props.id}
                style={{
                    position: "absolute",
                    left: "10px",
                    top: isFocused || props.value ? "-10px" : "50%",
                    transform: isFocused || props.value ? "translateY(0)" : "translateY(-50%)",
                    fontSize: isFocused || props.value ? "12px" : "16px",
                    color: isFocused ? "#007bff" : "#888",
                    transition: "all 0.3s ease",
                    backgroundColor: "white",
                    padding: "0 5px",
                }}
            >
                {props.name}
            </label>

            {/* Input Field with Black Border */}
            <input
                style={{
                    width: props.width,
                    padding: "10px",
                    border: isFocused ,
                    boxShadow: 'rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset',// Black border
                    borderRadius: "5px",
                    outline: "none",
                    fontSize: "16px",
                    transition: "border-color 0.3s ease",
                    marginTop: "1rem"
                }}
                type={props.type}
                placeholder={isFocused ? "" : props.placeHolder}
                id={props.id}
                onFocus={() => setIsFocused(true)}
                onBlur={(e) => setIsFocused(e.target.value !== "")}
            />
        </div>
    );
}

export default Email;

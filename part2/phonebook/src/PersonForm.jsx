import Input from "./Input";
import Button from "./Button";

const PersonForm = ({
    name,
    phone,
    onNameChange,
    onPhoneChange,
    onButtonClick,
}) => {
    return (
        <form>
            <Input label="name:" value={name} onChange={onNameChange} />
            <Input label="phone:" value={phone} onChange={onPhoneChange} />
            <Button text="add" onClick={onButtonClick} />
        </form>
    );
};

export default PersonForm;

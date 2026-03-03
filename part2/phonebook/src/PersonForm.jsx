import Input from "./Input";
import Button from "./Button";

const PersonForm = ({
    name,
    number,
    onNameChange,
    onNumberChange,
    onButtonClick,
}) => {
    return (
        <form>
            <Input label="name:" value={name} onChange={onNameChange} />
            <Input label="number:" value={number} onChange={onNumberChange} />
            <Button text="add" onClick={onButtonClick} />
        </form>
    );
};

export default PersonForm;

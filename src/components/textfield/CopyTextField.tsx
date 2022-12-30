import { Button, Input } from "antd";
import copy from "copy-to-clipboard";

interface CopyTextFieldProps {
  type?: "text" | "password";
  value: string;
}

export default function CopyTextfield(props: CopyTextFieldProps) {
  const { value, type = "text" } = props;

  const onClickCopy = () => {
    copy(value);
  };

  if (type === "password") {
    return (
      <Input.Group compact>
        <Input.Password value={value} style={{ width: "calc(100% - 66px)" }} />
        <Button onClick={onClickCopy}>Copy</Button>
      </Input.Group>
    );
  }
  return (
    <Input.Group compact>
      <Input value={value} style={{ width: "calc(100% - 66px)" }} />
      <Button onClick={onClickCopy}>Copy</Button>
    </Input.Group>
  );
}

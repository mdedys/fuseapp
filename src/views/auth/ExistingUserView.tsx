import { Input, Button, Typography } from "antd";
import Flex from "~/components/flex/Flex.js";
import TextLogo from "~/components/logo/TextLogo.js";
import ViewContainer from "./ViewContainer.js";

export default function ExistingUserView() {
  return (
    <ViewContainer>
      <TextLogo height={60} width={160} />
      <Flex alignItems="center" flexDirection="column" gap="1rem" style={{ width: "100%" }}>
        <Typography.Title level={3}>Unlock Your Account</Typography.Title>
        <Input type="primary" placeholder="Enter your Password  " />
        <Button block type="primary">
          Unlock
        </Button>
      </Flex>

      <Flex alignItems="center" flexDirection="column" gap="0.5rem" style={{ width: "100%" }}>
        <Typography.Title level={5}>Not your account?</Typography.Title>
        <Button block>Use Different Account</Button>
      </Flex>
    </ViewContainer>
  );
}

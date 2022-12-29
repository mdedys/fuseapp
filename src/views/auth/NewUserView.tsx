import { AutoComplete, Button, Input, Typography } from "antd";

import Flex from "~/components/flex/Flex.js";
import TextLogo from "~/components/logo/TextLogo.js";
import ViewContainer from "./ViewContainer.js";

export default function NewUserView() {
  return (
    <ViewContainer>
      <TextLogo height={60} width={160} />

      <Flex alignItems="center" flexDirection="column" gap="1rem" style={{ width: "100%" }}>
        <Typography.Title level={3}>Connect to your Account</Typography.Title>
        <Input type="primary" placeholder="Enter your Private Key" />
        <AutoComplete placeholder="Select your Relay" options={[]} style={{ width: "100%" }} />
        <Button block type="primary">
          Connect
        </Button>
      </Flex>

      <Flex alignItems="center" flexDirection="column" gap="0.5rem" style={{ width: "100%" }}>
        <Typography.Title level={5}>Don&apos;t have an account?</Typography.Title>
        <Button block>Generate Keys</Button>
      </Flex>
    </ViewContainer>
  );
}

import { Button, Input, Typography } from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import Flex from "~/components/flex/Flex.js";
import TextLogo from "~/components/logo/TextLogo.js";
import { useAuth } from "~/contexts/Auth.js";
import useInput from "~/hooks/useInput.js";
import { Paths } from "../../Router.js";
import ViewContainer from "./ViewContainer.js";

export default function UnlockAccount() {
  const navigate = useNavigate();

  const auth = useAuth();
  console.log(auth);

  const password = useInput();

  const onClickUnlock = () => {
    console.log("click");
    auth.api.unlock(password.value);
  };

  if (auth.isAuthenticated) {
    return <Navigate to={Paths.Home} />;
  }

  return (
    <ViewContainer>
      <TextLogo height={60} width={160} />
      <Flex alignItems="center" flexDirection="column" gap="1rem" style={{ width: "100%" }}>
        <Typography.Title level={3}>Unlock Your Account</Typography.Title>
        <Input.Password placeholder="Enter your Password" value={password.value} onChange={password.onChange} />
        <Button block type="primary" onClick={onClickUnlock}>
          Unlock
        </Button>
      </Flex>
      <Flex alignItems="center" flexDirection="column" gap="0.5rem" style={{ width: "100%" }}>
        <Typography.Title level={5}>Not your account?</Typography.Title>
        <Button
          block
          onClick={() => {
            navigate(Paths.SignUp);
          }}
        >
          Use Different Account
        </Button>
      </Flex>
    </ViewContainer>
  );
}

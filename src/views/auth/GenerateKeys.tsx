import { Button, Input, Typography } from "antd";
import { generatePrivateKey, getPublicKey } from "nostr-tools";
import { useState } from "react";
import { Navigate } from "react-router-dom";

import CopyTextfield from "~/components/textfield/CopyTextField.js";
import { useAuth } from "~/contexts/Auth.js";
import useInput from "~/hooks/useInput.js";
import { Paths } from "../../Router.js";

import ViewContainer from "./ViewContainer.js";

export default function GenerateKeys() {
  const auth = useAuth();

  const [privkey] = useState(generatePrivateKey());
  const [pubkey] = useState(getPublicKey(privkey));
  const password = useInput("");

  const onClickJoin = () => {
    auth.api.save(password.value, { pubkey, privkey });
  };

  if (auth.isAuthenticated) {
    return <Navigate to={Paths.Home} />;
  }

  return (
    <ViewContainer>
      <Typography.Text>Public Key</Typography.Text>
      <CopyTextfield value={pubkey} />
      <Typography.Text>Private Key</Typography.Text>
      <CopyTextfield type="password" value={pubkey} />

      <Typography>Enter Password</Typography>
      <Input.Password value={password.value} onChange={password.onChange} />

      <Button onClick={onClickJoin}>Join nostr</Button>
    </ViewContainer>
  );
}

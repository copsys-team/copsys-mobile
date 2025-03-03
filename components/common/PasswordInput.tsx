import { Input, InputProps } from "@rneui/themed";
import { useState } from "react";
import { KeyboardAvoidingView } from "react-native";

export function PasswordInput({ ...props }: InputProps) {
  const [secured, setSecured] = useState<boolean>(true);

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={200} behavior="padding">
      <Input
        secureTextEntry={secured}
        enterKeyHint="done"
        rightIcon={{
          name: secured ? "eye-slash" : "eye",
          type: "font-awesome",
          size: 24,
          onPress: () => setSecured(!secured),
        }}
        {...props}
      />
    </KeyboardAvoidingView>
  );
}

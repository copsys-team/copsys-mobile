import { Input, InputProps } from "@rneui/themed";

export function TextInput({ ...props }: InputProps) {
  return <Input enterKeyHint="done" {...props} inputMode="text" />;
}

import React, { useRef } from "react";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

export default function Login({ navigation }) {
  const passwordRef = useRef();

  const onNext = () => {
    passwordRef?.current?.focus();
  };

  return (
    <AuthLayout>
      <TextInput
        autoFocus
        placeholder="Username"
        returnKeyType="next"
        placeholderTextColor={"lightgray"}
        onSubmitEditing={onNext}
        blurOnSubmit={false}
      />
      <TextInput
        ref={passwordRef}
        placeholder="Password"
        secureTextEntry
        returnKeyType="done"
        lastOne={true}
        placeholderTextColor={"lightgray"}
      />
      <AuthButton text="Log In" disabled={true} onPress={() => null} />
    </AuthLayout>
  );
}

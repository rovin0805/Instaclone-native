import React, { useRef } from "react";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

export default function CreateAccount() {
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  const onDone = () => {};

  return (
    <AuthLayout>
      <TextInput
        autoFocus
        placeholder="First Name"
        placeholderTextColor="lightgray"
        returnKeyType="next"
        onSubmitEditing={() => onNext(lastNameRef)}
        blurOnSubmit={false}
      />
      <TextInput
        ref={lastNameRef}
        placeholder="Last Name"
        placeholderTextColor="lightgray"
        returnKeyType="next"
        onSubmitEditing={() => onNext(usernameRef)}
        blurOnSubmit={false}
      />
      <TextInput
        ref={usernameRef}
        placeholder="Username"
        placeholderTextColor="lightgray"
        returnKeyType="next"
        onSubmitEditing={() => onNext(emailRef)}
        blurOnSubmit={false}
      />
      <TextInput
        ref={emailRef}
        placeholder="Email"
        placeholderTextColor="lightgray"
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={() => onNext(passwordRef)}
        blurOnSubmit={false}
      />
      <TextInput
        ref={passwordRef}
        placeholder="Password"
        placeholderTextColor="lightgray"
        secureTextEntry
        returnKeyType="done"
        lastOne={true}
        onSubmitEditing={onDone}
      />
      <AuthButton text="Create Account" disabled={true} onPress={() => null} />
    </AuthLayout>
  );
}

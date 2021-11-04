import React, { useRef } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

export default function CreateAccount() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };

  const onValid = (data) => {};

  useEffect(() => {
    register("firstname", { required: true });
    register("lastname", { required: true });
    register("username", { required: true });
    register("email", { required: true });
    register("password", { required: true });
  }, [register]);

  return (
    <AuthLayout>
      <TextInput
        autoFocus
        placeholder="First Name"
        placeholderTextColor="lightgray"
        returnKeyType="next"
        onSubmitEditing={() => onNext(lastNameRef)}
        blurOnSubmit={false}
        autoCapitalize="none"
        onChangeText={(text) => setValue("firstname", text)}
      />
      <TextInput
        ref={lastNameRef}
        placeholder="Last Name"
        placeholderTextColor="lightgray"
        returnKeyType="next"
        onSubmitEditing={() => onNext(usernameRef)}
        blurOnSubmit={false}
        autoCapitalize="none"
        onChangeText={(text) => setValue("lastname", text)}
      />
      <TextInput
        ref={usernameRef}
        placeholder="Username"
        placeholderTextColor="lightgray"
        returnKeyType="next"
        onSubmitEditing={() => onNext(emailRef)}
        blurOnSubmit={false}
        autoCapitalize="none"
        onChangeText={(text) => setValue("username", text)}
      />
      <TextInput
        ref={emailRef}
        placeholder="Email"
        placeholderTextColor="lightgray"
        keyboardType="email-address"
        returnKeyType="next"
        onSubmitEditing={() => onNext(passwordRef)}
        blurOnSubmit={false}
        autoCapitalize="none"
        onChangeText={(text) => setValue("email", text)}
      />
      <TextInput
        ref={passwordRef}
        placeholder="Password"
        placeholderTextColor="lightgray"
        secureTextEntry
        returnKeyType="done"
        lastOne={true}
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text) => setValue("password", text)}
      />
      <AuthButton
        text="Create Account"
        disabled={false}
        loading
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}

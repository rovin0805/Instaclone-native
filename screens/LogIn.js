import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";

export default function Login({ navigation }) {
  const passwordRef = useRef();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onNext = () => passwordRef?.current?.focus();

  const onValid = (data) => {
    console.log("#", data);
  };

  useEffect(() => {
    register("username", { required: true });
    register("password", { required: true });
  }, [register]);

  return (
    <AuthLayout>
      <TextInput
        autoFocus
        placeholder="Username"
        returnKeyType="next"
        placeholderTextColor={"lightgray"}
        onSubmitEditing={onNext}
        blurOnSubmit={false}
        autoCapitalize="none"
        onChangeText={(text) => setValue("username", text)}
      />
      <TextInput
        ref={passwordRef}
        placeholder="Password"
        secureTextEntry
        returnKeyType="done"
        lastOne={true}
        placeholderTextColor={"lightgray"}
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text) => setValue("password", text)}
      />
      <AuthButton
        text="Log In"
        disabled={false}
        loading
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}

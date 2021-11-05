import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";
import { gql, useMutation } from "@apollo/client";
import FormError from "../components/auth/FormError";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

export default function Login({ navigation }) {
  const passwordRef = useRef();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    clearErrors,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onCompleted = (data) => {
    console.log("onCompleted", data);
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      isLoggedInVar(true);
    }
  };
  const [logInMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const onNext = () => passwordRef?.current?.focus();

  const clearLoginError = (name) => clearErrors(name);

  const onValid = (data) => {
    if (!loading) {
      console.log("onvalid", data);
      logInMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  useEffect(() => {
    register("username", {
      required: "Username is required",
      minLength: {
        value: 3,
        message: "Username should be longer than 3 chars.",
      },
    });
    register("password", { required: "Password is required." });
  }, [register]);

  return (
    <AuthLayout>
      <FormError message={errors?.username?.message} />
      <TextInput
        autoFocus
        placeholder="Username"
        returnKeyType="next"
        placeholderTextColor={"lightgray"}
        onSubmitEditing={onNext}
        blurOnSubmit={false}
        autoCapitalize="none"
        onChangeText={(text) => setValue("username", text)}
        onFocus={() => clearLoginError("username")}
      />
      <FormError message={errors?.password?.message} />
      <TextInput
        ref={passwordRef}
        placeholder="Password"
        secureTextEntry
        returnKeyType="done"
        lastOne={true}
        placeholderTextColor={"lightgray"}
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text) => setValue("password", text)}
        onFocus={() => clearLoginError("password")}
      />
      <AuthButton
        text="Log In"
        disabled={!watch("username") || !watch("password")}
        loading={loading}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}

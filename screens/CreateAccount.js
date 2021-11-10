import React, { useRef } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInput } from "../components/auth/AuthShared";
import { gql, useMutation } from "@apollo/client";
import FormError from "../components/auth/FormError";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

export default function CreateAccount({ navigation }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
    clearErrors,
    watch,
  } = useForm();

  const onCompleted = (data) => {
    const {
      CreateAccount: { ok },
    } = data;
    if (ok) {
      const { username, password } = getValues();
      navigation.navigate("LogIn", {
        username,
        password,
      });
    }
  };

  const [createAccountMutation, { loading }] = useMutation(
    CREATE_ACCOUNT_MUTATION,
    { onCompleted }
  );

  const lastNameRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const onNext = (nextOne) => nextOne?.current?.focus();

  const onValid = (data) => {
    if (!loading) {
      createAccountMutation({
        variables: { ...data },
      });
    }
  };

  const clearCreateError = (name) => clearErrors(name);

  useEffect(() => {
    register("firstName", { required: "First name is required." });
    register("lastName", { required: "Last name is required." });
    register("username", {
      required: "Username is required.",
      minLength: {
        value: 3,
        message: "Username should be longer than 3 chars.",
      },
    });
    register("email", {
      required: "Email is required.",
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    });
    register("password", { required: "Password is required." });
  }, [register]);

  return (
    <AuthLayout>
      <FormError message={errors?.firstName?.message} />
      <TextInput
        autoFocus
        placeholder="First Name"
        placeholderTextColor="lightgray"
        returnKeyType="next"
        onSubmitEditing={() => onNext(lastNameRef)}
        blurOnSubmit={false}
        autoCapitalize="none"
        onChangeText={(text) => setValue("firstName", text)}
        onFocus={() => clearCreateError("firstname")}
      />
      <FormError message={errors?.lastName?.message} />
      <TextInput
        ref={lastNameRef}
        placeholder="Last Name"
        placeholderTextColor="lightgray"
        returnKeyType="next"
        onSubmitEditing={() => onNext(usernameRef)}
        blurOnSubmit={false}
        autoCapitalize="none"
        onChangeText={(text) => setValue("lastName", text)}
        onFocus={() => clearCreateError("lastname")}
      />
      <FormError message={errors?.username?.message} />
      <TextInput
        ref={usernameRef}
        placeholder="Username"
        placeholderTextColor="lightgray"
        returnKeyType="next"
        onSubmitEditing={() => onNext(emailRef)}
        blurOnSubmit={false}
        autoCapitalize="none"
        onChangeText={(text) => setValue("username", text)}
        onFocus={() => clearCreateError("username")}
      />
      <FormError message={errors?.email?.message} />
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
        onFocus={() => clearCreateError("email")}
      />
      <FormError message={errors?.password?.message} />
      <TextInput
        ref={passwordRef}
        placeholder="Password"
        placeholderTextColor="lightgray"
        secureTextEntry
        returnKeyType="done"
        lastOne={true}
        onSubmitEditing={handleSubmit(onValid)}
        onChangeText={(text) => setValue("password", text)}
        onFocus={() => clearCreateError("password")}
      />
      <AuthButton
        text="Create Account"
        disabled={
          loading ||
          !watch("firstName") ||
          !watch("lastName") ||
          !watch("username") ||
          !watch("email") ||
          !watch("password")
        }
        loading={loading}
        onPress={handleSubmit(onValid)}
      />
    </AuthLayout>
  );
}

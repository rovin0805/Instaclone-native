import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { colors } from "../styles";
import AuthLayout from "../components/auth/AuthLayout";
import AuthButton from "../components/auth/AuthButton";

const LoginLink = styled.Text`
  color: ${colors.blue};
  font-weight: bold;
  font-size: 16px;
  margin-top: 20px;
  text-align: center;
`;

export default function Welcome({ navigation }) {
  const goToWhere = (where) => navigation.navigate(where);
  return (
    <AuthLayout>
      <AuthButton
        text="Crate New Account"
        disabled={false}
        onPress={() => goToWhere("CreateAccount")}
      />
      <TouchableOpacity onPress={() => goToWhere("LogIn")}>
        <LoginLink>Log In</LoginLink>
      </TouchableOpacity>
    </AuthLayout>
  );
}

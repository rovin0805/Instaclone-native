import React from "react";
import styled from "styled-components/native";
import { colors } from "../styles";

const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.backgroundColor};
  align-items: center;
  justify-content: center;
`;

const Logo = styled.Image`
  width: 100%;
  height: 200px;
`;

const CreateAccount = styled.TouchableOpacity`
  background-color: ${colors.blue};
  padding: 7px 10px;
  border-radius: 3px;
`;

const CreateAccountText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`;

const LoginLinkTouch = styled.TouchableOpacity``;

const LoginLink = styled.Text`
  color: ${colors.blue};
  font-weight: bold;
  font-size: 16px;
  margin-top: 15px;
`;

export default function Welcome({ navigation }) {
  const goToWhere = (where) => navigation.navigate(where);
  return (
    <Container>
      <Logo source={require("../assets/logo.png")} resizeMode="contain" />
      <CreateAccount onPress={() => goToWhere("CreateAccount")}>
        <CreateAccountText>Create Account</CreateAccountText>
      </CreateAccount>
      <LoginLinkTouch onPress={() => goToWhere("LogIn")}>
        <LoginLink>Log In</LoginLink>
      </LoginLinkTouch>
    </Container>
  );
}

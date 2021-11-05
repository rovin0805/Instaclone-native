import React from "react";
import styled from "styled-components/native";

const SFormError = styled.Text`
  color: tomato;
  font-weight: 600;
  font-size: 12px;
  margin: 5px 0;
`;

function FormError({ message }) {
  return message === "" || !message ? null : <SFormError>{message}</SFormError>;
}

export default FormError;

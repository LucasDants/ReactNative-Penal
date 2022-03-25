import React from "react";
import { Feather, FontAwesome } from '@expo/vector-icons'
import { Container, Content, TextGroup, Title, Value } from "./styles";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from "styled-components/native";
import { TouchableOpacityProps } from "react-native";

export type CrimeData = {
  id: string;
  crime: string;
  time: number;
  fine: number;
  bailment: number | null
  quantity: number;
  total: number;
  color: string
}

type CrimeProps = TouchableOpacityProps & {
  data: CrimeData
  backgroundColor: string
}

export function Crime({ data, backgroundColor, ...rest }: CrimeProps) {
  const { COLORS } = useTheme()

  return (
    <Container backgroundColor={backgroundColor} activeOpacity={0.8} {...rest}>
        <Title>{data.crime}</Title>
        <Content>
          <TextGroup>
            <Feather name="calendar" color={COLORS.TITLE} size={RFValue(14)} />
            <Value>{data.time} meses</Value>
          </TextGroup>
          <TextGroup>
            <FontAwesome name="money" color={COLORS.TITLE} size={RFValue(14)} />
            <Value>$ {data.fine}</Value>
          </TextGroup>
          <TextGroup>
            <Feather name="unlock" color={COLORS.TITLE} size={RFValue(14)} />
            <Value>{data.bailment === null ? 'Sem fiança' : `$ ${data.bailment}`}</Value>
          </TextGroup>
          <TextGroup>
            <Value>{data.total * data.quantity}x</Value>
          </TextGroup>
        </Content>
    </Container>
  );
}

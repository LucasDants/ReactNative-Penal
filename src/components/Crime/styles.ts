import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native'

type ContainerProps = {
    backgroundColor: string
}

export const Container = styled.TouchableOpacity<ContainerProps>`
    width: 100%;
    background-color: ${({ backgroundColor, theme }) => theme.COLORS[backgroundColor] };
    padding: 12px 24px;
`;

export const Title = styled.Text`
    ${({ theme }) => css`
        color: ${theme.COLORS.TITLE};
        font-family: ${theme.FONTS.TITLE};
        font-size: ${RFValue(16)}px;
    `}
`

export const Content = styled.View`
    flex-direction: row;
    padding-top: 5px;
    margin-left: -20px;
`

export const TextGroup = styled.View`
    flex-direction: row;
    align-items: center;
    padding-left: 20px;
`

export const Value = styled.Text`
    padding-left: 5px;

    ${({ theme }) => css`
        color: ${theme.COLORS.TITLE};
        font-family: ${theme.FONTS.TEXT};
        font-size: ${RFValue(12)}px;
    `}
`

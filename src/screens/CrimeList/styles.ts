import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native'

type ButtonProps = {
    backgroundColor: string
}

export const Container = styled.View`
    flex: 1;
`;

export const Header = styled.View`
    width: 100%;
    background-color: ${({theme}) => theme.COLORS.PRIMARY};
    padding: ${getStatusBarHeight() + 12}px 24px 16px;
    align-items: center;
    justify-content: center;
`

export const Title = styled.Text`
    ${({ theme }) => css`
        color: ${theme.COLORS.TITLE};
        font-family: ${theme.FONTS.TITLE};
        font-size: ${RFValue(26)}px;
    `}
`

export const Footer = styled.View`
    background-color: ${({theme}) => theme.COLORS.PRIMARY};
    padding: ${getBottomSpace() + 12}px 24px;
    flex-direction: row;
    justify-content: space-between;
    
`

export const Aside = styled.View`
    width: 48%;
`

export const TextGroup = styled.View`
    flex-direction: row;
    align-items: center;
`
export const Buttons = styled.View`
    width: 48%;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`

export const Value = styled.Text`
    padding-left: 10px;

    ${({ theme }) => css`
        color: ${theme.COLORS.TITLE};
        font-family: ${theme.FONTS.TEXT};
        font-size: ${RFValue(16)}px;
    `}
`
export const Button = styled.TouchableOpacity.attrs({ activityOpacity: 0.8})<ButtonProps>`
    background-color: ${({ backgroundColor }) => backgroundColor};
    padding: 5px;
    border-radius: 5px;
`
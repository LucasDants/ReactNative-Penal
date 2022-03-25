import React, { useState } from "react";

import {
    Container,
    Header,
    Title,
    Footer,
    Aside,
    TextGroup,
    Value,
    Buttons,
    Button,
} from "./styles";

import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { RFValue } from "react-native-responsive-fontsize";
import { Alert, FlatList } from "react-native";
import { Crime as CrimeComponent, CrimeData } from "../../components/Crime";
import { ItemSeparator } from "../../components/ItemSeparator";
import crimesJSON from "../../services/penalcode.json";

type Bailment = 'Sem fiança' | number

type Total = {
    fine: number;
    bailment: Bailment
    time: number
}

const initialTotal = {
    fine: 0,
    bailment: 0,
    time: 0
}

function newBailment(prevBail: Bailment, nextBail: Bailment): Bailment {
    if (prevBail === 'Sem fiança' || nextBail === 'Sem fiança' || nextBail === null) {
        return 'Sem fiança'
    }
    return prevBail + nextBail
}

export function CrimeList() {
    const { COLORS } = useTheme();

    const [crimes, setCrimes] = useState<CrimeData[]>(crimesJSON);
    const [total, setTotal] = useState(initialTotal as Total)

    function handleIncrementCrimeTotal(crimeID: string) {
        const crime = crimes.find(item => item.id === crimeID)
        let crimeAlreadyAdded = false;
        const newCrimes = crimes.map((crime) => {
            if (crimeID !== crime.id) {
                return crime;
            }
            if(crime.total > 0) {
                crimeAlreadyAdded = true
            }
            return {
                ...crime,
                total: crime.total + 1,
            };
        });

        const newTotal = {
            fine: total.fine + crime.fine,
            bailment: crimeAlreadyAdded ? total.bailment : newBailment(total.bailment, crime.bailment),
            time: crimeAlreadyAdded ? total.time : total.time + crime.time
        }
        setTotal(newTotal)
        setCrimes(newCrimes);
    }

    function handleClear() {
        setTotal(initialTotal)
        setCrimes([...crimesJSON]);
    }

    function discountTotalFine() {
        const newTotal = {
            ...total,
            time: Math.floor((total.time * 70) / 100)
        }

        setTotal(newTotal)
    }

    function handleDiscountTotalFine() {
        Alert.alert(
            'Descontar 30% da multa e da pena',
            "Só deve-se aplicar ao selecionar todas as infrações.",
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Confirmar',
                    onPress: discountTotalFine
                }
            ]
        )
    }

    return (
        <Container>
            <Header>
                <Title>Código Penal</Title>
            </Header>
            <FlatList
                data={crimes}
                renderItem={({ item }) => (
                    <CrimeComponent
                        data={item}
                        backgroundColor={item.color}
                        onPress={() => handleIncrementCrimeTotal(item.id)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingTop: 4,
                    paddingBottom: 65,
                }}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={() => <ItemSeparator />}
            />
            <Footer>
                <Aside>
                    <TextGroup>
                        <Feather name="calendar" color={COLORS.TITLE} size={RFValue(18)} />
                        <Value>{total.time} meses</Value>
                    </TextGroup>
                    <TextGroup>
                        <FontAwesome name="money" color={COLORS.TITLE} size={RFValue(18)} />
                        <Value>$ {total.fine}</Value>
                    </TextGroup>
                    <TextGroup>
                        <Feather name="unlock" color={COLORS.TITLE} size={RFValue(18)} />
                        <Value>$ {total.bailment}</Value>
                    </TextGroup>
                </Aside>
                <Buttons>
                    <Button backgroundColor="blue" onPress={handleDiscountTotalFine}>
                        <Feather name="percent" color={COLORS.TITLE} size={RFValue(28)} />
                    </Button>
                    <Button backgroundColor="red" onPress={handleClear}>
                        <MaterialIcons
                            name="clear"
                            color={COLORS.TITLE}
                            size={RFValue(28)}
                        />
                    </Button>
                </Buttons>
            </Footer>
        </Container>
    );
}

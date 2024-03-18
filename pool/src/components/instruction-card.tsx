import React from 'react';
import styled from 'styled-components';

// Define the styled components
const CardContainer = styled.div`
    background: transparent;
    padding: 16px;
`;

const Title = styled.h2`
    font-size: 24px;
    margin-bottom: 8px;
`;

const Description = styled.p`
    font-size: 16px;
    color: #555555;
`;

// Define the InstructionCard component
const InstructionCard: React.FC = () => {
    return (
        <CardContainer>
            <Title>Инструкция</Title>
            <Description>
                <ul>
                    <li>Нажать мышкой внутри поля чтобы появилась бита.</li>
                    <li>Бита двигается вместе с курсором мыши.</li>
                    <li>Бита исчезает когда отпускается кнопка мыши.</li>
                    <li>Щёлкнуть по шару чтобы открыть меню выбора цвета.</li>
                    <li>Выбрать цвет или нажать крестик чтобы закрыть меню.</li>
                </ul>
            </Description>
        </CardContainer>
    );
};

export default InstructionCard;
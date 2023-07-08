import styled from 'styled-components';

/* 그림 선택 스타일 */
export const ChoiceContainer = styled.div`
    position: absolute;  
    width: 600px;
    height: 750px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 90;

`

export const Choicetitle =styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 500px;
    height: 80px;
    font-size: 40px;
    font-family:KyoboHand;
    font-weight: bolder;
`

export const Choice = styled.div`
    width: 500px;   
    height: 520px;
    background:white;
    display:flex;
    flex-wrap: wrap;
    border-radius: 10px;
    border: 2px dotted grey;
    overflow: auto;
`

export const ChoiceGrim = styled.img`
    width: 95px;
    height: 95px;
    object-fit:cover;
    margin: 2rem;
`
export const Choicebutton = styled.button`
    width: 90px;
    height: 35px;
    background-color: transparent;
    color: black;
    border: 2px solid black;
    border-radius: 20px;
    text-align: center;
    font-size: 17px;
    margin-left: 1.5%;
    transition: box-shadow 250ms ease-in-out, color 200ms ease-in-out;
    font-family:KyoboHand;
    font-weight: bolder;
    &:hover{
        box-shadow: 0 0 40px 40px #404040 inset;
        color: white;
        border:none;
    }
`
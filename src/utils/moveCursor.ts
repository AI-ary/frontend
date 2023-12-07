import { SetStateAction } from "react";

interface moveCursorProps {
    cursor: number;
    cursorLocation: number;
    word: string;
    setCursor: React.Dispatch<SetStateAction<number>>;
}

const moveCursor = (e: React.KeyboardEvent, props: moveCursorProps) => {
    console.log(e)
    if (e.code === 'ArrowUp') {
        // 화살표 위를 누를 시 10칸 올라가기 때문에 -10을 한다.
        // 만약 업데이트 전 값이 10보다 작다면 0으로 위치시킨다.
        props.setCursor((prev : number) => prev - 10 < 0 ? 0 : prev - 10);

        // textarea의 cursor 위치 또한 조정
        if (props.cursor - 10 >= 0) {
          props.cursorLocation = props.cursor - 10;
        }
    } else if (e.code === 'ArrowDown') {
        // 화살표 아래를 누를 시 10칸 올라가기 때문에 +10을 한다.
        // 만약 업데이트 전 값이 현재 글의 길이보다 크다면 맨 뒤로 위치시킨다.
        props.setCursor((prev : number) => prev + 10 > props.word.length ? props.word.length : prev + 10);  

        // textarea의 cursor 위치 또한 조정
        if (props.cursor + 10 < props.word.length) {
            props.cursorLocation = props.cursor + 10;
        }
    } else if (e.code === 'ArrowRight') {
        // 화살표 오른쪽을 누를 시 1칸 옮기기 때문에 +1을 한다.
        // 만약 업데이트 전 값이 현재 글의 길이보다 크다면 맨 뒤로 위치시킨다.
        props.setCursor((prev : number) => prev + 1 > props.word.length ? props.word.length : prev + 1);

        // textarea의 cursor 위치 또한 조정
        if (props.cursor + 1 <= props.word.length) {
            props.cursorLocation = props.cursor + 1;
        }
    } else if (e.code === 'ArrowLeft') {
        // 화살표 왼쪽을 누를 시 1칸 옮기기 때문에 -1을 한다.
        // 만약 업데이트 전 값이 0보다 작다면 0으로 위치시킨다.
        props.setCursor((prev : number) => prev - 1 < 0 ? 0 : prev - 1);

        // textarea의 cursor 위치 또한 조정
        if (props.cursor - 1 >= 0) {
            props.cursorLocation = props.cursor - 1;
        }
    } else {
        // 그 외에 글을 입력할 때 cursor 위치 최신화
        props.setCursor(props.cursorLocation);
    }
}

export default moveCursor
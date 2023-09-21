import {create} from 'zustand';

interface StoreState{
  currentCanvas: string;
  updateCanvas:string;
  getGrimList: any[string];
  getDalleList: string[];
  choiceImg:{ id: any; img: string; x: number; y: number; width: any; height: any;  }[];
  choiceDalleImg: string;
  choiceDate: Date;
  nicknameError: boolean;
  confirm: boolean;
  duplicateNickname : boolean
  duplicateEmail : boolean
  success : boolean
}

interface StoreActions{
  setCurrentCanvas:(updateCanvas:string)=>void;
  setUpdateCanvas:(canvas:string)=>void;
  setGetGrimList:(data:any[string])=>void;
  setGetDalleList:(data:string[])=>void;
  setChoiceImg:(img: { id: any; img: string; x: number; y: number; width: any; height: any; }[])=>void;
  setChoiceDalleImg: (img: string) => void;
  setChoicedDate: (date: Date) => void;
  setNicknameError: (state: boolean) => void;
  setConfirm: (state: boolean) => void;
  setDuplicateNickname: (state: boolean) => void;
  setDuplicateEmail: (state: boolean) => void;
  setSuccess: (state: boolean) => void;
}

// set 함수를 통해서만 상태를 변경할 수 있다
export const useStore = create<StoreState & StoreActions>((set)=>({
  currentCanvas: '',  //캔버스를 그림선택기능에서 사용하기 위해
  updateCanvas:'',  //현재 캔버스 위에 있는 내용을 이미지화하기 위해
  getGrimList:[], //AI가 추출한 키워드에 해당하는 이미지들 가져오기
  getDalleList: [], //Dalle가 추출한 이미지 가져오기
  choiceImg:[], //캔버스에 이미지 추가
  choiceDalleImg: '',
  choiceDate: new Date(), //날짜 선택
  confirm: false,
  duplicateNickname: false,
  duplicateEmail: false,
  success: false,
  nicknameError:false,
  setCurrentCanvas: (updateCanvas:string)=>set({currentCanvas:updateCanvas}),
  setUpdateCanvas:(canvas:string)=>set({updateCanvas:canvas}),
  setGetGrimList:(data:any[string])=>set({getGrimList:data}),
  setGetDalleList:(data:string[])=>set({getDalleList:data}),
  setChoiceImg:(img: { id: any; img: string; x: number; y: number; width: any; height: any; }[])=>{
    set((state:StoreState&StoreActions)=>({...state,choiceImg:img}));
  },
  setChoiceDalleImg: (img: string) => set({choiceDalleImg: img}),
  setChoicedDate: (date: Date) => set({ choiceDate: date }),
  setNicknameError: (state: boolean) => set({ nicknameError: state }),
  setConfirm: (state: boolean) => set({ confirm: state }),
  setDuplicateNickname :(state: boolean) => set({ duplicateNickname: state }),
  setDuplicateEmail :(state: boolean) => set({ duplicateEmail: state }),
  setSuccess :(state: boolean) => set({ success: state }),
}));
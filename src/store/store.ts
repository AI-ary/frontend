import {create} from 'zustand';

interface StoreState{
  currentCanvas: string;
  updateCanvas:string;
  getGrimList: any[string];
  getDalleList: string[];
  choiceImg:{ id: any; img: string; x: number; y: number; width: any; height: any;  }[];
  choiceDalleImg: string;
  choiceDate: Date;
  confirmLogout: boolean;
  duplicateNickname : boolean
  duplicateEmail : boolean
  success: boolean
  confirm: boolean
  confirmWeather : boolean
  confirmTitle : boolean
  confirmContents : boolean
  limitWordLength : boolean
  confirmDelete: boolean
  bringGrimWarning: boolean
  bringMoreDalleWarning: boolean
  loading: boolean;
}

interface StoreActions{
  setCurrentCanvas:(updateCanvas:string)=>void;
  setUpdateCanvas:(canvas:string)=>void;
  setGetGrimList:(data:any[string])=>void;
  setGetDalleList:(data:string[])=>void;
  setChoiceImg:(img: { id: any; img: string; x: number; y: number; width: any; height: any; }[])=>void;
  setChoiceDalleImg: (img: string) => void;
  setChoicedDate: (date: Date) => void;
  setConfirm: (state: boolean) => void;
  setConfirmLogout: (state: boolean) => void;
  setDuplicateNickname: (state: boolean) => void;
  setDuplicateEmail: (state: boolean) => void;
  setSuccess: (state: boolean) => void;
  setConfirmWeather: (state: boolean) => void;
  setConfirmTitle: (state: boolean) => void;
  setConfirmContents: (state: boolean) => void;
  setLimitWordLength: (state: boolean) => void;
  setConfirmDelete: (state: boolean) => void;
  setBringGrimWarning: (state: boolean) => void;
  setBringMoreDalleWarning: (state: boolean) => void;
  setLoading: (state: boolean) => void;
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
  confirmLogout: false,  // 확인 알림창
  duplicateNickname: false, // 중복 닉네임 알림창
  duplicateEmail: false,  // 중복 이메일 알림창
  success: false, // api 요청 성공 시 알림창
  confirm: false, // 아이디 비밀번호 틀릴 시 알림창
  confirmWeather: false, // 일기장 날씨 미입력 시 알림창
  confirmTitle: false, // 일기장 제목 미입력 시 알림창
  confirmContents: false, // 일기장 내용 미입력 시 알림창
  limitWordLength:false, // 50글자 이상 입력 시 알림창
  confirmDelete: false, // 일기 삭제 클릭 시 알림창
  bringGrimWarning: false, // dall-e/konlpy 그림 가져오기 버튼 클릭 시 알림창
  bringMoreDalleWarning: false, // dall-e 4개 이상 가져오기 버튼 클릭 시 알림창
  loading: false, // 로딩창
  setCurrentCanvas: (updateCanvas:string)=>set({currentCanvas:updateCanvas}),
  setUpdateCanvas:(canvas:string)=>set({updateCanvas:canvas}),
  setGetGrimList:(data:any[string])=>set({getGrimList:data}),
  setGetDalleList: (data: string[]) => set((state: StoreState & StoreActions) => ({ ...state, getDalleList: data })),
  setChoiceImg:(img: { id: any; img: string; x: number; y: number; width: any; height: any; }[])=>{
    set((state:StoreState&StoreActions)=>({...state,choiceImg:img}));
  },
  setChoiceDalleImg: (img: string) => set({choiceDalleImg: img}),
  setChoicedDate: (date: Date) => set({ choiceDate: date }),
  setConfirm: (state: boolean) => set({ confirm: state }),
  setConfirmLogout: (state: boolean) => set({ confirmLogout: state }),
  setDuplicateNickname :(state: boolean) => set({ duplicateNickname: state }),
  setDuplicateEmail :(state: boolean) => set({ duplicateEmail: state }),
  setSuccess :(state: boolean) => set({ success: state }),
  setConfirmWeather :(state: boolean) => set({ confirmWeather: state }),
  setConfirmTitle :(state: boolean) => set({ confirmTitle: state }),
  setConfirmContents :(state: boolean) => set({ confirmContents: state }),
  setLimitWordLength :(state: boolean) => set({ limitWordLength: state }),
  setConfirmDelete :(state: boolean) => set({ confirmDelete: state }),
  setBringGrimWarning :(state: boolean) => set({ bringGrimWarning: state }),
  setBringMoreDalleWarning: (state: boolean) => set({bringMoreDalleWarning: state}),
  setLoading :(state: boolean) => set({ loading: state }),
}));
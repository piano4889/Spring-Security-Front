import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const userState = atom({
	key:"account",
	default: {
		isLogin : false,
		name:null,
		isSocial:null,
		email:null,
	},
	effects_UNSTABLE: [persistAtom],
});


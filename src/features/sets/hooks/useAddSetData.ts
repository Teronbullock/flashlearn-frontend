import { useContext, useReducer } from "react";
import apiRequest from "../../../lib/api";
import { AuthContext } from "../../../context/AuthContext";



const SetReducer = (state, action) => {
  switch (action.type) {
    case 'ON_CHANGE':
    case 'SUBMIT':
      return {...state, ...action.payload}
    default:
      return state;
  }
}

const useAddSetData = () => {
  const { userId } = useContext(AuthContext);

  const [state, dispatch] = useReducer(SetReducer, {
    payload: {
      inputOneValue: '',
      inputTwoValue: '',
    }
  });

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await apiRequest({
        method: 'post',
        url: `/api/set/user/${userId}/add`,
        data: {
          title: state.inputOneValue,
          description: state.inputTwoValue,
          user_id: userId,
        },
        src: 'SetDataFetch - onSubmit'
      });
      if (res.data) {
        const { msg } = res.data;
        alert(msg);
        dispatch({ type: 'SUBMIT', payload: { inputOneValue: '', inputTwoValue: '' } });
        console.log('Set data fetch');
      }
      
    } catch (error) {
      console.error(`Set data fetch error (${error.response.data.msg})`, error);
    }

  }

  return{state, submitHandler, dispatch };
}

export default useAddSetData;
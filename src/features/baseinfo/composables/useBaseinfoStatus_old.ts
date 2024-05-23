import { axiosInstance } from '@/lib/axios';
import { ref } from 'vue';

interface BaseinfoStatus {
  baseinfo_lists: {
    grpId: string;
    cd: string;
    name : string;
    ref1 : string;
    ref2 : string;
    defineName : string;
    regEmpNo : string;
    regEmpName : string;
    regDate : string;
  };
}


export default function useBaseinfoStatus() {
  const errorMessage = ref('');
  const isLoading = ref(false);
  const baseinfoStatus = ref<BaseinfoStatus[]>([]);


  const abortControllerRef = ref<AbortController | null>(null);

  // AbortController 인스턴스를 초기화합니다.
  const initializeAbortController = () => {
    abortControllerRef.value = new AbortController();
  };

  const getBaseinfoStatus = async () => {
    if (!abortControllerRef.value) {
      // AbortController가 없으면 초기화합니다.
      initializeAbortController();
    } else {
      // AbortController가 이미 있으면 이전 요청을 취소합니다.
      abortControllerRef.value.abort();
      // 새로운 AbortController 인스턴스를 생성합니다.
      initializeAbortController();
    }

    isLoading.value = true;

    try {
        
      /*const reqJson = {
        inDs: {
          grpId: 'Z601',
          cd: '0341'
        }
      };
         */
      const reqJson = {
        inDs: {
          grpId: '',
          cd: ''
        }
      };  
      const response = await axiosInstance.post(
        '/mvp/baseinfo/findcsyscd',reqJson,
        {
          params: {
            svcName: 'baseinfo',
            fnName: '/baseinfo/findcsyscd',
          },
          signal: abortControllerRef.value?.signal
        },
       );

       console.log(' axiosInstance');

      //console.log(response.data);
      baseinfoStatus.value = response.data.outDs;
      

    } catch (error: any) {
      console.log('error message', error.message);
      if (error.name === 'AbortError') {
        console.log('Request aborted');
      } else {
        errorMessage.value = error.message || '에러가 발생했습니다.';
      }
    } finally {
      isLoading.value = false;
    }
  };

  return {
    errorMessage,
    isLoading,
    baseinfoStatus,
    getBaseinfoStatus,
  };
}

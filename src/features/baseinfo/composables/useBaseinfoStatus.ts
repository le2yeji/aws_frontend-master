import { axiosInstance } from '@/lib/axios';
import { ref, Ref } from 'vue';

interface BaseinfoDetail {
  grpId: string;
  cd: string;
  name: string;
  ref1: string;
  ref2: string;
  defineName: string;
  regEmpNo: string;
  regEmpName: string;
  regDate: string;
}

interface BaseinfoStatus {
  baseinfo_lists: BaseinfoDetail[];
}

export default function useBaseinfoStatus() {
  const errorMessage: Ref<string> = ref('');
  const isLoading: Ref<boolean> = ref(false);
  const baseinfoStatus: Ref<{listSize: number, outDs: BaseinfoDetail[]}> = ref({listSize: 0, outDs: []});

  const abortControllerRef: Ref<AbortController | null> = ref(null);

  // 데이터 가져오는 함수
  const getBaseinfoStatus = async (grpId: string = '', cd: string = ''): Promise<void> => {
    if (abortControllerRef.value) {
      abortControllerRef.value.abort();
    }
    abortControllerRef.value = new AbortController();
    isLoading.value = true;

    //console.log("입력값 확인:", grpId, string);

    try {
      const reqJson = {
        inDs: {
          grpId,
          cd
        }
      };

      const response = await axiosInstance.post('/mvp/baseinfo/findcsyscd', reqJson, {
        params: {
          svcName: 'baseinfo',
          fnName: '/baseinfo/findcsyscd',
        },
        signal: abortControllerRef.value?.signal
      });

      // 데이터 저장
      baseinfoStatus.value = response.data;
      //console.log("Processed data:", baseinfoStatus.value);
    } catch (error: any) {
      console.error('Error fetching data:', error);
      errorMessage.value = error.message || 'An error occurred.';
    } finally {
      isLoading.value = false;
    }
  };

  return {
    errorMessage,
    isLoading,
    baseinfoStatus,
    getBaseinfoStatus
  };
}

import { axiosInstance } from '@/lib/axios';
import { ref } from 'vue';

interface CustomerStatus {
  customer_lists: {
    empName: string;
    empMail: string;
    empDeptName: string;
    empTelNo : string;
  };
}

export default function useCustomerStatus() {
  const errorMessage = ref('');
  const isLoading = ref(false);
  const customerStatus = ref<CustomerStatus[]>([]);


  const abortControllerRef = ref<AbortController | null>(null);

  // AbortController 인스턴스를 초기화합니다.
  const initializeAbortController = () => {
    abortControllerRef.value = new AbortController();
  };

  const getCustomerStatus = async () => {
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
      //const queryParams = { cluster_alias: clusterAlias };
      const response = await axiosInstance.get(
        '/api/v1/employees',
        //{ params: queryParams, signal: abortControllerRef.value?.signal },     
        {
          params: {
            svcName: 'baseinfo',
            fnName: '/api/v1/employees',
          },
          signal: abortControllerRef.value?.signal
        },
       );

       console.log(' axiosInstance');

      //const { data, success } = response.data;
      //if (success) {

      // customerStatus.value = data.customer_lists;
      customerStatus.value = response.data;//.customer_lists;
      // for (var i = 0; i < customerStatus.value.; i++) {
      //  this.item.grpId = this.resList[i].grpId;
      //  this.item.cd = this.resList[i].cd;

      //console.log(customerStatus.value.empName);
      
      //}
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
    customerStatus,
    getCustomerStatus,
  };
}

// import { axiosInstance } from '@/lib/axios';
// import { ref } from 'vue';

// interface PponStatus {
//   ppon_lists: {
//     ordNo: string;
//     saId: string;
//     custId: string;
//     custName: string;
//     custNo: string;
//     custNoType: string;
//     addrText: string;
//   };
// }

// export default function usePponStatus() {
//   const errorMessage = ref('');
//   const isLoading = ref(false);
//   const pponStatus = ref<PponStatus[]>([]);


//   const abortControllerRef = ref<AbortController | null>(null);

//   // AbortController 인스턴스를 초기화합니다.
//   const initializeAbortController = () => {
//     abortControllerRef.value = new AbortController();
//   };

//   const getPponStatus = async () => {
//     if (!abortControllerRef.value) {
//       // AbortController가 없으면 초기화합니다.
//       initializeAbortController();
//     } else {
//       // AbortController가 이미 있으면 이전 요청을 취소합니다.
//       abortControllerRef.value.abort();
//       // 새로운 AbortController 인스턴스를 생성합니다.
//       initializeAbortController();
//     }

//     isLoading.value = true;

//     try {
//       //const queryParams = { cluster_alias: clusterAlias };
//       const response = await axiosInstance.post(
//         'http://localhost:8080/mvp/ppon/savecustbas',
//         //{ params: queryParams, signal: abortControllerRef.value?.signal },     
//         {
//           params: {
//             svcName: 'ppon',
//             fnName: '/mvp/ppon/savecustbas',
//           },
//           signal: abortControllerRef.value?.signal
//         },
//        );

//        console.log(' axiosInstance');

//       const { data, success } = response.data;
//       if (success) {

//       // pponStatus.value = data.ppon_lists;
//       pponStatus.value = response.data;//.ppon_lists;
//       console.log('🔥pponStatus',pponStatus);
//       // for (var i = 0; i < pponStatus.value.; i++) {
//       //  this.item.grpId = this.resList[i].grpId;
//       //  this.item.cd = this.resList[i].cd;

//       //console.log(pponStatus.value.empName);
      
//       }
//     } catch (error: any) {
//       console.log('error message', error.message);
//       if (error.name === 'AbortError') {
//         console.log('Request aborted');
//       } else {
//         errorMessage.value = error.message || '에러가 발생했습니다.';
//       }
//     } finally {
//       isLoading.value = false;
//     }
//   };

//   return {
//     errorMessage,
//     isLoading,
//     pponStatus,
//     getPponStatus,
//   };
// }

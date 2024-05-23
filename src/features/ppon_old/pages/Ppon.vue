<template>
    <q-page class="q-pa-sm fit column no-wrap q-gutter-y-sm">
        <!-- TOP -->
        <!-- <div class="col-auto">
            <PponInfoTable />
        </div> -->
        <div class="col-auto">
            <form v-on:submit.prevent="customer_information" method="POST">
            <div>
                <fieldset>
                <select class="input-middle" v-model="CUST_NO_TYPE">
                    <option value="개인" selected>개인</option>
                    <option value="사업자">사업자</option>
                </select>
                
                <select class="input-middle" v-model="CUST_NO_TYPE_SELECT" style="margin: 5px;">
                    <option value="주민번호">주민번호</option>
                    <option value="사업자등록번호">사업자등록번호</option>
                </select>
  
                <select class="input-short" v-model="COUNTRY">
                    <option value="내국인">내국인</option>
                    <option value="외국인">외국인</option>
                </select><br>
                
                <input class="input-middle" v-model="CUST_NAME" type="text" style="margin: 5px;">
                <input class="input-middle" v-model="CUST_NO" type="text" style="margin: 5px;">
                
                <a href="PrivacyPolicy.html" onclick="window.open(this.href, '_blank', 'width=800, height=600'); return false;" style="margin:10px;">* 개인정보활용 동의</a>
  
                <input type="radio" id="yes" value="예" v-model="INFO_ASSENT_FLAG">
                <label for="yes" style="margin:5px;">예</label>
                <input type="radio" id="no" value="아니오" v-model="INFO_ASSENT_FLAG">
                <label for="no" style="margin:5px;">아니오</label>
                <button type="submit">고객검증</button>
                </fieldset>
            </div>
            </form>
        </div>
  
        <div class="card-container">
            <!-- 왼쪽 카드 내용 -->
            <div class="card left-card">
            <form action="" name="청구정보">
              <div>
                <legend style="margin:5px;">청구정보</legend>
                <select v-model="청구상품구분코드" style="margin:5px;" >
                    <option value="">청구상품구분코드1</option>
                    <option value="">청구상품구분코드2</option>
                </select>
              </div>
                <br>
                <fieldset>
                    <input class="input-long" v-model="청구번호" id="name" placeholder="청구번호" style="float:left;">
                    <button style="margin:5px; padding: 0px 5px; float:right;">청구번호조회</button><br>
  
                    <select class="input-middle" v-model="청구번호구분">
                        <option selected value="">청구번호구분</option>
                        <option></option>
                        <option></option>
                    </select>
  
                    <input class="input-middle" v-model="receiver" id="name" placeholder="청구서수령인"><br>
                
                    <select class="input-middle" v-model="발송형태">
                        <option selected value="">발송형태</option>
                        <option></option>
                        <option></option>
                    </select>
  
                    <select class="input-middle" v-model="선택">
                        <option selected value="">[선택]</option>
                        <option></option>
                        <option></option>
                    </select><br>
                
                    <input class="input-middle" v-model="email" placeholder="example@co.kr"><br>
                    <!-- <button>이메일 검증</button><br> -->
                    
                    <input class="input-middle" v-model="모바일번호" id="name" placeholder="모바일번호">
                    <!-- <button>이동전화선택</button> -->
                    
                    <br><label for="주소">주소</label><br>
                
                    <select class="input-long" v-model="납부방법">
                        <option selected value="">계좌자동이체</option>
                        <option value="">카드자동이체</option>
                    </select>
                    <select class="input-short" v-model="납부일">
                        <option v-for="day in days" :key="day" :value="day">매달 {{ day }}일</option>
                    </select><br>
  
                    <select class="input-middle" v-model="value">
                        <option selected value="">케이뱅크</option>
                    </select>
  
                    <input class="input-middle" v-model="카드계좌번호"  placeholder="카드/계좌번호"><br>
                    <input class="input-middle" v-model="납부고객명" placeholder="납부고객명">
                    <input class="input-middle" v-model="생년월일사업자번호" placeholder="생년월일/사업자번호"><br>
                    <button>청구번호생성</button>
                </fieldset>
            </form><br>
  
            <form action="" name="판매정보">
            <legend>판매정보</legend>
            <fieldset>
                <label for="판매자유형">판매자유형</label>
                <select class="input-middle" v-model="판매자유형">
                    <option selected value="">판매자유형1</option>
                    <option value="">판매자유형2</option>
                </select>
            
                <label for="판매직원">판매직원</label>
                <input class="input-short" v-model="판매직원" placeholder="직원명">
            </fieldset>
            </form>
        </div>
  
        <!-- 오른쪽 카드 내용 -->
        <div class="card right-card">
            <form v-on:submit.prevent="customer_information" method="POST" name="PSTN" >
                <legend>PSTN</legend>
                <fieldset style="padding:5px;">
                    <label style="margin:5px;" for="상품유형">상품유형</label>
                    <select v-model="상품유형" style="margin-right: 10px">
                        <option selected value="">일반전화</option>
                    </select>
  
                    <label for="청약대수">청약대수</label>
                    <input v-model="청약대수" type="number" placeholder="" style="width: 100px; margin: 5px;">
                    <button type="submit">사전체크</button>
                </fieldset>
            </form>
  
            <form v-on:submit.prevent="install_location" method="POST" name="설치장소">
            <legend>설치장소</legend>
            <fieldset>
                <label for="설치주소">설치주소</label>
                <input class="input-short" v-model="postcode" placeholder="우편번호">
                <input type="button" @click="execDaumPostcode()" value="우편번호 찾기"><br>
                <input class="input-longlong" v-model="address"  placeholder="주소"><br>
                <input class="input-middle" v-model="extraAddress" placeholder="상세주소">
            </fieldset>     
            </form>
  
              <form name="가설예약">
              <legend>가설예약</legend>
                  <fieldset>
                      <label for="고객희망일시">고객희망일시</label>
                      <VueDatePicker class="datepicker"
                          v-model="RESV_DATE"
                          locale="ko"
                          :format="'YYYYMMDDHH'"
                          time-picker-inline
                          week-start="0"
                          position="left"
                          placeholder="날짜를 선택하세요."
                          auto-apply
                          :clearable="true"
                          @update:modelValue="updateDate"/>
                    
                      <label for="가설연락처">가설연락처</label>
                      <input v-model="INSTL_TEL_NO" placeholder="">
                  </fieldset>
              </form>
  
              <form action="" name="가입정보 - 일반전화">
                  <legend>가입정보 - 일반전화</legend>
                  <fieldset>
                      <label for="시외사업자">시외사업자</label>
                      <select v-model="시외사업자">
                          <option value=""></option>
                          <option>??</option>
                      </select>
                  
                      <label for="번호부여">번호부여</label>
                      <select v-model="번호부여">
                          <option value=""></option>
                          <option>??</option>
                      </select>
  
                  
                      <label for="안심센터검증방법">안심센터검증방법</label>
                      <select v-model="안심센터검증방법">
                          <option value=""></option>
                          <option>??</option>
                      </select>
  
                      <label for="">114/전화번호부</label>
                      <input v-model="option1" id="name" placeholder="114"> /
                      <input v-model="option2" id="number" placeholder="전화번호부">
                  </fieldset>
              </form>
  
              <form v-on:submit.prevent="application_info" name="신청">
                  <fieldset>
                      <label for="신청정보">신청방법</label>
                      <select class="input-middle" v-model="Aplc_select">
                          <option value="">신청방법</option>
                          <option>??</option>
                      </select>
  
                      <label for="신청정보">신청정보</label>
                      <select class="input-middle" v-model="Aplc_info">
                          <option value="">신청정보</option>
                          <option>??</option>
                      </select>
  
                      <input class="input-long" v-model="Aplc_info_text" id="name" placeholder="">
                  </fieldset>
              </form>
          </div>
      </div>
    
      <form v-on:submit.prevent="save_info" style="float:right;">
          <button style="float:right;">삭제</button>
          <button style="float:right;" type="submit">저장</button>
      </form>
      </q-page>
  </template>
  
  
  <script lang="ts">
  // import PponInfoTable from '../components/PponInfoTable.vue';
  // import PrivacyPolicy from '../components/PrivacyPolicy.vue';
  import axios from 'axios';
  
  export default {
      components:{
      },
      data(): {
      CUST_NO_TYPE: string;
      CUST_NO_TYPE_SELECT: string;
      COUNTRY: string;
      CUST_NAME: string;
      CUST_NO: string;
      INFO_ASSENT_FLAG: string;
      납부일: string;
      days: number[];
      postcode: string;
      address: string;
      extraAddress: string;
      ADDR_TEXT: string;
      RESV_DATE: Date | null;
      INSTL_TEL_NO: string;
  } {
      return {
          CUST_NO_TYPE: '개인',
          CUST_NO_TYPE_SELECT: '주민번호',
          COUNTRY: '내국인',
          CUST_NAME: '',
          CUST_NO: '',
          INFO_ASSENT_FLAG: '',
          납부일: '',
          days: Array.from({ length: 31 }, (_, index) => index + 1),
          postcode: '',
          address: '',
          extraAddress: '',
          ADDR_TEXT: '',
          RESV_DATE: null,
          INSTL_TEL_NO: '',
      };
  },
  
  methods: {
      // 고객 정보 확인
        customer_information() {
          // 요청 데이터 구성
          let reqJson = {
          'inDs': {
              'custNoType': this.CUST_NO_TYPE === '개인' ? 1 : 3,
              'custName': this.CUST_NAME,
              'custNo': this.CUST_NO,
              }   
          };
  
          console.log('🔥', reqJson);
  
          // POST 요청 보내기
          axios.post('/mvp/baseinfo/selectcustbas', reqJson, {
          headers: { 'content-type': 'application/json' }
          })
          .then((res) => {
          console.log('🔥', res.data.outListDs[0].cntcTelNo);
  
          // res.data에서 받은 데이터를 Vue 인스턴스의 v-model 속성에 반영합니다.
          this.address = res.data.outListDs[0].addrText; // address에 addrText 값을 삽입합니다.
          
          // RESV_DATE 값을 설정하기 위해 'completedResvDateHh' 값을 가져와 변환합니다.
          const resvDate = res.data.outListDs[0].completedResvDateHh;
          if (resvDate) {
              // resvDate는 문자열 형태이므로 Date 객체로 변환합니다.
              const year = parseInt(resvDate.slice(0, 4), 10);
              const month = parseInt(resvDate.slice(4, 6), 10) - 1;
              const day = parseInt(resvDate.slice(6, 8), 10);
              const hour = parseInt(resvDate.slice(8, 10), 10);
              // Date 객체 생성
              this.RESV_DATE = new Date(year, month, day, hour);
          }
          
          // INSTL_TEL_NO에 cntcTelNo 값을 삽입합니다.
          this.INSTL_TEL_NO = res.data.outListDs[0].cntcTelNo;
          
          alert(res.data.outDs.result);
          })
          .catch((error) => {
          console.log(error);
          });
          
          },
          // 고객희망일시 형식 변환용 함수
          updateDate(newDate) {
              if (newDate) {
              const year = newDate.getFullYear();
              const month = String(newDate.getMonth() + 1).padStart(2, '0');
              const day = String(newDate.getDate()).padStart(2, '0');
              const hours = String(newDate.getHours()).padStart(2, '0');
              this.RESV_DATE = `${year}${month}${day}${hours}`;
              }
          },
          save_info() {
              // 가설 예약 정보
              console.log('고객희망일시:', this.RESV_DATE, "\n", '가설연락처:',this.INSTL_TEL_NO);
              // 설치 장소 확인
              console.log('전체 주소:', this.ADDR_TEXT);
          },
          execDaumPostcode() {
              new window.daum.Postcode({
                  oncomplete: (data) => {
                      if (this.extraAddress !== '') {
                          this.extraAddress = '';
                      }
                      if (data.userSelectedType === 'R') {
                          // 사용자가 도로명 주소를 선택했을 경우
                          this.address = data.roadAddress;
                      } else {
                          // 사용자가 지번 주소를 선택했을 경우(J)
                          this.address = data.jibunAddress;
                      }
                      // 주소 저장
                      this.postcode = data.zonecode;
                      this.ADDR_TEXT = this.address + this.extraAddress;
                      }
                  }).open();
          }
      }
  };
  </script>
  
  
  <style lang="scss" scoped>
      label {
          margin: 5px;
      }
      form {
          // margin-top: 5px;
          margin-bottom: 5px;
      }
      .row {
          display: flex;
      }
      .row > div {
          margin-right: 10px; /* 요소들 간의 간격 조정 */
      }
      .required {
          background-color: rgb(255, 236, 131);
      }
      // input = 150*25
      .card-container {
          display: flex;
      }
      .card {
          flex: 1;
          margin: 5px; /* 카드 사이의 여백 설정 */
          padding: 5px; /* 카드 내부 여백 설정 */
      //   border: 1px solid #ccc; /* 카드 테두리 설정 */
      }
      .left-card {
          max-width: 305px; /* 왼쪽 카드 너비 설정 */
      }
      .right-card {
          max-width: 70%; /* 오른쪽 카드 너비 설정 */
      }
      .popup-view{
          opacity: 0;
          display: none;
          visibility: hidden;
      }
      .active{
          opacity: 1;
          display: block;
          visibility: visible;
      }
  
      .input-short {
          width: 100px;
          height: 25px;
          margin: 5px;
      }
      .input-middle {
          width: 125px;
          height: 25px;
          margin: 5px;
      }
      .input-long {
          width: 150px;
          height: 25px;
          margin: 5px;
      }
      .input-longlong {
          width: 400px;
          height: 25px;
          margin: 5px;
      }
  
      legend{
          margin:5px;
          font-weight: 700;
          font-size: 18px;
      }
      button{
          margin:5px; 
          padding: 0px 5px; 
          float: right;
      }
      fieldset{
          padding:5px;
      }
  </style>
  
# 순서

1. `vue create frontend`
2. `vue add router`
3. `vue add vuex`



# 의문

## 왜 vuex를 사용하는가

- vuex는 ?
  - Vue.js 애플리케이션에 대한 상태관리패턴 + 라이브러리. 모든 컴포넌트에 대한 중앙 집중식 저장소 역할을 하며 예측 가능한 방식으로 상태 변경 가능하다



## 구조

src

​	└api `app별 서버 api axios 요청 코드`

​	└assets `이미지파일`

​	└components `컴포넌트`

​		└Calendar `calendar 관련 컴포넌트 저장 디렉토리`

​		└Common `공통 요소 컴포넌트 저장`	

​	└config `서버 url 저장소 -> 최종 git push에서 ignore 추가해야하며, 배포시 url 변경 필`

​	└router `router 주소`

​	└store `vuex 저장소`

​		└ modules `vuex 요소별 모듈화`

​		- index.js `모듈화된 vuex 파일들을 불러오는 파일`	

​	└views  `router 페이지 파일`

​	- App.vue


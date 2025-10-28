// js 실행 : code runner => ctrl + alt + n
// ES6 문법 - 고유한 값들의 집한을 다루는 자료구조. 중복제거 유일값 관리에 유용

// 세트 생성
const set = new Set();
console.log('생성1', set);
const numSet = new Set([1,2]);
console.log('생성2',numSet);

// 값 추가
set.add(1);
console.log('값 추가1', set);
set.add("A");
console.log('값 추가2', set);
set.add(true);
console.log('값 추가3', set);
// 추가 후에 세트를 반환 연쇄적 호출 가능
// 중복된 값은 무시, 유일값만 저장
set.add(1).add("B").add(true);
console.log('값 추가4', set);

// 값 삭제
// 삭제완료 하면 true 반환, 실패시 false 반환
console.log(set.delete(1));
console.log('값 삭제1', set);
console.log(set.delete(2));
console.log('값 삭제2', set);

// 값 존재 여부 확인
if (set.has("A")) {
  console.log('A는 세트에 존재합니다.');
}
const result = set.has('B') ? 'YES' : 'NO';
console.log('result', result);

// 값의 개수 확인
console.log('size', set.size);

// 모든 값 제거
set.clear();
console.log(set);

// 세트 순회
// for of 는 값만, for in 은 인덱스
for (const num of numSet) {
  console.log(num);
}



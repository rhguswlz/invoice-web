ROADMAP.md의 완료 항목을 실제 코드베이스 상태와 대조하여 체크리스트를 업데이트합니다.

## 실행 절차

### 1단계 — 현재 ROADMAP.md 읽기
`docs/ROADMAP.md`를 읽어 `[ ]` 상태인 미완료 항목 전체 목록을 파악합니다.

### 2단계 — 완료 여부 검증

아래 기준으로 각 항목을 검증합니다. **실제 파일을 Read하거나 Bash로 확인**하고 추정하지 않습니다.

#### 파일 존재 여부 확인 항목
파일 경로가 명시된 항목은 해당 파일이 존재하는지 확인합니다.
- `ls <경로>` 또는 Read로 파일 존재 여부 확인

#### 코드 내용 확인 항목
구현 내용이 명시된 항목은 실제 파일을 읽어 해당 코드가 존재하는지 확인합니다.

**자주 확인하는 항목별 검증 기준:**

| 항목 키워드 | 검증 방법 |
|------------|----------|
| `@media print` 스타일 | `app/globals.css`에 `@media print` 블록 존재 여부 |
| `not-found.tsx` 개선 | `app/not-found.tsx`에 견적서 맥락 안내 + 버튼 2개 존재 여부 |
| `error.tsx` 재시도 버튼 | `app/error.tsx`에 `router.refresh()` + `reset()` 존재 여부 |
| `mapPageToInvoiceListItem` | `lib/invoice-mapper.ts`에 함수 존재 + 실제 DB 속성명(`견적서 번호`, `발행일`) 사용 여부 |
| `mapPageToInvoice` | `lib/invoice-mapper.ts`에 Items DB 기반 매핑 존재 여부 |
| `InvoiceStatus` 타입 | `types/index.ts`에 해당 타입 정의 존재 여부 |
| Zustand 스토어 | `store/invoice-store.ts` 파일 존재 여부 |
| `SITE_CONFIG`, `NAV_ITEMS` | `lib/constants.ts` 파일 존재 여부 |
| 환경 변수 검증 | `lib/notion.ts`에 `throw new Error` 조기 실패 로직 존재 여부 |
| shadcn/ui 설정 | `components.json` 파일 존재 여부 |
| `빈 상태 UI` | `invoice-items-table.tsx`에 `items.length === 0` 처리 존재 여부 |
| `print:hidden` | `invoice-viewer.tsx`에 해당 클래스 사용 여부 |

#### 빌드/린트 확인 항목
`npm run build` 또는 `npm run lint` 통과 여부가 기준인 항목은 최근 실행 로그가 없으면 **검증 불가** 표시로 건너뜁니다. 직접 빌드를 실행하지 않습니다.

### 3단계 — ROADMAP.md 업데이트

검증 결과에 따라 `docs/ROADMAP.md`를 Edit 도구로 수정합니다:
- 완료 확인된 항목: `- [ ]` → `- [x]`
- 이미 `[x]`인 항목: 건드리지 않습니다
- 검증 불가 항목: 변경하지 않습니다

**수정 시 주의사항:**
- 항목 텍스트, 들여쓰기, 줄바꿈을 절대 변경하지 않습니다
- 체크박스 `[ ]` → `[x]` 변경만 합니다
- 한 번에 여러 항목을 수정할 때는 `replace_all: false`로 개별 수정합니다

### 4단계 — 결과 보고

업데이트 완료 후 다음 형식으로 요약합니다:

```
## ROADMAP.md 업데이트 결과

### ✅ 새로 완료 처리된 항목 (N개)
- [ 파일/항목 이름 ] — 검증 근거

### ⏭️ 변경 없음 (이미 완료 또는 미완료 확인)
- 미완료 항목 수: N개

### ⚠️ 검증 불가 항목
- 해당 항목 목록
```

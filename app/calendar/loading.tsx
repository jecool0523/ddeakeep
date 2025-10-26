export default function CalendarLoading() {
  return (
    <div className="min-h-screen bg-[#F5E6D3] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B6F47] mx-auto mb-4"></div>
        <p className="text-[#8B6F47]">캘린더를 불러오는 중...</p>
      </div>
    </div>
  )
}

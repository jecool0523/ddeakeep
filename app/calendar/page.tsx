"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Plus, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import MobileFooterNav from "@/components/mobile-footer-nav"
import Image from "next/image"
import Link from "next/link"
import { getSupabaseBrowserClient } from "@/lib/supabase-client"

interface Event {
  id: string
  title: string
  description?: string
  event_date: string
  event_time?: string
  location?: string
  user_id: string
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [events, setEvents] = useState<Event[]>([])
  const [user, setUser] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    event_time: "",
    location: "",
  })

  const supabase = getSupabaseBrowserClient()

  useEffect(() => {
    checkUser()
    fetchEvents()
  }, [currentDate])

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    setUser(user)
  }

  const fetchEvents = async () => {
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .gte("event_date", startOfMonth.toISOString().split("T")[0])
      .lte("event_date", endOfMonth.toISOString().split("T")[0])
      .order("event_date", { ascending: true })

    if (!error && data) {
      setEvents(data)
    }
  }

  const handleAddEvent = async () => {
    if (!user || !newEvent.title) return

    const { error } = await supabase.from("events").insert({
      user_id: user.id,
      title: newEvent.title,
      description: newEvent.description,
      event_date: selectedDate.toISOString().split("T")[0],
      event_time: newEvent.event_time || null,
      location: newEvent.location || null,
    })

    if (!error) {
      setNewEvent({ title: "", description: "", event_time: "", location: "" })
      setIsDialogOpen(false)
      fetchEvents()
    }
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate()
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        date: prevMonthLastDay - i,
        isCurrentMonth: false,
        fullDate: new Date(year, month - 1, prevMonthLastDay - i),
      })
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: i,
        isCurrentMonth: true,
        fullDate: new Date(year, month, i),
      })
    }

    // Next month days
    const remainingDays = 42 - days.length // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: i,
        isCurrentMonth: false,
        fullDate: new Date(year, month + 1, i),
      })
    }

    return days
  }

  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return events.filter((event) => event.event_date === dateStr)
  }

  const getEventsForSelectedDate = () => {
    return getEventsForDate(selectedDate)
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const isSelected = (date: Date) => {
    return (
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    )
  }

  const days = getDaysInMonth(currentDate)
  const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"]

  return (
    <div className="min-h-screen bg-[#F5E6D3] pb-20">
      {/* Header */}
      <header className="bg-[#F5E6D3] border-b border-[#8B6F47]/20 p-4">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <Image src="/images/ddeakeep.png" alt="떡잎" width={60} height={24} className="h-6 w-auto" />
          </div>
          {user ? (
            <Link
              href="/settings"
              className="flex items-center gap-2 text-[#8B6F47] hover:text-[#6B5437] transition-colors"
            >
              <User className="h-5 w-5" />
              <span className="text-sm font-medium">{user.email?.split("@")[0]}님</span>
            </Link>
          ) : (
            <div className="flex gap-2">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-[#8B6F47] hover:text-[#6B5437]">
                  로그인
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="bg-lime-500 hover:bg-lime-600 text-white">
                  회원가입
                </Button>
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Title */}
      <div className="p-4 max-w-2xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <svg className="w-8 h-8 text-[#8B6F47]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM9 14H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 4H7v-2h2v2zm4 0h-2v-2h2v2zm4 0h-2v-2h2v2z" />
          </svg>
          <h1 className="text-2xl font-bold text-[#8B6F47]">캘린더</h1>
        </div>

        {/* Calendar */}
        <Card className="bg-[#E8D4B8] border-[#8B6F47]/20 shadow-lg mb-4">
          <div className="p-4">
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={previousMonth}
                className="h-10 w-10 rounded-full bg-[#8B6F47] hover:bg-[#6B5437] text-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <h2 className="text-xl font-bold text-[#8B6F47]">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={nextMonth}
                className="h-10 w-10 rounded-full bg-[#8B6F47] hover:bg-[#6B5437] text-white"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            <div className="border-b-2 border-[#8B6F47] mb-3" />

            {/* Day Names */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map((day) => (
                <div key={day} className="text-center text-sm font-medium text-[#8B6F47] py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => {
                const dayEvents = getEventsForDate(day.fullDate)
                const hasEvents = dayEvents.length > 0

                return (
                  <button
                    key={index}
                    onClick={() => setSelectedDate(day.fullDate)}
                    className={`
                      aspect-square p-2 rounded-lg text-center relative transition-colors
                      ${!day.isCurrentMonth ? "text-[#8B6F47]/40" : "text-[#8B6F47]"}
                      ${isToday(day.fullDate) ? "bg-[#8B6F47] text-white font-bold" : ""}
                      ${isSelected(day.fullDate) && !isToday(day.fullDate) ? "bg-[#8B6F47]/20" : ""}
                      ${!isToday(day.fullDate) && !isSelected(day.fullDate) ? "hover:bg-[#8B6F47]/10" : ""}
                    `}
                  >
                    <span className="text-sm">{day.date}</span>
                    {hasEvents && (
                      <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                        <svg className="w-3 h-3 text-[#8B6F47]" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                        </svg>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Today indicator icon */}
            {isToday(selectedDate) && (
              <div className="mt-2 flex justify-center">
                <svg className="w-6 h-6 text-[#8B6F47]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 3H19V1H17V3H7V1H5V3H4C2.9 3 2 3.9 2 5V21C2 22.1 2.9 23 4 23H20C21.1 23 22 22.1 22 21V5C22 3.9 21.1 3 20 3M20 21H4V8H20V21Z" />
                </svg>
              </div>
            )}
          </div>
        </Card>

        {/* Events List */}
        <Card className="bg-[#E8D4B8] border-[#8B6F47]/20 shadow-lg">
          <div className="p-4">
            <div className="bg-[#8B6F47] rounded-full h-1 w-32 mx-auto mb-4" />

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <button className="w-full bg-[#C4A574] hover:bg-[#B39564] rounded-full py-3 px-4 flex items-center justify-between text-[#8B6F47] font-medium mb-4 transition-colors">
                  <span>
                    {selectedDate.getMonth() + 1}월 {selectedDate.getDate()}일에 일정 추가
                  </span>
                  <Plus className="h-5 w-5" />
                </button>
              </DialogTrigger>
              <DialogContent className="bg-[#F5E6D3]">
                <DialogHeader>
                  <DialogTitle className="text-[#8B6F47]">새 일정 추가</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title" className="text-[#8B6F47]">
                      제목
                    </Label>
                    <Input
                      id="title"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      className="bg-white border-[#8B6F47]/20"
                      placeholder="일정 제목을 입력하세요"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description" className="text-[#8B6F47]">
                      설명
                    </Label>
                    <Textarea
                      id="description"
                      value={newEvent.description}
                      onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                      className="bg-white border-[#8B6F47]/20"
                      placeholder="일정 설명을 입력하세요"
                    />
                  </div>
                  <div>
                    <Label htmlFor="time" className="text-[#8B6F47]">
                      시간
                    </Label>
                    <Input
                      id="time"
                      type="time"
                      value={newEvent.event_time}
                      onChange={(e) => setNewEvent({ ...newEvent, event_time: e.target.value })}
                      className="bg-white border-[#8B6F47]/20"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location" className="text-[#8B6F47]">
                      장소
                    </Label>
                    <Input
                      id="location"
                      value={newEvent.location}
                      onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                      className="bg-white border-[#8B6F47]/20"
                      placeholder="장소를 입력하세요"
                    />
                  </div>
                  <Button
                    onClick={handleAddEvent}
                    className="w-full bg-lime-500 hover:bg-lime-600 text-white"
                    disabled={!newEvent.title}
                  >
                    일정 추가
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Event List */}
            <div className="space-y-3">
              {getEventsForSelectedDate().length > 0 ? (
                getEventsForSelectedDate().map((event) => (
                  <div key={event.id} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-[#8B6F47] mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                    <div className="flex-1">
                      <h3 className="font-medium text-[#8B6F47]">{event.title}</h3>
                      {event.description && <p className="text-sm text-[#8B6F47]/70 mt-1">{event.description}</p>}
                      {event.event_time && <p className="text-xs text-[#8B6F47]/60 mt-1">시간: {event.event_time}</p>}
                      {event.location && <p className="text-xs text-[#8B6F47]/60">장소: {event.location}</p>}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-[#8B6F47]/60 py-4">이 날짜에 일정이 없습니다</p>
              )}
            </div>
          </div>
        </Card>
      </div>

      <MobileFooterNav />
    </div>
  )
}

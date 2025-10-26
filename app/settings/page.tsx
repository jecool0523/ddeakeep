"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { ArrowLeft, Bell, Eye, Globe, Lock, Moon, Sun, User, Volume2, LogOut } from "lucide-react"
import { useAccessibility } from "@/components/accessibility-provider"
import { useTheme } from "next-themes"
import { Slider } from "@/components/ui/slider"
import { getSupabaseBrowserClient } from "@/lib/supabase-client"
import { useRouter } from "next/navigation"
import type { User as SupabaseUser } from "@supabase/supabase-js"

export default function SettingsPage() {
  const { highContrast, toggleHighContrast, largeText, toggleLargeText, screenReader, toggleScreenReader } =
    useAccessibility()
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [emergencyAlerts, setEmergencyAlerts] = useState(true)
  const [schemeUpdates, setSchemeUpdates] = useState(true)
  const [communityUpdates, setCommunityUpdates] = useState(true)
  const [fontSizeValue, setFontSizeValue] = useState([100])

  useEffect(() => {
    const supabase = getSupabaseBrowserClient()

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        router.push("/login")
      } else {
        setUser(session.user)
        setLoading(false)
      }
    })
  }, [router])

  const handleLogout = async () => {
    const supabase = getSupabaseBrowserClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">로딩 중...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 py-6">
        <Link href="/" className="flex items-center text-foreground hover:text-lime-600 mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>홈으로 돌아가기</span>
        </Link>

        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-4">
            <Card className="border-border">
              <CardContent className="p-4">
                <div className="flex flex-col items-center">
                  <Avatar className="h-20 w-20 mb-4">
                    <AvatarImage
                      src={user?.user_metadata?.avatar_url || "/placeholder.svg?height=80&width=80"}
                      alt="User"
                    />
                    <AvatarFallback className="bg-lime-500 text-white text-xl">
                      {user?.user_metadata?.name?.[0] || user?.email?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="font-bold text-lg">{user?.user_metadata?.name || "사용자"}</h2>
                  <p className="text-sm text-muted-foreground">@{user?.email?.split("@")[0]}</p>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="account" className="w-full">
              <TabsList className="grid grid-cols-1 h-auto bg-secondary p-1">
                <TabsTrigger
                  value="account"
                  className="justify-start py-3 data-[state=active]:bg-background data-[state=active]:text-lime-600"
                >
                  <User className="h-4 w-4 mr-2" />
                  계정
                </TabsTrigger>
                <TabsTrigger
                  value="notifications"
                  className="justify-start py-3 data-[state=active]:bg-background data-[state=active]:text-lime-600"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  알림
                </TabsTrigger>
                <TabsTrigger
                  value="appearance"
                  className="justify-start py-3 data-[state=active]:bg-background data-[state=active]:text-lime-600"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  외관
                </TabsTrigger>
                <TabsTrigger
                  value="accessibility"
                  className="justify-start py-3 data-[state=active]:bg-background data-[state=active]:text-lime-600"
                >
                  <Volume2 className="h-4 w-4 mr-2" />
                  접근성
                </TabsTrigger>
                <TabsTrigger
                  value="language"
                  className="justify-start py-3 data-[state=active]:bg-background data-[state=active]:text-lime-600"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  언어
                </TabsTrigger>
                <TabsTrigger
                  value="privacy"
                  className="justify-start py-3 data-[state=active]:bg-background data-[state=active]:text-lime-600"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  개인정보 & 보안
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Button
              variant="outline"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 bg-transparent"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              로그아웃
            </Button>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Tabs defaultValue="account" className="w-full">
              <TabsContent value="account" className="space-y-4">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>Update your personal information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" defaultValue="Ravi" className="border-input" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" defaultValue="Kumar" className="border-input" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="ravi.kumar@example.com" className="border-input" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" defaultValue="+91 9876543210" className="border-input" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" defaultValue="123 Main Street, Mumbai" className="border-input" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" defaultValue="Mumbai" className="border-input" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Select defaultValue="maharashtra">
                          <SelectTrigger className="border-input">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="maharashtra">Maharashtra</SelectItem>
                            <SelectItem value="delhi">Delhi</SelectItem>
                            <SelectItem value="karnataka">Karnataka</SelectItem>
                            <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                            <SelectItem value="uttar-pradesh">Uttar Pradesh</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pincode">PIN Code</Label>
                      <Input id="pincode" defaultValue="400001" className="border-input" />
                    </div>

                    <Button className="w-full md:w-auto bg-lime-500 hover:bg-lime-600 text-white">Save Changes</Button>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Profile Picture</CardTitle>
                    <CardDescription>Update your profile picture</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src="/placeholder.svg?height=96&width=96" alt="User" />
                        <AvatarFallback className="bg-lime-500 text-white text-2xl">RK</AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col gap-2">
                        <Button variant="outline" className="border-input text-foreground bg-transparent">
                          Upload New Picture
                        </Button>
                        <Button
                          variant="ghost"
                          className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                        >
                          Remove Picture
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Update your password</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" className="border-input" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" className="border-input" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" className="border-input" />
                    </div>

                    <Button className="w-full md:w-auto bg-lime-500 hover:bg-lime-600 text-white">
                      Update Password
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-4">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Manage how you receive notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Notification Channels</h3>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="email-notifications">Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                        </div>
                        <Switch
                          id="email-notifications"
                          checked={emailNotifications}
                          onCheckedChange={setEmailNotifications}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="sms-notifications">SMS Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                        </div>
                        <Switch
                          id="sms-notifications"
                          checked={smsNotifications}
                          onCheckedChange={setSmsNotifications}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="push-notifications">Push Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
                        </div>
                        <Switch
                          id="push-notifications"
                          checked={pushNotifications}
                          onCheckedChange={setPushNotifications}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Notification Types</h3>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="emergency-alerts">Emergency Alerts</Label>
                          <p className="text-sm text-muted-foreground">Notifications for emergency situations</p>
                        </div>
                        <Switch id="emergency-alerts" checked={emergencyAlerts} onCheckedChange={setEmergencyAlerts} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="scheme-updates">Scheme Updates</Label>
                          <p className="text-sm text-muted-foreground">Updates about government schemes</p>
                        </div>
                        <Switch id="scheme-updates" checked={schemeUpdates} onCheckedChange={setSchemeUpdates} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="community-updates">Community Updates</Label>
                          <p className="text-sm text-muted-foreground">Updates from your community</p>
                        </div>
                        <Switch
                          id="community-updates"
                          checked={communityUpdates}
                          onCheckedChange={setCommunityUpdates}
                        />
                      </div>
                    </div>

                    <Button className="w-full md:w-auto bg-lime-500 hover:bg-lime-600 text-white">
                      Save Preferences
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="appearance" className="space-y-4">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Appearance Settings</CardTitle>
                    <CardDescription>Customize how the app looks</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Theme</h3>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Button
                          variant="outline"
                          className={`flex flex-col items-center justify-center h-24 border-2 ${theme === "light" ? "border-lime-500" : "border-border"}`}
                          onClick={() => setTheme("light")}
                        >
                          <Sun className="h-8 w-8 mb-2 text-yellow-500" />
                          <span>Light</span>
                        </Button>

                        <Button
                          variant="outline"
                          className={`flex flex-col items-center justify-center h-24 border-2 ${theme === "dark" ? "border-lime-500" : "border-border"}`}
                          onClick={() => setTheme("dark")}
                        >
                          <Moon className="h-8 w-8 mb-2 text-blue-700 dark:text-blue-400" />
                          <span>Dark</span>
                        </Button>

                        <Button
                          variant="outline"
                          className={`flex flex-col items-center justify-center h-24 border-2 ${theme === "system" ? "border-lime-500" : "border-border"}`}
                          onClick={() => setTheme("system")}
                        >
                          <div className="flex mb-2">
                            <Sun className="h-8 w-8 text-yellow-500" />
                            <Moon className="h-8 w-8 text-blue-700 dark:text-blue-400" />
                          </div>
                          <span>System</span>
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Font Size</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Small</span>
                          <span className="text-sm">Large</span>
                        </div>
                        <Slider
                          defaultValue={[100]}
                          max={150}
                          min={80}
                          step={10}
                          value={fontSizeValue}
                          onValueChange={setFontSizeValue}
                        />
                        <div className="text-center text-sm text-muted-foreground">Current: {fontSizeValue}%</div>
                      </div>
                    </div>

                    <Button className="w-full md:w-auto bg-lime-500 hover:bg-lime-600 text-white">
                      Save Preferences
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="accessibility" className="space-y-4">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Accessibility Settings</CardTitle>
                    <CardDescription>Make the app more accessible for your needs</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="high-contrast">High Contrast Mode</Label>
                          <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                        </div>
                        <Switch id="high-contrast" checked={highContrast} onCheckedChange={toggleHighContrast} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="large-text">Large Text Mode</Label>
                          <p className="text-sm text-muted-foreground">Increase text size throughout the app</p>
                        </div>
                        <Switch id="large-text" checked={largeText} onCheckedChange={toggleLargeText} />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="screen-reader">Screen Reader Support</Label>
                          <p className="text-sm text-muted-foreground">Enable compatibility with screen readers</p>
                        </div>
                        <Switch id="screen-reader" checked={screenReader} onCheckedChange={toggleScreenReader} />
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-md">
                      <h3 className="font-medium text-blue-700 dark:text-blue-400 mb-2">Voice Assistant</h3>
                      <p className="text-sm text-blue-600 dark:text-blue-300 mb-4">
                        Our voice assistant can help you navigate the app using voice commands. Enable screen reader
                        support to use this feature.
                      </p>
                      <Button
                        variant="outline"
                        className="border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-400 bg-transparent"
                        disabled={!screenReader}
                      >
                        <Volume2 className="h-4 w-4 mr-2" />
                        Test Voice Assistant
                      </Button>
                    </div>

                    <Button className="w-full md:w-auto bg-lime-500 hover:bg-lime-600 text-white">
                      Save Preferences
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="language" className="space-y-4">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Language Settings</CardTitle>
                    <CardDescription>Choose your preferred language</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="language">Primary Language</Label>
                        <Select defaultValue="en">
                          <SelectTrigger className="border-input">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                            <SelectItem value="bn">বাংলা (Bengali)</SelectItem>
                            <SelectItem value="te">తెలుగు (Telugu)</SelectItem>
                            <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
                            <SelectItem value="mr">मराठी (Marathi)</SelectItem>
                            <SelectItem value="gu">ગુજરાતી (Gujarati)</SelectItem>
                            <SelectItem value="kn">ಕನ್ನಡ (Kannada)</SelectItem>
                            <SelectItem value="ml">മലയാളം (Malayalam)</SelectItem>
                            <SelectItem value="pa">ਪੰਜਾਬੀ (Punjabi)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="secondary-language">Secondary Language</Label>
                        <Select defaultValue="hi">
                          <SelectTrigger className="border-input">
                            <SelectValue placeholder="Select secondary language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                            <SelectItem value="bn">বাংলা (Bengali)</SelectItem>
                            <SelectItem value="te">తెలుగు (Telugu)</SelectItem>
                            <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
                            <SelectItem value="mr">मराठी (Marathi)</SelectItem>
                            <SelectItem value="gu">ગુજરાતી (Gujarati)</SelectItem>
                            <SelectItem value="kn">ಕನ್ನಡ (Kannada)</SelectItem>
                            <SelectItem value="ml">മലയാളം (Malayalam)</SelectItem>
                            <SelectItem value="pa">ਪੰਜਾਬੀ (Punjabi)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="auto-translate">Auto-Translate Content</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically translate content to your primary language
                        </p>
                      </div>
                      <Switch id="auto-translate" defaultChecked />
                    </div>

                    <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-md">
                      <h3 className="font-medium text-purple-700 dark:text-purple-400 mb-2">AI Translation</h3>
                      <p className="text-sm text-purple-600 dark:text-purple-300 mb-4">
                        CivicConnect uses AI to provide high-quality translations across all Indian languages.
                        Translation quality may vary by language.
                      </p>
                    </div>

                    <Button className="w-full md:w-auto bg-lime-500 hover:bg-lime-600 text-white">
                      Save Language Preferences
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="privacy" className="space-y-4">
                <Card className="border-border">
                  <CardHeader>
                    <CardTitle>Privacy Settings</CardTitle>
                    <CardDescription>Manage your privacy preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Profile Visibility</h3>

                      <div className="space-y-2">
                        <Label htmlFor="profile-visibility">Who can see your profile</Label>
                        <Select defaultValue="everyone">
                          <SelectTrigger className="border-input">
                            <SelectValue placeholder="Select visibility" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="everyone">Everyone</SelectItem>
                            <SelectItem value="connections">Connections Only</SelectItem>
                            <SelectItem value="officials">Government Officials Only</SelectItem>
                            <SelectItem value="none">No One (Private)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="post-visibility">Who can see your posts</Label>
                        <Select defaultValue="everyone">
                          <SelectTrigger className="border-input">
                            <SelectValue placeholder="Select visibility" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="everyone">Everyone</SelectItem>
                            <SelectItem value="connections">Connections Only</SelectItem>
                            <SelectItem value="officials">Government Officials Only</SelectItem>
                            <SelectItem value="none">No One (Private)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Data Sharing</h3>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="location-sharing">Location Sharing</Label>
                          <p className="text-sm text-muted-foreground">Share your location for local services</p>
                        </div>
                        <Switch id="location-sharing" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="data-analytics">Data Analytics</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow anonymous usage data collection to improve services
                          </p>
                        </div>
                        <Switch id="data-analytics" defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="personalized-ads">Personalized Advertisements</Label>
                          <p className="text-sm text-muted-foreground">Show ads based on your interests</p>
                        </div>
                        <Switch id="personalized-ads" defaultChecked />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Security</h3>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                          <p className="text-sm text-muted-foreground">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Switch id="two-factor" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="login-alerts">Login Alerts</Label>
                          <p className="text-sm text-muted-foreground">Get notified of new logins to your account</p>
                        </div>
                        <Switch id="login-alerts" defaultChecked />
                      </div>
                    </div>

                    <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-md">
                      <h3 className="font-medium text-red-700 dark:text-red-400 mb-2">Delete Account</h3>
                      <p className="text-sm text-red-600 dark:text-red-300 mb-4">
                        Permanently delete your account and all associated data. This action cannot be undone.
                      </p>
                      <Button variant="destructive">Delete Account</Button>
                    </div>

                    <Button className="w-full md:w-auto bg-lime-500 hover:bg-lime-600 text-white">
                      Save Privacy Settings
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

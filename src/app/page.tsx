"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { CalendarIcon, CreditCard, Home, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { ContactButton } from "@/components/contact-button"
import { PhotoGallery } from "@/components/photo-gallery"
import { Amenities } from "@/components/amenities"
import { HouseRules } from "@/components/house-rules"
import { fetchAirbnbAvailability, AIRBNB_LISTING_URL } from "@/lib/airbnb"

interface AirbnbAvailability {
  start: Date
  end: Date
  price?: number
  isAvailable: boolean
}

interface PricingDetails {
  nights: number
  pricePerNight: number
  subtotal: number
  cleaningFee: number
  serviceFee: number
  total: number
}

export default function BookingPage() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [checkoutDate, setCheckoutDate] = useState<Date | undefined>(undefined)
  const [guests, setGuests] = useState("1")
  const [showPayment, setShowPayment] = useState(false)
  const [availability, setAvailability] = useState<AirbnbAvailability[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadAvailability = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchAirbnbAvailability()
        console.log('Loaded availability data:', data)
        setAvailability(data)
      } catch (error) {
        console.error('Error loading availability:', error)
        setError('Failed to load availability data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    loadAvailability()
  }, [])

  const isDateAvailable = (date: Date) => {
    // If no availability data, allow all dates
    if (!availability.length) return true
    
    // Check if the date falls within any available period
    return availability.some(period => 
      period.isAvailable && 
      date >= period.start && 
      date < period.end
    )
  }

  const getPriceForDate = (date: Date) => {
    if (!availability.length) return 250 // Default price if no data
    
    const period = availability.find(period => 
      date >= period.start && 
      date < period.end
    )
    return period?.price || 250 // Default price if no price found
  }

  const calculateTotal = (): PricingDetails | 0 => {
    if (!date || !checkoutDate) return 0

    // Calculate number of nights
    const nights = Math.ceil((checkoutDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))

    // Get price for each night and calculate total
    let totalPrice = 0
    for (let i = 0; i < nights; i++) {
      const currentDate = new Date(date)
      currentDate.setDate(currentDate.getDate() + i)
      const price = getPriceForDate(currentDate)
      if (price) totalPrice += price
    }

    // Calculate fees
    const cleaningFee = 75
    const serviceFee = Math.round(totalPrice * 0.12)

    return {
      nights,
      pricePerNight: Math.round(totalPrice / nights),
      subtotal: totalPrice,
      cleaningFee,
      serviceFee,
      total: totalPrice + cleaningFee + serviceFee,
    }
  }

  const pricing = calculateTotal()

  const handleContinue = () => {
    if (date && checkoutDate && guests) {
      setShowPayment(true)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Home className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Villa Murakami</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/#photos" className="text-sm font-medium hover:text-primary">
              Photos
            </Link>
            <Link href="/#amenities" className="text-sm font-medium hover:text-primary">
              Amenities
            </Link>
            <Link href="/#reviews" className="text-sm font-medium hover:text-primary">
              Reviews
            </Link>
            <Link href="/rules" className="text-sm font-medium hover:text-primary">
              House Rules
            </Link>
            <Button asChild variant="default" size="sm">
              <Link href={AIRBNB_LISTING_URL} target="_blank" rel="noopener noreferrer">
                Book on Airbnb <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Book Your Stay at Villa Murakami</h1>
          
          <PhotoGallery />
          <Amenities />
          <HouseRules />

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              {!showPayment ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Booking Details</CardTitle>
                    <CardDescription>
                      {loading ? 'Loading availability...' : 
                       error ? error :
                       'Select your dates and number of guests'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="check-in">Check-in</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              id="check-in"
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground",
                              )}
                              disabled={loading}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                              disabled={(date) => 
                                date < new Date() || 
                                !isDateAvailable(date)
                              }
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="check-out">Check-out</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              id="check-out"
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !checkoutDate && "text-muted-foreground",
                              )}
                              disabled={!date || loading}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {checkoutDate ? format(checkoutDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={checkoutDate}
                              onSelect={setCheckoutDate}
                              initialFocus
                              disabled={(currentDate) => 
                                !date || 
                                currentDate <= date ||
                                !isDateAvailable(currentDate)
                              }
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="guests">Guests</Label>
                      <Select value={guests} onValueChange={setGuests}>
                        <SelectTrigger id="guests">
                          <SelectValue placeholder="Select number of guests" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 guest</SelectItem>
                          <SelectItem value="2">2 guests</SelectItem>
                          <SelectItem value="3">3 guests</SelectItem>
                          <SelectItem value="4">4 guests</SelectItem>
                          <SelectItem value="5">5 guests</SelectItem>
                          <SelectItem value="6">6 guests</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={handleContinue} 
                      disabled={!date || !checkoutDate} 
                      className="w-full"
                    >
                      Continue to Payment
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                    <CardDescription>Enter your payment details to complete booking</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Cardholder Name</Label>
                      <Input id="name" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="card-number">Card Number</Label>
                      <div className="relative">
                        <Input id="card-number" placeholder="1234 5678 9012 3456" />
                        <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry Date</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="billing-address">Billing Address</Label>
                      <Input id="billing-address" placeholder="123 Main St" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="New York" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">Zip Code</Label>
                        <Input id="zip" placeholder="10001" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">Complete Booking</Button>
                  </CardFooter>
                </Card>
              )}
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Price Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {pricing !== 0 && (
                    <>
                      <div className="flex justify-between">
                        <span>
                          ${pricing.pricePerNight} x {pricing.nights} nights
                        </span>
                        <span>${pricing.subtotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Cleaning fee</span>
                        <span>${pricing.cleaningFee}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Service fee</span>
                        <span>${pricing.serviceFee}</span>
                      </div>
                      <div className="pt-4 border-t flex justify-between font-bold">
                        <span>Total</span>
                        <span>${pricing.total}</span>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
              <div className="mt-4 text-sm text-muted-foreground">
                <p>You won't be charged yet. We'll confirm availability with the host.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t bg-muted/40 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Villa Murakami</h3>
              <p className="text-sm text-muted-foreground">
                Japanese-inspired house with stunning ocean views, just 200m from the beach.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/#photos" className="text-muted-foreground hover:text-primary">
                    Photos
                  </Link>
                </li>
                <li>
                  <Link href="/#amenities" className="text-muted-foreground hover:text-primary">
                    Amenities
                  </Link>
                </li>
                <li>
                  <Link href="/#reviews" className="text-muted-foreground hover:text-primary">
                    Reviews
                  </Link>
                </li>
                <li>
                  <Link href="/rules" className="text-muted-foreground hover:text-primary">
                    House Rules
                  </Link>
                </li>
                <li>
                  <Link href="/book" className="text-muted-foreground hover:text-primary">
                    Book Now
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Contact</h3>
              <p className="text-sm text-muted-foreground mb-3">
                For any questions or special requests, please contact Era.
              </p>
              <ContactButton />
            </div>
          </div>
          <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Villa Murakami. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

